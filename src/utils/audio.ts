let audioCtx: AudioContext | null = null;

export const getAudioCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
};

// Punk Rock Jingle for final question: "Sun-day Book-Club" (Power Chords)
export const playPunkJingle = (pitchMultiplier: number = 1) => {
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
    
  } catch (e) {
    // Ignore if audio isn't supported
  }
};
