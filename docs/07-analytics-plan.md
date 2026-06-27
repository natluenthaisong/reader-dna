# Reader DNA — Analytics Plan

Version: 1.0.0  
Status: Production MVP Ready  
Audience: Product, Data, Engineering, Marketing  
Depends on: `REQUIREMENT.md`, `docs/06-api-spec.md`

---

## 1. Purpose

Analytics ของ Reader DNA ต้องช่วยตอบ 4 คำถามหลัก:

1. ผู้ใช้เริ่มแล้วทำจบไหม
2. ข้อไหนทำให้สะดุดหรือ drop
3. ผลลัพธ์ไหนกระจุกหรือถูกแชร์มาก
4. คำถามและ scoring แยก archetype ได้ดีพอไหม

---

## 2. Core Metrics

| Metric | Definition | MVP Target |
| --- | --- | --- |
| Start → Complete rate | quiz_completed / quiz_started | 65%+ |
| Complete → Share click rate | share_clicked / quiz_completed | 20%+ |
| Average completion time | median time from start to complete | 3–5 min |
| Result dwell time | median active time on result page | 60s+ |
| Retake rate | retake_clicked / result_viewed | Monitor |
| Organic referral traffic | sessions with social/referral source from shared result | Monitor |

---

## 3. Event Taxonomy

| Event | When fired | Required properties |
| --- | --- | --- |
| quiz_started | เมื่อผู้ใช้กดเริ่มแบบทดสอบ | session_id, question_version, referrer, device |
| question_viewed | เมื่อ question card แสดงบนหน้าจอ | session_id, question_id, question_order |
| question_answered | เมื่อผู้ใช้เลือกคะแนน | session_id, question_id, answer_value, question_order |
| question_back_clicked | เมื่อกดย้อนกลับ | session_id, from_question_id, to_question_id |
| quiz_completed | เมื่อส่งคำตอบครบ 24 ข้อ | session_id, completion_time_ms, question_version |
| result_viewed | เมื่อ result page แสดงสำเร็จ | result_id, primary_type, secondary_type, confidence_label |
| share_clicked | เมื่อกดปุ่ม share | result_id, primary_type, share_variant |
| share_downloaded | เมื่อดาวน์โหลด share image สำเร็จ | result_id, primary_type, share_variant, image_size |
| share_native_opened | เมื่อเปิด native share sheet | result_id, primary_type |
| retake_clicked | เมื่อกดทำใหม่ | result_id, primary_type |
| archetype_detail_opened | เมื่อเปิดรายละเอียด type หรือ compatibility | result_id, archetype_id |
| CTA_clicked | เมื่อกด CTA ปลายทาง | result_id, cta_id, primary_type |
| feedback_submitted | ถ้ามี feedback | result_id, primary_type, accuracy_rating, share_intent_rating |

---

## 4. Global Properties

ทุก event ควรมี:

```json
{
  "anonymous_id": "anon_...",
  "session_id": "qs_...",
  "occurred_at": "ISO-8601",
  "device_type": "mobile",
  "viewport_width": 390,
  "locale": "th-TH",
  "referrer": "...",
  "utm_source": "...",
  "utm_campaign": "...",
  "question_version": "1.0.0",
  "content_version": "1.0.0",
  "scoring_version": "1.0.0"
}
```

---

## 5. Funnel Dashboard

Primary funnel:

```txt
landing_viewed
→ quiz_started
→ question_answered q01
→ question_answered q06
→ question_answered q12
→ question_answered q18
→ quiz_completed
→ result_viewed
→ share_clicked
→ share_downloaded / share_native_opened
```

Segment by:

- device type
- traffic source
- primary_type
- confidence_label
- completion_time bucket
- question_version

---

## 6. Question Quality Dashboard

Track per question:

- answer distribution 1–5
- mean
- variance
- skip/drop after question
- time spent on question
- answer changes if user goes back
- correlation with pole mate after pilot

Bad question indicators:

- 4–5 มากกว่า 85%
- 1–2 มากกว่า 85%
- variance ต่ำมาก
- drop-off สูงผิดปกติ
- feedback บอกว่างง
- ไม่ correlate กับ pole เดียวกันเลย

---

## 7. Archetype Distribution Dashboard

Track:

- primary_type distribution
- secondary_type distribution
- primary + secondary pairs
- confidence distribution by type
- average axis scores by type
- share rate by type
- dwell time by type

MVP target after pilot 500 คน:

- ไม่มี type ใดเกิน 25%
- ไม่มี type ใดต่ำกว่า 2%
- type ที่ share rate ต่ำมากต้องตรวจ copy และ share card

---

## 8. Feedback Questions Optional

หลัง result page อาจถาม 2 ข้อแบบไม่บังคับ:

```txt
ผลลัพธ์ตรงกับคุณแค่ไหน?
1–5
```

```txt
คุณอยากแชร์ผลลัพธ์นี้แค่ไหน?
1–5
```

Acceptance signal:

- อย่างน้อย 70% ให้ความตรง 4 หรือ 5
- อย่างน้อย 50% บอกว่าอยากแชร์ 4 หรือ 5

---

## 9. Privacy and Data Retention

- Analytics ใช้ anonymous ID ไม่ใช่ account ID สำหรับ MVP
- ไม่ควรส่ง raw answer data ไป third-party analytics ถ้าไม่จำเป็น
- ถ้าต้องส่ง ให้ส่งแบบ event-level ที่ไม่มีข้อมูลระบุตัวตน
- กำหนด retention สำหรับ raw answers เช่น 12–18 เดือน หรือจนจบ calibration phase
- Public result page ไม่ควร expose raw answers

---

## 10. Implementation QA

1. Event ไม่ยิงซ้ำเมื่อ reload
2. session_id เดียวกันไหลครบ funnel
3. question_answered มี question_id และ answer_value ครบ
4. result_viewed มี primary_type และ confidence_label
5. share events แยก clicked, generated, downloaded/opened
6. Version fields ครบทุก event
7. Dashboard filter ตาม version ได้

---

End of docs/07-analytics-plan.md
