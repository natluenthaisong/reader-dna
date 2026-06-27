# docs/02-scoring-engine.md
# Reader DNA — Scoring Engine Specification

Version: 0.1  
Status: Draft for Production  
Depends on: `REQUIREMENT.md`  
Primary Audience: Backend, Frontend, Data, Product  

---

## 1. Purpose

เอกสารนี้กำหนดวิธีคำนวณผลลัพธ์ของแบบทดสอบ **Reader DNA: คุณเป็นนักอ่านแบบไหน?**

เป้าหมายของ scoring engine คือ:

1. แปลงคำตอบ 24 ข้อ เป็นคะแนนพฤติกรรมนักอ่าน
2. คำนวณคะแนนของ 6 behavioral dimensions
3. map ผู้ใช้ไปยัง 1 ใน 12 reader archetypes
4. ระบุ secondary archetype
5. คำนวณ confidence ของผลลัพธ์
6. สร้าง derived scores สำหรับผลลัพธ์ที่แชร์ได้
7. รองรับ versioning และ calibration ในอนาคต

---

## 2. Scoring Philosophy

ระบบนี้ไม่ควรทำงานแบบ hard-coded if-else เช่น:

```txt
ถ้าตอบข้อ 1 = 5 และข้อ 2 = 4 ให้เป็น The Scholar
```

ระบบควรทำงานแบบ:

```txt
Answers
→ Raw pole scores
→ Normalized pole scores
→ Axis scores
→ Archetype distance matching
→ Primary type
→ Secondary type
→ Confidence
→ Result payload
```

หลักคิด:

> ผู้ใช้ไม่ได้เป็น type ใด type หนึ่งแบบ 100% แต่มี “ระยะใกล้” กับแต่ละ archetype ไม่เท่ากัน

---

## 3. Input

### 3.1 Answer Input

ผู้ใช้ต้องตอบ 24 ข้อ  
แต่ละคำตอบเป็น integer 1–5

```json
{
  "answers": [
    { "question_id": "q01", "value": 5 },
    { "question_id": "q02", "value": 3 },
    { "question_id": "q03", "value": 4 }
  ]
}
```

### 3.2 Validation Rules

ก่อน scoring ต้อง validate:

1. มีคำตอบครบ 24 ข้อ
2. ไม่มี question_id ซ้ำ
3. question_id อยู่ใน active question set
4. value เป็น integer เท่านั้น
5. value อยู่ระหว่าง 1–5
6. question_version ตรงกับ scoring_version ที่รองรับ

ถ้าไม่ผ่าน validation ให้ return error

```json
{
  "ok": false,
  "error_code": "INVALID_ANSWERS",
  "message": "Answers must include all 24 active questions."
}
```

---

## 4. Question Metadata

ทุกคำถามต้องมี metadata

```json
{
  "id": "q01",
  "dimension": "motivation",
  "pole": "growth",
  "weight": 1,
  "reverse": false
}
```

### 4.1 Dimensions

```txt
motivation
breadth
discipline
processing
acquisition
social
```

### 4.2 Poles

```txt
motivation: growth, escape
breadth: broad, deep
discipline: structured, mood
processing: reflective, immersive
acquisition: selective, collector
social: private, social
```

---

## 5. Question Mapping

```json
[
  { "id": "q01", "dimension": "motivation", "pole": "growth", "weight": 1 },
  { "id": "q02", "dimension": "motivation", "pole": "escape", "weight": 1 },
  { "id": "q03", "dimension": "motivation", "pole": "growth", "weight": 1 },
  { "id": "q04", "dimension": "motivation", "pole": "escape", "weight": 1 },

  { "id": "q05", "dimension": "breadth", "pole": "broad", "weight": 1 },
  { "id": "q06", "dimension": "breadth", "pole": "deep", "weight": 1 },
  { "id": "q07", "dimension": "breadth", "pole": "broad", "weight": 1 },
  { "id": "q08", "dimension": "breadth", "pole": "deep", "weight": 1 },

  { "id": "q09", "dimension": "discipline", "pole": "structured", "weight": 1 },
  { "id": "q10", "dimension": "discipline", "pole": "mood", "weight": 1 },
  { "id": "q11", "dimension": "discipline", "pole": "structured", "weight": 1 },
  { "id": "q12", "dimension": "discipline", "pole": "mood", "weight": 1 },

  { "id": "q13", "dimension": "processing", "pole": "reflective", "weight": 1 },
  { "id": "q14", "dimension": "processing", "pole": "immersive", "weight": 1 },
  { "id": "q15", "dimension": "processing", "pole": "reflective", "weight": 1 },
  { "id": "q16", "dimension": "processing", "pole": "immersive", "weight": 1 },

  { "id": "q17", "dimension": "acquisition", "pole": "selective", "weight": 1 },
  { "id": "q18", "dimension": "acquisition", "pole": "collector", "weight": 1 },
  { "id": "q19", "dimension": "acquisition", "pole": "selective", "weight": 1 },
  { "id": "q20", "dimension": "acquisition", "pole": "collector", "weight": 1 },

  { "id": "q21", "dimension": "social", "pole": "private", "weight": 1 },
  { "id": "q22", "dimension": "social", "pole": "social", "weight": 1 },
  { "id": "q23", "dimension": "social", "pole": "private", "weight": 1 },
  { "id": "q24", "dimension": "social", "pole": "social", "weight": 1 }
]
```

---

## 6. Raw Pole Score

แต่ละ pole มี 2 questions  
คะแนนดิบของแต่ละ pole คือผลรวมคำตอบของคำถามใน pole นั้น

ตัวอย่าง:

```txt
growth = q01 + q03
escape = q02 + q04
```

ค่าที่เป็นไปได้:

```txt
min = 2
max = 10
```

---

## 7. Normalized Pole Score

แปลง raw score เป็น 0–100

```txt
normalized = ((raw - min_possible) / (max_possible - min_possible)) * 100
```

สำหรับ pole ที่มี 2 questions:

```txt
normalized = ((raw - 2) / 8) * 100
```

---

## 8. Axis Scores

หลังได้ pole scores แล้ว ให้แปลงเป็น axis score ช่วง -100 ถึง +100

```txt
motivation_axis  = growth - escape
breadth_axis     = broad - deep
discipline_axis  = structured - mood
processing_axis  = reflective - immersive
acquisition_axis = selective - collector
social_axis      = social - private
```

Axis meaning:

```txt
motivation_axis:  + Growth / Learning, - Escape / Comfort
breadth_axis:     + Broad / Explorer, - Deep / Specialist
discipline_axis:  + Structured, - Mood-driven
processing_axis:  + Reflective, - Immersive
acquisition_axis: + Selective, - Collector
social_axis:      + Social, - Private
```

---

## 9. Archetype Prototype Vectors

```json
{
  "scholar": {
    "motivation": 80,
    "breadth": -45,
    "discipline": 50,
    "processing": 90,
    "acquisition": 20,
    "social": -10
  },
  "explorer": {
    "motivation": 20,
    "breadth": 90,
    "discipline": -35,
    "processing": 10,
    "acquisition": -20,
    "social": 20
  },
  "strategist": {
    "motivation": 90,
    "breadth": 10,
    "discipline": 70,
    "processing": 60,
    "acquisition": 45,
    "social": 5
  },
  "escapist": {
    "motivation": -85,
    "breadth": 15,
    "discipline": -45,
    "processing": -55,
    "acquisition": -25,
    "social": -25
  },
  "deep_diver": {
    "motivation": 55,
    "breadth": -90,
    "discipline": 35,
    "processing": 75,
    "acquisition": 10,
    "social": -30
  },
  "mood_reader": {
    "motivation": -10,
    "breadth": 45,
    "discipline": -90,
    "processing": -5,
    "acquisition": -35,
    "social": 5
  },
  "collector": {
    "motivation": 10,
    "breadth": 40,
    "discipline": -30,
    "processing": 5,
    "acquisition": -95,
    "social": 15
  },
  "curator": {
    "motivation": 40,
    "breadth": -20,
    "discipline": 60,
    "processing": 35,
    "acquisition": 90,
    "social": -20
  },
  "connector": {
    "motivation": 25,
    "breadth": 35,
    "discipline": 5,
    "processing": 30,
    "acquisition": -20,
    "social": 95
  },
  "completionist": {
    "motivation": 35,
    "breadth": -10,
    "discipline": 90,
    "processing": 20,
    "acquisition": 40,
    "social": -10
  },
  "sprinter": {
    "motivation": 20,
    "breadth": 55,
    "discipline": 35,
    "processing": -70,
    "acquisition": 10,
    "social": 20
  },
  "book_goblin": {
    "motivation": -5,
    "breadth": 70,
    "discipline": -75,
    "processing": -10,
    "acquisition": -100,
    "social": 40
  }
}
```

---

## 10. Distance Matching

ใช้ weighted Euclidean distance

```txt
distance = sqrt(
  wm * (user.motivation - archetype.motivation)^2 +
  wb * (user.breadth - archetype.breadth)^2 +
  wd * (user.discipline - archetype.discipline)^2 +
  wp * (user.processing - archetype.processing)^2 +
  wa * (user.acquisition - archetype.acquisition)^2 +
  ws * (user.social - archetype.social)^2
)
```

Initial weights:

```json
{
  "motivation": 1.15,
  "breadth": 1.00,
  "discipline": 1.10,
  "processing": 1.20,
  "acquisition": 1.00,
  "social": 0.90
}
```

---

## 11. Type Assignment

Primary type คือ archetype ที่มี distance ต่ำที่สุด

```txt
primary_type = archetype with min(distance)
```

Secondary type คือ archetype ที่มี distance ต่ำรองลงมา

```txt
secondary_type = archetype with second_min(distance)
```

---

## 12. Confidence Calculation

Confidence ใช้ 3 ปัจจัย:

1. primary distance ต่ำแค่ไหน
2. gap ระหว่าง primary กับ secondary
3. consistency ภายใน dimensions

Distance confidence:

```txt
distance_confidence = 1 - min(primary_distance / 420, 1)
```

Gap confidence:

```txt
gap = secondary_distance - primary_distance
gap_confidence = min(gap / 80, 1)
```

Pole consistency:

```txt
pole_consistency = 1 - (abs(qA - qB) / 4)
```

Final confidence:

```txt
confidence_score =
  0.45 * distance_confidence +
  0.35 * gap_confidence +
  0.20 * consistency_confidence
```

Labels:

```txt
>= 0.72 = high
>= 0.50 = medium
< 0.50 = low
```

UI ไม่ควรแสดงคำว่า low confidence ตรง ๆ  
ให้ใช้ copy เช่น:

> ผลลัพธ์ของคุณมีความเป็นลูกผสมค่อนข้างชัด

---

## 13. Derived Scores

### Book Hoarding Risk

```txt
book_hoarding_risk =
  0.45 * collector +
  0.20 * broad +
  0.20 * mood +
  0.15 * (100 - structured)
```

### Finish Probability

```txt
finish_probability =
  0.35 * structured +
  0.25 * selective +
  0.20 * deep +
  0.20 * (100 - mood)
```

### BookTok Susceptibility

```txt
booktok_susceptibility =
  0.30 * social +
  0.30 * collector +
  0.25 * broad +
  0.15 * (100 - selective)
```

### Reflection Depth

```txt
reflection_depth =
  0.50 * reflective +
  0.25 * growth +
  0.25 * deep
```

### Sleep Sacrifice Risk

```txt
sleep_sacrifice_risk =
  0.35 * escape +
  0.30 * immersive +
  0.20 * mood +
  0.15 * collector
```

### Recommendation Energy

```txt
recommendation_energy =
  0.45 * social +
  0.25 * reflective +
  0.20 * broad +
  0.10 * growth
```

ทุก score ต้อง clamp 0–100

---

## 14. Share Highlight Selection

เลือก top 3 derived scores จากค่ามากที่สุด  
แต่ถ้า primary type มี forced highlight ให้ include อย่างน้อย 1 ตัว

Forced highlight examples:

```json
{
  "scholar": ["reflection_depth"],
  "collector": ["book_hoarding_risk"],
  "book_goblin": ["book_hoarding_risk", "booktok_susceptibility"],
  "connector": ["recommendation_energy"],
  "completionist": ["finish_probability"],
  "escapist": ["sleep_sacrifice_risk"]
}
```

---

## 15. Result Payload

```json
{
  "ok": true,
  "scoring_version": "1.0.0",
  "question_version": "1.0.0",
  "primary_type": "book_goblin",
  "secondary_type": "collector",
  "confidence": {
    "score": 0.78,
    "label": "high"
  },
  "pole_scores": {
    "growth": 50,
    "escape": 75,
    "broad": 87.5,
    "deep": 37.5,
    "structured": 12.5,
    "mood": 100,
    "reflective": 37.5,
    "immersive": 75,
    "selective": 12.5,
    "collector": 100,
    "private": 25,
    "social": 75
  },
  "axis_scores": {
    "motivation": -25,
    "breadth": 50,
    "discipline": -87.5,
    "processing": -37.5,
    "acquisition": -87.5,
    "social": 50
  },
  "derived_scores": {
    "book_hoarding_risk": 96,
    "finish_probability": 18,
    "booktok_susceptibility": 88,
    "reflection_depth": 42,
    "sleep_sacrifice_risk": 81,
    "recommendation_energy": 63
  },
  "share_highlights": [
    {
      "key": "book_hoarding_risk",
      "label": "Book Hoarding Risk",
      "value": 96
    },
    {
      "key": "booktok_susceptibility",
      "label": "BookTok Susceptibility",
      "value": 88
    },
    {
      "key": "sleep_sacrifice_risk",
      "label": "Sleep Sacrifice Risk",
      "value": 81
    }
  ]
}
```

---

## 16. Pseudo-code

```js
function scoreQuiz(answers, questions, archetypes, config) {
  validateAnswers(answers, questions)

  const answerMap = mapAnswersByQuestionId(answers)
  const poleRaw = initializePoleScores()

  for (const question of questions) {
    const rawValue = answerMap[question.id]
    const value = question.reverse ? 6 - rawValue : rawValue
    const weightedValue = value * question.weight

    poleRaw[question.pole].score += weightedValue
    poleRaw[question.pole].weight += question.weight
    poleRaw[question.pole].count += 1
  }

  const poleScores = {}

  for (const pole in poleRaw) {
    const min = poleRaw[pole].weight * 1
    const max = poleRaw[pole].weight * 5
    const raw = poleRaw[pole].score

    poleScores[pole] = normalize(raw, min, max)
  }

  const axisScores = {
    motivation: poleScores.growth - poleScores.escape,
    breadth: poleScores.broad - poleScores.deep,
    discipline: poleScores.structured - poleScores.mood,
    processing: poleScores.reflective - poleScores.immersive,
    acquisition: poleScores.selective - poleScores.collector,
    social: poleScores.social - poleScores.private
  }

  const distances = {}

  for (const archetype of archetypes) {
    distances[archetype.id] = weightedDistance(
      axisScores,
      archetype.vector,
      config.weights
    )
  }

  const ranked = sortByDistance(distances)

  const primaryType = ranked[0].id
  const secondaryType = ranked[1].id

  const confidence = calculateConfidence({
    primaryDistance: ranked[0].distance,
    secondaryDistance: ranked[1].distance,
    answers,
    questions
  })

  const derivedScores = calculateDerivedScores(poleScores)

  const shareHighlights = selectShareHighlights({
    primaryType,
    derivedScores,
    config
  })

  return {
    ok: true,
    scoring_version: config.scoringVersion,
    question_version: config.questionVersion,
    primary_type: primaryType,
    secondary_type: secondaryType,
    confidence,
    pole_scores: poleScores,
    axis_scores: axisScores,
    distances,
    derived_scores: derivedScores,
    share_highlights: shareHighlights
  }
}
```

---

## 17. Edge Case Handling

### All Answers = 3

Expected:

- pole scores = 50 ทุก pole
- axis scores = 0 ทุก axis
- confidence ควรต่ำหรือ medium-low
- primary type อาจใกล้หลายแบบ

Copy:

> คุณเป็นนักอ่านแบบยืดหยุ่นสูง ยังไม่มีโหมดเดียวที่ครองระบบทั้งหมด

### All Answers = 5

ผู้ใช้เห็นด้วยทุกอย่าง  
อาจเกิดจาก acquiescence bias

ควรลด confidence ด้วย axis flatness penalty

```txt
axis_strength = average(abs(axis_scores))
```

ถ้า axis_strength < 20:

```txt
confidence_score = confidence_score * 0.75
```

### Tie Between Types

หาก primary และ secondary distance ต่างกัน < 10:

- primary = lower distance
- secondary = second lower
- confidence ไม่เกิน medium
- result copy พูดถึง hybrid

---

## 18. Calibration After Pilot

หลัง pilot 300–500 คน ต้องตรวจ:

1. Type distribution
2. Average pole scores
3. Question variance
4. Correlation ระหว่างข้อใน pole เดียวกัน
5. Completion rate รายข้อ
6. Feedback: result accuracy

Bad question indicators:

- คนตอบ 4–5 เกิน 85%
- คนตอบ 1–2 เกิน 85%
- variance ต่ำมาก
- ทำให้ completion drop
- feedback บอกว่างง
- ไม่ correlate กับ pole เดียวกันเลย

Type distribution target:

- ไม่ควรมี type ใดเกิน 25%
- ไม่ควรมี type ใดต่ำกว่า 2% หลัง sample 500 คน

---

## 19. Unit Test Cases

### Scholar-like User

Expected:

```txt
primary_type = scholar or deep_diver
secondary_type = deep_diver or scholar
reflection_depth high
confidence medium/high
```

### Book Goblin-like User

Expected:

```txt
primary_type = book_goblin
secondary_type = collector or mood_reader
book_hoarding_risk > 90
booktok_susceptibility > 80
finish_probability < 35
```

### Completionist-like User

Expected:

```txt
primary_type = completionist
finish_probability high
book_hoarding_risk low/medium
```

---

## 20. Implementation Notes

MVP สามารถ score ฝั่ง client ได้  
แต่ production ควรมี server-side scoring เพื่อ:

- version control
- analytics
- calibration
- prevent result mismatch
- support future A/B test

Recommended:

- Client sends answers
- Server returns result payload
- Client renders result

Scoring ต้อง deterministic:

คำตอบชุดเดียวกัน + scoring_version เดียวกัน  
ต้องได้ผลลัพธ์เหมือนเดิมทุกครั้ง

ห้ามใส่ random ใน scoring

---

## 21. Open Questions

1. จะให้ผู้ใช้เห็น secondary type หรือไม่?
2. จะให้ retake ได้ทันทีหรือ delay?
3. จะเก็บ answer-level data หรือเฉพาะ score?
4. จะใช้ share card เป็น image download หรือ native share?
5. จะมี localized English version ตั้งแต่แรกไหม?

End of docs/02-scoring-engine.md
