'use client';

import React from 'react';
import Link from 'next/link';
import archetypesData from '@/../content/archetypes.json';
import { playSynthBlip } from '@/utils/audio';

export function ArchetypeGrid() {
  return (
    <div style={{ width: '100%', marginTop: '6rem', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <div className="tape" style={{ top: '-10px', left: '-20px', width: '80px', height: '25px', transform: 'rotate(-10deg)', zIndex: 11 }}></div>
        <h3 className="p5-text-bg-black" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', transform: 'rotate(2deg)', marginBottom: '2rem', boxShadow: '5px 5px 0 var(--accent-red)' }}>
          ขี้เกียจทำควิซ? แอบดู 12 สายนักอ่านเลย
        </h3>
      </div>
      
      <div 
        className="archetype-grid"
        style={{ 
          display: 'grid', 
          gap: '24px', 
          width: '100%',
          maxWidth: '1100px',
          padding: '0 10px'
        }}
      >
        {archetypesData.archetypes.map((arch, i) => {
          const rotations = ['rotate(-2deg)', 'rotate(3deg)', 'rotate(-1deg)', 'rotate(4deg)', 'rotate(-3deg)'];
          const bgColors = ['var(--accent-white)', 'var(--accent-yellow)', 'var(--accent-cyan)', 'var(--accent-white)', 'var(--accent-red)'];
          const textColors = ['var(--accent-black)', 'var(--accent-black)', 'var(--accent-black)', 'var(--accent-black)', 'var(--accent-white)'];
          const rIdx = i % 5;
          
          return (
            <Link key={arch.id} href={`/result/${arch.id}`} passHref style={{ textDecoration: 'none', display: 'block', outline: 'none' }}>
              <div 
                className={`hover-bounce ${bgColors[rIdx] === 'var(--accent-red)' ? 'leopard-red' : ''} ${bgColors[rIdx] === 'var(--accent-yellow)' ? 'halftone-yellow' : ''}`}
                onMouseEnter={() => playSynthBlip(400 + i * 20)}
                style={{
                  '--base-rotate': rotations[rIdx],
                  '--hover-scale': 1.05,
                  transform: `scale(1) var(--base-rotate)`,
                  background: bgColors[rIdx],
                  color: textColors[rIdx],
                  padding: '24px 16px',
                  border: '3px solid var(--accent-black)',
                  boxShadow: '6px 6px 0 var(--accent-black)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '140px',
                  cursor: 'pointer',
                  position: 'relative'
                } as React.CSSProperties}
              >
                {/* Small decorative corner tape on some items */}
                {i % 3 === 0 && <div className="tape" style={{ top: '-5px', right: '-5px', width: '40px', height: '15px', transform: 'rotate(20deg)' }}></div>}
                
                <div style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 900, 
                  textTransform: 'uppercase', 
                  textAlign: 'center', 
                  lineHeight: 1.1, 
                  textShadow: textColors[rIdx] === 'var(--accent-white)' ? '2px 2px 0 var(--accent-black)' : '2px 2px 0 var(--accent-white)'
                }}>
                  {arch.english_name}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '12px', textAlign: 'center', background: 'var(--accent-black)', color: 'var(--accent-green)', padding: '4px 10px', border: '1px solid var(--accent-white)' }}>
                  {arch.thai_name}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
