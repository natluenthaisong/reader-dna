'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { getAudioCtx, playSynthBlip } from '@/utils/audio';
import { ArchetypeGrid } from '@/components/ui/ArchetypeGrid';
import { HomeStickers } from '@/components/ui/StickerDecorations';

export default function Home() {

  // Unlock AudioContext on first interaction
  useEffect(() => {
    const unlockAudio = () => {
      const ctx = getAudioCtx();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('touchstart', unlockAudio, { once: true });
    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  return (
    <main className="container animate-p5-snap" style={{ alignItems: 'center', textAlign: 'center', position: 'relative' }}>
      
      {/* Tape decorations on background */}
      <div className="tape" style={{ top: '5%', left: '-10%', width: '150px', height: '30px', transform: 'rotate(-15deg)' }}></div>
      <div className="tape" style={{ bottom: '15%', right: '-5%', width: '120px', height: '25px', transform: 'rotate(45deg)' }}></div>

      {/* Punk sticker decorations */}
      <HomeStickers />

      {/* Chaotic background element */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '110%', height: '80%', background: 'url("data:image/svg+xml;utf8,<svg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'noise\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23noise)\' opacity=\'0.2\'/></svg>")', zIndex: -1, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '80%', height: '60%', background: 'var(--accent-cyan)', clipPath: 'polygon(5% 0, 95% 10%, 100% 90%, 0 95%)', zIndex: -2, opacity: 0.8, transform: 'rotate(5deg)' }}></div>

      <div style={{ marginBottom: 'clamp(1rem, 3vh, 2rem)', position: 'relative', zIndex: 10 }}>
        {/* Ransom Note Title */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
          <span onMouseEnter={() => playSynthBlip(300)} className="ransom-word halftone-yellow" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-5deg)', cursor: 'crosshair' }}>R</span>
          <span onMouseEnter={() => playSynthBlip(350)} className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(2deg)', background: 'var(--accent-white)', cursor: 'crosshair' }}>E</span>
          <span onMouseEnter={() => playSynthBlip(400)} className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-8deg)', background: 'var(--accent-red)', color: 'var(--accent-white)', cursor: 'crosshair' }}>A</span>
          <span onMouseEnter={() => playSynthBlip(450)} className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(5deg)', background: 'var(--accent-black)', color: 'var(--accent-yellow)', cursor: 'crosshair' }}>D</span>
          <span onMouseEnter={() => playSynthBlip(500)} className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(-2deg)', background: 'var(--accent-white)', cursor: 'crosshair' }}>E</span>
          <span onMouseEnter={() => playSynthBlip(550)} className="ransom-word" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', transform: 'rotate(10deg)', background: 'var(--accent-cyan)', cursor: 'crosshair' }}>R</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
          <span onMouseEnter={() => playSynthBlip(300)} className="ransom-word" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(-4deg)', background: 'var(--accent-black)', color: 'var(--accent-green)', cursor: 'crosshair' }}>D</span>
          <span onMouseEnter={() => playSynthBlip(350)} className="ransom-word" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(6deg)', background: 'var(--accent-red)', color: 'var(--accent-black)', cursor: 'crosshair' }}>N</span>
          <span onMouseEnter={() => playSynthBlip(400)} className="ransom-word halftone-yellow" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', transform: 'rotate(-2deg)', cursor: 'crosshair' }}>A</span>
        </div>
        
        <div style={{ position: 'relative', display: 'inline-block' }}>
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

      <ArchetypeGrid />
    </main>
  );
}
