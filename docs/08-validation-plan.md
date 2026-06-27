# Reader DNA — Validation and Calibration Plan

Version: 1.0.0  
Status: Production MVP Ready  
Audience: Product, Content, Data  
Depends on: `REQUIREMENT.md`, `docs/02-scoring-engine.md`, `docs/07-analytics-plan.md`

---

## 1. Purpose

Reader DNA เป็น personality-style entertainment assessment with behavioral insight ไม่ใช่ psychometric diagnosis ทางวิชาการ แผน validation นี้จึงเน้นว่าแบบทดสอบต้อง:

1. เล่นจบง่าย
2. ผลลัพธ์รู้สึกตรงและเฉพาะตัว
3. ไม่มี copy ที่ทำให้ผู้ใช้รู้สึกถูกดูถูก
4. scoring ไม่กระจุกผิดปกติ
5. คำถามมี variance และแยกคนได้จริง

---

## 2. Required Disclaimer

ควรแสดงใน footer หรือหน้า About:

```txt
แบบทดสอบนี้ออกแบบเพื่อความสนุกและการสะท้อนพฤติกรรมการอ่าน ไม่ใช่เครื่องมือวินิจฉัยทางจิตวิทยา
```

---

## 3. Phase 1 — Internal Test

Sample: 20–30 คน  
Goal: ตรวจ UX, copy, clarity, early scoring sanity

### Tasks

- ให้ผู้ทดสอบทำ quiz บนมือถือจริง
- จับเวลา completion
- ให้พูดออกเสียงถ้าข้อไหนงง
- ให้ดู result และ share card
- เก็บ feedback ด้วย rating + free text

### Pass Criteria

- Completion rate > 70%
- Median completion time 3–5 นาที
- อย่างน้อย 70% ให้คะแนน “ผลลัพธ์ตรง” 4 หรือ 5
- อย่างน้อย 50% บอกว่า “อยากแชร์” 4 หรือ 5
- ไม่มี copy ที่ผู้ทดสอบระบุว่าดูถูกหรือตัดสิน

---

## 4. Internal Feedback Form

Recommended fields:

```txt
1. มีคำถามข้อไหนอ่านแล้วงงไหม? ระบุข้อ
2. มีคำถามข้อไหนรู้สึกว่าตอบยากเพราะอยากตอบให้ดูดีไหม?
3. ผลลัพธ์ตรงกับคุณแค่ไหน? 1–5
4. ส่วนไหนของผลลัพธ์ที่โดนที่สุด?
5. ส่วนไหนไม่ตรงหรือไม่ยุติธรรม?
6. คุณอยากแชร์ผลลัพธ์ไหม? 1–5
7. Share card แบบไหนที่อยากแชร์: Minimal / Meme / Elegant
8. มีคำหรือมุกไหนที่รู้สึกแรงเกินไปไหม?
```

---

## 5. Phase 2 — Pilot Test

Sample: 300–500 คน  
Goal: ตรวจ distribution, item variance, reliability, share behavior และ calibration

### Analyze

- Type distribution
- Average pole scores
- Axis score distribution
- Question answer distribution
- Variance per question
- Correlation ระหว่างข้อใน pole เดียวกัน
- Completion rate per question
- Result accuracy feedback
- Share rate by archetype

---

## 6. Bad Question Indicators

คำถามควรถูก review ถ้าเจอสัญญาณเหล่านี้:

- คนตอบ 4–5 เกิน 85%
- คนตอบ 1–2 เกิน 85%
- variance ต่ำมาก
- completion drop หลังข้อนั้นสูงผิดปกติ
- feedback บอกว่างงหลายคน
- ไม่ correlate กับข้อที่อยู่ pole เดียวกันเลย
- คนจำนวนมากบอกว่า “ข้อนี้ตอบให้ดูดีง่าย”

---

## 7. Archetype Distribution Targets

หลัง sample 500 คน:

- ไม่ควรมี type ใดเกิน 25%
- ไม่ควรมี type ใดต่ำกว่า 2%
- ถ้า type กระจุก ให้ตรวจทั้ง prototype vector และ question wording
- ถ้า type ถูก assign แต่ confidence ต่ำมากจำนวนมาก ให้ตรวจ gap และ vector overlap

---

## 8. Calibration Decision Tree

### Problem: Book Goblin เยอะเกิน 25%

Check:

- Q18/Q20 มีคนตอบ 4–5 มากเกินไปไหม
- Collector prototype ใกล้ Book Goblin เกินไปไหม
- Broad/Mood questions ทำให้คนส่วนใหญ่เอนทางเดียวกันไหม

Possible adjustment:

- ปรับ wording Q18/Q20 ให้เฉพาะพฤติกรรมมากขึ้น
- เพิ่ม weight ของ discipline หรือ social ใน prototype distance หลัง pilot เท่านั้น
- แยก copy ระหว่าง Collector และ Book Goblin ให้ชัดขึ้น

### Problem: Scholar / Deep Diver แยกยาก

Check:

- Breadth axis มีพลังพอไหม
- Scholar ควร reflective + growth สูง แต่ไม่ deep สุด
- Deep Diver ควร deep เด่นกว่า scholar

Possible adjustment:

- ปรับ vector `breadth` ของ Scholar หรือ Deep Diver
- เพิ่ม copy hybrid เมื่อ primary-secondary gap ต่ำ

### Problem: Completionist ต่ำกว่า 2%

Check:

- Q9/Q11 ทำให้ structured ไม่สูงพอหรือเปล่า
- Prototype vector discipline = 90 สูงเกินไปไหม
- ผู้ใช้ structured แต่ selective/growth ไม่ตรงจึงไป Strategist/Curator หรือไม่

Possible adjustment:

- ลด prototype discipline เล็กน้อย หรือปรับ acquisition vector ให้ใกล้พฤติกรรมจริง

---

## 9. Versioning Rules

- เปลี่ยน wording คำถามที่มีผลต่อการตอบ → bump `question_version`
- เปลี่ยน vector, weights, confidence formula, derived score formula → bump `scoring_version`
- เปลี่ยน result copy หรือ share card copy → bump `content_version`
- Result เก่าควรเก็บ snapshot ของ version ที่ใช้ตอนสร้างผลลัพธ์

---

## 10. Launch Readiness Checklist

1. Internal test ผ่าน pass criteria
2. ไม่มีข้อคำถามที่งงซ้ำ ๆ
3. Scoring unit tests ผ่าน Scholar-like, Book Goblin-like, Completionist-like
4. Result page แสดงครบทุก type
5. Share card generate บน mobile ได้
6. Analytics event ครบ funnel
7. Disclaimer แสดงชัดเจนพอ
8. Copy safety review ผ่าน
9. Result URL ไม่เปิดเผย raw answers
10. Team ตกลง policy การเก็บข้อมูลแล้ว

---

End of docs/08-validation-plan.md
