let audioCtx: AudioContext | null = null;

export const getAudioCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
  }
  return audioCtx;
};

// Punk Rock Jingle for final question: "Sun-day Book-Club" (Power Chords)
export const playPunkJingle = (pitchMultiplier: number = 1) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    
    if (ctx.state === 'suspended') {
      // Attempt to resume. If it fails due to lack of user gesture, we catch and ignore to avoid unhandled rejections
      ctx.resume().catch(() => {});
    }

    // Do not generate sound if the context is still suspended, avoiding warnings
    if (ctx.state !== 'running') return;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.2; 
    
    // Heavy distortion
    const waveShaper = ctx.createWaveShaper();
    const curve = new Float32Array(44100);
    const amount = 80; // High distortion
    for (let i = 0; i < 44100; ++i) {
      const x = i * 2 / 44100 - 1;
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
      { freq: 130.81 * pitchMultiplier, time: 0, dur: 0.2 },    // Sun
      { freq: 146.83 * pitchMultiplier, time: 0.25, dur: 0.2 },  // day
      { freq: 164.81 * pitchMultiplier, time: 0.5, dur: 0.2 },  // Book
      { freq: 196.00 * pitchMultiplier, time: 0.75, dur: 0.8 }   // Club!
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
    
  } catch {
    // Ignore if audio isn't supported
  }
};

// Generic synth blip for hover interactions
export const playSynthBlip = (freq: number = 400) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) {
      console.warn('AudioContext not found');
      return;
    }
    
    const play = () => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
};

// Fast scribbling sound for the highlight animation
export const playScribbleSound = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    
    const play = () => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.3);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        // Add some noise/distortion
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1000;
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
};

export const playTypewriterSound = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    
    const play = () => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200 + Math.random() * 600, ctx.currentTime); 
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
};

export const playRocketSound = () => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    
    const play = () => {
      try {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth'; 
        
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 1.0);
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
};

export const playClickSound = (pitchIndex = 0, isHover = false) => {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    
    const play = () => {
      try {
        if (isHover) {
          const scale = [329.63, 392.00, 440.00, 523.25, 587.33]; 
          const freq = pitchIndex === -1 ? 164.81 : (scale[pitchIndex % scale.length] || 440);
          
          const osc = ctx.createOscillator();
          osc.type = 'square';
          
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.frequency.setValueAtTime(freq * 2, ctx.currentTime + 0.04);
          
          const hoverGain = ctx.createGain();
          hoverGain.gain.setValueAtTime(0.02, ctx.currentTime);
          hoverGain.gain.setValueAtTime(0.02, ctx.currentTime + 0.04);
          hoverGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          
          osc.connect(hoverGain);
          hoverGain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
          return;
        }

        const baseFreqs = [82.41, 98.00, 110.00, 130.81, 146.83];
        const root = pitchIndex === -1 ? 41.20 : (baseFreqs[pitchIndex % baseFreqs.length] || 82.41);
        const multiplier = 1;
        const freqs = [root * multiplier, root * 1.498 * multiplier, root * 2 * multiplier];
        
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.3;
        
        const waveShaper = ctx.createWaveShaper();
        const curve = new Float32Array(44100);
        const amount = 50; 
        for (let i = 0; i < 44100; ++i) {
          const x = i * 2 / 44100 - 1;
          curve[i] = (3 + amount) * x * 20 * (Math.PI / 180) / (Math.PI + amount * Math.abs(x));
        }
        waveShaper.curve = curve;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.Q.value = 1.0;
        
        const envGain = ctx.createGain();
        envGain.gain.setValueAtTime(1, ctx.currentTime);
        envGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        
        envGain.connect(waveShaper);
        waveShaper.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);
        
        freqs.forEach(f => {
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          osc.detune.value = (Math.random() - 0.5) * 15;
          osc.connect(envGain);
          osc.start();
          osc.stop(ctx.currentTime + 0.25);
        });
        
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
        noiseGain.connect(waveShaper); 
        noise.start();
        
      } catch {}
    };

    if (ctx.state === 'suspended') {
      ctx.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
};
