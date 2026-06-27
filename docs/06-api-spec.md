# Reader DNA — API Specification

Version: 1.0.0  
Status: Production MVP Draft  
Audience: Backend, Frontend, Data  
Depends on: `docs/02-scoring-engine.md`, `content/questions.json`, `content/archetypes.json`

---

## 1. Purpose

เอกสารนี้กำหนด API สำหรับ production MVP ของ Reader DNA โดยให้ client ส่งคำตอบ 24 ข้อและ server เป็น source of truth สำหรับ scoring, result persistence, versioning และ analytics

---

## 2. Principles

- Scoring ต้อง deterministic
- Client ไม่ควรเป็น source of truth สำหรับ result ใน production
- ทุก request ที่เกี่ยวกับ scoring ต้องผูกกับ `question_version` และ `scoring_version`
- ไม่ต้อง login สำหรับ MVP
- Result URL ต้องไม่เปิดเผย answer-level data ตรง ๆ
- เก็บ session แบบ anonymized

---

## 3. API Overview

| Method | Path | Purpose |
| --- | --- | --- |
| GET | /api/quiz/config | โหลด active question set, scale, content version |
| POST | /api/quiz/sessions | สร้าง anonymous quiz session |
| PATCH | /api/quiz/sessions/{session_id}/answers | บันทึกคำตอบระหว่างทำ quiz |
| POST | /api/quiz/sessions/{session_id}/complete | validate + score + create result |
| GET | /api/results/{result_id} | อ่าน result payload สำหรับ result page |
| POST | /api/results/{result_id}/share-card | สร้างหรือดึง share card image |
| POST | /api/events | รับ analytics event จาก client |

---

## 4. GET /api/quiz/config

Returns active quiz content for client rendering.

Response:

```json
{
  "ok": true,
  "product": "Reader DNA",
  "question_version": "1.0.0",
  "content_version": "1.0.0",
  "scoring_version": "1.0.0",
  "scale": [
    { "value": 1, "label": "ไม่ตรงเลย" },
    { "value": 2, "label": "ค่อนข้างไม่ตรง" },
    { "value": 3, "label": "แล้วแต่ช่วง / กลาง ๆ" },
    { "value": 4, "label": "ค่อนข้างตรง" },
    { "value": 5, "label": "ตรงมาก" }
  ],
  "questions": [
    {
      "id": "q01",
      "display_id": "Q1",
      "order": 1,
      "text": "ฉันมักเลือกหนังสือที่ทำให้ตัวเองเข้าใจโลก เข้าใจงาน หรือเข้าใจชีวิตมากขึ้น"
    }
  ]
}
```

Client should not need scoring metadata to render the quiz. Metadata can be omitted from public response if preferred.

---

## 5. POST /api/quiz/sessions

Request:

```json
{
  "question_version": "1.0.0",
  "client_id": "anonymous-client-generated-id",
  "referrer": "https://example.com",
  "utm": {
    "source": "instagram",
    "campaign": "launch"
  }
}
```

Response:

```json
{
  "ok": true,
  "session_id": "qs_01H...",
  "expires_at": "2026-07-03T00:00:00.000Z"
}
```

---

## 6. PATCH /api/quiz/sessions/{session_id}/answers

Use for autosave and analytics-safe progress persistence.

Request:

```json
{
  "answers": [
    { "question_id": "q01", "value": 5 },
    { "question_id": "q02", "value": 3 }
  ],
  "last_answered_question_id": "q02"
}
```

Response:

```json
{
  "ok": true,
  "saved_answer_count": 2
}
```

Validation:

- `value` integer 1–5
- `question_id` exists in active question set
- duplicate question IDs are overwritten only within autosave state, not in final scoring submission

---

## 7. POST /api/quiz/sessions/{session_id}/complete

Request:

```json
{
  "question_version": "1.0.0",
  "answers": [
    { "question_id": "q01", "value": 5 },
    { "question_id": "q02", "value": 3 }
  ],
  "completion_time_ms": 214000
}
```

Response:

```json
{
  "ok": true,
  "result_id": "rs_01H...",
  "result_url": "/results/rs_01H...",
  "result": {
    "ok": true,
    "scoring_version": "1.0.0",
    "question_version": "1.0.0",
    "primary_type": "book_goblin",
    "secondary_type": "collector",
    "confidence": {
      "score": 0.78,
      "label": "high"
    },
    "pole_scores": {},
    "axis_scores": {},
    "derived_scores": {},
    "share_highlights": []
  }
}
```

Server must validate exactly 24 answers before scoring.

---

## 8. GET /api/results/{result_id}

Response:

```json
{
  "ok": true,
  "result_id": "rs_01H...",
  "created_at": "2026-06-26T00:00:00.000Z",
  "content_version": "1.0.0",
  "result": {
    "primary_type": "book_goblin",
    "secondary_type": "collector",
    "confidence": { "score": 0.78, "label": "high" },
    "axis_scores": {},
    "derived_scores": {},
    "share_highlights": []
  },
  "content": {
    "primary_archetype": {},
    "secondary_archetype": {},
    "achievement_labels": {}
  }
}
```

Recommended storage: persist result snapshot enough to render old result even if content changes later.

---

## 9. POST /api/results/{result_id}/share-card

Request:

```json
{
  "variant": "meme",
  "size": "1080x1920"
}
```

Response:

```json
{
  "ok": true,
  "image_url": "https://cdn.example.com/share/rs_01H_meme_1080x1920.png",
  "expires_at": null
}
```

---

## 10. POST /api/events

Request:

```json
{
  "event_name": "question_answered",
  "session_id": "qs_01H...",
  "anonymous_id": "anon_...",
  "occurred_at": "2026-06-26T00:00:00.000Z",
  "properties": {
    "question_id": "q01",
    "answer_value": 5,
    "question_version": "1.0.0"
  }
}
```

Response:

```json
{ "ok": true }
```

---

## 11. Error Format

```json
{
  "ok": false,
  "error_code": "INVALID_ANSWERS",
  "message": "Answers must include all 24 active questions.",
  "details": {
    "missing_question_ids": ["q24"]
  }
}
```

Recommended error codes:

| Code | HTTP | Meaning |
| --- | --- | --- |
| INVALID_ANSWERS | 400 | คำตอบไม่ครบ ซ้ำ หรือ value ไม่ถูกต้อง |
| QUESTION_VERSION_UNSUPPORTED | 409 | question_version ไม่รองรับ scoring version ปัจจุบัน |
| SESSION_NOT_FOUND | 404 | ไม่พบ quiz session |
| SESSION_EXPIRED | 410 | session หมดอายุ |
| RESULT_NOT_FOUND | 404 | ไม่พบ result |
| RATE_LIMITED | 429 | ส่ง request ถี่เกินไป |
| INTERNAL_ERROR | 500 | server error |

---

## 12. Data Model Sketch

### quiz_sessions

```txt
id
anonymous_id
question_version
started_at
completed_at
completion_time_ms
device
referrer
utm_json
status
```

### quiz_answers

```txt
session_id
question_id
answer_value
answered_at
question_version
```

### quiz_results

```txt
id
session_id
scoring_version
content_version
primary_type
secondary_type
confidence_score
confidence_label
pole_scores_json
axis_scores_json
derived_scores_json
share_highlights_json
created_at
```

---

## 13. Security / Privacy Notes

- Do not store IP address longer than necessary for abuse prevention
- Do not require login for MVP
- Result IDs should be unguessable
- Do not expose raw answers in public result response by default
- Add deletion mechanism if results are tied to any user identity in future

---

End of docs/06-api-spec.md
