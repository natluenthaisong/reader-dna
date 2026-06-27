'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuizStore } from '@/store/useQuizStore';
import { playPunkJingle } from '@/utils/audio';

export default function ResultClient({ archetype }: { archetype: any }) {
  const router = useRouter();
  const { result, resetQuiz } = useQuizStore();
  const [mounted, setMounted] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isHoveringRansom, setIsHoveringRansom] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!archetype) {
    return (
      <main className="container animate-p5-snap" style={{ alignItems: 'center' }}>
        <h2 className="p5-title">NO DATA FOUND</h2>
        <Link href="/" passHref>
          <button className="p5-button">RETURN</button>
        </Link>
      </main>
    );
  }

  const highlights = result?.highlights || archetype.share_card.preferred_highlights.map((h: string) => ({
    key: h, label: h.replace(/_/g, ' '), value: 85
  }));

  const handleRetake = () => {
    // We don't call resetQuiz() here to prevent layout shifts. 
    // It will be handled when they start a new quiz on the home page.
    router.push('/');
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    setIsCapturing(true);
    
    if (resultRef.current) {
      try {
        await new Promise(resolve => setTimeout(resolve, 150));
        const { toPng } = await import('html-to-image');
        
        // iOS Safari workaround: run it once to cache fonts/images, then again for the real output
        await toPng(resultRef.current, { pixelRatio: 1 });
        await new Promise(resolve => setTimeout(resolve, 50));
        
        const dataUrl = await toPng(resultRef.current, { 
          pixelRatio: 2,
        });
        
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
          // On mobile, show the image in a modal for the user to long-press and save
          setGeneratedImage(dataUrl);
        } else {
          // On desktop, auto-download
          const link = document.createElement('a');
          link.download = `reader-dna-${archetype.id}.png`;
          link.href = dataUrl;
          link.click();
        }
      } catch (err) {
        console.error('Failed to generate PNG', err);
        alert('Failed to save image. Please try again.');
      } finally {
        setIsCapturing(false);
        setIsSharing(false);
      }
    } else {
      setIsCapturing(false);
      setIsSharing(false);
    }
  };

  return (
    <main className="container animate-p5-snap" style={{ alignItems: 'center' }}>
        
        {/* THIS IS THE ACTUAL CAPTURED CARD */}
        <div ref={resultRef} id="result-card" style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          // Explicitly apply the body's halftone background so it gets captured by html-to-image
          backgroundColor: 'var(--bg-primary)',
          backgroundImage: 'radial-gradient(#333 15%, transparent 16%), radial-gradient(#333 15%, transparent 16%)',
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 5px 5px',
          overflow: 'hidden'
        }}>
        
        {/* Decorative Chaos Background Layers */}
        <div className="leopard-red" style={{ position: 'absolute', top: '-5%', right: '-5%', width: '70%', height: '80%', clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0 80%)', zIndex: 0, opacity: 0.9 }}></div>
        <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '60%', height: '50%', background: 'var(--accent-cyan)', clipPath: 'polygon(0 0, 100% 30%, 80% 100%, 0 100%)', zIndex: 0, mixBlendMode: 'multiply' }}></div>
        <div className="halftone-yellow" style={{ position: 'absolute', top: '30%', left: '10%', width: '30%', height: '30%', clipPath: 'circle(50% at 50% 50%)', zIndex: 0, opacity: 0.8, mixBlendMode: 'screen' }}></div>

        {/* Content Wrapper */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', padding: '24px', gap: '16px' }}>
          
          {/* HEADER SECTION (Zine Title) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="tape" style={{ top: '-8px', left: '-8px', width: '96px', height: '28px', transform: 'rotate(-12deg)' }}></div>
              
              <div className="p5-text-bg-black" style={{ fontSize: '14px', transform: 'rotate(-3deg)' }}>CONFIDENTIAL FILE</div>
              
              <div 
                style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '12px', cursor: 'pointer', minHeight: '60px' }}
                onMouseEnter={() => {
                  if (!isHoveringRansom) {
                    const randomPitch = 0.8 + Math.random() * 0.7; // Random pitch between 0.8 and 1.5
                    playPunkJingle(randomPitch);
                    setIsHoveringRansom(true);
                  }
                }}
                onMouseLeave={() => setIsHoveringRansom(false)}
              >
                {(isHoveringRansom ? "SUNDAY BOOK CLUB" : archetype.english_name.toUpperCase()).split('').map((char: string, i: number) => {
                  if (char === ' ') return <div key={i} style={{ width: '20px' }} />;
                  
                  let delay = '0s';
                  if (isHoveringRansom) {
                    if (i >= 12) delay = '0.75s';
                    else if (i >= 7) delay = '0.5s';
                    else if (i >= 3) delay = '0.25s';
                  }

                  const rotation = Math.random() * 20 - 10;
                  
                  return (
                    <span key={i} className={`ransom-word ${i % 4 === 0 ? 'halftone-yellow' : ''} ${isHoveringRansom ? 'flip-in' : ''}`} style={{ 
                      fontSize: 'clamp(36px, 6vw, 52px)', 
                      padding: '4px 12px',
                      '--base-r': `${rotation}deg`,
                      transform: `rotate(${rotation}deg)`,
                      animationDelay: delay,
                      background: ['var(--accent-yellow)', 'var(--accent-white)', 'var(--accent-cyan)', 'var(--accent-red)'][i % 4],
                      color: ['var(--accent-black)', 'var(--accent-black)', 'var(--accent-black)', 'var(--accent-white)'][i % 4]
                    } as any}>
                      {char}
                    </span>
                  );
                })}
              </div>
              
              {/* Thai Translation Banner */}
              <div className="p5-text-bg-black" style={{ fontSize: '22px', marginTop: '16px', transform: 'rotate(1deg)', display: 'inline-block' }}>
                {archetype.thai_name}
              </div>
              
              <h3 style={{ fontSize: '19px', color: 'var(--accent-black)', background: 'var(--accent-green)', display: 'inline-block', padding: '8px 16px', transform: 'rotate(2deg)', border: '2px solid black', marginTop: '16px', boxShadow: '5px 5px 0 var(--accent-red)' }}>
                &quot;{archetype.tagline}&quot;
              </h3>
            </div>
            
            {/* STATS AREA */}
            <div style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end', marginTop: '24px', background: 'rgba(255,255,255,0.95)', border: '3px solid black', padding: '16px', transform: 'rotate(-1deg)', boxShadow: '6px 6px 0 var(--accent-black)', position: 'relative' }}>
              <div className="tape" style={{ top: '-12px', right: '8px', width: '64px', height: '20px', transform: 'rotate(15deg)' }}></div>
              {highlights && highlights.slice(0, 3).map((h: any, i: number) => (
                <div key={h.key} style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '360px', justifyContent: 'flex-end', gap: '12px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '900', textTransform: 'uppercase', color: 'var(--accent-black)', lineHeight: 1.2, textAlign: 'right', flex: 1 }}>{h.label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '120px', height: '22px', background: 'var(--accent-white)', border: '2px solid var(--accent-black)', position: 'relative', flexShrink: 0 }}>
                      <div className={i % 3 === 0 ? "leopard-red" : ""} style={{ 
                        position: 'absolute', top: 0, left: 0,
                        width: `${h.value}%`, height: '100%', 
                        background: i % 3 === 0 ? 'var(--accent-red)' : ['var(--accent-red)', 'var(--accent-cyan)', 'var(--accent-yellow)'][i % 3],
                        borderRight: '2px solid black'
                      }} />
                    </div>
                    <span style={{ fontSize: '15px', fontWeight: '900', color: 'var(--accent-black)', width: '35px', textAlign: 'left', fontStyle: 'italic' }}>{h.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HERO LINE */}
          <div className="p5-panel" style={{ padding: '12px 20px', transform: 'rotate(1deg)', background: 'var(--accent-black)', color: 'var(--accent-white)', border: '3px solid var(--accent-white)', marginTop: '8px' }}>
            <p style={{ margin: 0, fontSize: '22px', fontWeight: '900', fontStyle: 'italic', lineHeight: 1.4, textTransform: 'uppercase' }}>
              {archetype.hero_line}
            </p>
          </div>
          
          {/* DETAILS GRID */}
          <div style={{ display: 'flex', gap: '16px', flex: '1', overflow: 'visible', flexWrap: 'wrap', marginTop: '0', minHeight: 0 }}>
            <div className="p5-panel" style={{ flex: '1 1 250px', padding: '16px 20px', display: 'flex', flexDirection: 'column', background: 'var(--accent-white)', border: '3px solid black', transform: 'rotate(-1deg)' }}>
              <div className="tape" style={{ top: '-12px', left: '40%', width: '64px', height: '24px', transform: 'rotate(-5deg)' }}></div>
              <h3 className="halftone-yellow" style={{ fontSize: '22px', margin: 0, display: 'inline-block', alignSelf: 'flex-start', padding: '4px 12px', border: '2px solid black', marginBottom: '12px', transform: 'rotate(-2deg)' }}><span className="text-highlight-white">STRENGTHS</span></h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '16px', fontWeight: '800', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', color: 'black', lineHeight: 1.5 }}>
                {archetype.strengths.slice(0, 2).map((s: string, i: number) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            
            <div className="p5-panel leopard-red" style={{ flex: '1 1 250px', padding: '16px 20px', display: 'flex', flexDirection: 'column', color: 'var(--text-light)', border: '3px solid var(--accent-black)', transform: 'rotate(1deg)' }}>
              <div className="tape" style={{ top: '-12px', right: '30%', width: '64px', height: '24px', transform: 'rotate(15deg)' }}></div>
              <h3 style={{ fontSize: '22px', margin: 0, color: 'var(--accent-black)', background: 'var(--accent-white)', display: 'inline-block', alignSelf: 'flex-start', padding: '4px 12px', border: '2px solid var(--accent-black)', marginBottom: '12px', transform: 'rotate(3deg)' }}>BLIND SPOTS</h3>
              <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '16px', fontWeight: '800', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.5, color: 'var(--accent-white)', textShadow: '2px 2px 0 var(--accent-black)' }}>
                {archetype.blind_spots.slice(0, 2).map((b: string, i: number) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </div>

          {/* ACTIONS / WATERMARK */}
          {isCapturing ? (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '24px', zIndex: 50 }}>
              <div style={{
                fontSize: '22px', 
                fontWeight: 900, 
                color: 'var(--accent-black)', 
                background: 'var(--accent-white)', 
                padding: '6px 12px',
                border: '2px solid var(--accent-black)',
                transform: 'rotate(-2deg)',
                boxShadow: '4px 4px 0 var(--accent-black)',
                fontStyle: 'italic',
              }}>
                sunday-book.club
              </div>
            </div>
          ) : (
            <div id="result-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', marginTop: '24px', zIndex: 50, flexWrap: 'wrap' }}>
              <button onClick={handleRetake} className="p5-button hover-glitch" style={{ fontSize: '20px', padding: '12px 24px', transform: 'rotate(-2deg)', flex: '1 1 auto' }}>
                RETRY
              </button>
              <button onClick={handleShare} disabled={isSharing} className="p5-button inverted hover-glitch" style={{ fontSize: '20px', padding: '12px 24px', transform: 'rotate(2deg)', flex: '1 1 auto' }}>
                SHARE
              </button>
            </div>
          )}
          
        </div>
      </div>

      {/* MOBILE SAVE IMAGE MODAL */}
      {generatedImage && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          zIndex: 9999,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--accent-white)',
            border: '4px solid var(--accent-black)',
            padding: '16px',
            maxWidth: '100%',
            maxHeight: '80vh',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '8px 8px 0 var(--accent-cyan)',
            transform: 'rotate(1deg)'
          }}>
            <h3 className="p5-text-bg-black" style={{ marginBottom: '16px', fontSize: '18px', textAlign: 'center' }}>
              แตะค้างที่รูปเพื่อบันทึก
            </h3>
            <img 
              src={generatedImage} 
              alt="Your Reader DNA" 
              style={{ width: '100%', objectFit: 'contain', maxHeight: '50vh', border: '2px solid black' }} 
            />
            <button 
              className="p5-button hover-glitch" 
              onClick={() => setGeneratedImage(null)}
              style={{ marginTop: '20px', padding: '10px 30px' }}
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
