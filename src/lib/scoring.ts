export const DEFAULT_SCORE_LABELS: Record<string, string> = {
  book_hoarding_risk: 'ความเสี่ยงกองดองงอก',
  finish_probability: 'โอกาสอ่านจบ',
  booktok_susceptibility: 'โอกาสโดนป้ายยาสำเร็จ',
  reflection_depth: 'ระดับความอินกับเรื่อง',
  sleep_sacrifice_risk: 'ความเสี่ยงยอมอดนอน',
  recommendation_energy: 'พลังป้ายยาคนอื่น',
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

function roundScore(value: number): number {
  return Math.round(clamp(value));
}

function normalize(raw: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((raw - min) / (max - min)) * 100;
}

function mapById<T extends { id: string }>(items: T[]): Map<string, T> {
  const out = new Map<string, T>();
  for (const item of items) out.set(item.id, item);
  return out;
}

interface Answer {
  question_id: string;
  value: number;
}

interface Question {
  id: string;
  active?: boolean;
  reverse?: boolean;
  weight?: number;
  pole: string;
}

export function validateAnswers(
  answers: Answer[],
  questions: Question[],
  expectedQuestionVersion: string,
  suppliedQuestionVersion: string
) {
  if (suppliedQuestionVersion !== expectedQuestionVersion) {
    const err: any = new Error('question_version is not supported by this scoring version.');
    err.code = 'QUESTION_VERSION_UNSUPPORTED';
    throw err;
  }

  const activeQuestions = questions.filter((q) => q.active !== false);
  const questionMap = mapById(activeQuestions);

  if (!Array.isArray(answers) || answers.length !== activeQuestions.length) {
    const err: any = new Error(`Answers must include all ${activeQuestions.length} active questions.`);
    err.code = 'INVALID_ANSWERS';
    throw err;
  }

  const seen = new Set<string>();
  for (const answer of answers) {
    if (!answer || typeof answer.question_id !== 'string') {
      const err: any = new Error('Each answer must include question_id.');
      err.code = 'INVALID_ANSWERS';
      throw err;
    }
    if (seen.has(answer.question_id)) {
      const err: any = new Error(`Duplicate question_id: ${answer.question_id}`);
      err.code = 'INVALID_ANSWERS';
      throw err;
    }
    seen.add(answer.question_id);

    if (!questionMap.has(answer.question_id)) {
      const err: any = new Error(`Unknown question_id: ${answer.question_id}`);
      err.code = 'INVALID_ANSWERS';
      throw err;
    }

    if (!Number.isInteger(answer.value) || answer.value < 1 || answer.value > 5) {
      const err: any = new Error(`Answer value must be an integer from 1 to 5: ${answer.question_id}`);
      err.code = 'INVALID_ANSWERS';
      throw err;
    }
  }

  const missing = activeQuestions.map((q) => q.id).filter((id) => !seen.has(id));
  if (missing.length > 0) {
    const err: any = new Error('Answers must include all active questions.');
    err.code = 'INVALID_ANSWERS';
    err.details = { missing_question_ids: missing };
    throw err;
  }
}

function buildAnswerMap(answers: Answer[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const answer of answers) out.set(answer.question_id, answer.value);
  return out;
}

export function calculatePoleScores(answers: Answer[], questions: Question[]) {
  const answerMap = buildAnswerMap(answers);
  const poleRaw: Record<string, { score: number; weight: number; count: number; values: number[] }> = {};

  for (const question of questions.filter((q) => q.active !== false)) {
    const rawValue = answerMap.get(question.id)!;
    const value = question.reverse ? 6 - rawValue : rawValue;
    const weight = typeof question.weight === 'number' ? question.weight : 1;
    if (!poleRaw[question.pole]) {
      poleRaw[question.pole] = { score: 0, weight: 0, count: 0, values: [] };
    }
    poleRaw[question.pole].score += value * weight;
    poleRaw[question.pole].weight += weight;
    poleRaw[question.pole].count += 1;
    poleRaw[question.pole].values.push(value);
  }

  const poleScores: Record<string, number> = {};
  for (const [pole, raw] of Object.entries(poleRaw)) {
    const min = raw.weight * 1;
    const max = raw.weight * 5;
    poleScores[pole] = normalize(raw.score, min, max);
  }

  return { poleScores, poleRaw };
}

export function calculateAxisScores(poleScores: Record<string, number>) {
  return {
    motivation: poleScores.growth - poleScores.escape,
    breadth: poleScores.broad - poleScores.deep,
    discipline: poleScores.structured - poleScores.mood,
    processing: poleScores.reflective - poleScores.immersive,
    acquisition: poleScores.selective - poleScores.collector,
    social: poleScores.social - poleScores.private,
  };
}

export function weightedDistance(userVector: Record<string, number>, archetypeVector: Record<string, number>, weights: Record<string, number>) {
  let total = 0;
  for (const axis of Object.keys(weights)) {
    const diff = userVector[axis] - archetypeVector[axis];
    total += weights[axis] * diff * diff;
  }
  return Math.sqrt(total);
}

function rankArchetypes(axisScores: Record<string, number>, archetypeVectors: Record<string, Record<string, number>>, weights: Record<string, number>) {
  return Object.entries(archetypeVectors)
    .map(([id, vector]) => ({ id, distance: weightedDistance(axisScores, vector, weights) }))
    .sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id));
}

function calculateConsistency(poleRaw: Record<string, { values: number[] }>) {
  const consistencies: number[] = [];
  for (const raw of Object.values(poleRaw)) {
    if (raw.values.length < 2) continue;
    const sorted = raw.values.slice(0, 2);
    const diff = Math.abs(sorted[0] - sorted[1]);
    consistencies.push(clamp(1 - diff / 4, 0, 1));
  }
  if (consistencies.length === 0) return 0;
  return consistencies.reduce((sum, v) => sum + v, 0) / consistencies.length;
}

function calculateConfidence({ primaryDistance, secondaryDistance, poleRaw, axisScores, config }: any) {
  const confidenceConfig = config.confidence;
  const distanceConfidence = 1 - Math.min(primaryDistance / confidenceConfig.distance_divisor, 1);
  const gap = secondaryDistance - primaryDistance;
  const gapConfidence = Math.min(gap / confidenceConfig.gap_divisor, 1);
  const consistencyConfidence = calculateConsistency(poleRaw);

  let score =
    confidenceConfig.weights.distance * distanceConfidence +
    confidenceConfig.weights.gap * gapConfidence +
    confidenceConfig.weights.consistency * consistencyConfidence;

  const axisStrength =
    Object.values(axisScores as Record<string, number>).reduce((sum, value) => sum + Math.abs(value), 0) /
    Object.values(axisScores as Record<string, number>).length;
  const flatness = confidenceConfig.axis_flatness_penalty;
  if (axisStrength < flatness.axis_strength_lt) {
    score *= flatness.multiplier;
  }

  if (gap < 10) {
    score = Math.min(score, confidenceConfig.labels.high_min - 0.01);
  }

  score = Math.max(0, Math.min(1, score));
  let label = 'low';
  if (score >= confidenceConfig.labels.high_min) label = 'high';
  else if (score >= confidenceConfig.labels.medium_min) label = 'medium';

  return {
    score: Number(score.toFixed(2)),
    label,
    diagnostics: {
      distance_confidence: Number(distanceConfidence.toFixed(4)),
      gap_confidence: Number(gapConfidence.toFixed(4)),
      consistency_confidence: Number(consistencyConfidence.toFixed(4)),
      axis_strength: Number(axisStrength.toFixed(4)),
      gap: Number(gap.toFixed(4)),
    },
  };
}

export function calculateDerivedScores(poleScores: Record<string, number>) {
  const growth = poleScores.growth;
  const escape = poleScores.escape;
  const broad = poleScores.broad;
  const deep = poleScores.deep;
  const structured = poleScores.structured;
  const mood = poleScores.mood;
  const reflective = poleScores.reflective;
  const immersive = poleScores.immersive;
  const selective = poleScores.selective;
  const collector = poleScores.collector;
  const social = poleScores.social;

  return {
    book_hoarding_risk: roundScore(0.45 * collector + 0.20 * broad + 0.20 * mood + 0.15 * (100 - structured)),
    finish_probability: roundScore(0.35 * structured + 0.25 * selective + 0.20 * deep + 0.20 * (100 - mood)),
    booktok_susceptibility: roundScore(0.30 * social + 0.30 * collector + 0.25 * broad + 0.15 * (100 - selective)),
    reflection_depth: roundScore(0.50 * reflective + 0.25 * growth + 0.25 * deep),
    sleep_sacrifice_risk: roundScore(0.35 * escape + 0.30 * immersive + 0.20 * mood + 0.15 * collector),
    recommendation_energy: roundScore(0.45 * social + 0.25 * reflective + 0.20 * broad + 0.10 * growth),
  };
}

export function selectShareHighlights(primaryType: string, derivedScores: Record<string, number>, config: any, scoreLabels = DEFAULT_SCORE_LABELS) {
  const entries = Object.entries(derivedScores).map(([key, value]) => ({ key, value }));
  const priority = [
    'book_hoarding_risk',
    'finish_probability',
    'booktok_susceptibility',
    'reflection_depth',
    'sleep_sacrifice_risk',
    'recommendation_energy',
  ];
  entries.sort((a, b) => b.value - a.value || priority.indexOf(a.key) - priority.indexOf(b.key));

  let selected = entries.slice(0, 3);
  const forced = config.forced_highlights && config.forced_highlights[primaryType] ? config.forced_highlights[primaryType] : [];
  if (forced.length > 0 && !selected.some((item) => forced.includes(item.key))) {
    const bestForced = entries.filter((item) => forced.includes(item.key)).sort((a, b) => b.value - a.value)[0];
    if (bestForced) selected = selected.slice(0, 2).concat(bestForced);
  }

  const seen = new Set<string>();
  selected = selected
    .filter((item) => {
      if (seen.has(item.key)) return false;
      seen.add(item.key);
      return true;
    })
    .sort((a, b) => b.value - a.value || priority.indexOf(a.key) - priority.indexOf(b.key))
    .slice(0, 3);

  return selected.map((item) => ({
    key: item.key,
    label: scoreLabels[item.key] || item.key,
    value: item.value,
  }));
}

export function scoreQuiz({ answers, questionsData, scoringConfig, questionVersion }: any) {
  const questions = questionsData.questions || questionsData;
  const expectedQuestionVersion = scoringConfig.question_version || questionsData.question_version;
  validateAnswers(answers, questions, expectedQuestionVersion, questionVersion);

  const { poleScores, poleRaw } = calculatePoleScores(answers, questions);
  const axisScores = calculateAxisScores(poleScores);
  const ranked = rankArchetypes(axisScores, scoringConfig.archetype_vectors, scoringConfig.weights);
  const primaryType = ranked[0].id;
  const secondaryType = ranked[1].id;

  const confidence = calculateConfidence({
    primaryDistance: ranked[0].distance,
    secondaryDistance: ranked[1].distance,
    poleRaw,
    axisScores,
    config: scoringConfig,
  });

  const derivedScores = calculateDerivedScores(poleScores);
  const shareHighlights = selectShareHighlights(primaryType, derivedScores, scoringConfig);

  return {
    ok: true,
    scoring_version: scoringConfig.scoring_version,
    question_version: expectedQuestionVersion,
    primary_type: primaryType,
    secondary_type: secondaryType,
    confidence,
    pole_scores: Object.fromEntries(Object.entries(poleScores).map(([k, v]) => [k, Number(v.toFixed(2))])),
    axis_scores: Object.fromEntries(Object.entries(axisScores).map(([k, v]) => [k, Number(v.toFixed(2))])),
    distances: Object.fromEntries(ranked.map((item) => [item.id, Number(item.distance.toFixed(4))])),
    derived_scores: derivedScores,
    share_highlights: shareHighlights,
  };
}
