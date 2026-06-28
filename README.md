# Reader DNA

**Thai-language reader personality quiz** — 24 questions, 12 archetypes, weighted behavioral scoring.

ตอบ 24 ข้อ → ระบบวัดระยะห่างถ่วงน้ำหนัก (weighted Euclidean distance) → บอกว่าคุณเป็น "นักอ่าน" แบบไหนใน 12 ประเภท พร้อม derived metrics 6 ตัว (เช่น Book Hoarding Risk, Sleep Sacrifice Risk) และ share card ส่งต่อได้

> **Product North Star**: ทำให้ผู้ใช้หัวเราะกับนิสัยการอ่านของตัวเอง เรียนรู้บางอย่าง และอยากแชร์เพราะรู้สึกว่าแม่นเกินไป

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16.2.9 (App Router) |
| UI | React 19.2.4 |
| State | Zustand 5 + localStorage persist |
| Language | TypeScript 5 (strict) |
| Styling | CSS variables + inline styles (70s punk zine aesthetic) |
| Font | Kanit (Google Fonts, Thai support) |
| Sound | Web Audio API — synth blips, ไม่ใช้ MP3 |
| Share | Next.js OG image generation (edge runtime) |
| Content | Plain JSON files (ไม่มี DB, ไม่มี CMS) |
| Deploy | Vercel + webhook trigger จาก admin panel |
| Tests | Node.js `assert` (ไม่ต้อง Jest) |
| Node | ≥20.9.0 (tested on Node 26) |

---

## Quick Start

```bash
git clone https://github.com/natluenthaisong/reader-dna.git
cd reader-dna
npm install
npm run dev        # http://localhost:3000
npm run lint       # eslint . → 0 errors, 0 warnings
npx tsc --noEmit   # TypeScript check → clean
npm test           # 5 unit tests for scoring engine
npm run build      # production build
```

> **Node 26**: `require()` ไฟล์ `.ts` ได้โดยตรง → `tests/scoring-engine.test.js` import `src/lib/scoring.ts` ได้เลยไม่ต้อง compile

---

## Project Structure

```
reader-dna/
├── content/                       ← ข้อมูลทั้งหมด แก้ไขผ่าน Admin panel ได้
│   ├── questions.json             (460 บรรทัด) 24 ข้อ Likert พร้อม metadata
│   ├── archetypes.json            (751 บรรทัด) 12 archetype + copy + compatibility
│   ├── scoring-config.json        (164 บรรทัด) axis weights, confidence params, prototype vectors
│   ├── result-copy.json           (265 บรรทัด) copy หน้า result
│   ├── share-card-copy.json       (148 บรรทัด) taglines/punchlines ต่อ archetype
│   └── achievements.json          (174 บรรทัด) badge definitions
│
├── src/
│   ├── types/index.ts             TypeScript interfaces ทั้งหมด (single source of truth)
│   ├── lib/scoring.ts             Scoring engine — pure functions, ไม่มี side effects
│   ├── store/useQuizStore.ts      Zustand store (answers, index, result, reset)
│   ├── utils/audio.ts             Web Audio synth (blip, typewriter, rocket, jingle)
│   │
│   ├── app/
│   │   ├── page.tsx               Home: ransom-letter title + archetype grid
│   │   ├── layout.tsx             Root layout, Google Analytics, metadataBase
│   │   ├── globals.css            CSS vars, typography, animations, a11y rules
│   │   ├── quiz/page.tsx          Quiz: 24 ข้อ + progress bar + sound
│   │   ├── result/[id]/
│   │   │   ├── page.tsx           SSR metadata generator (OG tags ต่อ archetype)
│   │   │   └── ResultClient.tsx   Result display, share, derived scores
│   │   └── api/
│   │       ├── score/route.ts             POST  — scoring endpoint
│   │       ├── og/route.tsx               GET   — OG image (edge runtime)
│   │       └── admin/
│   │           ├── content/route.ts       GET/POST — read/write JSON files
│   │           └── deploy/route.ts        POST  — trigger Vercel redeploy
│   │
│   └── components/
│       ├── ui/
│       │   ├── ProgressBar.tsx            Draggable question navigator + ARIA slider
│       │   ├── ArchetypeGrid.tsx           12-card grid บน Home
│       │   ├── TypewriterText.tsx          Character-by-character reveal
│       │   └── StickerDecorations.tsx     Scattered decorative SVGs
│       └── result/
│           └── (ShareCard inline ใน ResultClient.tsx)
│
├── tests/
│   └── scoring-engine.test.js     Unit tests — 5 test cases
│
└── public/
    └── authors/1.jpg–24.jpg       Author images (1 ต่อ question)
```

---

## ระบบ Scoring อธิบาย

### Pipeline

```
Answers (24 × Likert 1–5)
    ↓  validateAnswers()       — ตรวจ question_version, จำนวนข้อ, ค่า 1–5
Pole Scores (12 poles → 0–100)
    ↓  calculatePoleScores()   — รวม + reverse flag + weight per question
Axis Scores (6 axes → −100 to +100)
    ↓  calculateAxisScores()   — pole_A − pole_B ต่อแต่ละ axis
Distances to all 12 archetypes
    ↓  weightedDistance()      — Euclidean distance ถ่วงน้ำหนักต่อ axis
Primary + Secondary archetype
    ↓  scoreQuiz()
Derived Scores (6 metrics) + Confidence + Share Highlights
```

### 6 Reading Axes

| Axis | Poles | Weight |
|------|-------|--------|
| motivation | growth ↔ escape | 1.15 |
| breadth | broad ↔ deep | 1.00 |
| discipline | structured ↔ mood | 1.10 |
| processing | reflective ↔ immersive | 1.20 |
| acquisition | selective ↔ collector | 1.00 |
| social | social ↔ private | 0.90 |

### 6 Derived Metrics

| Metric | สูตร (สัดส่วน approximate) |
|--------|----------------------------|
| `book_hoarding_risk` | 45% collector + 20% broad + 20% mood + 15% (1−structured) |
| `finish_probability` | 35% structured + 25% selective + 20% deep + 20% (1−mood) |
| `booktok_susceptibility` | 30% social + 30% collector + 25% broad + 15% (1−selective) |
| `reflection_depth` | 50% reflective + 25% growth + 25% deep |
| `sleep_sacrifice_risk` | 35% escape + 30% immersive + 20% mood + 15% collector |
| `recommendation_energy` | 45% social + 25% reflective + 20% broad + 10% growth |

### Confidence Scoring (multi-factor)

```
distance_confidence   = 1 − min(primaryDist / 420, 1)    weight 0.45
gap_confidence        = min(gapToPrimary / 80, 1)         weight 0.35
consistency_confidence = avg pole-pair spread per axis    weight 0.20

penalty: ×0.75 ถ้า axis strength < 20 (ตอบกลางๆ ทั้งหมด)
cap:     max 0.71 ถ้า gap < 10 (primary กับ secondary ใกล้มาก)

→ high (≥0.72) / medium (≥0.50) / low (<0.50)
```

---

## 12 Archetypes

| ID | Thai Name | ลักษณะเด่น |
|----|-----------|------------|
| `scholar` | ปริญญาเอก | Reflective, structured, deep processing |
| `explorer` | นักสำรวจ | Broad, growth-driven, social |
| `strategist` | นักยุทธ์ | Selective, structured, goal-oriented |
| `escapist` | นักหลบหนี | Escape-driven, immersive, mood-based |
| `deep_diver` | นักดำน้ำลึก | Deep, reflective, private |
| `mood_reader` | นักอ่านตามอารมณ์ | Mood-driven, broad, low structure |
| `collector` | นักสะสม | High acquisition, broad, social signal |
| `curator` | นักคัดสรร | Selective, growth, private |
| `connector` | นักแนะนำ | High social, broad, growth |
| `completionist` | นักจบให้ได้ | High structured, selective, disciplined |
| `sprinter` | นักวิ่ง | Fast, immersive, low reflection |
| `book_goblin` | ผีหนังสือ | Max collector + mood + escape, chaotic |

แต่ละ archetype มี: prototype vector, Thai copy (hero line, tagline, punchline), strengths/blind spots, recommended challenge, reading strategy, forced share highlights, compatibility matrix (best_with / fun_with / tension_with)

---

## Pages & Features

### Home (`/`)
- Ransom-letter animated title — CSS clip-path + color flash per character
- Synth blip on hover (pitch varies per letter index)
- ArchetypeGrid: 12 cards → `/result/[id]` preview
- CTA → `/quiz`

### Quiz (`/quiz`)
- 24 ข้อ Likert 1–5 ทีละข้อ
- Panel shape เปลี่ยนทุกข้อ (5 geometric clip-path variants หมุน)
- **ProgressBar**: drag หรือ click เพื่อ jump ไปข้อที่ตอบแล้ว
  - Keyboard: Arrow Left/Right, Home, End (ARIA slider)
  - 44px touch targets (transparent hit area, notch as child)
- TypewriterText: question reveal ทีละตัวอักษร
- Sound: click blip + rocket sound ตอน submit
- Submit → `POST /api/score` → redirect `/result/[id]`
- Zustand persist: reload แล้วกลับมาต่อได้

### Result (`/result/[id]`)
- SSR: `generateMetadata()` สร้าง OG tags + title ต่อ archetype
- Ransom-note hero text: rotation seeded จาก archetype id (deterministic, stable ทุก re-render)
- Editable hero line: textarea แก้ประโยคเด็ดก่อน share
- 6 derived score bars
- Strengths / Blind Spots / Reading Strategy / Recommended Challenge
- Compatibility grid (best_with, fun_with, tension_with)
- **Share**: Web Share API → fallback screenshot (html-to-image / html2canvas)
- Error banner ถ้า share ล้มเหลว (`role="alert"`)

### Admin (`/admin`)
- Load: `GET /api/admin/content` → แสดง JSON
- Tabs: Questions | Archetypes
- Edit ใน textarea → Save → `POST /api/admin/content` (เขียน disk)
- Deploy: `POST /api/admin/deploy` → Vercel redeploy webhook
- ⚠️ ไม่มี auth — production ควรป้องกันก่อน expose

---

## API Reference

### `POST /api/score`
```json
// Request
{ "answers": { "q01": 3, "q02": 5, "q03": 1 } }

// Response
{
  "success": true,
  "archetypeId": "book_goblin",
  "secondaryId": "collector",
  "derivedScores": { "book_hoarding_risk": 94, "finish_probability": 12, "..." : "..." },
  "highlights": [{ "key": "book_hoarding_risk", "score": 94, "label": "..." }]
}
```

### `GET /api/og?archetype=scholar`
- Edge runtime (fast)
- 1200×630 PNG พร้อม Kanit font (Thai)
- Fallback: generic card ถ้าไม่ส่ง param

### `GET /api/admin/content`
```json
{ "questions": { "questions": [...] }, "archetypes": [...] }
```

### `POST /api/admin/content`
```json
{ "questions": { "..." }, "archetypes": [...] }
```

### `POST /api/admin/deploy`
ต้องการ env var `DEPLOY_HOOK_URL` (Vercel deploy hook URL)

---

## Environment Variables

```env
# Required สำหรับ Deploy button ใน admin panel
DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...

# Optional (Google Analytics)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Content Editing (ไม่ต้องแตะโค้ด)

1. `npm run dev`
2. ไป `http://localhost:3000/admin`
3. แก้ JSON → Save
4. กด Deploy หรือ git push (ถ้า Vercel auto-deploy)

**โครงสร้าง question:**
```json
{
  "id": "q01",
  "text": "เวลาเลือกหนังสืออ่าน คุณ...",
  "dimension": "breadth",
  "pole": "broad",
  "weight": 1.0,
  "reverse": false,
  "active": true
}
```

**โครงสร้าง archetype vector (scoring-config.json):**
```json
"scholar": {
  "motivation": 80, "breadth": -45, "discipline": 50,
  "processing": 90, "acquisition": 20, "social": -10
}
```

---

## Accessibility

- `prefers-reduced-motion`: ปิด animation ทั้งหมดถ้า OS ตั้งค่าไว้ (globals.css)
- `:focus-visible`: outline 3px cyan บน interactive elements ทุกตัว
- ProgressBar stepper: `role="slider"` + `aria-valuenow/min/max/valuetext` + keyboard nav
- Share error: `role="alert"` (screen reader announce ทันที)
- Textarea: `aria-label` ภาษาไทย

---

## Tests

```bash
npm test
# ok - all answers = 3 returns neutral pole and axis scores
# ok - book goblin-like user maps to book_goblin with expected derived scores
# ok - scholar-like user maps near scholar or deep_diver
# ok - completionist-like user maps to completionist or adjacent structured type
# ok - invalid answer count throws INVALID_ANSWERS
```

ใช้ Node built-in `assert` — ไม่ต้อง install Jest ไม่ต้อง compile

---

## Current State

```
lint:   0 errors, 0 warnings
tsc:    clean
tests:  5/5 pass
build:  ✓ compiled successfully
```

---

## Known Limitations / สิ่งที่ยังไม่ได้ทำ

| เรื่อง | รายละเอียด |
|--------|------------|
| Admin auth | ไม่มี authentication — ควรใส่ก่อน deploy production |
| Database | Content เป็น JSON ใน repo — ไม่ scale ถ้า multi-user edit |
| E2E tests | มีแค่ scoring unit tests, ไม่มี quiz/result UI tests |
| Analytics events | GTM ต่อแล้ว แต่ยังไม่ define custom events (quiz_start, share, etc.) |
| i18n | Thai only |
| Author images | ใช้ `<img>` + onError handler แทน next/image (เพราะ hide on error) |

---

## Patterns ที่ Reuse ได้ใน Project อื่น

### 1. Weighted Euclidean Distance Classifier
**ไฟล์**: `src/lib/scoring.ts` → `weightedDistance()` + `scoreQuiz()`

Generic N-axis classifier — ใช้ได้กับ personality quiz อื่น, learning style, product recommendation
```ts
// Pattern:
// 1. Define prototype vectors สำหรับแต่ละ category
// 2. Map survey answers → axis scores
// 3. หา minimum weighted distance → primary match
```

---

### 2. Multi-factor Confidence Score
**ไฟล์**: `src/lib/scoring.ts` → `calculateConfidence()`

Pattern: distance + gap + consistency → weighted sum → penalty → cap → label
ใช้ได้กับ: matchmaking, recommendation reliability, quiz result confidence

---

### 3. Zustand + localStorage Quiz State
**ไฟล์**: `src/store/useQuizStore.ts`

Persist answers across page reloads, support back/forward navigation, reset on complete
ใช้ได้กับ: multi-step forms, onboarding flows, surveys

---

### 4. Next.js Dynamic OG Image
**ไฟล์**: `src/app/api/og/route.tsx`

Edge runtime + Google Fonts fetch + JSX render → PNG, parameterized per content item
ใช้ได้กับ: blog post share cards, event pages, product social cards

---

### 5. Seeded Deterministic "Random" Rotation
**ไฟล์**: `src/app/result/[id]/ResultClient.tsx` → `ransomRotations` useMemo

```ts
// Sine-hash seeded by string id — same id → same rotations, SSR-safe
let seed = 0;
for (let c = 0; c < id.length; c++) seed = (seed * 31 + id.charCodeAt(c)) >>> 0;
const rot = (i: number) => {
  const v = Math.sin(seed + i * 12.9898) * 43758.5453;
  return (v - Math.floor(v)) * 20 - 10;
};
```

ใช้ได้กับ: ransom note effects, scattered card layouts, collage aesthetics ที่ต้องการ stable ข้าม render

---

### 6. Transparent Hit Area Pattern
**ไฟล์**: `src/components/ui/ProgressBar.tsx`

```tsx
// Container: transparent, 44px tall (hit area)
// Child <span aria-hidden>: visible notch only
// Width: min(slotPercent%, 44px) — ป้องกัน overlap บน stepper หนาแน่น
```

ใช้ได้กับ: timeline sliders, stepper components, dense interactive controls

---

### 7. Web Audio Synth (No MP3)
**ไฟล์**: `src/utils/audio.ts`

`getAudioCtx()` singleton + synth functions: blip, typewriter tick, rocket whoosh, punk jingle
ใช้ได้กับ: game UI, interactive art, apps ที่ต้องการ audio feedback โดยไม่ upload ไฟล์

---

### 8. JSON-File CMS + Admin UI
**ไฟล์**: `src/app/admin/page.tsx` + `src/app/api/admin/content/route.ts`

Textarea JSON edit → POST write → redeploy webhook — ไม่ต้องการ DB
ใช้ได้กับ: config editors, small content-driven apps, copy management tools

---

### 9. TypewriterText Component
**ไฟล์**: `src/components/ui/TypewriterText.tsx`

Character-by-character reveal, respects `prefers-reduced-motion`
ใช้ได้กับ: onboarding messages, dramatic reveals, loading states

---

### 10. Likert Question Schema with Reverse Scoring
**ไฟล์**: `content/questions.json`

Fields: `pole`, `dimension`, `weight`, `reverse`, `active`
ใช้ได้กับ: MBTI-style quiz, NPS variant, Big Five personality, learning style surveys

---

## Fork ทำ Quiz ใหม่ (เปลี่ยนธีม)

ถ้าจะทำ quiz ใหม่ในธีมอื่น (เช่น work personality, learning style) เปลี่ยนแค่นี้:

| ไฟล์ | สิ่งที่ต้องเปลี่ยน |
|------|---------------------|
| `content/questions.json` | ข้อถาม + pole mapping |
| `content/archetypes.json` | N categories + copy + compatibility |
| `content/scoring-config.json` | Axis weights + prototype vectors |
| `src/app/globals.css` | CSS variables (colors) |

`src/lib/scoring.ts` — **ไม่ต้องแตะ** generic อยู่แล้ว

---

## Git History

| Commit | สิ่งที่ทำ |
|--------|----------|
| `bd570e6` | Initial: map existing codebase |
| `d1349b3` | Refactor + a11y + UX polish + bug fixes + lint 0 errors |
| `cbfe2d6` | Fix: resolve all 19 lint warnings → 0 errors, 0 warnings |

---

Repo: https://github.com/natluenthaisong/reader-dna
