# Reader DNA Project

Production planning and implementation package for **Reader DNA: คุณเป็นนักอ่านแบบไหน?**

Reader DNA is a Thai-first 24-question personality-style reader assessment that maps users into 12 reader archetypes, produces behavioral insight, and generates shareable result cards.

---

## File Map

```txt
reader-dna-project/
├── README.md
├── REQUIREMENT.md
├── docs/
│   ├── 01-question-bank.md
│   ├── 02-scoring-engine.md
│   ├── 03-archetype-content.md
│   ├── 04-result-page-copy.md
│   ├── 05-share-card-spec.md
│   ├── 06-api-spec.md
│   ├── 07-analytics-plan.md
│   └── 08-validation-plan.md
└── content/
    ├── questions.json
    ├── archetypes.json
    ├── achievements.json
    ├── scoring-config.json
    ├── result-copy.json
    └── share-card-copy.json
```

---

## Implementation Order

1. Use `content/questions.json` to render the 24-question quiz.
2. Use `content/scoring-config.json` and `docs/02-scoring-engine.md` to implement server-side scoring.
3. Use `content/archetypes.json`, `content/result-copy.json`, and `content/achievements.json` to render result pages.
4. Use `docs/05-share-card-spec.md` and `content/share-card-copy.json` to build share image generation.
5. Use `docs/06-api-spec.md` and `docs/07-analytics-plan.md` for backend and analytics implementation.
6. Use `docs/08-validation-plan.md` for internal test and pilot calibration.

---

## Product North Star

> Reader DNA makes users laugh at their own reading habits, learn something useful about how they read, and want to share the result because it feels surprisingly accurate.

---

## Important Rules

- Do not turn the product into a simple MBTI clone.
- Do not score with naive if-else logic.
- Do not claim scientific diagnosis.
- Humor must target reading behavior, not identity or intelligence.
- Scoring must be deterministic and versioned.
- Thai copy should feel natural, witty, and kind.
