import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Award } from 'lucide-react';
import { playCorrectSound, playClickSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface ActionWheelViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

interface ActionChallenge {
  id: number;
  title: string;
  emoji: string;
  instruction: string;
  voiceText: string;
  color: string;
}

const CHALLENGES: ActionChallenge[] = [
  { id: 1, title: 'Nhảy Như Thỏ Con', emoji: '🐰', instruction: 'Bé đặt 2 tay lên đầu làm tai thỏ và nhảy tưng tưng 5 cái nào!', voiceText: 'Bé hãy đặt tay lên đầu làm tai thỏ và cùng nhảy tưng tưng 5 cái nào!', color: 'bg-rose-400' },
  { id: 2, title: 'Vỗ Cánh Như Chim', emoji: '🕊️', instruction: 'Bé dang rộng 2 cánh tay vỗ nhẹ nhàng như chim bay lượn nhé!', voiceText: 'Bé dang 2 cánh tay vỗ nhẹ nhàng bay lượn trên bầu trời xanh nhé!', color: 'bg-sky-400' },
  { id: 3, title: 'Bò Như Bác Rùa', emoji: '🐢', instruction: 'Bé bò thong thả từng bước chậm rãi thật là ngoan!', voiceText: 'Bé cùng bò thong thả chậm rãi như bác rùa hiền lành nhé!', color: 'bg-emerald-400' },
  { id: 4, title: 'Gầm Oai Vệ Sư Tử', emoji: '🦁', instruction: 'Bé giơ 2 tay làm vuốt sư tử và kêu "Gừ... gừ" thật dũng cảm!', voiceText: 'Bé giơ tay làm chú sư tử dũng cảm và gầm thật to nào!', color: 'bg-amber-400' },
  { id: 5, title: 'Bơi Như Cá Heo', emoji: '🐬', instruction: 'Bé chụm 2 tay trước ngực và uốn lượn như cá heo bơi dưới biển!', voiceText: 'Bé chụm tay bơi lội tung tăng như bạn cá heo nhé!', color: 'bg-teal-400' },
  { id: 6, title: 'Vươn Vai Hươu Cao Cổ', emoji: '🦒', instruction: 'Bé nhón chân và vươn 2 tay lên thật cao đón ánh nắng!', voiceText: 'Bé nhón gót chân và vươn tay thật cao chạm vào đám mây nào!', color: 'bg-orange-400' },
  { id: 7, title: 'Lắc Lư Điệu Nhạc', emoji: '💃', instruction: 'Bé nhún nhảy và lắc lư cái hông theo điệu nhạc vui tươi!', voiceText: 'Bé cùng lắc lư cái hông nhún nhảy theo nhạc thật vui nào!', color: 'bg-purple-400' },
  { id: 8, title: 'Cười Toe Toét', emoji: '😄', instruction: 'Bé nở một nụ cười thật tươi và vỗ tay thật to hoan hô!', voiceText: 'Bé cười thật tươi ha ha ha và vỗ tay hoan hô nào!', color: 'bg-pink-400' }
];

export const ActionWheelView: React.FC<ActionWheelViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [selectedChallenge, setSelectedChallenge] = useState<ActionChallenge | null>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  const spinWheel = () => {
    if (spinning) return;
    playClickSound();
    setSpinning(true);
    setSelectedChallenge(null);
    setCountdown(null);

    const randomIdx = Math.floor(Math.random() * CHALLENGES.length);
    const extraSpins = 360 * 5; // 5 full rotations
    const sliceDeg = 360 / CHALLENGES.length;
    const targetDeg = extraSpins + (CHALLENGES.length - 1 - randomIdx) * sliceDeg;

    setRotation((r) => r + targetDeg);

    setTimeout(() => {
      setSpinning(false);
      const chosen = CHALLENGES[randomIdx];
      setSelectedChallenge(chosen);
      if (soundEnabled) {
        playCorrectSound();
        speakVietnamese(chosen.voiceText);
      }

      // Start 10s movement timer for kid
      setCountdown(10);
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c === null || c <= 1) {
            clearInterval(timer);
            if (soundEnabled) playVictoryFanfare();
            onRewardStar();
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
            speakVietnamese('Bé vận động tuyệt vời quá! Thưởng cho bé 1 ngôi sao vàng!');
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }, 3200);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 text-center">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-emerald-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="text-sm font-black text-emerald-900 bg-white px-4 py-2 rounded-2xl border-2 border-emerald-200 shadow-sm">
          🎡 Vòng Quay Vận Động Khỏe Vui Cho Bé
        </div>
      </div>

      <div className="bg-gradient-to-b from-emerald-100 via-teal-50 to-amber-50 rounded-3xl p-6 sm:p-10 border-4 border-emerald-300 shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 mb-2">
          Bé Vận Động Thật Khỏe Nào!
        </h2>
        <p className="text-sm sm:text-base font-bold text-slate-600 mb-6">
          Bé bấm nút "QUAY BÁNH XE" để nhận thử thách vận động siêu đáng yêu nhé!
        </p>

        {/* Wheel Display */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto my-6 flex items-center justify-center">
          {/* Wheel Pointer */}
          <div className="absolute -top-4 z-20 text-4xl text-rose-600 animate-bounce">
            ▼
          </div>

          {/* Rotating Wheel */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
            className="w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden relative bg-amber-200"
          >
            {CHALLENGES.map((ch, idx) => {
              const deg = (360 / CHALLENGES.length) * idx;
              return (
                <div
                  key={ch.id}
                  style={{
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: '50% 100%'
                  }}
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-28 h-40 ${ch.color} flex flex-col items-center pt-2 border-r border-white/40`}
                >
                  <span className="text-3xl filter drop-shadow">{ch.emoji}</span>
                  <span className="text-[10px] font-black text-white/90 uppercase tracking-tighter mt-1 line-clamp-1">
                    {ch.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Spin Button */}
          <button
            onClick={spinWheel}
            disabled={spinning}
            className="absolute z-30 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-base shadow-xl border-4 border-white flex items-center justify-center cursor-pointer active:scale-95 transition-all tv-focus-ring"
          >
            {spinning ? 'ĐANG QUAY' : 'QUAY!'}
          </button>
        </div>

        {/* Selected Challenge Result Card */}
        {selectedChallenge && (
          <div className="mt-6 p-6 bg-white rounded-3xl border-4 border-amber-400 shadow-xl max-w-lg mx-auto animate-flash-green">
            <div className="text-6xl mb-2 animate-bounce">{selectedChallenge.emoji}</div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {selectedChallenge.title}
            </h3>
            <p className="text-base font-extrabold text-slate-700 mb-4">
              {selectedChallenge.instruction}
            </p>

            {countdown !== null && (
              <div className="p-3 bg-yellow-100 rounded-2xl border-2 border-yellow-300 inline-flex items-center gap-2 text-xl font-black text-amber-950">
                <span>⏱️ Cùng tập trong:</span>
                <span className="text-2xl text-rose-600 font-mono">{countdown} giây</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
