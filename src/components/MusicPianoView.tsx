import React, { useState } from 'react';
import { recordBadgeProgress } from '../services/badgeService';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Music } from 'lucide-react';
import { playClickSound, speakVietnamese } from '../utils/audio';

interface MusicPianoViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

interface PianoKey {
  note: string;
  name: string;
  freq: number;
  animal: string;
  soundText: string;
  color: string;
  textColor: string;
}

const PIANO_KEYS: PianoKey[] = [
  { note: 'C4', name: 'Đồ', freq: 261.63, animal: '🐶', soundText: 'Gâu gâu', color: 'bg-rose-400 hover:bg-rose-500 active:bg-rose-600', textColor: 'text-rose-950' },
  { note: 'D4', name: 'Rê', freq: 293.66, animal: '🐱', soundText: 'Meo meo', color: 'bg-orange-400 hover:bg-orange-500 active:bg-orange-600', textColor: 'text-orange-950' },
  { note: 'E4', name: 'Mi', freq: 329.63, animal: '🦆', soundText: 'Cạp cạp', color: 'bg-amber-400 hover:bg-amber-500 active:bg-amber-600', textColor: 'text-amber-950' },
  { note: 'F4', name: 'Pha', freq: 349.23, animal: '🐮', soundText: 'Ùm bò', color: 'bg-emerald-400 hover:bg-emerald-500 active:bg-emerald-600', textColor: 'text-emerald-950' },
  { note: 'G4', name: 'Son', freq: 392.00, animal: '🐓', soundText: 'Ò ó o', color: 'bg-teal-400 hover:bg-teal-500 active:bg-teal-600', textColor: 'text-teal-950' },
  { note: 'A4', name: 'La', freq: 440.00, animal: '🐑', soundText: 'Be be', color: 'bg-sky-400 hover:bg-sky-500 active:bg-sky-600', textColor: 'text-sky-950' },
  { note: 'B4', name: 'Si', freq: 493.88, animal: '🐸', soundText: 'Ộp ộp', color: 'bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-600', textColor: 'text-indigo-950' },
  { note: 'C5', name: 'Đố', freq: 523.25, animal: '🦖', soundText: 'Roar!', color: 'bg-purple-400 hover:bg-purple-500 active:bg-purple-600', textColor: 'text-purple-950' }
];

export const MusicPianoView: React.FC<MusicPianoViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const playFrequency = (freq: number) => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  };

  const handleKeyPress = (key: PianoKey) => {
    playFrequency(key.freq);
    setActiveKey(key.note);
    setTimeout(() => setActiveKey(null), 300);

    // Record badge progress for "Nhạc Sĩ Tí Hon"
    recordBadgeProgress('music', 1);

    if (soundEnabled) {
      if (Math.random() > 0.6) {
        speakVietnamese(`${key.animal} ${key.soundText}`);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-indigo-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border-2 border-indigo-200 shadow-sm text-sm font-black text-indigo-950">
          <Music className="w-5 h-5 text-indigo-600" />
          <span>Đàn Phím Âm Nhạc & Tiếng Kêu Muông Thú</span>
        </div>
      </div>

      {/* Main Piano Board */}
      <div className="bg-gradient-to-b from-indigo-100 via-purple-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-4 border-indigo-300 shadow-2xl text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-indigo-950 mb-2">
          🎹 Bé Gõ Đàn Vui Nhộn!
        </h2>
        <p className="text-sm sm:text-base font-bold text-slate-600 mb-8">
          Bé bấm vào từng phím đàn màu sắc để nghe nốt nhạc du dương và tiếng kêu của các bạn động vật dễ thương nhé!
        </p>

        {/* 8 Giant Rainbow Piano Keys */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 mb-8">
          {PIANO_KEYS.map((key) => {
            const isActive = activeKey === key.note;
            return (
              <button
                key={key.note}
                onClick={() => handleKeyPress(key)}
                className={`min-h-[160px] sm:min-h-[240px] rounded-3xl border-4 border-white shadow-xl flex flex-col items-center justify-between p-3 sm:p-4 transition-all duration-100 cursor-pointer ${
                  key.color
                } ${
                  isActive ? 'scale-95 brightness-125 ring-4 ring-white shadow-inner' : 'hover:-translate-y-2'
                } tv-focus-ring`}
              >
                {/* Animal Emoji */}
                <div className="text-4xl sm:text-5xl animate-bounce filter drop-shadow">
                  {key.animal}
                </div>

                {/* Sound effect hint */}
                <span className="text-[11px] font-black bg-white/70 px-2 py-0.5 rounded-full text-slate-800">
                  {key.soundText}
                </span>

                {/* Note Label */}
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-white filter drop-shadow">
                    {key.name}
                  </div>
                  <div className="text-[10px] font-bold text-white/80 uppercase">
                    {key.note}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Instruction Footer */}
        <div className="p-3 bg-white/80 rounded-2xl border border-indigo-200 text-xs sm:text-sm font-bold text-indigo-900 inline-flex items-center gap-2">
          <span>✨</span>
          <span>Bé có thể dùng các phím số từ 1 đến 8 trên bàn phím hoặc điều khiển Smart TV để gõ đàn!</span>
        </div>
      </div>
    </div>
  );
};
