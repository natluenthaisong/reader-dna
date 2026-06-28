'use client';

import React, { useState } from 'react';
import { playPunkJingle } from '@/utils/audio';

interface RansomNoteProps {
  englishName: string;
  thaiName: string;
  tagline: string;
}

export function RansomNote({ englishName, thaiName, tagline }: RansomNoteProps) {
  const [isHoveringRansom, setIsHoveringRansom] = useState(false);

  return (
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
        {(isHoveringRansom ? "SUNDAY BOOK CLUB" : englishName.toUpperCase().padEnd(16, '*')).split('').map((char: string, i: number) => {
          if (char === ' ') return <div key={i} style={{ width: '20px' }} />;
          
          let delay = '0s';
          if (!isHoveringRansom) {
            delay = `${Math.random() * 0.5}s`;
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
        {thaiName}
      </div>
      
      <h3 style={{ fontSize: '19px', color: 'var(--accent-black)', background: 'var(--accent-green)', display: 'inline-block', padding: '8px 16px', transform: 'rotate(2deg)', border: '2px solid black', marginTop: '16px', boxShadow: '5px 5px 0 var(--accent-red)' }}>
        &quot;{tagline}&quot;
      </h3>
    </div>
  );
}
