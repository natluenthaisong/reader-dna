// Shared TypeScript interfaces for Reader DNA

// ---- Quiz / Answers ----

export interface Answer {
  question_id: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  pole: string;
  active?: boolean;
  reverse?: boolean;
  weight?: number;
  dimension?: string;
}

// ---- Scoring ----

export interface AxisScores {
  motivation: number;
  breadth: number;
  discipline: number;
  processing: number;
  acquisition: number;
  social: number;
}

export interface DerivedScores {
  book_hoarding_risk: number;
  finish_probability: number;
  booktok_susceptibility: number;
  reflection_depth: number;
  sleep_sacrifice_risk: number;
  recommendation_energy: number;
}

export interface ShareHighlight {
  key: string;
  label: string;
  value: number;
}

export interface ConfidenceResult {
  score: number;
  label: 'high' | 'medium' | 'low';
  diagnostics: {
    distance_confidence: number;
    gap_confidence: number;
    consistency_confidence: number;
    axis_strength: number;
    gap: number;
  };
}

export interface ScoringResult {
  ok: boolean;
  scoring_version: string;
  question_version: string;
  primary_type: string;
  secondary_type: string;
  confidence: ConfidenceResult;
  pole_scores: Record<string, number>;
  axis_scores: AxisScores;
  distances: Record<string, number>;
  derived_scores: DerivedScores;
  share_highlights: ShareHighlight[];
}

// ---- Archetypes ----

export interface ArchetypeVector {
  motivation: number;
  breadth: number;
  discipline: number;
  processing: number;
  acquisition: number;
  social: number;
}

export interface ArchetypeShareCard {
  tagline: string;
  punchline: string;
  preferred_highlights: string[];
  cta?: string;
}

export interface ArchetypeCompatibility {
  best_with: string[];
  fun_with: string[];
  tension_with: string[];
}

export interface Archetype {
  id: string;
  english_name: string;
  thai_name: string;
  short_name: string;
  tagline: string;
  hero_line: string;
  summary: string;
  behavioral_logic?: string;
  prototype_vector: ArchetypeVector;
  strengths: string[];
  blind_spots: string[];
  reading_superpower?: string;
  reading_kryptonite?: string;
  recommended_challenge?: string;
  suggested_reading_strategy?: string;
  compatibility?: ArchetypeCompatibility;
  share_card: ArchetypeShareCard;
  forced_highlights?: string[];
  avoided_wording?: string[];
}

// ---- Scoring Config ----

export interface ConfidenceWeights {
  distance: number;
  gap: number;
  consistency: number;
}

export interface ConfidenceLabels {
  high_min: number;
  medium_min: number;
}

export interface AxisFlatnessPenalty {
  axis_strength_lt: number;
  multiplier: number;
}

export interface ConfidenceConfig {
  distance_divisor: number;
  gap_divisor: number;
  weights: ConfidenceWeights;
  labels: ConfidenceLabels;
  axis_flatness_penalty: AxisFlatnessPenalty;
}

export interface ScoringConfig {
  scoring_version: string;
  question_version: string;
  axis_order: string[];
  weights: Record<string, number>;
  confidence: ConfidenceConfig;
  forced_highlights: Record<string, string[]>;
  archetype_vectors: Record<string, ArchetypeVector>;
}

// ---- calculateConfidence params ----

export interface CalculateConfidenceParams {
  primaryDistance: number;
  secondaryDistance: number;
  poleRaw: Record<string, { values: number[] }>;
  axisScores: Record<string, number>;
  config: ScoringConfig;
}

// ---- scoreQuiz params ----

export interface QuestionsData {
  question_version: string;
  language: string;
  product: string;
  questions: Question[];
  scale: Array<{ value: number; label: string }>;
}

export interface ScoreQuizParams {
  answers: Answer[];
  questionsData: QuestionsData;
  scoringConfig: ScoringConfig;
  questionVersion: string;
}
