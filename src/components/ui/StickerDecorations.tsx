'use client';

import React, { useState } from 'react';
import { playSynthBlip } from '@/utils/audio';

const InteractiveSticker = ({ sticker }: { sticker: StickerItem }) => {
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

interface StickerItem {
  id: string;
  path: React.ReactNode;
  top: number;
  left: number;
  size: number;
  rotation: number;
  key: number;
}

const STICKER_DEFS = [
  { id: 'lightning', path: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="black" strokeWidth="1.5" fill="var(--accent-yellow)" strokeLinejoin="round" /> },
  { id: 'book', path: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" stroke="black" strokeWidth="1.5" fill="var(--accent-white)" strokeLinejoin="round" /> },
  { id: 'glasses', path: <path d="M2 14c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5Zm10 0c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5Zm-5 0h5M2 14h-2M24 14h-2" stroke="black" strokeWidth="2" fill="none" /> },
  { id: 'pencil', path: <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5zM12 20h9" stroke="black" strokeWidth="1.5" fill="var(--accent-cyan)" strokeLinejoin="round" /> },
  { id: 'star', path: <path d="M12 2l3 6 6 .5-4.5 4.5 1 6-5.5-3-5.5 3 1-6-4.5-4.5 6-.5z" stroke="black" strokeWidth="1.5" fill="var(--accent-red)" strokeLinejoin="round" /> }
];

function getRand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed + 1) * 10000;
  const r = x - Math.floor(x);
  return Math.floor(r * (max - min + 1)) + min;
}

export function StickerDecorations({ questionIndex }: { questionIndex: number }) {
  const count = getRand(questionIndex * 10, 2, 4);
  const sizeMap = [40, 70, 110, 160];
  const selectedStickers: StickerItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const stickerIdx = getRand(questionIndex * 20 + i, 0, STICKER_DEFS.length - 1);
    const top = getRand(questionIndex * 30 + i, 15, 80);
    const sizeIdx = getRand(questionIndex * 50 + i, 0, 3);
    const size = sizeMap[sizeIdx];
    
    let left = getRand(questionIndex * 40 + i, -5, 15); 
    if (sizeIdx >= 2) left -= 15;
    
    const rotation = getRand(questionIndex * 60 + i, -45, 45);
    selectedStickers.push({ ...STICKER_DEFS[stickerIdx], top, left, size, rotation, key: i });
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
      {selectedStickers.map(s => (
        <InteractiveSticker key={s.key} sticker={s} />
      ))}
    </div>
  );
}

// Home page stickers — fixed decorative positions
export function HomeStickers() {
  return (
    <>
      {/* Lightning Sticker */}
      <svg
        onMouseEnter={() => playSynthBlip(800)}
        style={{ position: 'absolute', top: '8%', right: '10%', width: 'clamp(60px, 15vw, 100px)', height: 'clamp(80px, 20vw, 140px)', zIndex: 20, transform: 'rotate(15deg)', filter: 'drop-shadow(4px 4px 0 var(--accent-black))', cursor: 'crosshair' }}
        className="hover-bounce"
        viewBox="0 0 50 100"
        fill="var(--accent-yellow)"
        stroke="var(--accent-black)"
        strokeWidth="4"
        strokeLinejoin="miter"
      >
        <path d="M30 5 L5 55 L25 55 L10 95 L45 40 L25 40 Z" />
      </svg>

      {/* Glasses Sticker */}
      <svg
        onMouseEnter={() => playSynthBlip(600)}
        style={{ position: 'absolute', top: '45%', left: '5%', width: 'clamp(80px, 15vw, 120px)', height: 'clamp(35px, 8vw, 55px)', zIndex: 20, transform: 'rotate(-25deg)', filter: 'drop-shadow(3px 3px 0 var(--accent-red))', cursor: 'crosshair' }}
        className="hover-bounce"
        viewBox="0 0 120 50"
        fill="var(--accent-cyan)"
        stroke="var(--accent-black)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="30" cy="25" r="20" fillOpacity="0.8" />
        <circle cx="90" cy="25" r="20" fillOpacity="0.8" />
        <path d="M50 25 Q60 15 70 25" fill="none" />
        <path d="M10 25 L5 15 M110 25 L115 15" fill="none" />
        <path d="M15 15 L25 5 M75 15 L85 5" stroke="var(--accent-white)" strokeWidth="4" />
      </svg>

      {/* Pencil Sticker */}
      <svg
        onMouseEnter={() => playSynthBlip(500)}
        style={{ position: 'absolute', bottom: '20%', right: '5%', width: 'clamp(80px, 15vw, 140px)', height: 'clamp(80px, 15vw, 140px)', zIndex: 20, transform: 'rotate(-15deg)', filter: 'drop-shadow(5px 5px 0 var(--accent-black))', cursor: 'crosshair' }}
        className="hover-bounce"
        viewBox="0 0 100 100"
        fill="none"
        stroke="var(--accent-black)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 80 L10 90 L20 100 Z" fill="var(--accent-black)" />
        <path d="M20 80 L80 20 L100 40 L40 100 Z" fill="var(--accent-yellow)" />
        <path d="M30 70 L90 30 M35 75 L95 35" strokeWidth="2" />
        <path d="M15 100 C 5 110 -5 95 10 95 C 25 95 15 80 5 90" strokeWidth="3" stroke="var(--accent-cyan)" />
      </svg>

      {/* Book Sticker */}
      <svg
        onMouseEnter={() => playSynthBlip(400)}
        style={{ position: 'absolute', bottom: '5%', left: '8%', width: 'clamp(70px, 12vw, 110px)', height: 'clamp(55px, 10vw, 90px)', zIndex: 20, transform: 'rotate(25deg)', filter: 'drop-shadow(4px 4px 0 var(--accent-black))', cursor: 'crosshair' }}
        className="hover-bounce"
        viewBox="0 0 100 80"
        fill="var(--accent-white)"
        stroke="var(--accent-black)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 70 V15 C50 15 35 5 10 10 V65 C35 60 50 70 50 70 Z" />
        <path d="M50 70 V15 C50 15 65 5 90 10 V65 C65 60 50 70 50 70 Z" />
        <path d="M15 20 C30 15 45 22 45 22" fill="none" stroke="var(--accent-red)" />
        <path d="M15 30 C30 25 45 32 45 32" fill="none" />
        <path d="M85 20 C70 15 55 22 55 22" fill="none" />
        <path d="M85 30 C70 25 55 32 55 32" fill="none" stroke="var(--accent-red)" />
      </svg>
    </>
  );
}
