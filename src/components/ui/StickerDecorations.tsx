'use client';

import React, { useState } from 'react';

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

export function StickerDecorations({ questionIndex }: { questionIndex: number }) {
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
  const sizeMap = [40, 70, 110, 160];
  const selectedStickers = [];
  
  for (let i = 0; i < count; i++) {
    const stickerIdx = getRand(questionIndex * 20 + i, 0, stickers.length - 1);
    const top = getRand(questionIndex * 30 + i, 15, 80);
    const sizeIdx = getRand(questionIndex * 50 + i, 0, 3);
    const size = sizeMap[sizeIdx];
    
    let left = getRand(questionIndex * 40 + i, -5, 15); 
    if (sizeIdx >= 2) left -= 15;
    
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
}
