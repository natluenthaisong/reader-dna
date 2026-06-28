'use client';

import React, { useState, useEffect } from 'react';
import { playTypewriterSound } from '@/utils/audio';

export function TypewriterText({ text, id }: { text: string, id: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    // Reset the typing animation whenever the text/id changes; these synchronous
    // resets are intentional so the typewriter restarts from scratch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedText('');
    setIsTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        if (i % 2 === 0) playTypewriterSound();
        i++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 25);
    
    return () => clearInterval(interval);
  }, [text, id]);

  return (
    <span style={{ position: 'relative', display: 'inline-block', textAlign: 'left' }}>
      <span style={{ opacity: 0 }}>
        <span className="text-highlight-white">{text}</span>
        <span style={{ margin: '0 4px' }}>█</span>
      </span>
      <span style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <span className="text-highlight-white">{displayedText}</span>
        <span className={isTyping ? "solid-cursor" : "blink-cursor"} style={{ display: 'inline', whiteSpace: 'nowrap' }}>█</span>
      </span>
    </span>
  );
}
