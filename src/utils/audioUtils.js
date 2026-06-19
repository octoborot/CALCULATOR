// Synthesize a premium haptic click sound using Web Audio API
export const playClickSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    const audioCtx = new AudioContextClass();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = 'sine';
    // High frequency, quick decay click
    osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime); // subtle volume
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04);
    
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.04);
  } catch (e) {
    console.warn('Web Audio API not supported or blocked:', e);
  }
};
