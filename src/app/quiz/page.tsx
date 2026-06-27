'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';
import questionsData from '../../../content/questions.json';

// Global AudioContext to prevent hitting hardware limits (Max 6 contexts in Chrome)
let globalAudioCtx: any = null;
const getAudioCtx = () => {
  if (typeof window === 'undefined') return null;
  try {
    if (!globalAudioCtx) {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        globalAudioCtx = new AudioContext();
      }
    }
    // Attempt to resume if suspended by autoplay policy
    if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
      globalAudioCtx.resume();
    }
    return globalAudioCtx;
  } catch (e) {
    return null;
  }
};

const playTypewriterSound = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx || ctx.state === 'suspended') return;
    
    // High-pitched, slightly distorted mechanical "clack"
    const osc = ctx.createOscillator();
    osc.type = 'square';
    // Random high pitch between 1200Hz and 1800Hz for a chaotic punk feel
    osc.frequency.setValueAtTime(1200 + Math.random() * 600, ctx.currentTime); 
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime); // Keep it quiet so it doesn't pierce ears
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

const playRocketSound = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx || ctx.state === 'suspended') return;
    
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth'; 
    
    // "Phew" frequency sweep down
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 1.0);
  } catch (e) {}
};

const TypewriterText = ({ text, id }: { text: string, id: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        // Play sound every other character to keep it punchy but not overwhelming
        if (i % 2 === 0) playTypewriterSound();
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25); // Fast, punchy typewriter effect
    
    return () => clearInterval(interval);
  }, [text, id]);

  return (
    <span style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
      {/* Invisible placeholder dictates max width/height to prevent jitter while typing */}
      <span style={{ opacity: 0 }}>
        <span className="text-highlight-white">{text}</span>
        <span style={{ margin: '0 4px' }}>█</span>
      </span>
      {/* Absolute overlay types out over it */}
      <span style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <span className="text-highlight-white">{displayedText}</span>
        <span className={isTyping ? "solid-cursor" : "blink-cursor"} style={{ display: 'inline', whiteSpace: 'nowrap' }}>█</span>
      </span>
    </span>
  );
};

const InteractiveSticker = ({ sticker }: { sticker: any }) => {
  const [isRepelled, setIsRepelled] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsRepelled(true)}
      onMouseLeave={() => setIsRepelled(false)}
      style={{
        position: 'absolute',
        top: `${sticker.top}%`,
        left: `${sticker.left}%`,
        transform: `rotate(${sticker.rotation}deg) ${isRepelled ? 'translate(-40px, -30px) scale(0.9)' : 'translate(0px, 0px)'}`,
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        pointerEvents: 'auto',
        cursor: 'grab'
      }}
    >
      <svg 
        viewBox="0 0 24 24" 
        width={sticker.size} 
        height={sticker.size} 
        style={{ filter: 'drop-shadow(3px 3px 0 var(--accent-black))' }}
      >
        {sticker.path}
      </svg>
    </div>
  );
};

const StickerDecorations = ({ questionIndex }: { questionIndex: number }) => {
  const stickers = [
    { id: 'lightning', path: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="black" strokeWidth="1.5" fill="var(--accent-yellow)" strokeLinejoin="round" /> },
    { id: 'book', path: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" stroke="black" strokeWidth="1.5" fill="var(--accent-white)" strokeLinejoin="round" /> },
    { id: 'glasses', path: <path d="M2 14c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5Zm10 0c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5Zm-5 0h5M2 14h-2M24 14h-2" stroke="black" strokeWidth="2" fill="none" /> },
    { id: 'pencil', path: <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5zM12 20h9" stroke="black" strokeWidth="1.5" fill="var(--accent-cyan)" strokeLinejoin="round" /> },
    { id: 'star', path: <path d="M12 2l3 6 6 .5-4.5 4.5 1 6-5.5-3-5.5 3 1-6-4.5-4.5 6-.5z" stroke="black" strokeWidth="1.5" fill="var(--accent-red)" strokeLinejoin="round" /> }
  ];

  const getRand = (seed: number, min: number, max: number) => {
    const x = Math.sin(seed + 1) * 10000;
    const r = x - Math.floor(x);
    return Math.floor(r * (max - min + 1)) + min;
  };

  const count = getRand(questionIndex * 10, 2, 4);
  const sizeMap = [40, 70, 110, 160]; // S, M, L, XL
  const selectedStickers = [];
  
  for (let i = 0; i < count; i++) {
    const stickerIdx = getRand(questionIndex * 20 + i, 0, stickers.length - 1);
    const top = getRand(questionIndex * 30 + i, 15, 80);
    // Determine size index (0=S, 1=M, 2=L, 3=XL)
    const sizeIdx = getRand(questionIndex * 50 + i, 0, 3);
    const size = sizeMap[sizeIdx];
    
    // Keep mostly on the left side, push larger icons further left so they don't overlap center
    let left = getRand(questionIndex * 40 + i, -5, 15); 
    if (sizeIdx >= 2) left -= 15; // Push L and XL further left
    
    const rotation = getRand(questionIndex * 60 + i, -45, 45);
    selectedStickers.push({ ...stickers[stickerIdx], top, left, size, rotation, key: i });
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
      {selectedStickers.map(s => (
        <InteractiveSticker key={s.key} sticker={s} />
      ))}
    </div>
  );
};



export default function QuizPage() {
  const router = useRouter();
  const { answers, currentQuestionIndex, setAnswer, nextQuestion, prevQuestion, jumpToQuestion, setResult } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rocketClass, setRocketClass] = useState<string | null>(null);
  
  // Drag state for Q.n scrubber
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDraggingQ, setIsDraggingQ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const questions = questionsData.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
  
  const maxUnlockedIndex = Math.min(questions.length - 1, Object.keys(answers).length);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransitioning) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingQ(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingQ || !progressBarRef.current || isTransitioning) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    let newProgress = ((e.clientX - rect.left) / rect.width) * 100;
    newProgress = Math.max(0, Math.min(100, newProgress));
    
    const stepPercent = 100 / (questions.length - 1);
    const closestIndex = Math.round(newProgress / stepPercent);
    const snappedIndex = Math.min(closestIndex, maxUnlockedIndex);
    
    if (snappedIndex !== currentQuestionIndex) {
      playClickSound(-1); // light click sound
      jumpToQuestion(snappedIndex);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDraggingQ(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Define 5 distinct chaotic 8-point polygons
  const panelShapes = [
    'polygon(2% 3%, 50% 0%, 98% 4%, 100% 50%, 97% 98%, 45% 100%, 3% 97%, 0% 55%)',
    'polygon(0% 0%, 48% 3%, 100% 2%, 98% 45%, 99% 99%, 55% 97%, 1% 100%, 3% 45%)',
    'polygon(3% 2%, 55% 0%, 97% 1%, 100% 55%, 98% 100%, 50% 99%, 0% 98%, 2% 50%)',
    'polygon(1% 4%, 45% 0%, 100% 3%, 97% 55%, 100% 97%, 45% 100%, 2% 98%, 0% 48%)',
    'polygon(5% 0%, 50% 4%, 95% 0%, 100% 50%, 95% 100%, 50% 96%, 5% 100%, 0% 50%)'
  ];
  const currentShape = panelShapes[currentQuestionIndex % panelShapes.length];
  const currentTransform = currentQuestionIndex % 2 === 0 ? 'scale(1) rotate(-1deg)' : 'scale(1.02) rotate(1deg)';

  // Procedural Sound Effect (Distorted Punk Power Chord)
  const playClickSound = (pitchIndex = 0, isHover = false) => {
    try {
      const ctx = getAudioCtx();
      if (!ctx || ctx.state === 'suspended') return;
      
      if (isHover) {
        // Retro Video Game "Blip-Bleep" for Hover
        // Map the button index to a musical scale so hovering down the list plays a melody!
        // E4, G4, A4, C5, D5 (E minor pentatonic)
        const scale = [329.63, 392.00, 440.00, 523.25, 587.33]; 
        // If it's the back button (pitchIndex = -1), use a lower note (E3 = 164.81)
        const freq = pitchIndex === -1 ? 164.81 : (scale[pitchIndex % scale.length] || 440);
        
        const osc = ctx.createOscillator();
        osc.type = 'square'; // Classic retro sound
        
        // Quick 2-note arpeggio (Root -> Octave)
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.setValueAtTime(freq * 2, ctx.currentTime + 0.04); // Jump up an octave after 40ms
        
        const hoverGain = ctx.createGain();
        hoverGain.gain.setValueAtTime(0.02, ctx.currentTime); // Keep it relatively quiet
        hoverGain.gain.setValueAtTime(0.02, ctx.currentTime + 0.04);
        hoverGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08); // Fade out quickly
        
        osc.connect(hoverGain);
        hoverGain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        return; // Exit early, don't play the heavy click sound
      }

      // CLICK SOUND:
      // E2, G2, A2, C3, D3 (Classic punk progression)
      const baseFreqs = [82.41, 98.00, 110.00, 130.81, 146.83];
      // Back button gets a heavy low E1
      const root = pitchIndex === -1 ? 41.20 : (baseFreqs[pitchIndex % baseFreqs.length] || 82.41);
      
      const multiplier = 1;
      
      // Aggressive distorted synth punk chord (Root + 5th + Octave)
      const freqs = [root * multiplier, root * 1.498 * multiplier, root * 2 * multiplier];
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.3;
      
      // Heavy Distortion curve (Fuzz)
      const waveShaper = ctx.createWaveShaper();
      const curve = new Float32Array(44100);
      const amount = 50; 
      for (let i = 0; i < 44100; ++i) {
        let x = i * 2 / 44100 - 1;
        curve[i] = (3 + amount) * x * 20 * (Math.PI / 180) / (Math.PI + amount * Math.abs(x));
      }
      waveShaper.curve = curve;
      
      // Filter for crunch
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.Q.value = 1.0;
      
      // Envelope (Fast attack, short decay for a "chug")
      const envGain = ctx.createGain();
      envGain.gain.setValueAtTime(1, ctx.currentTime);
      envGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      // Route audio
      envGain.connect(waveShaper);
      waveShaper.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // Create the chord oscillators
      freqs.forEach(f => {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        osc.detune.value = (Math.random() - 0.5) * 15; // Detune for thickness
        osc.connect(envGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      });
      
      // Add noise burst for pick attack
      const bufferSize = ctx.sampleRate * 0.05;  
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.8, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      noise.connect(noiseGain);
      noiseGain.connect(waveShaper); // Run pick attack through distortion too!
      noise.start();
      
    } catch (e) {
      // Ignore if audio isn't supported
    }
  };

  // Punk Rock Jingle for final question: "Sun-day Book-Club" (Power Chords)
  const playFinalSound = () => {
    try {
      const ctx = getAudioCtx();
      if (!ctx || ctx.state === 'suspended') return;
      
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.2; 
      
      // Heavy distortion
      const waveShaper = ctx.createWaveShaper();
      const curve = new Float32Array(44100);
      const amount = 80; // High distortion
      for (let i = 0; i < 44100; ++i) {
        let x = i * 2 / 44100 - 1;
        curve[i] = (3 + amount) * x * 20 * (Math.PI / 180) / (Math.PI + amount * Math.abs(x));
      }
      waveShaper.curve = curve;
      
      // EQ to make it sound like a guitar amp
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.value = 1.2;
      
      waveShaper.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);
      
      // "Sun-day Book-Club" jingle notes (C3, D3, E3, G3)
      const notes = [
        { freq: 130.81, time: 0, dur: 0.2 },    // Sun
        { freq: 146.83, time: 0.25, dur: 0.2 },  // day
        { freq: 164.81, time: 0.5, dur: 0.2 },  // Book
        { freq: 196.00, time: 0.75, dur: 0.8 }   // Club!
      ];
      
      notes.forEach(note => {
        // Play root, fifth, and octave for power chord
        [note.freq, note.freq * 1.5, note.freq * 2].forEach((f, i) => {
          const osc = ctx.createOscillator();
          osc.type = i === 0 ? 'sawtooth' : 'square'; // Mix for crunch
          osc.frequency.value = f;
          osc.detune.value = (Math.random() - 0.5) * 15; // Phasing
          
          const env = ctx.createGain();
          env.gain.setValueAtTime(0, ctx.currentTime + note.time);
          env.gain.linearRampToValueAtTime(1, ctx.currentTime + note.time + 0.02); // Pick attack
          env.gain.setValueAtTime(1, ctx.currentTime + note.time + note.dur - 0.1);
          env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.time + note.dur);
          
          osc.connect(env);
          env.connect(waveShaper); // Send through distortion
          
          osc.start(ctx.currentTime + note.time);
          osc.stop(ctx.currentTime + note.time + note.dur);
        });
      });
      
    } catch (e) {
      // Ignore if audio isn't supported
    }
  };

  const handleSelect = async (value: number, index: number) => {
    if (isTransitioning || isSubmitting) return;
    
    const isLast = currentQuestionIndex === questions.length - 1;
    if (isLast) {
      playFinalSound(); // Epic sound for the last question
    } else {
      playClickSound(index); // Normal sound
    }
    
    setAnswer(currentQuestion.id, value);
    
    // Auto advance or submit
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        nextQuestion();
        setIsTransitioning(false);
      }, 400); // Wait for stamp animation
    } else {
      setIsSubmitting(true);
      setErrorMsg(null);
      try {
        const currentAnswers = useQuizStore.getState().answers;
        const finalAnswers = { ...currentAnswers, [currentQuestion.id]: value };
        
        const response = await fetch('/api/score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: finalAnswers })
        });
        
        const data = await response.json();
        if (data.archetypeId) {
          setResult(data);
          router.push(`/result/${data.archetypeId}`);
        } else {
          setErrorMsg(data.error || "Submission failed");
          setIsSubmitting(false);
        }
      } catch (error: any) {
        console.error("Error submitting quiz", error);
        setErrorMsg(error.message || "An unexpected error occurred");
        setIsSubmitting(false);
      }
    }
  };

  if (!mounted) return null; // Prevent hydration mismatch

  if (isSubmitting || errorMsg) {
    return (
      <main className="container animate-p5-snap" style={{ alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        
        {/* Flash Ransom Note Overlay */}
        {isSubmitting && !errorMsg && (
          <div className="ransom-flash-overlay">
            <span className="ransom-word word-1">SUN</span>
            <span className="ransom-word word-2">DAY</span>
            <span className="ransom-word word-3">BOOK</span>
            <span className="ransom-word word-4">CLUB</span>
          </div>
        )}

        <h2 className="p5-title" style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', marginBottom: '1rem', transform: 'skewX(-5deg)', position: 'relative', zIndex: 1 }}>
          {errorMsg ? 'ERROR' : 'PROCESSING...'}
        </h2>
        <div className="p5-text-bg-black" style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', marginBottom: '2rem' }}>
          {errorMsg ? errorMsg : 'กำลังคำนวณโอกาสดองหนังสือของคุณ...'}
        </div>
        {errorMsg && (
          <button 
            className="p5-button hover-glitch" 
            onClick={() => {
              useQuizStore.getState().resetQuiz();
              router.push('/');
            }}
          >
            START OVER
          </button>
        )}
      </main>
    );
  }

  return (
    <main className="container animate-p5-snap" style={{ paddingTop: 'clamp(1rem, 5vh, 3rem)' }}>
      
      {/* Decorative Punk Background Elements */}
      <div className="tiger-pink" style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '110%', height: '50vh', clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 100%)', zIndex: -2, opacity: 0.9 }}></div>
      <div className="leopard-red" style={{ position: 'fixed', top: '-10%', right: '-5%', width: '50%', height: '60vh', clipPath: 'polygon(0 0, 100% 0, 100% 100%, 20% 80%)', zIndex: -3, mixBlendMode: 'multiply' }}></div>
      
      <StickerDecorations questionIndex={currentQuestionIndex} />

      {/* Progress Header */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 'clamp(1rem, 3vh, 2rem)' }}>
        <button 
          onMouseEnter={() => { if (!isTransitioning && !rocketClass) playClickSound(-1, true); }}
          onClick={() => {
            if (!isTransitioning && !rocketClass) {
              playClickSound(-1);
              playRocketSound(); // Phew!
              
              const anims = ['rocket-anim-1', 'rocket-anim-2', 'rocket-anim-3'];
              const chosen = anims[Math.floor(Math.random() * anims.length)];
              setRocketClass(chosen);
              
              setTimeout(() => {
                if (currentQuestionIndex === 0) {
                  router.push('/');
                } else {
                  prevQuestion();
                }
                setRocketClass(null);
              }, 1200);
            }
          }} 
          disabled={isTransitioning || rocketClass !== null}
          className={`hover-glitch ${rocketClass || ''}`}
          style={{ 
            background: 'none', border: 'none', 
            color: 'var(--text-light)', 
            cursor: (isTransitioning || rocketClass) ? 'default' : 'pointer', 
            filter: 'drop-shadow(3px 3px 0 var(--accent-red)) drop-shadow(6px 6px 0 var(--accent-cyan))',
            padding: '10px',
            zIndex: rocketClass ? 100 : 1
          }}
          aria-label="Back"
        >
          <svg width="clamp(60px, 15vw, 100px)" viewBox="0 0 40 24" fill="currentColor" style={{ transform: 'skewX(-15deg)', filter: 'drop-shadow(4px 4px 0 var(--accent-black))' }}>
            {/* Aggressive, hand-cut looking punk arrow pointing left */}
            <path d="M 0 12 L 18 0 L 14 8 L 40 4 L 38 18 L 14 14 L 18 24 Z" />
          </svg>
        </button>
      </div>

      {/* Jagged Progress Bar (Like torn tape) */}
      <div 
        ref={progressBarRef}
        style={{ position: 'relative', width: '100%', marginBottom: 'clamp(2rem, 5vh, 3rem)' }}
      >
        {/* Dynamic Q.n Marker */}
        <div 
          className="p5-text-bg-black" 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ 
            position: 'absolute', 
            top: '-35px', 
            left: `${progress}%`,
            transform: `translateX(-${progress}%) rotate(-2deg)`,
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            fontWeight: '800',
            transition: isDraggingQ ? 'none' : 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            zIndex: 15,
            whiteSpace: 'nowrap',
            cursor: isTransitioning ? 'default' : (isDraggingQ ? 'grabbing' : 'grab'),
            pointerEvents: isTransitioning ? 'none' : 'auto',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.8em', opacity: currentQuestionIndex > 0 ? 0.6 : 0, transition: 'opacity 0.2s' }}>◄</span>
            Q.{currentQuestionIndex + 1}
            <span style={{ fontSize: '0.8em', opacity: currentQuestionIndex < maxUnlockedIndex ? 0.6 : 0, transition: 'opacity 0.2s' }}>►</span>
          </div>
        </div>
        
        <div style={{ width: '100%', height: '15px', background: 'var(--accent-black)', clipPath: 'polygon(1% 10%, 99% 0, 100% 90%, 0% 100%)', position: 'relative' }}>
          <div style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: 'var(--accent-cyan)', 
            transition: 'width 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }} />
        </div>
        
        {/* Breadcrumb Steppers */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '15px', pointerEvents: 'none', zIndex: 11 }}>
          {questions.map((_, idx) => {
            const isUnlocked = idx <= maxUnlockedIndex;
            const isCurrent = idx === currentQuestionIndex;
            
            if (!isUnlocked) return null;
            
            const canClick = isUnlocked && !isTransitioning;
            
            return (
              <button
                key={idx}
                onClick={() => {
                  if (canClick) {
                    playClickSound(-1);
                    jumpToQuestion(idx);
                  }
                }}
                disabled={!canClick}
                title={canClick ? `กลับไปข้อ ${idx + 1}` : undefined}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${(idx / (questions.length - 1)) * 100}%`,
                  transform: isCurrent ? 'translate(-50%, -50%) skewX(-10deg) scale(1.2)' : 'translate(-50%, -50%) skewX(-10deg)',
                  width: isCurrent ? '24px' : '16px',
                  height: isCurrent ? '36px' : '24px', // Taller to look like notches/steppers
                  backgroundColor: isCurrent ? 'var(--accent-yellow)' : 'var(--accent-black)',
                  border: isCurrent ? '2px solid var(--accent-black)' : '1px solid var(--accent-white)',
                  cursor: canClick ? 'pointer' : 'default',
                  pointerEvents: 'auto',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  boxShadow: isCurrent ? '2px 2px 0 var(--accent-red)' : 'none',
                  padding: 0
                }}
                aria-label={`Jump to question ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      <div 
        style={{ 
          padding: 'clamp(1rem, 2vh, 1.5rem)', 
          textAlign: 'center', 
          marginBottom: '0', 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          position: 'relative',
          transform: currentTransform,
          transition: 'all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)' // Spring damping effect!
        }}
      >
        {/* Punk Portrait Cutout (Dynamically loaded based on question) */}
        <div className="punk-portrait-wrapper" style={{ transform: `rotate(${currentQuestionIndex % 2 === 0 ? '3deg' : '-3deg'})` }}>
          <img 
            src={`/authors/${currentQuestionIndex + 1}.jpg`} 
            alt="" 
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
          />
        </div>

        {/* Absolute Background Panel that gets clipped */}
        <div 
          className="p5-panel"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            clipPath: currentShape,
            zIndex: -1,
            transition: 'clip-path 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6)',
            overflow: 'hidden' // Ensure contents don't break out
          }}
        />
        
            <h2 className="halftone-yellow" style={{ fontSize: 'clamp(1.25rem, 4.5vw, 2rem)', fontWeight: '900', marginBottom: 'clamp(1rem, 2vh, 1.5rem)', minHeight: 'clamp(40px, 10vh, 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', border: '3px solid black', boxShadow: '4px 4px 0 var(--accent-red)', transform: 'rotate(-1deg)', lineHeight: 1.5 }}>
              <TypewriterText text={currentQuestion.text} id={currentQuestion.id} />
            </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vh, 1rem)', maxWidth: '550px', margin: '0 auto', width: '100%', alignItems: 'center' }}>
          {questionsData.scale.map((option, idx) => {
            const isSelected = answers[currentQuestion.id] === option.value;
            
            // Collage cutout styling for the options
            const rIdx = (idx + currentQuestionIndex) % 5;
            const rotations = ['rotate(-2deg)', 'rotate(3deg)', 'rotate(-1deg)', 'rotate(4deg)', 'rotate(-3deg)'];
            const bgColors = ['var(--accent-white)', 'var(--accent-yellow)', 'var(--accent-cyan)', 'var(--accent-white)', 'var(--accent-red)'];
            const textColors = ['var(--accent-black)', 'var(--accent-black)', 'var(--accent-black)', 'var(--accent-black)', 'var(--accent-white)'];
            const margins = ['0%', '5%', '2%', '8%', '-2%'];
            const clipPaths = [
              'polygon(1% 4%, 97% 1%, 99% 97%, 3% 99%)',
              'polygon(0% 0%, 99% 2%, 100% 100%, 2% 98%)',
              'polygon(2% 2%, 98% 0%, 100% 96%, 95% 100%, 0% 99%)',
              'polygon(1% 0%, 98% 3%, 100% 99%, 5% 98%, 0% 96%)',
              'polygon(0% 3%, 97% 0%, 99% 100%, 3% 97%)'
            ];
            const svgPoints = [
              '1,4 97,1 99,97 3,99',
              '0,0 99,2 100,100 2,98',
              '2,2 98,0 100,96 95,100 0,99',
              '1,0 98,3 100,99 5,98 0,96',
              '0,3 97,0 99,100 3,97'
            ];
            
            return (
              <div 
                key={`${currentQuestion.id}-${option.value}`}
                style={{
                  width: '90%',
                  marginLeft: margins[rIdx],
                  animation: `p5SnapIn 0.3s ${idx * 0.05}s both cubic-bezier(0.1, 0.9, 0.2, 1)`,
                  filter: isSelected ? 'drop-shadow(6px 6px 0 var(--accent-black))' : 'drop-shadow(4px 4px 0 var(--accent-black))',
                  opacity: isTransitioning && !isSelected ? 0.3 : 1,
                  display: 'flex',
                  justifyContent: 'center',
                  willChange: 'transform, filter' // Fixes WebKit drop-shadow bugs
                }}
              >
                <button
                  className={`p5-button ${isSelected ? "animate-press-pop" : "hover-bounce"} ${!isSelected && bgColors[rIdx] === 'var(--accent-yellow)' ? 'halftone-yellow' : ''} ${!isSelected && bgColors[rIdx] === 'var(--accent-red)' ? 'leopard-red' : ''}`}
                  onMouseEnter={() => { if (!isTransitioning && !isSelected) playClickSound(idx, true); }}
                  onClick={() => handleSelect(option.value, idx)}
                  disabled={isTransitioning}
                  style={{ 
                    '--base-rotate': rotations[rIdx],
                    '--base-scale': 1,
                    '--hover-scale': 1.05,
                    transform: isSelected ? undefined : `scale(var(--base-scale)) var(--base-rotate)`,
                    width: '100%', 
                    background: isSelected ? 'var(--accent-black)' : bgColors[rIdx],
                    color: isSelected ? 'var(--accent-green)' : textColors[rIdx],
                    textShadow: (isSelected || textColors[rIdx] === 'var(--accent-white)') ? '2px 2px 0 var(--accent-black)' : '2px 2px 0 var(--accent-white)',
                    border: 'none',
                    clipPath: clipPaths[rIdx],
                    padding: '16px 24px',
                    cursor: isTransitioning ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '65px',
                    position: 'relative'
                  } as React.CSSProperties}
                >
                  {/* The flawless SVG inner stroke */}
                  <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
                  >
                    <polygon 
                      points={svgPoints[rIdx]} 
                      fill="none" 
                      stroke="var(--accent-black)" 
                      strokeWidth="6" 
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  
                  <span style={{ position: 'relative', zIndex: 1 }}>{option.label}</span>
                  
                  {/* Random tape on selected item to look chaotic */}
                  {isSelected && <div className="tape" style={{ top: '-10px', right: '-10px', width: '50px', height: '20px', transform: 'rotate(20deg)', zIndex: 2 }}></div>}
                  
                  {/* SELECTED Stamp */}
                  {isSelected && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      right: '15px',
                      transform: 'translateY(-50%) rotate(15deg)',
                      color: 'var(--accent-red)',
                      border: '4px solid var(--accent-red)',
                      padding: '4px 12px',
                      fontSize: '1.2rem',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      zIndex: 10,
                      pointerEvents: 'none',
                      boxShadow: '0 0 10px rgba(230,0,0,0.3)',
                      textShadow: '1px 1px 0 var(--accent-black)',
                      opacity: 0, // Starts at 0, filled by animation
                      background: 'rgba(0,0,0,0.6)',
                      animation: 'stamp-pop 0.15s cubic-bezier(0.1, 0.9, 0.2, 1) forwards'
                    }}>
                      SELECTED
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
