# Reader DNA — Archetype Content Specification

Version: 1.0.0  
Status: Production MVP Ready  
Language: Thai-first  
Depends on: `REQUIREMENT.md`, `docs/02-scoring-engine.md`  
Machine-readable source: `content/archetypes.json`

---

## 1. Purpose

เอกสารนี้ขยาย 12 reader archetypes จากชื่อและ prototype vector ให้กลายเป็น copy และ content package ที่ใช้แสดงผลบน result page และ share card ได้จริง

---

## 2. Content Rules

- ล้อพฤติกรรม ไม่ล้อ identity, intelligence, education, income, mental health, trauma หรือความสามารถในการอ่าน
- ทุก type ต้องมีทั้งความขำและ insight จริง
- หลีกเลี่ยงการบอกว่าผู้ใช้ล้มเหลว ให้ใช้ภาษาว่า rhythm, pattern, blind spot หรือ trade-off
- Internal term เช่น `acquisition_axis` ไม่ควรแสดงใน UI
- ผลลัพธ์ต้องไม่ claim ว่าเป็นการวินิจฉัยทางจิตวิทยา

---

## 3. Archetype Index
| ID | English Name | Thai Name | Tagline |
| --- | --- | --- | --- |
| scholar | The Scholar | นักอ่านสายขุดรากถอนโคน | อ่านหนึ่งเล่ม ได้ thesis หนึ่งฉบับ |
| explorer | The Explorer | นักอ่านนักสำรวจ | มีแผนที่ไม่ชัด แต่เจอของดีเสมอ |
| strategist | The Strategist | นักอ่านสายเอาไปใช้ | อ่านแล้วต้องมี action item |
| escapist | The Escapist | นักอ่านหลบโลก | เปิดหนังสือเพื่อปิดเสียงโลก |
| deep_diver | The Deep Diver | นักอ่านดำน้ำลึก | ไม่ได้อ่านเรื่องหนึ่ง แต่อยู่กับมันจนรู้ทางลับ |
| mood_reader | The Mood Reader | นักอ่านตามอารมณ์ | reading list มีไว้ให้รู้ว่าเราจะไม่ทำตาม |
| collector | The Collector | นักสะสมหนังสือผู้ทรงเกียรติ | ซื้อไว้ก่อน อ่านเมื่อจักรวาลพร้อม |
| curator | The Curator | นักคัดสรร | ชั้นหนังสือไม่ได้เยอะ แต่น้ำหนักทางใจสูง |
| connector | The Connector | นักอ่านสายป้ายยา | อ่านจบหนึ่งเล่ม มีคนโดนป้ายยาอย่างน้อยสามคน |
| completionist | The Completionist | นักอ่านผู้พิชิต | เริ่มแล้วต้องจบ ไม่งั้นวิญญาณไม่สงบ |
| sprinter | The Sprinter | นักอ่านสายสปีด | อ่านเร็วเหมือนมี deadline จากจักรวาล |
| book_goblin | The Book Goblin | ก็อบลินแห่งกองดอง | เห็นหนังสือแล้วตาเป็นประกาย เห็นยอดบัตรแล้วแกล้งตาย |
---

## 4. Full Archetype Content

### The Scholar — นักอ่านสายขุดรากถอนโคน

**ID:** `scholar`  
**Tagline:** อ่านหนึ่งเล่ม ได้ thesis หนึ่งฉบับ

**Hero line**  
คุณไม่ได้อ่านเพื่อรู้แค่ว่าเล่มนี้พูดอะไร แต่เพื่อเข้าใจว่ามันเชื่อมกับโลก ชีวิต และระบบความคิดอื่น ๆ อย่างไร

**Short description**  
Scholar คือคนที่อ่านเพื่อทำความเข้าใจอย่างลึก อ่านแล้วคิดต่อ เชื่อมโยง จด และมักเปลี่ยนหนังสือหนึ่งเล่มให้กลายเป็นแผนที่ความรู้ส่วนตัว

**Behavioral logic**  
คะแนนของคุณมักเอนแรงไปทาง Growth และ Reflective มีวินัยพอสมควร และชอบลงลึกมากกว่าเก็บผ่าน ๆ

**Prototype vector**

```json
{
  "motivation": 80,
  "breadth": -45,
  "discipline": 50,
  "processing": 90,
  "acquisition": 20,
  "social": -10
}
```

**Strengths**

- จับแก่นของหนังสือได้ดี
- เชื่อมโยงไอเดียข้ามเล่มได้
- อ่านแล้วเกิด insight ที่ใช้ต่อได้จริง

**Blind spots**

- บางครั้งคิดเยอะจนอ่านช้ากว่าที่อยาก
- อาจเลือกหนังสือที่ 'ควรอ่าน' มากกว่าที่อยากอ่าน
- อาจรู้สึกผิดถ้าอ่านแบบไม่จดอะไรเลย

**Reading superpower**  
เปลี่ยนหนังสือหนึ่งเล่มให้กลายเป็นกรอบคิดที่ใช้มองโลกได้

**Reading kryptonite**  
หนังสือที่พูดกว้างมากแต่ไม่มีเนื้อให้ขุด

**Recommended challenge**  
เลือกหนังสือหนึ่งเล่มแล้วอ่านแบบไม่ไฮไลต์ ไม่จด ไม่ทำ thesis แค่อนุญาตให้ตัวเองเพลิน

**Suggested reading strategy**  
แยกโหมดอ่านเป็น 2 แบบ: Study Read สำหรับเล่มที่ต้องการขุด และ Joy Read สำหรับเล่มที่อ่านเพื่อเติมไฟ จะช่วยให้ไม่ต้องจริงจังกับทุกเล่มเท่ากัน

**Compatibility**

- Best with: deep_diver, strategist
- Fun with: explorer, connector
- Tension with: sprinter, book_goblin

**Share card**

- Punchline: ขีดเส้นหนึ่งประโยค แล้วเปิดประชุมในหัวสามชั่วโมง
- Preferred highlights: reflection_depth, finish_probability, recommendation_energy
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าบอกว่าคิดมากเกินไปจนเสียเวลา
- อย่าทำให้การอ่านเพื่อความสนุกดูด้อยกว่า

---

### The Explorer — นักอ่านนักสำรวจ

**ID:** `explorer`  
**Tagline:** มีแผนที่ไม่ชัด แต่เจอของดีเสมอ

**Hero line**  
คุณอ่านเหมือนเดินเข้าร้านหนังสือแล้วปล่อยให้ความอยากรู้นำทาง จากเรื่องหนึ่งไปอีกเรื่องหนึ่งแบบมีเหตุผลบ้าง ไม่มีเหตุผลบ้าง แต่สนุกเสมอ

**Short description**  
Explorer คือคนที่อ่านกว้าง ชอบลองแนวใหม่ หัวข้อใหม่ ผู้เขียนใหม่ และมักมีลิสต์ที่ดูเหมือนแผนการเดินทางรอบโลกของความสนใจ

**Behavioral logic**  
คะแนนของคุณมักสูงใน Broad และมีแรง Social หรือ Mood ผสมอยู่ ทำให้การอ่านเกิดจากความอยากรู้อยากลองมากกว่ากรอบตายตัว

**Prototype vector**

```json
{
  "motivation": 20,
  "breadth": 90,
  "discipline": -35,
  "processing": 10,
  "acquisition": -20,
  "social": 20
}
```

**Strengths**

- เปิดรับไอเดียใหม่เร็ว
- เจอหนังสือดี ๆ จากทางที่คนอื่นไม่คาดคิด
- เชื่อมโยงโลกหลายใบเข้าหากันได้

**Blind spots**

- อาจอ่านกระจายจนรู้สึกว่าจับอะไรไม่สุด
- ลิสต์หนังสือโตเร็วกว่าชีวิตจริง
- บางเล่มถูกเปิดเพราะตื่นเต้น แต่ไม่ได้กลับไปหาอีก

**Reading superpower**  
ค้นพบเส้นทางอ่านใหม่ ๆ และพาคนอื่นออกจาก comfort zone ได้

**Reading kryptonite**  
reading plan ที่แน่นจนไม่มีพื้นที่ให้หลงทาง

**Recommended challenge**  
เลือกธีม 1 ธีมแล้วอ่าน 3 เล่มที่ต่างมุมกันใน 1 เดือน เพื่อเปลี่ยนความกว้างให้มีแกน

**Suggested reading strategy**  
ใช้ระบบ 'กว้างแบบมีหมุด': เปิดรับหนังสือหลากหลายได้ แต่ให้มี 1 หมุดหลักต่อเดือน เช่น เมือง ความรัก งาน ความตาย หรือเงิน

**Compatibility**

- Best with: connector, mood_reader
- Fun with: book_goblin, sprinter
- Tension with: deep_diver, completionist

**Share card**

- Punchline: อ่านเล่มนี้อยู่ แต่เผลอไปสนใจอีก 17 เรื่องระหว่างทาง
- Preferred highlights: booktok_susceptibility, recommendation_energy, book_hoarding_risk
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าบอกว่าไม่มีสมาธิ
- อย่าทำให้การอ่านกว้างดูตื้น

---

### The Strategist — นักอ่านสายเอาไปใช้

**ID:** `strategist`  
**Tagline:** อ่านแล้วต้องมี action item

**Hero line**  
สำหรับคุณ หนังสือไม่ใช่ของประดับความคิด แต่เป็นเครื่องมือที่ต้องพาไปสู่การตัดสินใจ การเปลี่ยนพฤติกรรม หรืออย่างน้อยหนึ่งโน้ตที่ใช้จริงได้

**Short description**  
Strategist อ่านเพื่อเติบโตและนำไปใช้ มีวินัย เลือกหนังสือค่อนข้างเป็น และมักถามเสมอว่า 'เล่มนี้เอาไปทำอะไรต่อได้บ้าง'

**Behavioral logic**  
คะแนนมักสูงใน Growth, Structured, Reflective และ Selective ทำให้การอ่านมีเป้าหมายชัดและเชื่อมกับชีวิตจริง

**Prototype vector**

```json
{
  "motivation": 90,
  "breadth": 10,
  "discipline": 70,
  "processing": 60,
  "acquisition": 45,
  "social": 5
}
```

**Strengths**

- อ่านแล้วลงมือทำได้มากกว่าคนทั่วไป
- เลือกหนังสือคุ้มเวลาค่อนข้างดี
- เปลี่ยนความรู้เป็นระบบหรือแผนได้

**Blind spots**

- อาจเผลอทำให้ทุกเล่มต้องมี KPI
- บางครั้งพลาดหนังสือที่ดีเพราะยังไม่เห็นประโยชน์ทันที
- อาจกดดันตัวเองให้ productive แม้ในเวลาพัก

**Reading superpower**  
แปลงบทหนึ่งบทให้กลายเป็นสิ่งที่ทำได้จริงภายในสัปดาห์นี้

**Reading kryptonite**  
หนังสือที่สวยงามมากแต่ไม่ยอมสรุปให้ว่าเอาไปทำอะไรต่อ

**Recommended challenge**  
อ่านหนังสือหนึ่งเล่มที่ไม่มีประโยชน์ตรง ๆ กับงานหรือเป้าหมาย แล้วจดว่าเล่มนี้ทำให้รู้สึกอะไรแทนที่จะจดว่าได้อะไร

**Suggested reading strategy**  
ใช้ after-reading card 3 ช่อง: Idea, Action, Experiment เพื่อกันไม่ให้ความรู้ค้างอยู่แค่ความตั้งใจ

**Compatibility**

- Best with: scholar, completionist
- Fun with: curator, connector
- Tension with: escapist, mood_reader

**Share card**

- Punchline: อ่านจบแล้วไม่ได้ปิดเล่ม แต่เปิด project ใหม่
- Preferred highlights: finish_probability, reflection_depth, recommendation_energy
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าทำให้ดูเป็นคนบ้างาน
- อย่าบอกว่าหนังสือที่ไม่มีประโยชน์คือเสียเวลา

---

### The Escapist — นักอ่านหลบโลก

**ID:** `escapist`  
**Tagline:** เปิดหนังสือเพื่อปิดเสียงโลก

**Hero line**  
คุณรู้ดีว่าหนังสือบางเล่มไม่ได้มีไว้สอนอะไรเรา แต่อยู่ตรงนั้นเพื่อพาเราออกจากวันหนัก ๆ ไปพักในโลกที่หายใจง่ายกว่า

**Short description**  
Escapist อ่านเพื่อพักใจ หนีเสียงรบกวน และจมไปกับบรรยากาศของเรื่องราว การอ่านของคุณมีคุณค่าตรงที่มันเป็นพื้นที่ปลอดภัย ไม่ใช่แค่เครื่องมือพัฒนาตัวเอง

**Behavioral logic**  
คะแนนมักเอนไปทาง Escape, Immersive, Mood และ Private ทำให้การอ่านเป็นพื้นที่ส่วนตัวและขึ้นกับอารมณ์มากกว่าตาราง

**Prototype vector**

```json
{
  "motivation": -85,
  "breadth": 15,
  "discipline": -45,
  "processing": -55,
  "acquisition": -25,
  "social": -25
}
```

**Strengths**

- อินกับหนังสือได้ลึกและจริง
- ใช้การอ่านเป็นพื้นที่พักได้ดี
- รับรู้บรรยากาศและอารมณ์ของเรื่องได้ละเอียด

**Blind spots**

- บางครั้งเลือกอ่านเพื่อเลื่อนการจัดการเรื่องที่ต้องกลับไปทำ
- อาจติดเล่มที่ให้ comfort จนไม่อยากลองอะไรยาก
- ถ้าโลกจริงเหนื่อยมาก การอ่านอาจกลายเป็นที่หลบจนลืมดูแลจังหวะชีวิต

**Reading superpower**  
เข้าไปอยู่ในโลกของหนังสือได้เต็มตัวจนเหมือนได้พักจริง

**Reading kryptonite**  
หนังสือที่สั่งสอนหนัก ๆ ตั้งแต่หน้าแรก

**Recommended challenge**  
หลังอ่านจบแต่ละครั้ง เขียนหนึ่งประโยคว่า 'ตอนนี้ฉันต้องการอะไร' เพื่อเชื่อมโลกในเล่มกลับมาหาตัวเองแบบนุ่ม ๆ

**Suggested reading strategy**  
ทำ shelf สำหรับ Comfort Read แยกจาก Growth Read เพื่อให้การพักไม่ต้องรู้สึกผิด และการเติบโตไม่ต้องแย่งพื้นที่พัก

**Compatibility**

- Best with: mood_reader, sprinter
- Fun with: book_goblin, connector
- Tension with: strategist, completionist

**Share card**

- Punchline: ไม่ได้หายไปไหน แค่ย้ายไปอยู่ในบทที่ 12 ชั่วคราว
- Preferred highlights: sleep_sacrifice_risk, book_hoarding_risk, reflection_depth
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าล้อเรื่อง mental health
- อย่าทำให้การอ่านเพื่อพักดูเป็นความล้มเหลว

---

### The Deep Diver — นักอ่านดำน้ำลึก

**ID:** `deep_diver`  
**Tagline:** ไม่ได้อ่านเรื่องหนึ่ง แต่อยู่กับมันจนรู้ทางลับ

**Hero line**  
คุณไม่ได้ต้องการอ่านให้ครบทุกกระแส คุณต้องการรู้จักเรื่องที่สนใจให้ลึกพอจะเห็นชั้นใต้ดินของมัน

**Short description**  
Deep Diver คือคนที่เมื่อสนใจอะไรแล้วจะลงไปยาว อ่านต่อเนื่อง ขุดบริบท เทียบหลายเล่ม และมีความสุขกับการค่อย ๆ เข้าใจเรื่องเดิมให้ลึกขึ้น

**Behavioral logic**  
คะแนนมักสูงใน Deep, Growth และ Reflective พร้อมวินัยระดับหนึ่ง ทำให้การอ่านของคุณมีลักษณะเป็นการสำรวจแนวดิ่ง

**Prototype vector**

```json
{
  "motivation": 55,
  "breadth": -90,
  "discipline": 35,
  "processing": 75,
  "acquisition": 10,
  "social": -30
}
```

**Strengths**

- เข้าใจหัวข้อเฉพาะได้ลึก
- เห็นความต่างเล็ก ๆ ระหว่างหนังสือในเรื่องเดียวกัน
- มีความอดทนกับเนื้อหายาก

**Blind spots**

- อาจอยู่กับเรื่องเดิมนานจนพลาดมุมใหม่
- บางครั้งเลือกไม่อ่านเพราะยังไม่ใช่เล่มที่ 'ถูกต้องพอ'
- อาจคุยเรื่องที่ชอบลึกจนคนรอบตัวตามไม่ทัน

**Reading superpower**  
สร้างความเชี่ยวชาญจากการอ่านต่อเนื่องแบบมีชั้นเชิง

**Reading kryptonite**  
หนังสือผิว ๆ ที่บอกว่าครอบคลุมทุกอย่างใน 120 หน้า

**Recommended challenge**  
อ่านเล่มนอกหัวข้อหลักหนึ่งเล่ม แล้วหาจุดเชื่อมกลับมาที่เรื่องที่คุณกำลังขุด

**Suggested reading strategy**  
ใช้ reading stack แบบ 3 ชั้น: Intro, Core, Counterpoint เพื่อไม่ให้ความลึกกลายเป็น echo chamber

**Compatibility**

- Best with: scholar, curator
- Fun with: strategist, completionist
- Tension with: explorer, book_goblin

**Share card**

- Punchline: ตั้งใจอ่านหนึ่งเล่ม สรุปออกมาเป็น syllabus
- Preferred highlights: reflection_depth, finish_probability, recommendation_energy
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าทำให้ดูเป็นคนหัวปิด
- อย่าบอกว่าอ่านแคบโดยไม่มีบริบท

---

### The Mood Reader — นักอ่านตามอารมณ์

**ID:** `mood_reader`  
**Tagline:** reading list มีไว้ให้รู้ว่าเราจะไม่ทำตาม

**Hero line**  
คุณไม่ได้ไม่มีระบบ คุณมีระบบที่ชื่อว่า 'วันนี้ใจอยากอ่านอะไร' และบางวันระบบนี้แม่นกว่าตารางสีสวย ๆ มาก

**Short description**  
Mood Reader อ่านตามจังหวะชีวิต อารมณ์ และพลังงาน บางช่วงอ่านพุ่ง บางช่วงพักยาว แต่นั่นคือ rhythm ไม่ใช่ failure

**Behavioral logic**  
คะแนนมักสูงใน Mood และ Broad โดยอาจมี Collector หรือ Immersive ผสม ทำให้การอ่านยืดหยุ่นแต่ไม่ค่อยเดินตามแผน

**Prototype vector**

```json
{
  "motivation": -10,
  "breadth": 45,
  "discipline": -90,
  "processing": -5,
  "acquisition": -35,
  "social": 5
}
```

**Strengths**

- เลือกหนังสือเข้ากับสภาพใจได้ดี
- ไม่ฝืนอ่านเล่มที่ไม่ใช่จังหวะ
- มีความยืดหยุ่นและเปิดรับหลายแนว

**Blind spots**

- หนังสือบางเล่มค้างเพราะอารมณ์เปลี่ยนก่อน
- เป้าหมายอ่านรายปีอาจไม่เข้ากับธรรมชาติของคุณ
- บางครั้งเริ่มใหม่บ่อยกว่ากลับไปต่อ

**Reading superpower**  
จับคู่หนังสือกับอารมณ์ได้แม่นเหมือนมี weather forecast ของใจ

**Reading kryptonite**  
ตารางอ่านที่บังคับว่าอังคารนี้ต้องอ่านบท 4 เท่านั้น

**Recommended challenge**  
สร้างกฎ 10 หน้า: ก่อนดรอปหรือเปลี่ยนเล่ม ให้กลับไปอ่านเล่มเก่า 10 หน้าเพื่อเช็กว่ายังไม่ใช่จริงไหม

**Suggested reading strategy**  
จัด shelf ตามอารมณ์ เช่น อ่านตอนเหนื่อย อ่านตอนอยากฉลาด อ่านตอนอยากหนีโลก แทนการจัดตาม genre อย่างเดียว

**Compatibility**

- Best with: explorer, escapist
- Fun with: book_goblin, connector
- Tension with: completionist, strategist

**Share card**

- Punchline: วันนี้จะอ่านเล่มที่ตั้งใจไว้ ยกเว้นใจไปตกหลุมรักเล่มอื่นก่อน
- Preferred highlights: sleep_sacrifice_risk, book_hoarding_risk, booktok_susceptibility
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าบอกว่าไม่มีวินัย
- อย่าทำให้การอ่านไม่สม่ำเสมอดูเป็นความผิด

---

### The Collector — นักสะสมหนังสือผู้ทรงเกียรติ

**ID:** `collector`  
**Tagline:** ซื้อไว้ก่อน อ่านเมื่อจักรวาลพร้อม

**Hero line**  
คุณไม่ได้ซื้อหนังสือเพิ่ม คุณกำลังรับอุปการะสิ่งพิมพ์ที่ต้องการบ้าน และบ้านนั้นก็คือชั้นหนังสือของคุณ

**Short description**  
Collector มีความสัมพันธ์กับหนังสือในฐานะวัตถุ ความเป็นไปได้ และตัวตน หนังสือที่ยังไม่อ่านไม่ได้ไร้ค่า แต่มันคือคลังอนาคตที่ยังไม่เปิดใช้งาน

**Behavioral logic**  
คะแนนมักสูงใน Collector พร้อม Broad หรือ Mood ผสม ทำให้การซื้อและการเก็บเป็นส่วนหนึ่งของความสุขในการอ่าน

**Prototype vector**

```json
{
  "motivation": 10,
  "breadth": 40,
  "discipline": -30,
  "processing": 5,
  "acquisition": -95,
  "social": 15
}
```

**Strengths**

- มีคลังตัวเลือกพร้อมสำหรับหลายอารมณ์
- เปิดรับหนังสือใหม่ได้ง่าย
- มีสายตาดีต่อหนังสือที่น่าสนใจแม้ยังไม่ได้อ่านทันที

**Blind spots**

- กองดองโตเร็วกว่าชั่วโมงว่าง
- ความตื่นเต้นตอนซื้ออาจแซงความตั้งใจตอนอ่าน
- บางครั้งหนังสือใหม่ทำให้หนังสือที่รออยู่หายไปจากสายตา

**Reading superpower**  
สร้างห้องสมุดส่วนตัวที่เต็มไปด้วย version ของตัวเองในอนาคต

**Reading kryptonite**  
คำว่า 'ลดราคาเฉพาะวันนี้' และปกที่ออกแบบมาเหมือนรู้จักคุณเป็นการส่วนตัว

**Recommended challenge**  
ทำ Shelf Audit เดือนละครั้ง: เลือก 3 เล่มที่ยังอยากอ่านจริง 1 เล่มที่พร้อมปล่อย และ 1 เล่มที่ควรขึ้นมาอยู่หน้า shelf

**Suggested reading strategy**  
ใช้กฎ 1-in-1-start: ซื้อได้ แต่ต้องเริ่มอ่านอย่างน้อย 10 หน้าภายใน 7 วัน เพื่อแยกความอยากซื้อออกจากความอยากอ่าน

**Compatibility**

- Best with: book_goblin, explorer
- Fun with: connector, mood_reader
- Tension with: curator, completionist

**Share card**

- Punchline: กองดองไม่ใช่ปัญหา แต่เป็นจักรวาลคู่ขนานที่ยังไม่ได้เข้าไปเยี่ยม
- Preferred highlights: book_hoarding_risk, booktok_susceptibility, sleep_sacrifice_risk
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าล้อเรื่องรายได้หรือความจน
- อย่าใช้คำว่าฟุ่มเฟือยแบบตัดสิน

---

### The Curator — นักคัดสรร

**ID:** `curator`  
**Tagline:** ชั้นหนังสือไม่ได้เยอะ แต่น้ำหนักทางใจสูง

**Hero line**  
คุณไม่ได้ต้องการมีหนังสือเยอะที่สุด คุณต้องการมีเล่มที่ใช่จริง ๆ และแต่ละเล่มควรมีเหตุผลพอที่จะได้อยู่บนชั้น

**Short description**  
Curator อ่านและซื้อแบบคัดสรร ระวังคุณภาพ เวลา และพื้นที่ความสนใจ คุณให้ค่ากับหนังสือที่ผ่านการเลือกมากกว่าความตื่นเต้นแบบทันที

**Behavioral logic**  
คะแนนมักสูงใน Selective และ Structured พร้อม Reflective หรือ Deep ในระดับหนึ่ง ทำให้พฤติกรรมอ่านมีความตั้งใจและกรองมาก

**Prototype vector**

```json
{
  "motivation": 40,
  "breadth": -20,
  "discipline": 60,
  "processing": 35,
  "acquisition": 90,
  "social": -20
}
```

**Strengths**

- เลือกหนังสือได้ตรงความต้องการ
- ลดกองดองได้ดีกว่าคนส่วนใหญ่
- สร้าง shelf ที่สะท้อนตัวตนชัด

**Blind spots**

- อาจคัดนานจนไม่ได้เริ่ม
- พลาดเล่มสนุกที่ดูไม่ 'คุ้ม' ในตอนแรก
- บางครั้งความพิถีพิถันทำให้การอ่านเสียความ spontaneous

**Reading superpower**  
ทำให้การเลือกหนังสือกลายเป็นศิลปะของการรู้จักตัวเอง

**Reading kryptonite**  
กระแสไว ๆ ที่ทุกคนบอกว่าต้องอ่านเดี๋ยวนี้

**Recommended challenge**  
เดือนนี้ให้สิทธิ์ตัวเองเลือกหนังสือแบบ blind pick หนึ่งเล่ม โดยไม่อ่านรีวิวเกิน 3 นาที

**Suggested reading strategy**  
ใช้ shortlist 5 เล่มต่อไตรมาส แล้วเลือกตามพลังงานจริงในแต่ละสัปดาห์ เพื่อให้การคัดสรรไม่แข็งเกินไป

**Compatibility**

- Best with: deep_diver, completionist
- Fun with: scholar, strategist
- Tension with: collector, book_goblin

**Share card**

- Punchline: ไม่ได้หยิ่งกับหนังสือ แค่พื้นที่บนชั้นมีคณะกรรมการคัดเลือก
- Preferred highlights: finish_probability, reflection_depth, recommendation_energy
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าทำให้ดู snob
- อย่าบอกว่าไม่สนุกกับหนังสือกระแส

---

### The Connector — นักอ่านสายป้ายยา

**ID:** `connector`  
**Tagline:** อ่านจบหนึ่งเล่ม มีคนโดนป้ายยาอย่างน้อยสามคน

**Hero line**  
หนังสือดีสำหรับคุณไม่ได้จบตรงหน้าสุดท้าย แต่มันเริ่มทำงานจริงตอนคุณได้ส่งต่อให้ใครบางคนที่ควรเจอมัน

**Short description**  
Connector อ่านแล้วอยากเล่า อยากรีวิว อยากแนะนำ และสนุกกับการเห็นว่าหนังสือหนึ่งเล่มเดินทางต่อไปหาใครบ้าง

**Behavioral logic**  
คะแนน Social สูงมาก และมักมี Broad หรือ Reflective ผสม ทำให้การอ่านเชื่อมกับการสนทนา community และการป้ายยา

**Prototype vector**

```json
{
  "motivation": 25,
  "breadth": 35,
  "discipline": 5,
  "processing": 30,
  "acquisition": -20,
  "social": 95
}
```

**Strengths**

- แนะนำหนังสือให้คนอื่นได้แม่น
- สร้างบทสนทนาจากสิ่งที่อ่านได้ดี
- ทำให้การอ่านเป็นกิจกรรมทางสังคมที่อบอุ่น

**Blind spots**

- อาจอ่านตามกระแสหรือรีวิวมากกว่าความต้องการจริง
- บางครั้งรีบเล่าก่อนฟังความรู้สึกตัวเอง
- อาจป้ายยาแรงจนเพื่อนเริ่มกลัว DM

**Reading superpower**  
จับคู่คนกับหนังสือเหมือนเป็น algorithm ที่มีหัวใจ

**Reading kryptonite**  
เล่มที่ดีมากแต่ไม่มีใครรอบตัวอ่านแล้วคุยด้วย

**Recommended challenge**  
อ่านหนังสือหนึ่งเล่มแบบ private mode: ไม่โพสต์ ไม่รีวิว จนกว่าจะอ่านจบ แล้วค่อยดูว่าความเห็นเปลี่ยนไหม

**Suggested reading strategy**  
ทำ note สั้น ๆ ว่า 'เล่มนี้เหมาะกับใคร / ไม่เหมาะกับใคร' เพื่อให้การแนะนำมีประโยชน์และไม่กลายเป็น hype ล้วน

**Compatibility**

- Best with: explorer, book_goblin
- Fun with: scholar, mood_reader
- Tension with: curator, deep_diver

**Share card**

- Punchline: ยังไม่ทันอ่านจบก็มีรายชื่อคนที่ต้องโดนป้ายยาแล้ว
- Preferred highlights: recommendation_energy, booktok_susceptibility, reflection_depth
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าทำให้การชอบแชร์ดูตื้น
- อย่าล้อว่าเรียกร้องความสนใจ

---

### The Completionist — นักอ่านผู้พิชิต

**ID:** `completionist`  
**Tagline:** เริ่มแล้วต้องจบ ไม่งั้นวิญญาณไม่สงบ

**Hero line**  
สำหรับคุณ หนังสือที่เริ่มแล้วมีแรงดึงดูดพิเศษ เพราะการอ่านจบไม่ใช่แค่จบเล่ม แต่มันคือการปิดวงจรในใจอย่างงดงาม

**Short description**  
Completionist มีวินัย ชอบความคืบหน้า และรู้สึกดีกับการอ่านให้ครบ การพิชิตหนังสือเป็นทั้งแรงจูงใจและระบบจัดระเบียบความสนใจ

**Behavioral logic**  
คะแนน Structured สูงมาก พร้อม Selective หรือ Growth ในระดับหนึ่ง ทำให้มีโอกาสอ่านจบสูงและจัดการ reading list ได้ดี

**Prototype vector**

```json
{
  "motivation": 35,
  "breadth": -10,
  "discipline": 90,
  "processing": 20,
  "acquisition": 40,
  "social": -10
}
```

**Strengths**

- อ่านจบสม่ำเสมอ
- ติดตาม progress ได้ดี
- ไม่ปล่อยให้ความสนใจแตกกระจายง่าย

**Blind spots**

- อาจฝืนอ่านเล่มที่ไม่เหมาะกับตัวเองนานเกินไป
- บางครั้งให้ค่ากับการจบมากกว่าประสบการณ์ระหว่างทาง
- อาจรู้สึกผิดกับ DNF ทั้งที่บางครั้งควรปล่อย

**Reading superpower**  
เปลี่ยนความตั้งใจให้กลายเป็นเล่มที่อ่านจบจริง

**Reading kryptonite**  
หนังสือที่เริ่มดีแล้วกลางเล่มเริ่มย้วย แต่คุณก็ยังรู้สึกว่าต้องไปต่อ

**Recommended challenge**  
ฝึก Intentional DNF: เลือกหนึ่งเล่มที่ไม่ใช่ แล้วเขียนเหตุผล 2 บรรทัดก่อนปล่อย เพื่อให้การไม่จบเป็นการตัดสินใจ ไม่ใช่ความผิด

**Suggested reading strategy**  
กำหนด DNF checkpoint ที่หน้า 50 หรือ 20% ของเล่ม เพื่อให้วินัยทำงานคู่กับการเคารพเวลาของตัวเอง

**Compatibility**

- Best with: strategist, curator
- Fun with: scholar, deep_diver
- Tension with: mood_reader, book_goblin

**Share card**

- Punchline: เล่มไหนเริ่มแล้ว เล่มนั้นต้องได้เห็นเครดิตตอนจบ
- Preferred highlights: finish_probability, reflection_depth, recommendation_energy
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าบอกว่า rigid
- อย่าทำให้การอ่านจบดูเป็นการอวดเหนือคนอื่น

---

### The Sprinter — นักอ่านสายสปีด

**ID:** `sprinter`  
**Tagline:** อ่านเร็วเหมือนมี deadline จากจักรวาล

**Hero line**  
คุณเป็นนักอ่านที่เข้า flow ได้เร็ว จับจังหวะเรื่องได้ไว และบางครั้งอ่านพุ่งจนเวลาจริงต้องวิ่งตามคุณ

**Short description**  
Sprinter อ่านเร็ว อินเร็ว และชอบ momentum มากกว่าการหยุดวิเคราะห์นาน ๆ เหมาะกับเล่มที่ดึงให้ไหลไปข้างหน้าอย่างต่อเนื่อง

**Behavioral logic**  
คะแนนมักเอนทาง Immersive และ Broad พร้อม Structured บางส่วน ทำให้คุณไปได้เร็วเมื่อเจอเล่มที่ใช่

**Prototype vector**

```json
{
  "motivation": 20,
  "breadth": 55,
  "discipline": 35,
  "processing": -70,
  "acquisition": 10,
  "social": 20
}
```

**Strengths**

- เข้าเล่มใหม่ได้ไว
- อ่านจบเป็นช่วง ๆ ได้เร็วมาก
- จับ narrative และภาพรวมได้ดี

**Blind spots**

- อาจพลาดรายละเอียดเล็ก ๆ เพราะรีบไปต่อ
- บางครั้งจำความรู้สึกได้มากกว่าประเด็น
- ถ้า momentum ขาด อาจหลุดจากเล่มนั้นทันที

**Reading superpower**  
เร่งเครื่องอ่านจนเล่มหนาดูเป็นภารกิจ weekend

**Reading kryptonite**  
บทนำที่ยาวเหมือนต้องผ่านด่านตรวจคนเข้าเมืองก่อนเข้าหนังสือ

**Recommended challenge**  
เลือกหนึ่งบทที่ชอบแล้วอ่านซ้ำช้า ๆ พร้อมจด 3 รายละเอียดที่รอบแรกเกือบพลาด

**Suggested reading strategy**  
ใช้ระบบ sprint + anchor: อ่านเร็วได้เต็มที่ แต่ปิดท้าย session ด้วย note 3 bullet เพื่อช่วย retention

**Compatibility**

- Best with: explorer, escapist
- Fun with: connector, completionist
- Tension with: scholar, deep_diver

**Share card**

- Punchline: ตั้งใจอ่านนิดเดียว รู้ตัวอีกทีพระอาทิตย์ขึ้น
- Preferred highlights: sleep_sacrifice_risk, finish_probability, booktok_susceptibility
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าบอกว่าอ่านไม่ละเอียดแบบตัดสิน
- อย่าทำให้การอ่านเร็วดูด้อยกว่าการอ่านช้า

---

### The Book Goblin — ก็อบลินแห่งกองดอง

**ID:** `book_goblin`  
**Tagline:** เห็นหนังสือแล้วตาเป็นประกาย เห็นยอดบัตรแล้วแกล้งตาย

**Hero line**  
คุณคือสิ่งมีชีวิตในตำนานที่ได้พลังจากปกสวย โปรดี รีวิวแรง และประโยคว่า 'เล่มนี้น่าจะใช่ฉัน' แม้บนชั้นจะมีอีกหลายเล่มรออยู่ก็ตาม

**Short description**  
Book Goblin คือญาติสนิทของ Collector แต่ wild กว่า สนุกกับการค้นพบ ซื้อ เซฟ ป้ายยา และย้ายหนังสือเข้าออกลิสต์ด้วยพลังงานสูงมาก

**Behavioral logic**  
คะแนนมักสูงใน Collector, Broad, Mood และ Social ทำให้พฤติกรรมอ่านเต็มไปด้วยแรงกระตุ้น ความอยากลอง และกองดองที่มีชีวิต

**Prototype vector**

```json
{
  "motivation": -5,
  "breadth": 70,
  "discipline": -75,
  "processing": -10,
  "acquisition": -100,
  "social": 40
}
```

**Strengths**

- มีพลังค้นพบหนังสือใหม่สูงมาก
- ทำให้การอ่านดูสนุกและมีชีวิต
- เปิดรับกระแส community และไอเดียสดใหม่

**Blind spots**

- ความอยากได้อาจแซงเวลาที่มี
- กองดองอาจทำให้เลือกไม่ถูกว่าจะอ่านอะไร
- กระแสใหม่ทำให้เล่มเก่าถูกลืมทั้งที่ยังอยากอ่าน

**Reading superpower**  
เรียกหนังสือเข้าบ้านด้วยแรงดึงดูดระดับเวทมนตร์

**Reading kryptonite**  
ป้ายลดราคา รีวิวว่า 'อ่านคืนเดียวจบ' และปกที่เหมือนออกแบบตาม algorithm หัวใจ

**Recommended challenge**  
ทำ 3-Book Survival Shelf: เดือนนี้เลือกได้แค่ 3 เล่มที่จะอยู่หน้าโต๊ะ ที่เหลือพักในถ้ำกองดองก่อน

**Suggested reading strategy**  
ใช้ Wishlist Cooling Period 48 ชั่วโมงก่อนซื้อเล่มที่มาจากกระแส เพื่อดูว่ายังอยากอ่านจริงหรือแค่อยากเข้าร่วมพิธีกรรม

**Compatibility**

- Best with: collector, connector
- Fun with: explorer, mood_reader
- Tension with: curator, completionist

**Share card**

- Punchline: ไม่ได้ดอง แค่สร้าง ecosystem ให้หนังสือได้อยู่รวมกัน
- Preferred highlights: book_hoarding_risk, booktok_susceptibility, sleep_sacrifice_risk
- CTA: ลองตรวจนิสัยนักอ่านของคุณ

**Avoided wording**

- อย่าล้อเรื่องเงินหรือหนี้
- อย่าเรียกผู้ใช้ว่าควบคุมตัวเองไม่ได้

---

End of docs/03-archetype-content.md
