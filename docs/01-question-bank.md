# Reader DNA — Question Bank Specification

Version: 1.0.0  
Status: Production MVP Ready  
Language: Thai-first  
Depends on: `REQUIREMENT.md`, `docs/02-scoring-engine.md`  
Machine-readable source: `content/questions.json`

---

## 1. Purpose

เอกสารนี้แปลงชุดคำถาม MVP 24 ข้อให้เป็น question bank ที่ทีม Product, UX, Frontend, Backend และ Data ใช้ร่วมกันได้ โดยคง logic ตาม scoring engine เดิม: 6 dimensions, dimension ละ 4 ข้อ, pole ละ 2 ข้อ และใช้ Likert scale 1–5

---

## 2. Answer Scale

| Value | Label |
| --- | --- |
| 1 | ไม่ตรงเลย |
| 2 | ค่อนข้างไม่ตรง |
| 3 | แล้วแต่ช่วง / กลาง ๆ |
| 4 | ค่อนข้างตรง |
| 5 | ตรงมาก |

Microcopy แนะนำบนหน้า quiz:

```txt
ตอบตามพฤติกรรมจริง ไม่ต้องตอบให้ดูเป็นนักอ่านในอุดมคติ
```

---

## 3. Question Metadata Contract

ทุกข้อในระบบ production ต้องมี field เหล่านี้:

```json
{
  "id": "q01",
  "display_id": "Q1",
  "order": 1,
  "text": "...",
  "dimension": "motivation",
  "public_dimension": "Reading Purpose",
  "pole": "growth",
  "weight": 1,
  "reverse": false,
  "active": true,
  "required": true
}
```

ข้อสำคัญสำหรับ MVP:

- `id` ใช้รูปแบบ `q01` ถึง `q24` เพื่อให้ตรงกับ scoring engine
- `display_id` ใช้สำหรับ UI เท่านั้น
- `reverse` ตั้งไว้เป็น `false` ทั้งหมดใน MVP ชุดนี้ เพราะแต่ละ pole มีข้อของตัวเองอยู่แล้ว
- ถ้าอนาคตเพิ่ม reverse-coded item ต้อง update ทั้ง `content/questions.json` และ scoring version

---

## 4. Final MVP Question Set

| Display | ID | Question | Dimension | Pole | Public Dimension | Weight | Reverse |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Q1 | q01 | ฉันมักเลือกหนังสือที่ทำให้ตัวเองเข้าใจโลก เข้าใจงาน หรือเข้าใจชีวิตมากขึ้น | motivation | growth | Reading Purpose | 1 | false |
| Q2 | q02 | เวลาชีวิตวุ่นวาย หนังสือคือพื้นที่ที่ฉันใช้หลบไปพักใจ | motivation | escape | Reading Purpose | 1 | false |
| Q3 | q03 | หลังอ่านหนังสือดี ๆ ฉันมักอยากเอาบางอย่างไปใช้จริง ไม่ทางใดก็ทางหนึ่ง | motivation | growth | Reading Purpose | 1 | false |
| Q4 | q04 | บางครั้งฉันไม่ได้อยากได้บทเรียนจากหนังสือ แค่อยากหายไปอยู่ในอีกโลกหนึ่งสักพัก | motivation | escape | Reading Purpose | 1 | false |
| Q5 | q05 | ฉันชอบลองอ่านหนังสือแนวใหม่ ๆ แม้จะไม่แน่ใจว่าจะชอบหรือไม่ | breadth | broad | Curiosity Style | 1 | false |
| Q6 | q06 | ถ้าสนใจเรื่องใดเรื่องหนึ่ง ฉันมักอยากอ่านต่อเนื่องหลายเล่มในหัวข้อนั้น | breadth | deep | Curiosity Style | 1 | false |
| Q7 | q07 | ฉันมักมีหนังสือหลายแนวอยู่ในลิสต์เดียวกัน | breadth | broad | Curiosity Style | 1 | false |
| Q8 | q08 | ฉันชอบกลับไปอ่านผู้เขียน แนว หรือหัวข้อที่คุ้นเคย มากกว่าลองอะไรที่ไม่รู้จักเลย | breadth | deep | Curiosity Style | 1 | false |
| Q9 | q09 | ฉันมักมีแผนคร่าว ๆ ว่าจะอ่านเล่มไหนต่อ | discipline | structured | Reading Rhythm | 1 | false |
| Q10 | q10 | ฉันเลือกหนังสือจากอารมณ์ตอนนั้นมากกว่าจากแผนที่วางไว้ | discipline | mood | Reading Rhythm | 1 | false |
| Q11 | q11 | ฉันรู้สึกดีเมื่ออ่านหนังสือจบทีละเล่ม ก่อนเริ่มเล่มใหม่จริงจัง | discipline | structured | Reading Rhythm | 1 | false |
| Q12 | q12 | ฉันสามารถอ่านหลายเล่มพร้อมกันได้ เพราะแต่ละเล่มตอบอารมณ์คนละแบบ | discipline | mood | Reading Rhythm | 1 | false |
| Q13 | q13 | ฉันมักขีดเส้น ไฮไลต์ จดโน้ต หรือเซฟประโยคที่ทำให้คิดต่อ | processing | reflective | Processing Style | 1 | false |
| Q14 | q14 | ถ้าหนังสือสนุกมาก ฉันไม่อยากหยุดจดหรือวิเคราะห์ แค่อยากอ่านต่อให้ไหลไปเลย | processing | immersive | Processing Style | 1 | false |
| Q15 | q15 | หลังอ่านจบ ฉันมักคิดต่อว่าหนังสือเล่มนี้เกี่ยวกับชีวิต งาน หรือความเชื่อของฉันอย่างไร | processing | reflective | Processing Style | 1 | false |
| Q16 | q16 | หนังสือที่ดีสำหรับฉัน คือเล่มที่ทำให้รู้สึกบางอย่างแรง ๆ แม้จะอธิบายเป็นข้อ ๆ ไม่ได้ | processing | immersive | Processing Style | 1 | false |
| Q17 | q17 | ก่อนซื้อหนังสือ ฉันมักดูรีวิว อ่านตัวอย่าง หรือคิดพอสมควรว่าจะอ่านจริงไหม | acquisition | selective | Book Relationship | 1 | false |
| Q18 | q18 | ฉันมีหนังสือที่ซื้อไว้เพราะ “สักวันต้องได้อ่าน” มากกว่าที่อยากยอมรับ | acquisition | collector | Book Relationship | 1 | false |
| Q19 | q19 | ฉันค่อนข้างระวังไม่ให้ซื้อหนังสือเกินกว่าที่ตัวเองจะอ่านไหว | acquisition | selective | Book Relationship | 1 | false |
| Q20 | q20 | ปกสวย โปรดี หรือคนพูดถึงเยอะ สามารถทำให้ฉันสนใจหนังสือเล่มหนึ่งทันที | acquisition | collector | Book Relationship | 1 | false |
| Q21 | q21 | หนังสือบางเล่มเป็นพื้นที่ส่วนตัวของฉัน และฉันไม่จำเป็นต้องเล่าให้ใครฟัง | social | private | Sharing Energy | 1 | false |
| Q22 | q22 | ถ้าอ่านเจอเล่มที่ดี ฉันมักอยากแนะนำให้ใครบางคนทันที | social | social | Sharing Energy | 1 | false |
| Q23 | q23 | ฉันชอบอ่านเงียบ ๆ มากกว่าคุยหรือโพสต์เรื่องที่กำลังอ่าน | social | private | Sharing Energy | 1 | false |
| Q24 | q24 | ฉันสนุกกับการดูว่าคนอื่นอ่านอะไร คิดอย่างไร หรือรีวิวหนังสือแบบไหน | social | social | Sharing Energy | 1 | false |

---

## 5. UX Writing Notes

คำถามชุดนี้ตั้งใจวัดพฤติกรรม ไม่ใช่อุดมคติของการเป็นนักอ่านที่ดี ดังนั้น UI ควรช่วยลด social desirability bias ด้วย copy เช่น:

```txt
ไม่มีคำตอบที่ดีหรือแย่ มีแต่คำตอบที่ใกล้ตัวคุณที่สุด
```

```txt
ถ้าบางข้อแล้วแต่ช่วง ให้เลือกคะแนนที่เกิดขึ้นบ่อยกว่าใน 3 เดือนที่ผ่านมา
```

---

## 6. QA Checklist

ก่อน deploy ทุกครั้ง ให้ตรวจว่า:

1. มีคำถาม active ครบ 24 ข้อ
2. ไม่มี `id` ซ้ำ
3. ทุก dimension มี 4 ข้อ
4. ทุก pole มี 2 ข้อ
5. ทุกข้อมี `weight = 1` ใน MVP
6. scale 1–5 ถูกใช้เหมือนกันทั้ง frontend และ backend
7. `question_version` ที่ client ส่งตรงกับ scoring version ที่ server รองรับ

---

## 7. Future Question Bank Expansion

เมื่อขยายเป็น 72–120 ข้อ ควรเพิ่ม field:

```json
{
  "difficulty": "normal",
  "tone": "neutral_funny",
  "item_family": "motivation_growth_01",
  "pilot_stats": {
    "mean": null,
    "variance": null,
    "dropoff_rate": null,
    "pole_correlation": null
  }
}
```

เพื่อรองรับ randomized item set, adaptive selection และ calibration หลัง pilot

---

End of docs/01-question-bank.md
