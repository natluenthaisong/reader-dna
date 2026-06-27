'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="container animate-p5-snap" style={{ alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      
      {/* Tape decorations on background */}
      <div className="tape" style={{ top: '5%', left: '-10%', width: '150px', height: '30px', transform: 'rotate(-15deg)' }}></div>
      <div className="tape" style={{ bottom: '15%', right: '-5%', width: '120px', height: '25px', transform: 'rotate(45deg)' }}></div>

      {/* --- PUNK STICKERS --- */}
      {/* Lightning Sticker */}
      <svg style={{ position: 'absolute', top: '8%', right: '10%', width: 'clamp(60px, 15vw, 100px)', height: 'clamp(80px, 20vw, 140px)', zIndex: 20, transform: 'rotate(15deg)', filter: 'drop-shadow(4px 4px 0 var(--accent-black))', pointerEvents: 'none' }} className="hover-bounce" viewBox="0 0 50 100" fill="var(--accent-yellow)" stroke="var(--accent-black)" strokeWidth="4" strokeLinejoin="miter">
        <path d="M30 5 L5 55 L25 55 L10 95 L45 40 L25 40 Z" />
      </svg>

      {/* Glasses Sticker */}
      <svg style={{ position: 'absolute', top: '45%', left: '5%', width: 'clamp(80px, 15vw, 120px)', height: 'clamp(35px, 8vw, 55px)', zIndex: 20, transform: 'rotate(-25deg)', filter: 'drop-shadow(3px 3px 0 var(--accent-red))', pointerEvents: 'none' }} className="hover-bounce" viewBox="0 0 120 50" fill="var(--accent-cyan)" stroke="var(--accent-black)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="30" cy="25" r="20" fillOpacity="0.8"/>
        <circle cx="90" cy="25" r="20" fillOpacity="0.8"/>
        <path d="M50 25 Q60 15 70 25" fill="none" /> 
        <path d="M10 25 L5 15 M110 25 L115 15" fill="none" />
        <path d="M15 15 L25 5 M75 15 L85 5" stroke="var(--accent-white)" strokeWidth="4" />
      </svg>

      {/* Pencil Sticker */}
      <svg style={{ position: 'absolute', bottom: '20%', right: '5%', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)', zIndex: 20, transform: 'rotate(-15deg)', filter: 'drop-shadow(5px 5px 0 var(--accent-black))', pointerEvents: 'none' }} className="hover-bounce" viewBox="0 0 100 100" fill="none" stroke="var(--accent-black)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 80 L10 90 L20 100 Z" fill="var(--accent-black)"/>
        <path d="M20 80 L80 20 L100 40 L40 100 Z" fill="var(--accent-yellow)" />
        <path d="M30 70 L90 30 M35 75 L95 35" strokeWidth="2" />
        <path d="M15 100 C 5 110 -5 95 10 95 C 25 95 15 80 5 90" strokeWidth="3" stroke="var(--accent-cyan)"/>
      </svg>

      {/* Book Sticker */}
      <svg style={{ position: 'absolute', bottom: '5%', left: '8%', width: 'clamp(70px, 12vw, 110px)', height: 'clamp(55px, 10vw, 90px)', zIndex: 20, transform: 'rotate(25deg)', filter: 'drop-shadow(4px 4px 0 var(--accent-black))', pointerEvents: 'none' }} className="hover-bounce" viewBox="0 0 100 80" fill="var(--accent-white)" stroke="var(--accent-black)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 70 V15 C50 15 35 5 10 10 V65 C35 60 50 70 50 70 Z" />
        <path d="M50 70 V15 C50 15 65 5 90 10 V65 C65 60 50 70 50 70 Z" />
        <path d="M15 20 C30 15 45 22 45 22" fill="none" stroke="var(--accent-red)"/>
        <path d="M15 30 C30 25 45 32 45 32" fill="none"/>
        <path d="M85 20 C70 15 55 22 55 22" fill="none"/>
        <path d="M85 30 C70 25 55 32 55 32" fill="none" stroke="var(--accent-red)"/>
      </svg>
      {/* ----------------------- */}

      {/* Chaotic background element */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '110%', height: '80%', background: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.2\'/></svg>")', zIndex: -1, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '80%', height: '60%', background: 'var(--accent-cyan)', clipPath: 'polygon(5% 0, 95% 10%, 100% 90%, 0 95%)', zIndex: -2, opacity: 0.8, transform: 'rotate(5deg)' }}></div>

      <div style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', position: 'relative', zIndex: 10 }}>
        {/* Ransom Note Title */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <span className="ransom-word halftone-yellow" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-5deg)' }}>R</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(2deg)', background: 'var(--accent-white)' }}>E</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-8deg)', background: 'var(--accent-red)', color: 'var(--accent-white)' }}>A</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(5deg)', background: 'var(--accent-black)', color: 'var(--accent-yellow)' }}>D</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-2deg)', background: 'var(--accent-white)' }}>E</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(10deg)', background: 'var(--accent-cyan)' }}>R</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <span className="ransom-word" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(-4deg)', background: 'var(--accent-black)', color: 'var(--accent-green)' }}>D</span>
          <span className="ransom-word" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(6deg)', background: 'var(--accent-red)', color: 'var(--accent-black)' }}>N</span>
          <span className="ransom-word halftone-yellow" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(-2deg)' }}>A</span>
        </div>
        
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Highlight Scribble */}
          <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-1deg)', width: '110%', height: '120%', zIndex: -1, opacity: 0.8, pointerEvents: 'none' }} viewBox="0 0 200 60" preserveAspectRatio="none" fill="none" stroke="var(--accent-yellow)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="miter">
            <path d="M 10 30 Q 50 10 100 40 T 190 20 M 15 45 Q 80 20 180 45" />
          </svg>
          <h2 style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', color: 'var(--accent-black)', background: 'var(--accent-white)', display: 'inline-block', padding: '8px 16px', clipPath: 'polygon(2% 1%, 98% 3%, 99% 98%, 1% 97%)', marginTop: '12px', border: '3px solid var(--accent-black)', transform: 'rotate(2deg)', boxShadow: '5px 5px 0 var(--accent-red)' }}>
            คุณเป็นนักอ่านแบบไหน?
          </h2>
        </div>
      </div>

      <div className="p5-panel" style={{ padding: 'clamp(1.5rem, 4vh, 2.5rem) clamp(1rem, 4vw, 2rem)', maxWidth: '750px', width: '100%', marginBottom: 'clamp(1rem, 3vh, 1.5rem)', transform: 'rotate(-1deg)' }}>
        {/* Tape holding the panel */}
        <div className="tape" style={{ top: '-15px', left: '20%', width: '100px', height: '30px', transform: 'rotate(-5deg)' }}></div>
        <div className="tape" style={{ top: '-15px', right: '20%', width: '100px', height: '30px', transform: 'rotate(8deg)' }}></div>

        <p className="halftone-yellow" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: 'clamp(1rem, 4vh, 2rem)', fontWeight: '900', display: 'inline-block', padding: '5px 10px', transform: 'rotate(1deg)' }}>
          <span className="text-highlight-white">แบบทดสอบ 24 ข้อ ที่จะบอกว่าคุณเป็นนักอ่านสายไหน — พร้อมแฉนิสัยการอ่านแบบเจ็บนิด ๆ แต่จริง!</span>
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 'clamp(1.5rem, 4vh, 2.5rem)', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ textAlign: 'center', background: 'var(--accent-white)', border: '2px solid black', padding: '8px 16px', transform: 'rotate(-4deg)', boxShadow: '4px 4px 0 var(--accent-cyan)' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: 'var(--accent-black)' }}>24</div>
            <div style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', fontWeight: '800', background: 'var(--accent-red)', color: 'white', padding: '2px 5px' }}>คำถาม</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--accent-black)', border: '2px solid var(--accent-white)', padding: '8px 16px', transform: 'rotate(3deg)', boxShadow: '4px 4px 0 var(--accent-yellow)' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: 'var(--accent-green)' }}>3-5</div>
            <div style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', fontWeight: '800', background: 'var(--accent-white)', color: 'black', padding: '2px 5px' }}>นาที</div>
          </div>
          <div style={{ textAlign: 'center', background: 'var(--accent-white)', border: '2px solid black', padding: '8px 16px', transform: 'rotate(-2deg)', boxShadow: '4px 4px 0 var(--accent-red)' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: 'var(--accent-black)' }}>12</div>
            <div style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1rem)', fontWeight: '800', background: 'var(--accent-cyan)', color: 'black', padding: '2px 5px' }}>ผลลัพธ์</div>
          </div>
        </div>

        <Link href="/quiz" passHref style={{ display: 'block' }} onClick={() => {
          // Clear state when explicitly starting a new quiz
          import('@/store/useQuizStore').then(mod => mod.useQuizStore.getState().resetQuiz());
        }}>
          <button className="p5-button inverted hover-glitch shine-effect" style={{ width: '100%', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', padding: '1rem', transform: 'rotate(1deg)' }}>
            เริ่มตรวจนิสัยนักอ่าน!
          </button>
        </Link>
      </div>

      <div style={{ display: 'inline-block', background: 'var(--accent-black)', padding: '10px 20px', border: '3px solid var(--accent-white)', transform: 'rotate(-2deg)', boxShadow: '5px 5px 0 var(--accent-green)' }}>
        <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: 'var(--accent-white)', fontWeight: '900', margin: 0 }}>
          มีทั้งความจริง ความขำ และอาการที่คุณอาจไม่อยากยอมรับ
        </p>
      </div>
    </main>
  );
}
