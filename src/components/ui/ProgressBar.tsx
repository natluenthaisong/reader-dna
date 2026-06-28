'use client';

import React, { useRef, useState } from 'react';
import { useQuizStore } from '@/store/useQuizStore';
import { playClickSound } from '@/utils/audio';

interface ProgressBarProps {
  totalQuestions: number;
  isTransitioning: boolean;
}

export function ProgressBar({ totalQuestions, isTransitioning }: ProgressBarProps) {
  const { answers, currentQuestionIndex, jumpToQuestion } = useQuizStore();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDraggingQ, setIsDraggingQ] = useState(false);

  const progress = (currentQuestionIndex / (totalQuestions - 1)) * 100;
  const maxUnlockedIndex = Math.min(totalQuestions - 1, Object.keys(answers).length);

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
    
    const stepPercent = 100 / (totalQuestions - 1);
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

  const handleMarkerKeyDown = (e: React.KeyboardEvent) => {
    if (isTransitioning) return;
    let target = currentQuestionIndex;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') target = currentQuestionIndex - 1;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') target = currentQuestionIndex + 1;
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = maxUnlockedIndex;
    else return;

    e.preventDefault();
    const clamped = Math.max(0, Math.min(target, maxUnlockedIndex));
    if (clamped !== currentQuestionIndex) {
      playClickSound(-1);
      jumpToQuestion(clamped);
    }
  };

  return (
    <div 
      ref={progressBarRef}
      style={{ position: 'relative', width: '100%', marginBottom: 'clamp(2rem, 5vh, 3rem)' }}
    >
      {/* Dynamic Q.n Marker — also a keyboard-operable slider */}
      <div
        className="p5-text-bg-black"
        role="slider"
        tabIndex={isTransitioning ? -1 : 0}
        aria-label="เลื่อนเพื่อย้อนกลับไปข้อที่ตอบแล้ว"
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-valuenow={currentQuestionIndex + 1}
        aria-valuetext={`ข้อ ${currentQuestionIndex + 1} จาก ${totalQuestions}`}
        onKeyDown={handleMarkerKeyDown}
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
        {Array.from({ length: totalQuestions }).map((_, idx) => {
          const isUnlocked = idx <= maxUnlockedIndex;
          const isCurrent = idx === currentQuestionIndex;
          
          if (!isUnlocked) return null;
          
          const canClick = isUnlocked && !isTransitioning;
          // Hit area width = exactly one step's slot so neighbouring targets never overlap,
          // capped at 44px so wide screens don't create oversized targets. Height is a fixed
          // 44px (vertical never overlaps), giving an accessible tap target for a tiny notch.
          const slotPercent = 100 / (totalQuestions - 1);

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
                left: `${(idx / (totalQuestions - 1)) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: `min(${slotPercent}%, 44px)`,
                height: '44px',
                minWidth: '14px',
                background: 'transparent',
                border: 'none',
                cursor: canClick ? 'pointer' : 'default',
                pointerEvents: 'auto',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={`ไปยังข้อ ${idx + 1}`}
            >
              {/* Visible notch — identical look to before, just decoupled from the hit area */}
              <span
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: isCurrent ? '24px' : '16px',
                  height: isCurrent ? '36px' : '24px',
                  transform: isCurrent ? 'skewX(-10deg) scale(1.2)' : 'skewX(-10deg)',
                  backgroundColor: isCurrent ? 'var(--accent-yellow)' : 'var(--accent-black)',
                  border: isCurrent ? '2px solid var(--accent-black)' : '1px solid var(--accent-white)',
                  boxShadow: isCurrent ? '2px 2px 0 var(--accent-red)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  pointerEvents: 'none'
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
