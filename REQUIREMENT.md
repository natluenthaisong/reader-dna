# REQUIREMENT.md
# Reader Personality Test — “คุณเป็นนักอ่านแบบไหน?”

Version: 0.1  
Status: Draft for Production Planning  
Owner: Product / Content / Engineering  
Language: Thai-first, extensible to EN  
Primary Use Case: Web-based personality assessment for readers  
Assessment Length: 24 questions  
Output: 12 Reader Archetypes + Reader DNA + shareable result  

---

## 1. Product Overview

### 1.1 Product Name

Working names:

- Reader DNA
- The Reader Diagnosis
- คุณเป็นนักอ่านแบบไหน?
- สำนักงานตรวจนิสัยนักอ่าน
- Reader Personality Test

Recommended public-facing name:

> **Reader DNA: คุณเป็นนักอ่านแบบไหน?**

Tagline:

> แบบทดสอบ 24 ข้อ ที่จะบอกว่าคุณเป็นนักอ่านสายไหน — พร้อมแฉนิสัยการอ่านแบบเจ็บนิด ๆ แต่จริง

---

## 2. Product Objective

สร้างแบบทดสอบบุคลิกนักอ่านที่:

1. เล่นง่าย จบใน 3–5 นาที
2. ให้ผลลัพธ์ที่ “โดน” และอยากแชร์
3. ไม่ใช่แค่ตลก แต่มี insight จริงเกี่ยวกับพฤติกรรมการอ่าน
4. ใช้ระบบ scoring ที่มีตรรกะ ไม่ใช่สุ่ม
5. สามารถนำไปต่อยอดเป็น community, recommendation, content marketing, bookstore funnel หรือ reading app ได้
6. รองรับ production จริง ทั้ง UX, content, data, analytics และ future personalization

---

## 3. Core Product Promise

ผู้ใช้ควรรู้สึกว่า:

> “ขำ แต่จริง”  
> “เหมือนโดนแอบดูชั้นหนังสือ”  
> “อยากส่งให้เพื่อนเล่น”  
> “ได้รู้ว่าตัวเองอ่านแบบไหน และควรอ่านยังไงให้ดีขึ้น”

ผลลัพธ์ต้องไม่รู้สึกเหมือน horoscope ที่พูดกว้าง ๆ จนใครก็ตรง แต่ต้องมี behavioral specificity เช่น:

- ซื้อหนังสือเร็วกว่าการอ่าน
- อ่านหลายเล่มพร้อมกันแต่จบยาก
- ชอบจดจนบางทีลืมอ่านต่อ
- อ่านเพื่อหนีโลก
- อ่าน self-help เยอะ แต่ยังไม่เริ่มทำ
- ซื้อเพราะปก แต่บอกตัวเองว่า “เพื่อการศึกษา”
- ตั้งเป้าอ่าน 50 เล่ม แล้วติดอยู่เล่มที่ 3

---

## 4. Design Philosophy

### 4.1 ไม่วัด genre เป็นหลัก

แบบทดสอบนี้ไม่ควรถามว่า:

- ชอบอ่านนิยายไหม?
- ชอบอ่านธุรกิจไหม?
- ชอบอ่านแฟนตาซีไหม?

เพราะ genre เป็น preference ที่เปลี่ยนง่าย และอาจขึ้นกับช่วงชีวิต

สิ่งที่ควรวัดคือ:

> ความสัมพันธ์ระหว่างผู้ใช้กับการอ่าน

เช่น:

- อ่านเพื่ออะไร
- เลือกหนังสือยังไง
- อ่านจบไหม
- อ่านแล้วทำอะไรต่อ
- ซื้อหนังสือด้วยเหตุผลแบบไหน
- อ่านคนเดียวหรือแชร์
- อ่านตามแผนหรืออ่านตามอารมณ์
- อ่านเพื่อพัฒนา / เยียวยา / หนีโลก / เก็บแต้ม / สะสม identity

---

## 5. Target Audience

### 5.1 Primary Audience

กลุ่มเป้าหมายหลัก:

- อายุ 18–40
- อ่านหนังสืออย่างน้อยบางครั้ง
- มีพฤติกรรมเกี่ยวกับหนังสือ เช่น ซื้อหนังสือ ดองหนังสือ อ่านรีวิว ดู BookTok/BookTube/Bookstagram
- ใช้ social media
- ชอบคอนเทนต์แนว personality quiz, Wrapped, diagnosis, ranking, archetype

### 5.2 Secondary Audience

- ร้านหนังสือ
- สำนักพิมพ์
- Book community
- Reading app
- Creator สายหนังสือ
- ครู / บรรณารักษ์ / นักจัดกิจกรรมอ่านหนังสือ

---

## 6. User Personas

### Persona A: “คนซื้อเยอะ อ่านน้อย”

พฤติกรรม:

- มีหนังสือดอง
- ซื้อเพราะโปร
- ชอบเดินร้านหนังสือ
- ชอบชั้นหนังสือสวย
- รู้สึกผิดเล็กน้อย แต่ก็ซื้ออีก

Motivation:

- อยากรู้ว่าตัวเองเป็นคนอ่านแบบไหน
- อยากแชร์ผลลัพธ์ที่ล้อตัวเองได้

Risk:

- ถ้าผลลัพธ์ตำหนิเกินไป จะรู้สึกถูก judge

Tone ที่เหมาะ:

- แซวแบบเอ็นดู
- ไม่ใช้คำว่า “ล้มเหลว”
- ใช้คำว่า “กองดองมีศักยภาพสูง”

---

### Persona B: “นักอ่านจริงจัง”

พฤติกรรม:

- อ่านสม่ำเสมอ
- จดโน้ต
- ไฮไลต์
- ชอบวิเคราะห์
- มี reading list

Motivation:

- อยากได้ insight ลึก
- อยากรู้ style ของตัวเอง
- อาจไม่ชอบแบบทดสอบที่ตื้นหรือเล่นเกินไป

Risk:

- ถ้าตลกมากเกินไป จะรู้สึกไม่ serious

Tone ที่เหมาะ:

- มี humor แต่มี intelligence
- ให้คำแนะนำที่ใช้ได้จริง

---

### Persona C: “นักอ่านตามอารมณ์”

พฤติกรรม:

- บางเดือนอ่านเยอะ บางเดือนไม่อ่านเลย
- อ่านหลายแนว
- อ่านหลายเล่มพร้อมกัน
- DNF ได้ง่าย
- อารมณ์สำคัญกว่าแผน

Motivation:

- อยากเข้าใจว่าทำไมตัวเองอ่านไม่ต่อเนื่อง
- อยากได้คำแนะนำที่ไม่บังคับเกินไป

Risk:

- ถ้าผลลัพธ์บอกว่าไม่มีวินัย อาจรู้สึกแย่

Tone ที่เหมาะ:

- normalize ความไม่สม่ำเสมอ
- บอกว่าเป็น reading rhythm ไม่ใช่ failure

---

### Persona D: “นักอ่านสาย social”

พฤติกรรม:

- ชอบรีวิว
- ชอบแนะนำหนังสือ
- ชอบดูคนอื่นอ่าน
- อาจซื้อเพราะกระแส
- ชอบแชร์ quote / shelf / reading update

Motivation:

- อยากได้ผลลัพธ์ที่แชร์สวย
- อยาก tag เพื่อน

Risk:

- ถ้า share card ไม่สนุก จะ drop

Tone ที่เหมาะ:

- meme-able
- มีประโยค punchline
- มี achievement / score ให้โชว์

---

## 7. Assessment Model

แบบทดสอบประกอบด้วย 24 คำถาม  
ใช้ 6 Behavioral Dimensions  
Dimension ละ 4 คำถาม

แต่ละข้อใช้ Likert scale 1–5

1 = ไม่ตรงเลย  
2 = ค่อนข้างไม่ตรง  
3 = กลาง ๆ / แล้วแต่ช่วง  
4 = ค่อนข้างตรง  
5 = ตรงมาก  

---

## 8. Behavioral Dimensions

### Dimension A: Reading Motivation

วัดว่าอ่านเพื่อ “เติบโต” หรือ “หลบพัก”

สองขั้ว:

- Growth / Learning
- Escape / Comfort

### Dimension B: Reading Breadth

วัดว่าเป็นนักอ่าน “อ่านกว้าง” หรือ “อ่านลึก”

สองขั้ว:

- Explorer / Broad
- Specialist / Deep

### Dimension C: Reading Discipline

วัดวิธีจัดการการอ่าน

สองขั้ว:

- Structured
- Mood-driven

### Dimension D: Processing Style

วัดว่าหลังอ่าน ผู้ใช้นำข้อมูลไปประมวลผลอย่างไร

สองขั้ว:

- Reflective
- Immersive / Consumptive

หมายเหตุ: ไม่ควรใช้คำว่า “Consumptive” ใน UI ให้ใช้ “Immersive” หรือ “Flow Reader”

### Dimension E: Book Acquisition Style

วัดความสัมพันธ์กับการซื้อ/สะสมหนังสือ

สองขั้ว:

- Selective
- Collector

### Dimension F: Social Reading

วัดว่าการอ่านเป็นเรื่องส่วนตัวหรือสังคม

สองขั้ว:

- Private
- Social / Connector

---

## 9. Question Requirements

### 9.1 จำนวนคำถาม

Production MVP:

- 24 ข้อ
- 6 dimensions
- dimension ละ 4 ข้อ

Future version:

- Question bank 72–120 ข้อ
- ใช้ adaptive selection หรือ randomized item set
- ลดการจำคำตอบเมื่อเล่นซ้ำ

### 9.2 หลักการเขียนคำถาม

คำถามที่ดีต้อง:

1. วัดพฤติกรรม ไม่ใช่อุดมคติ
2. ไม่ทำให้ผู้ใช้ตอบเอาดูดี
3. มีสถานการณ์เฉพาะ
4. ไม่ยาวเกินไป
5. ไม่ซ้ำกัน
6. ไม่ชี้นำชัดเกินไป
7. มี reverse-coded items
8. ใช้ภาษาที่คนไทยเข้าใจง่าย
9. มีน้ำเสียงสนุก แต่ไม่ทำให้คำถามเสียความแม่น
10. หลีกเลี่ยงคำถามที่คนตอบ “ใช่” เกือบทุกคน

---

## 10. Final Question Set — MVP 24 Questions

### Scale

1 = ไม่ตรงเลย  
2 = ค่อนข้างไม่ตรง  
3 = แล้วแต่ช่วง  
4 = ค่อนข้างตรง  
5 = ตรงมาก  

| ID | Question | Measures |
|---|---|---|
| Q1 | ฉันมักเลือกหนังสือที่ทำให้ตัวเองเข้าใจโลก เข้าใจงาน หรือเข้าใจชีวิตมากขึ้น | Growth |
| Q2 | เวลาชีวิตวุ่นวาย หนังสือคือพื้นที่ที่ฉันใช้หลบไปพักใจ | Escape |
| Q3 | หลังอ่านหนังสือดี ๆ ฉันมักอยากเอาบางอย่างไปใช้จริง ไม่ทางใดก็ทางหนึ่ง | Growth |
| Q4 | บางครั้งฉันไม่ได้อยากได้บทเรียนจากหนังสือ แค่อยากหายไปอยู่ในอีกโลกหนึ่งสักพัก | Escape |
| Q5 | ฉันชอบลองอ่านหนังสือแนวใหม่ ๆ แม้จะไม่แน่ใจว่าจะชอบหรือไม่ | Broad |
| Q6 | ถ้าสนใจเรื่องใดเรื่องหนึ่ง ฉันมักอยากอ่านต่อเนื่องหลายเล่มในหัวข้อนั้น | Deep |
| Q7 | ฉันมักมีหนังสือหลายแนวอยู่ในลิสต์เดียวกัน | Broad |
| Q8 | ฉันชอบกลับไปอ่านผู้เขียน แนว หรือหัวข้อที่คุ้นเคย มากกว่าลองอะไรที่ไม่รู้จักเลย | Deep |
| Q9 | ฉันมักมีแผนคร่าว ๆ ว่าจะอ่านเล่มไหนต่อ | Structured |
| Q10 | ฉันเลือกหนังสือจากอารมณ์ตอนนั้นมากกว่าจากแผนที่วางไว้ | Mood |
| Q11 | ฉันรู้สึกดีเมื่ออ่านหนังสือจบทีละเล่ม ก่อนเริ่มเล่มใหม่จริงจัง | Structured |
| Q12 | ฉันสามารถอ่านหลายเล่มพร้อมกันได้ เพราะแต่ละเล่มตอบอารมณ์คนละแบบ | Mood |
| Q13 | ฉันมักขีดเส้น ไฮไลต์ จดโน้ต หรือเซฟประโยคที่ทำให้คิดต่อ | Reflective |
| Q14 | ถ้าหนังสือสนุกมาก ฉันไม่อยากหยุดจดหรือวิเคราะห์ แค่อยากอ่านต่อให้ไหลไปเลย | Immersive |
| Q15 | หลังอ่านจบ ฉันมักคิดต่อว่าหนังสือเล่มนี้เกี่ยวกับชีวิต งาน หรือความเชื่อของฉันอย่างไร | Reflective |
| Q16 | หนังสือที่ดีสำหรับฉัน คือเล่มที่ทำให้รู้สึกบางอย่างแรง ๆ แม้จะอธิบายเป็นข้อ ๆ ไม่ได้ | Immersive |
| Q17 | ก่อนซื้อหนังสือ ฉันมักดูรีวิว อ่านตัวอย่าง หรือคิดพอสมควรว่าจะอ่านจริงไหม | Selective |
| Q18 | ฉันมีหนังสือที่ซื้อไว้เพราะ “สักวันต้องได้อ่าน” มากกว่าที่อยากยอมรับ | Collector |
| Q19 | ฉันค่อนข้างระวังไม่ให้ซื้อหนังสือเกินกว่าที่ตัวเองจะอ่านไหว | Selective |
| Q20 | ปกสวย โปรดี หรือคนพูดถึงเยอะ สามารถทำให้ฉันสนใจหนังสือเล่มหนึ่งทันที | Collector |
| Q21 | หนังสือบางเล่มเป็นพื้นที่ส่วนตัวของฉัน และฉันไม่จำเป็นต้องเล่าให้ใครฟัง | Private |
| Q22 | ถ้าอ่านเจอเล่มที่ดี ฉันมักอยากแนะนำให้ใครบางคนทันที | Social |
| Q23 | ฉันชอบอ่านเงียบ ๆ มากกว่าคุยหรือโพสต์เรื่องที่กำลังอ่าน | Private |
| Q24 | ฉันสนุกกับการดูว่าคนอื่นอ่านอะไร คิดอย่างไร หรือรีวิวหนังสือแบบไหน | Social |

---

## 11. Scoring Model

แต่ละ pole มี 2 questions  
คะแนนดิบของแต่ละ pole = ผลรวมคำตอบ 2 ข้อ

คะแนนแต่ละ pole อยู่ระหว่าง:

- Minimum: 2
- Maximum: 10

Normalize เป็น 0–100:

```txt
normalized_score = ((raw_score - 2) / 8) * 100
```

Axis scores:

```txt
motivation_axis     = Growth - Escape
breadth_axis        = Broad - Deep
discipline_axis     = Structured - Mood
processing_axis     = Reflective - Immersive
acquisition_axis    = Selective - Collector
social_axis         = Social - Private
```

---

## 12. Reader Archetype Engine

ห้ามใช้ simple if-else เป็นหลัก  
ควรใช้ vector distance matching

ผู้ใช้แต่ละคนมี profile vector 6 ค่า:

```txt
motivation, breadth, discipline, processing, acquisition, social
```

แต่ละ archetype มี prototype vector 6 ค่า  
ระบบคำนวณ weighted Euclidean distance แล้วเลือก type ที่ใกล้ที่สุด

---

## 13. 12 Reader Archetypes

1. The Scholar — นักอ่านสายขุดรากถอนโคน
2. The Explorer — นักอ่านนักสำรวจ
3. The Strategist — นักอ่านสายเอาไปใช้
4. The Escapist — นักอ่านหลบโลก
5. The Deep Diver — นักอ่านดำน้ำลึก
6. The Mood Reader — นักอ่านตามอารมณ์
7. The Collector — นักสะสมหนังสือผู้ทรงเกียรติ
8. The Curator — นักคัดสรร
9. The Connector — นักอ่านสายป้ายยา
10. The Completionist — นักอ่านผู้พิชิต
11. The Sprinter — นักอ่านสายสปีด
12. The Book Goblin — ก็อบลินแห่งกองดอง

---

## 14. Result Page Requirements

หน้าผลลัพธ์ต้องมี:

1. Hero result
2. Archetype name
3. Funny diagnosis
4. Short description
5. Reader DNA score
6. Strengths
7. Blind spots
8. Reading superpower
9. Reading kryptonite
10. Recommended challenge
11. Suggested reading strategy
12. Compatibility with other types
13. Share card
14. CTA

---

## 15. Share Card Requirements

Share card ต้องมี:

- Product logo/name
- Archetype name
- Thai name
- Funny tagline
- 3 score highlights
- 1 punchline
- CTA: “ลองตรวจนิสัยนักอ่านของคุณ”
- URL / QR optional

Share card variants:

1. Minimal
2. Meme
3. Elegant

---

## 16. Humor Guidelines

Humor ต้องล้อ:

- พฤติกรรม
- นิสัยการอ่าน
- ความย้อนแย้งที่ทุกคนมี

ห้ามล้อ:

- ความฉลาด
- รายได้
- การศึกษา
- mental health
- body
- identity
- trauma
- ความสามารถในการอ่าน

Tone:

- แซวแบบรัก
- ฉลาด
- เข้าใจคนอ่านจริง
- มีความ “โดน”
- ไม่หยาบ
- ไม่ทำให้รู้สึกโง่

---

## 17. UX Flow

### Entry Page

ต้องมี:

- ชื่อแบบทดสอบ
- promise ชัด
- เวลาในการเล่น
- จำนวนคำถาม
- CTA
- preview ผลลัพธ์

Example copy:

```txt
คุณเป็นนักอ่านแบบไหน?

ตอบ 24 ข้อใน 4 นาที
แล้วรับผลตรวจ Reader DNA ของคุณ

มีทั้งความจริง ความขำ และอาการที่คุณอาจไม่อยากยอมรับ
```

CTA:

```txt
เริ่มตรวจนิสัยนักอ่าน
```

### Question Page

Requirements:

- แสดงทีละคำถาม
- มี progress bar
- ปุ่มย้อนกลับได้
- auto-save local state
- mobile-first
- scale 1–5 ใช้ง่าย

### Result Transition

Copy examples:

```txt
กำลังตรวจ DNA นักอ่าน...
กำลังประเมินความเสี่ยงกองดอง...
กำลังคำนวณโอกาสซื้อหนังสือเพราะปก...
```

---

## 18. Technical Requirements

Frontend:

- Mobile-first responsive design
- Fast loading
- No login required for MVP
- Local progress persistence
- Share image generation
- Result URL with anonymized result ID or encoded score

Backend:

- Quiz session
- Answer logging
- Scoring version
- Result storage
- Analytics event tracking
- Content versioning

---

## 19. Analytics Requirements

Track events:

1. quiz_started
2. question_answered
3. quiz_completed
4. result_viewed
5. share_clicked
6. share_downloaded
7. retake_clicked
8. archetype_detail_opened
9. CTA_clicked

Properties:

- session_id
- question_id
- answer_value
- result_type
- secondary_type
- completion_time
- device
- referrer
- scoring_version
- content_version

---

## 20. Success Metrics

Primary:

- Quiz completion rate
- Share rate
- Result page dwell time
- Retake rate
- Organic referral traffic

Target MVP benchmarks:

```txt
Start → Complete: 65%+
Complete → Share click: 20%+
Average completion time: 3–5 min
Result dwell time: 60s+
```

---

## 21. Validation Plan

Internal test:

- 20–30 คน
- ตรวจคำถามงงไหม
- ตรวจ tone
- ตรวจ result ว่าตรงไหม
- ดูว่า type กระจุกเกินหรือเปล่า

Pilot test:

- 300–500 คน
- ดู distribution ของ 12 types
- หา questions ที่แยกคนไม่ได้
- ตรวจ reliability ภายใน dimension
- ตรวจ share rate
- ปรับ archetype vector

---

## 22. Acceptance Criteria

MVP ถือว่าพร้อม launch เมื่อ:

1. ผู้ใช้ตอบครบ 24 ข้อได้โดยไม่มี friction สำคัญ
2. Scoring engine assign 12 types ได้ครบ
3. Result page แสดงข้อมูลครบ
4. Share card generate ได้บน mobile
5. Analytics track ครบ event หลัก
6. Completion rate ใน internal test มากกว่า 70%
7. ผู้ทดสอบอย่างน้อย 70% ให้คะแนน “ผลลัพธ์ตรง” 4 หรือ 5
8. ผู้ทดสอบอย่างน้อย 50% บอกว่า “อยากแชร์”
9. ไม่มี copy ที่ทำให้ผู้ใช้รู้สึกถูกดูถูก
10. Content และ scoring version ถูกบันทึกได้

---

## 23. Immediate Next Deliverables

```txt
docs/01-question-bank.md
docs/02-scoring-engine.md
docs/03-archetype-content.md
docs/04-result-page-copy.md
docs/05-share-card-spec.md
docs/06-api-spec.md
docs/07-analytics-plan.md
content/questions.json
content/archetypes.json
content/achievements.json
```

---

## Appendix A: Public-Facing Dimension Names

Internal → Public

```txt
Growth / Escape        → Reading Purpose
Broad / Deep           → Curiosity Style
Structured / Mood      → Reading Rhythm
Reflective / Immersive → Processing Style
Selective / Collector  → Book Relationship
Private / Social       → Sharing Energy
```

---

## Appendix B: Derived Score Ideas

### Book Hoarding Risk

Based on:

- Collector high
- Mood high
- Broad high
- Structured low

### Finish Probability

Based on:

- Structured high
- Selective high
- Mood low
- Collector low

### BookTok Susceptibility

Based on:

- Social high
- Broad high
- Collector high
- Selective low

### Reflection Depth

Based on:

- Reflective high
- Growth high
- Deep high

### Sleep Sacrifice Risk

Based on:

- Escape high
- Immersive high
- Mood high

### Recommendation Energy

Based on:

- Social high
- Reflective high
- Broad high

---

## Appendix C: Production Warning

แบบทดสอบนี้ควรถูกสื่อสารเป็น:

> Personality-style entertainment assessment with behavioral insight

ไม่ควร claim ว่าเป็น psychological diagnosis หรือ psychometric instrument ทางวิชาการ

ควรมี disclaimer:

```txt
แบบทดสอบนี้ออกแบบเพื่อความสนุกและการสะท้อนพฤติกรรมการอ่าน ไม่ใช่เครื่องมือวินิจฉัยทางจิตวิทยา
```

End of REQUIREMENT.md
