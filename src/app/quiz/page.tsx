'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/store/useQuizStore';
import questionsData from '../../../content/questions.json';
import { playTypewriterSound, playRocketSound, playClickSound, playPunkJingle } from '@/utils/audio';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { StickerDecorations } from '@/components/ui/StickerDecorations';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function QuizPage() {
  const router = useRouter();
  const { answers, currentQuestionIndex, setAnswer, nextQuestion, prevQuestion, jumpToQuestion, setResult } = useQuizStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rocketClass, setRocketClass] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const questions = questionsData.questions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / (questions.length - 1)) * 100;
  
  const maxUnlockedIndex = Math.min(questions.length - 1, Object.keys(answers).length);

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



  const handleSelect = async (value: number, index: number) => {
    if (isTransitioning || isSubmitting) return;
    
    const isLast = currentQuestionIndex === questions.length - 1;
    if (isLast) {
      playPunkJingle(); // Epic sound for the last question
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
        
        const [response] = await Promise.all([
          fetch('/api/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answers: finalAnswers })
          }),
          new Promise(resolve => setTimeout(resolve, 2500)) // Wait for Ransom Note animation to finish
        ]);
        
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
            <span className="flash-ransom-word word-1">SUN</span>
            <span className="flash-ransom-word word-2">DAY</span>
            <span className="flash-ransom-word word-3">BOOK</span>
            <span className="flash-ransom-word word-4">CLUB</span>
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

      <ProgressBar totalQuestions={questions.length} isTransitioning={isTransitioning} />

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
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: 'clamp(6px, 1.5vw, 12px)',
              background: currentQuestionIndex % 2 === 0 ? 'var(--accent-black)' : 'var(--accent-white)',
              clipPath: [
                'polygon(1% 0%, 98% 2%, 100% 98%, 0% 100%)',
                'polygon(0% 1%, 100% 0%, 99% 99%, 2% 98%)',
                'polygon(2% 2%, 99% 1%, 98% 100%, 1% 97%)',
                'polygon(1% 0%, 97% 3%, 100% 98%, 0% 99%)',
                'polygon(0% 3%, 100% 1%, 98% 97%, 2% 100%)'
              ][(currentQuestionIndex + 2) % 5]
            }}
          >
            <img 
              src={`/authors/${currentQuestionIndex + 1}.jpg`} 
              alt="" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
              style={{
                filter: 'grayscale(100%) contrast(800%) brightness(1.2)',
                mixBlendMode: currentQuestionIndex % 2 === 0 ? 'normal' : 'multiply',
                clipPath: [
                  'polygon(2% 3%, 98% 1%, 100% 97%, 3% 99%)',
                  'polygon(0% 0%, 100% 2%, 98% 98%, 2% 100%)',
                  'polygon(3% 1%, 97% 3%, 100% 100%, 0% 96%)',
                  'polygon(1% 2%, 99% 0%, 96% 99%, 4% 97%)',
                  'polygon(0% 4%, 100% 0%, 98% 96%, 2% 100%)'
                ][currentQuestionIndex % 5]
              }}
            />
          </div>
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
