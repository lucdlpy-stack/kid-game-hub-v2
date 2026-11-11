/**
 * Kid Game Hub - Web Audio API Synthesizer & Speech Engine
 * Safe, zero-network-dependency sound effects crafted for preschool kids.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** Triumphant sparkle chime for correct answers */
export function playCorrectSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.3, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.35);
    });
  } catch (err) {
    console.warn('Audio playback error', err);
  }
}

export function playCorrectPopSound() {
  playCorrectSound();
}

export function playWinCelebrationAudio() {
  playVictoryFanfare();
}

/** Gentle, comic "boing" wobble for wrong attempts (non-scary for 3-5yo) */
export function playWrongSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Frequency drops with a fun wobble
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.3);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  } catch (err) {
    console.warn('Audio playback error', err);
  }
}

/** Bubble pop for touching/clicking cards */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch (err) {
    console.warn('Audio playback error', err);
  }
}

/** Grand victory celebration fanfare when finishing a game */
export function playVictoryFanfare() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const melody = [
      { f: 523.25, d: 0.12 }, // C5
      { f: 659.25, d: 0.12 }, // E5
      { f: 783.99, d: 0.12 }, // G5
      { f: 1046.5, d: 0.35 }, // C6
      { f: 880.0, d: 0.15 },  // A5
      { f: 1046.5, d: 0.6 },  // C6 hold
    ];

    let t = now;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.9;
    });
  } catch (err) {
    console.warn('Fanfare error', err);
  }
}

/** Playful synthesized thematic sounds (car beep, bell, lion, dog, etc.) */
export function playSpecialSound(type: string) {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (type === 'car') {
      // Beep beep!
      [0, 0.15].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now + offset);
        gain.gain.setValueAtTime(0.15, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });
    } else if (type === 'bell' || type === 'star') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, now); // E6
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      // Default happy chime
      playCorrectSound();
    }
  } catch (err) {
    console.warn('Special sound error', err);
  }
}

/** 
 * Vietnamese Text-To-Speech for young learners (Ages 3-5)
 * Crafted in the warm, melodic, gentle Central Vietnamese teacher persona:
 * 'Cô giáo miền Trung ngọt ngào, dịu dàng, ấm áp, thân thiện và gần gũi với các bé'
 */
export function speakVietnamese(text: string, onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any pending speech

    // Keep voice prompts concise, clean and direct for toddlers
    let cleanText = text.replace(/!+/g, '.').replace(/\.+/g, '.').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95; // Crisp, clear speech rate
    utterance.pitch = 1.05; // Gentle, friendly teacher pitch
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.startsWith('vi') &&
        (v.name.toLowerCase().includes('hoaimy') ||
          v.name.toLowerCase().includes('linh') ||
          v.name.toLowerCase().includes('google') ||
          v.name.toLowerCase().includes('natural'))
    ) || voices.find((v) => v.lang.startsWith('vi'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech error', err);
    if (onEnd) onEnd();
  }
}

/** 
 * Multi-Song Nursery BGM Playlist Engine
 * Rotates continuously across 5 beloved cheerful preschool melodies:
 * 1. Chú Ếch Con (Little Frog)
 * 2. Cả Nhà Thương Nhau (Family Love)
 * 3. Cháu Lên Ba (Three-Year-Old Child)
 * 4. Kìa Con Bướm Vàng (Golden Butterfly / Frère Jacques)
 * 5. Bắc Kim Thang (Traditional Folk Rhyme)
 */
interface BGMTrack {
  id: string;
  title: string;
  tempoMs: number;
  notes: { f: number; d: number }[]; // frequency and duration
}

const BGM_PLAYLIST: BGMTrack[] = [
  // Track 1: Chú Ếch Con
  {
    id: 'ech_con',
    title: 'Chú Ếch Con Vui Vẻ 🐸',
    tempoMs: 380,
    notes: [
      { f: 523.25, d: 0.3 }, { f: 587.33, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 523.25, d: 0.3 },
      { f: 659.25, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.5 }, { f: 659.25, d: 0.3 },
      { f: 587.33, d: 0.3 }, { f: 523.25, d: 0.3 }, { f: 587.33, d: 0.5 }, { f: 523.25, d: 0.6 }
    ]
  },
  // Track 2: Cả Nhà Thương Nhau
  {
    id: 'ca_nha',
    title: 'Cả Nhà Thương Nhau 👨‍👩‍👧',
    tempoMs: 440,
    notes: [
      { f: 523.25, d: 0.4 }, { f: 659.25, d: 0.4 }, { f: 783.99, d: 0.4 }, { f: 880.00, d: 0.4 },
      { f: 783.99, d: 0.4 }, { f: 659.25, d: 0.4 }, { f: 587.33, d: 0.6 }, { f: 523.25, d: 0.4 },
      { f: 659.25, d: 0.4 }, { f: 783.99, d: 0.4 }, { f: 587.33, d: 0.4 }, { f: 523.25, d: 0.8 }
    ]
  },
  // Track 3: Kìa Con Bướm Vàng
  {
    id: 'buom_vang',
    title: 'Kìa Con Bướm Vàng 🦋',
    tempoMs: 400,
    notes: [
      { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.35 }, { f: 659.25, d: 0.35 }, { f: 523.25, d: 0.35 },
      { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.35 }, { f: 659.25, d: 0.35 }, { f: 523.25, d: 0.35 },
      { f: 659.25, d: 0.35 }, { f: 698.46, d: 0.35 }, { f: 783.99, d: 0.7 },
      { f: 659.25, d: 0.35 }, { f: 698.46, d: 0.35 }, { f: 783.99, d: 0.7 }
    ]
  },
  // Track 4: Cháu Lên Ba
  {
    id: 'chau_len_ba',
    title: 'Cháu Lên Ba Cháu Đi Mẫu Giáo 🎒',
    tempoMs: 420,
    notes: [
      { f: 659.25, d: 0.35 }, { f: 587.33, d: 0.35 }, { f: 523.25, d: 0.35 }, { f: 587.33, d: 0.35 },
      { f: 659.25, d: 0.35 }, { f: 659.25, d: 0.35 }, { f: 659.25, d: 0.7 },
      { f: 587.33, d: 0.35 }, { f: 587.33, d: 0.35 }, { f: 587.33, d: 0.7 },
      { f: 659.25, d: 0.35 }, { f: 783.99, d: 0.35 }, { f: 783.99, d: 0.7 }
    ]
  },
  // Track 5: Bắc Kim Thang
  {
    id: 'bac_kim_thang',
    title: 'Bắc Kim Thang Cà Rốt Cà Chua 🥕',
    tempoMs: 360,
    notes: [
      { f: 783.99, d: 0.3 }, { f: 783.99, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.3 },
      { f: 880.00, d: 0.3 }, { f: 783.99, d: 0.3 }, { f: 659.25, d: 0.5 }, { f: 587.33, d: 0.3 },
      { f: 523.25, d: 0.3 }, { f: 587.33, d: 0.3 }, { f: 659.25, d: 0.3 }, { f: 523.25, d: 0.6 }
    ]
  }
];

let bgmInterval: number | null = null;
let isBgmPlaying = false;
let currentTrackIndex = 0;
let currentNoteIndex = 0;

export function toggleBgm(): boolean {
  if (isBgmPlaying) {
    stopBgm();
    return false;
  } else {
    startBgm();
    return true;
  }
}

export function getCurrentBgmTrackTitle(): string {
  return BGM_PLAYLIST[currentTrackIndex]?.title || 'Nhạc Vui Mầm Non';
}

export function startBgm() {
  if (isBgmPlaying) return;
  isBgmPlaying = true;
  const ctx = getAudioContext();

  const playStep = () => {
    if (!isBgmPlaying) return;
    try {
      const currentTrack = BGM_PLAYLIST[currentTrackIndex];
      const note = currentTrack.notes[currentNoteIndex];
      const now = ctx.currentTime;

      // Soft marimba-like bell tone for young toddlers
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.045, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + note.d);

      currentNoteIndex++;
      if (currentNoteIndex >= currentTrack.notes.length) {
        // Move to the NEXT song in playlist for endless alternating enjoyment!
        currentNoteIndex = 0;
        currentTrackIndex = (currentTrackIndex + 1) % BGM_PLAYLIST.length;
      }
    } catch {
      // Audio waiting for user gesture
    }
  };

  playStep();
  // Continuous rhythm loop
  bgmInterval = window.setInterval(playStep, 450);
}

export function nextBgmTrack(): string {
  currentTrackIndex = (currentTrackIndex + 1) % BGM_PLAYLIST.length;
  currentNoteIndex = 0;
  return getCurrentBgmTrackTitle();
}

export function stopBgm() {
  isBgmPlaying = false;
  if (bgmInterval !== null) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}
