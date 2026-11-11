import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { recordBadgeProgress } from '../services/badgeService';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Trophy, Target, Zap } from 'lucide-react';
import { playCorrectSound, playWrongSound, playClickSound, playSpecialSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface TargetItem {
  id: number;
  x: number; // percentage 15 -> 85
  y: number; // percentage 20 -> 50
  dx: number;
  emoji: string;
  name: string;
  points: number;
  size: number;
  hit: boolean;
}

interface ArcheryGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const ArcheryGameView: React.FC<ArcheryGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [score, setScore] = useState<number>(0);
  const [arrowsLeft, setArrowsLeft] = useState<number>(12);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bowX, setBowX] = useState<number>(50); // 20 - 80%
  const [isShooting, setIsShooting] = useState<boolean>(false);
  const [arrowY, setArrowY] = useState<number>(80);
  const [arrowShotX, setArrowShotX] = useState<number>(50);
  const [hitMessage, setHitMessage] = useState<string | null>(null);

  const [targets, setTargets] = useState<TargetItem[]>([
    { id: 1, x: 20, y: 25, dx: 0.3, emoji: '🍎', name: 'Quả Táo', points: 20, size: 64, hit: false },
    { id: 2, x: 50, y: 35, dx: -0.4, emoji: '🍉', name: 'Dưa Hấu', points: 30, size: 72, hit: false },
    { id: 3, x: 75, y: 20, dx: 0.35, emoji: '🍌', name: 'Quả Chuối', points: 20, size: 64, hit: false },
    { id: 4, x: 35, y: 45, dx: -0.25, emoji: '⭐', name: 'Bao Tải Sao', points: 50, size: 80, hit: false }
  ]);

  // Target movement loop (60fps)
  useEffect(() => {
    if (isGameOver) return;
    let animId: number;

    const tick = () => {
      setTargets((prev) =>
        prev.map((t) => {
          if (t.hit) return t;
          let nextX = t.x + t.dx;
          let nextDx = t.dx;
          if (nextX > 85 || nextX < 15) {
            nextDx = -t.dx;
            nextX = t.x + nextDx;
          }
          return { ...t, x: nextX, dx: nextDx };
        })
      );
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver]);

  // Keyboard navigation for TV / PC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver) return;
      if (e.key === 'ArrowLeft') setBowX((x) => Math.max(x - 8, 15));
      else if (e.key === 'ArrowRight') setBowX((x) => Math.min(x + 8, 85));
      else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') shootArrow();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bowX, isShooting, isGameOver, arrowsLeft]);

  // Shoot Arrow Physics
  const shootArrow = () => {
    if (isShooting || arrowsLeft <= 0 || isGameOver) return;

    playClickSound();
    setIsShooting(true);
    setArrowShotX(bowX);
    setArrowY(78);
    setArrowsLeft((a) => a - 1);

    // Arrow flight animation
    let currentY = 78;
    const flight = setInterval(() => {
      currentY -= 4;
      setArrowY(currentY);

      // Collision check with targets at y levels
      setTargets((prev) => {
        let hitFound = false;
        const nextTargets = prev.map((t) => {
          if (!t.hit && Math.abs(t.x - bowX) < 12 && Math.abs(t.y - currentY) < 10) {
            hitFound = true;
            playCorrectSound();
            const nextScore = score + t.points;
            setScore(nextScore);

            // Record progress towards "Bậc Thầy Bắn Cung"
            recordBadgeProgress('archery', t.points);

            setHitMessage(`Trúng ${t.name}! +${t.points} Điểm`);
            setTimeout(() => setHitMessage(null), 1200);

            confetti({ particleCount: 35, spread: 50, origin: { y: 0.4 } });
            return { ...t, hit: true };
          }
          return t;
        });

        if (hitFound) {
          clearInterval(flight);
          setIsShooting(false);

          // Respawn hit target after 1s
          setTimeout(() => {
            setTargets((cur) =>
              cur.map((t) => (t.hit ? { ...t, hit: false, x: Math.floor(Math.random() * 70) + 15 } : t))
            );
          }, 1000);
        }

        return nextTargets;
      });

      if (currentY <= 15) {
        clearInterval(flight);
        setIsShooting(false);
      }
    }, 25);

    // End of game check
    if (arrowsLeft - 1 <= 0) {
      setTimeout(() => {
        setIsGameOver(true);
        if (soundEnabled) playVictoryFanfare();
        onRewardStar();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        speakVietnamese(`Hoan hô bé! Bé đã bắn trúng đích và ghi được ${score} điểm!`);
      }, 1200);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setArrowsLeft(12);
    setIsGameOver(false);
    setIsShooting(false);
    setBowX(50);
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 sm:px-4">
      {/* Top HUD */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-orange-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-orange-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl font-black text-sm text-yellow-950 flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Điểm: <span className="tabular-nums text-base text-amber-900">{score}</span></span>
          </div>
          <div className="px-4 py-2 bg-amber-100 border-2 border-amber-300 rounded-2xl font-black text-sm text-amber-950 flex items-center gap-1.5 shadow-sm">
            <span>🏹</span>
            <span>Còn: <span className="tabular-nums text-base text-orange-800">{arrowsLeft}</span> mũi tên</span>
          </div>
        </div>
      </div>

      {/* Main Archery Field */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-orange-400 shadow-2xl bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-200 min-h-[460px] sm:min-h-[520px] select-none">
        <img
          src="/src/assets/images/kid_archery_fun_1794371559510.jpg"
          alt="Archery Forest"
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
        />

        {/* Floating Target Fruits */}
        {targets.map((t) => (
          <div
            key={t.id}
            style={{
              left: `${t.x}%`,
              top: `${t.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`absolute z-10 transition-transform duration-75 flex flex-col items-center select-none ${
              t.hit ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <div className="text-5xl sm:text-6xl animate-pulse filter drop-shadow-xl">
              {t.emoji}
            </div>
            <span className="text-[10px] font-black bg-white/90 text-amber-950 px-2 py-0.5 rounded-full shadow-xs mt-1">
              +{t.points}đ
            </span>
          </div>
        ))}

        {/* Arrow Flying Animation */}
        {isShooting && (
          <div
            style={{
              left: `${arrowShotX}%`,
              top: `${arrowY}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-20 text-4xl text-orange-600 font-black animate-pulse filter drop-shadow-lg"
          >
            🏹
          </div>
        )}

        {/* Hit Reward Toast Banner */}
        {hitMessage && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2.5 bg-yellow-400 text-yellow-950 border-2 border-white rounded-full font-black text-base shadow-2xl animate-bounce">
            🎯 {hitMessage}
          </div>
        )}

        {/* Player Bow Control at Bottom */}
        <div
          style={{
            left: `${bowX}%`,
            top: '80%',
            transform: 'translate(-50%, -50%)'
          }}
          className="absolute z-20 flex flex-col items-center transition-all duration-100"
        >
          <div className="text-6xl sm:text-7xl filter drop-shadow-2xl">
            🏹
          </div>
          <span className="text-[11px] font-black bg-amber-400 text-amber-950 px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap mt-1">
            Cung Tên Của Bé
          </span>
        </div>

        {/* Controls Bar at Bottom */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setBowX((x) => Math.max(x - 12, 15))}
              className="px-5 py-3 bg-white/90 hover:bg-white text-slate-900 font-black text-base rounded-2xl border-2 border-amber-300 shadow-xl active:scale-95 cursor-pointer tv-focus-ring"
            >
              ⬅️ Ngắm Trái
            </button>
            <button
              onClick={() => setBowX((x) => Math.min(x + 12, 85))}
              className="px-5 py-3 bg-white/90 hover:bg-white text-slate-900 font-black text-base rounded-2xl border-2 border-amber-300 shadow-xl active:scale-95 cursor-pointer tv-focus-ring"
            >
              Ngắm Phải ➡️
            </button>
          </div>

          <button
            onClick={shootArrow}
            disabled={isShooting}
            className="flex-1 sm:flex-initial px-8 py-3.5 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 hover:from-orange-600 hover:to-emerald-600 text-white font-black text-xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
          >
            <Target className="w-6 h-6 fill-current text-yellow-300" />
            <span>BẮN CUNG TÊN!</span>
          </button>
        </div>

        {/* Game Over Modal */}
        {isGameOver && (
          <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-4 border-yellow-400 shadow-2xl animate-flash-green">
              <div className="text-7xl mb-3 animate-bounce">🎯⭐</div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Bé Bắn Cung Thật Tài!</h3>
              <p className="text-base font-bold text-slate-600 mb-4">
                Bé đã ghi được tổng cộng:
              </p>
              <div className="p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300 text-3xl font-black text-amber-900 mb-6">
                {score} Điểm Cung Thủ
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Bắn Tiếp</span>
                </button>
                <button
                  onClick={onExit}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Về Kho Game</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
