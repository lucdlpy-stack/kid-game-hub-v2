import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Volume2, Sparkles, Trophy, Zap, Flame } from 'lucide-react';
import { playCorrectSound, playWrongSound, playClickSound, playSpecialSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface ObstacleItem {
  id: number;
  x: number; // percentage 100 -> -20
  type: 'box' | 'water' | 'mushroom' | 'star' | 'apple';
  emoji: string;
  cleared: boolean;
}

interface ObstacleRunnerGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const ObstacleRunnerGameView: React.FC<ObstacleRunnerGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [score, setScore] = useState<number>(0);
  const [distance, setDistance] = useState<number>(0); // 0 -> 100%
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [obstacles, setObstacles] = useState<ObstacleItem[]>([]);
  const [selectedHero, setSelectedHero] = useState<{ name: string; emoji: string }>({
    name: 'Hổ Vàng Con',
    emoji: '🐯'
  });

  const HEROES = [
    { name: 'Hổ Vàng Con', emoji: '🐯' },
    { name: 'Khủng Long Dino', emoji: '🦖' },
    { name: 'Cún Con Tung Tăng', emoji: '🐶' },
    { name: 'Thỏ Trắng Siêu Tốc', emoji: '🐰' }
  ];

  // Start obstacle loop
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        if (prev.length >= 4) return prev;
        const types = [
          { type: 'box' as const, emoji: '📦' },
          { type: 'water' as const, emoji: '💦' },
          { type: 'mushroom' as const, emoji: '🍄' },
          { type: 'star' as const, emoji: '⭐' },
          { type: 'apple' as const, emoji: '🍎' }
        ];
        const chosen = types[Math.floor(Math.random() * types.length)];
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: 110,
            type: chosen.type,
            emoji: chosen.emoji,
            cleared: false
          }
        ];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isGameOver]);

  // Main 60fps Runner Engine
  useEffect(() => {
    if (isGameOver) return;
    let animId: number;

    const tick = () => {
      setDistance((dist) => {
        const nextDist = dist + 0.15;
        if (nextDist >= 100) {
          setIsGameOver(true);
          if (soundEnabled) playVictoryFanfare();
          onRewardStar();
          confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
          speakVietnamese(`Hoan hô! Bé ${selectedHero.name} đã vượt chướng ngại vật xuất sắc về đích!`);
          return 100;
        }
        return nextDist;
      });

      // Move obstacles left
      setObstacles((prev) => {
        const moved = prev.map((ob) => ({ ...ob, x: ob.x - 0.7 }));

        // Collision check at player position (x ~ 20-30%)
        moved.forEach((ob) => {
          if (!ob.cleared && ob.x >= 18 && ob.x <= 32) {
            if (ob.type === 'star' || ob.type === 'apple') {
              playCorrectSound();
              setScore((s) => s + (ob.type === 'star' ? 30 : 20));
              ob.cleared = true;
            } else {
              // Obstacle! Check if player is jumping
              if (isJumping) {
                // Successfully jumped over!
                playCorrectSound();
                setScore((s) => s + 15);
                ob.cleared = true;
              } else {
                // Hit obstacle gently
                playWrongSound();
                ob.cleared = true;
              }
            }
          }
        });

        return moved.filter((ob) => ob.x > -15);
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, isJumping, onRewardStar, selectedHero.name, soundEnabled]);

  // Handle Jump Action
  const triggerJump = () => {
    if (isJumping || isGameOver) return;
    playClickSound();
    setIsJumping(true);
    setTimeout(() => {
      setIsJumping(false);
    }, 600);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isJumping, isGameOver]);

  const handleRestart = () => {
    setScore(0);
    setDistance(0);
    setIsGameOver(false);
    setObstacles([]);
    setIsJumping(false);
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col justify-between py-2 px-2 sm:px-4 overflow-hidden">
      {/* Top HUD */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-emerald-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Về Kho Game</span>
        </button>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md bg-white p-2 rounded-2xl border-2 border-emerald-300 shadow-sm flex items-center gap-3">
          <span className="text-xs font-black text-slate-700">Đường đua:</span>
          <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${distance}%` }}
            />
          </div>
          <span className="text-sm font-black text-emerald-900">🏁 {Math.floor(distance)}%</span>
        </div>

        <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl font-black text-sm text-yellow-950 flex items-center gap-1.5 shadow-sm">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>{score}đ</span>
        </div>
      </div>

      {/* Main Runner Field */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-emerald-400 shadow-2xl bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200 flex-1 min-h-[360px] select-none">
        <img
          src="/assets/images/kid_runner_jump_1794371559321.jpg"
          alt="Runner Path"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
        />

        {/* Hero Character Runner */}
        <div
          style={{
            left: '24%',
            bottom: isJumping ? '45%' : '20%'
          }}
          className={`absolute z-20 flex flex-col items-center transition-all duration-300 ${
            isJumping ? 'scale-125 rotate-6 filter drop-shadow-2xl' : 'scale-100'
          }`}
        >
          <div className="text-6xl sm:text-7xl animate-bounce filter drop-shadow-xl">
            {selectedHero.emoji}
          </div>
          {isJumping && (
            <span className="text-xs font-black bg-yellow-300 text-yellow-950 px-2.5 py-0.5 rounded-full shadow-md animate-ping mt-1">
              🦘 NHẢY CAO!
            </span>
          )}
        </div>

        {/* Scrolling Obstacles & Collectibles */}
        {obstacles.map((ob) => (
          <div
            key={ob.id}
            style={{
              left: `${ob.x}%`,
              bottom: '20%'
            }}
            className={`absolute z-10 text-5xl sm:text-6xl transition-transform duration-75 filter drop-shadow-lg ${
              ob.cleared ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {ob.emoji}
          </div>
        ))}

        {/* Hero Selection Chips */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-emerald-300">
          <span className="text-xs font-black text-slate-700 px-2">Đổi bạn:</span>
          {HEROES.map((h, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedHero(h)}
              className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedHero.name === h.name
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-emerald-100'
              }`}
            >
              {h.emoji} {h.name}
            </button>
          ))}
        </div>

        {/* Giant Jump Button at Bottom */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex justify-center">
          <button
            onClick={triggerJump}
            className="w-full max-w-lg py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white font-black text-2xl rounded-2xl shadow-2xl hover:scale-102 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3 tv-focus-ring"
          >
            <Zap className="w-8 h-8 fill-current text-yellow-300 animate-bounce" />
            <span>NHẤN NÚT NHẢY CAO!</span>
          </button>
        </div>

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-4 border-yellow-400 shadow-2xl animate-flash-green">
              <div className="text-7xl mb-3 animate-bounce">🏆🏁</div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">VỀ ĐÍCH THÀNH CÔNG!</h3>
              <p className="text-base font-bold text-slate-600 mb-4">
                Bé {selectedHero.name} đã xuất sắc vượt chướng ngại vật:
              </p>
              <div className="p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300 text-3xl font-black text-amber-900 mb-6">
                {score} Điểm Thưởng
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Chơi Lại</span>
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
