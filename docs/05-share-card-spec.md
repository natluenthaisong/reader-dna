# Reader DNA — Share Card Specification

Version: 1.0.0  
Status: Production MVP Ready  
Language: Thai-first  
Depends on: `content/share-card-copy.json`, `content/achievements.json`

---

## 1. Purpose

Share card คือหนึ่งในกลไกสำคัญของ product เพราะต้องทำให้ผู้ใช้รู้สึกว่า “ผลลัพธ์นี้เป็นฉันมากพอจะแชร์ได้” เอกสารนี้กำหนดโครงสร้าง visual, content, data mapping และ QA ของการ์ดแชร์

---

## 2. Required Fields

ทุก share card ต้องมี:

- Product name: `Reader DNA`
- English archetype name
- Thai archetype name
- Funny tagline
- 3 score highlights
- 1 punchline
- CTA: `ลองตรวจนิสัยนักอ่านของคุณ`
- URL หรือ QR optional

---

## 3. Card Variants

### 3.1 Minimal

เหมาะกับผู้ใช้ที่อยากแชร์แบบเรียบ เท่ ไม่ meme เกินไป

Content priority:

1. Archetype name
2. Thai name
3. Tagline
4. 3 score highlights
5. CTA

Visual direction:

- Clean layout
- High whitespace
- ใช้ typography เป็นหลัก
- เหมาะกับ Instagram story และ X/Twitter image

### 3.2 Meme

เหมาะกับผู้ใช้ที่อยากแชร์ความขำและล้อตัวเอง

Content priority:

1. Punchline ใหญ่
2. Archetype name
3. Funny score highlights
4. CTA

Visual direction:

- สีและ shape สนุกขึ้น
- ใช้ sticker-like elements ได้
- ระวังอย่าใช้ humor ที่ทำให้ผู้ใช้ดูโง่หรือถูกตัดสิน

### 3.3 Elegant

เหมาะกับนักอ่านจริงจัง ร้านหนังสือ creator หรือ community ที่อยากได้ภาพแชร์สวย

Content priority:

1. Archetype name
2. Short tagline
3. Reader DNA mini chart
4. CTA

Visual direction:

- Editorial / bookish
- ใช้ texture กระดาษหรือ shelf motif ได้
- คุมความขำให้เป็น witty มากกว่า meme

---

## 4. Recommended Sizes

| Use case | Size | Notes |
| --- | --- | --- |
| Instagram Story / TikTok Story | 1080 × 1920 | Primary mobile share format |
| Instagram Feed / Facebook | 1080 × 1080 | Square fallback |
| X / Facebook link preview | 1200 × 630 | Open Graph image |
| Download default | 1080 × 1350 | Good compromise for mobile feed |

---

## 5. Data Mapping

Share card renderer receives:

```json
{
  "primary_type": "book_goblin",
  "secondary_type": "collector",
  "confidence": { "score": 0.78, "label": "high" },
  "share_highlights": [
    { "key": "book_hoarding_risk", "label": "Book Hoarding Risk", "value": 96 },
    { "key": "booktok_susceptibility", "label": "BookTok Susceptibility", "value": 88 },
    { "key": "sleep_sacrifice_risk", "label": "Sleep Sacrifice Risk", "value": 81 }
  ]
}
```

Renderer lookup:

```txt
primary_type → content/share-card-copy.json
highlight key → content/achievements.json
```

---

## 6. Highlight Selection Rules

1. ใช้ `share_highlights` จาก scoring payload เป็น source of truth
2. ถ้า payload ไม่มี ให้เลือก top 3 derived scores
3. ถ้า archetype มี forced highlight ต้องมีอย่างน้อย 1 ตัว
4. ถ้าคะแนนเท่ากัน ให้เรียงตาม priority: book_hoarding_risk, finish_probability, booktok_susceptibility, reflection_depth, sleep_sacrifice_risk, recommendation_energy
5. แสดงค่าคะแนนเป็น integer 0–100

---

## 7. Copy Safety Rules

ห้ามใช้ wording ที่:

- ล้อความฉลาดหรือการศึกษา
- ล้อรายได้ หนี้ หรือความสามารถทางการเงิน
- ล้อ mental health, trauma, identity, body
- ทำให้การอ่านช้าหรืออ่านไม่จบเป็นความล้มเหลว

ใช้ได้:

- แซวพฤติกรรมกองดอง
- แซวการอ่านตามอารมณ์
- แซวการป้ายยา
- แซวการไฮไลต์เยอะ
- แซวความตั้งใจอ่านที่แพ้ปกสวย

---

## 8. Accessibility

- Contrast ผ่าน WCAG AA สำหรับข้อความสำคัญ
- ข้อความหลักต้องอ่านได้บนหน้าจอ 360 px width
- ไม่ใช้ภาพพื้นหลังที่ทำให้ score อ่านยาก
- Alt text สำหรับ share preview:

```txt
ผลตรวจ Reader DNA: {{english_name}} — {{thai_name}} พร้อม 3 คะแนนเด่น
```

---

## 9. QA Checklist

1. ชื่อ archetype ตรงกับ scoring payload
2. Thai name ไม่ล้นกรอบบน mobile
3. 3 highlights ตรงกับ payload
4. ค่า score ถูก clamp 0–100
5. CTA แสดงครบ
6. ไม่มีคำต้องห้ามหรือ copy ที่ judge ผู้ใช้
7. Export ได้ทั้ง PNG และ Web Share API fallback
8. OG image render ได้เมื่อแชร์ URL

---

End of docs/05-share-card-spec.md
