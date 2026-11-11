import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw, Zap, Trophy, Volume2, Sparkles } from 'lucide-react';
import { playCorrectSound, playWrongSound, playClickSound, playSpecialSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface PetRacerGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

const RACERS = [
  { id: 'dino', name: 'Khủng Long Dino', emoji: '🦖', car: '🏎️', color: 'from-emerald-400 to-teal-500' },
  { id: 'tiger', name: 'Hổ Vàng Con', emoji: '🐯', car: '🚗', color: 'from-amber-400 to-orange-500' },
  { id: 'puppy', name: 'Cún Đốm Vui Vẻ', emoji: '🐶', car: '🚙', color: 'from-rose-400 to-red-500' },
  { id: 'bunny', name: 'Thỏ Trắng Siêu Tốc', emoji: '🐰', car: '🏎️', color: 'from-sky-400 to-indigo-500' }
];

export const PetRacerGameView: React.FC<PetRacerGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [selectedRacerIdx, setSelectedRacerIdx] = useState<number>(0);
  const [gameState, setGameState] = useState<'SELECT' | 'RACING' | 'FINISHED'>('SELECT');
  const [distance, setDistance] = useState<number>(0); // 0 -> 100%
  const [speed, setSpeed] = useState<number>(20); // km/h
  const [lane, setLane] = useState<'left' | 'center' | 'right'>('center');
  const [starsCollected, setStarsCollected] = useState<number>(0);
  const [boostActive, setBoostActive] = useState<boolean>(false);
  const [trackPosition, setTrackPosition] = useState<number>(0);

  // Track items: stars and obstacles
  const [trackItems, setTrackItems] = useState<
    { id: number; lane: 'left' | 'center' | 'right'; y: number; type: 'star' | 'banana' | 'boost' }[]
  >([]);

  const racer = RACERS[selectedRacerIdx];

  // Start Race
  const startRace = () => {
    setGameState('RACING');
    setDistance(0);
    setSpeed(35);
    setStarsCollected(0);
    setLane('center');
    setTrackItems([
      { id: 1, lane: 'center', y: -20, type: 'star' },
      { id: 2, lane: 'left', y: -50, type: 'boost' },
      { id: 3, lane: 'right', y: -80, type: 'banana' }
    ]);
    if (soundEnabled) {
      playSpecialSound('car');
      speakVietnamese(`3, 2, 1... Xuất phát! Cố lên bạn ${racer.name}!`);
    }
  };

  // Boost action (Click, Space, Enter, Up arrow)
  const triggerBoost = () => {
    playClickSound();
    setBoostActive(true);
    setSpeed((s) => Math.min(s + 20, 110));
    setTimeout(() => setBoostActive(false), 500);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState === 'SELECT') {
        if (e.key === 'ArrowRight') setSelectedRacerIdx((p) => (p + 1) % RACERS.length);
        if (e.key === 'ArrowLeft') setSelectedRacerIdx((p) => (p - 1 + RACERS.length) % RACERS.length);
        if (e.key === 'Enter' || e.key === ' ') startRace();
        return;
      }

      if (gameState === 'RACING') {
        if (e.key === 'ArrowLeft') setLane('left');
        else if (e.key === 'ArrowRight') setLane('right');
        else if (e.key === 'ArrowDown') setLane('center');
        else if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') triggerBoost();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, racer.name]);

  // Main Race Loop (60fps)
  useEffect(() => {
    if (gameState !== 'RACING') return;
    let animId: number;

    const tick = () => {
      setTrackPosition((pos) => (pos + speed * 0.1) % 100);

      setDistance((dist) => {
        const nextDist = dist + speed * 0.003;
        if (nextDist >= 100) {
          // Finished Race!
          setGameState('FINISHED');
          if (soundEnabled) playVictoryFanfare();
          onRewardStar();
          confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
          speakVietnamese(`Chúc mừng bạn ${racer.name} đã về đích đầu tiên! Cúp vô địch!`);
          return 100;
        }
        return nextDist;
      });

      // Update track items
      setTrackItems((items) => {
        const moved = items.map((it) => ({ ...it, y: it.y + speed * 0.05 }));

        // Collision check with player (at y ≈ 70)
        moved.forEach((it) => {
          if (it.y >= 65 && it.y <= 78 && it.lane === lane) {
            if (it.type === 'star') {
              playCorrectSound();
              setStarsCollected((s) => s + 1);
              it.y = 200; // consumed
            } else if (it.type === 'boost') {
              playSpecialSound('car');
              setSpeed((s) => Math.min(s + 35, 120));
              it.y = 200;
            } else if (it.type === 'banana') {
              playWrongSound();
              setSpeed((s) => Math.max(s - 25, 20));
              it.y = 200;
            }
          }
        });

        // Filter and respawn
        const active = moved.filter((it) => it.y < 110);
        if (active.length < 3) {
          const lanes: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
          const types: ('star' | 'boost' | 'banana')[] = ['star', 'star', 'boost', 'banana'];
          active.push({
            id: Date.now() + Math.random(),
            lane: lanes[Math.floor(Math.random() * lanes.length)],
            y: -20,
            type: types[Math.floor(Math.random() * types.length)]
          });
        }
        return active;
      });

      // Natural speed decay to 40km/h
      setSpeed((s) => (s > 40 ? s - 0.15 : s));

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [gameState, speed, lane, onRewardStar, racer.name, soundEnabled]);

  // Character selection screen
  if (gameState === 'SELECT') {
    return (
      <div className="max-w-4xl mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-800 border-2 border-amber-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
          >
            <ArrowLeft className="w-5 h-5 text-amber-700" />
            <span>Về Kho Game</span>
          </button>
        </div>

        <div className="bg-gradient-to-b from-amber-100 to-orange-50 rounded-3xl p-6 sm:p-10 border-4 border-orange-300 shadow-2xl text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-amber-950 mb-3 tracking-tight">
            🏎️ Chọn Tay Đua Thú Cưng!
          </h2>
          <p className="text-base sm:text-lg font-bold text-slate-700 mb-8">
            Bé hãy chọn bạn nhỏ bé yêu thích nhất để bắt đầu chặng đua cầu vồng siêu tốc nhé!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {RACERS.map((r, idx) => {
              const isSelected = selectedRacerIdx === idx;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedRacerIdx(idx);
                  }}
                  className={`p-5 rounded-3xl border-4 transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'bg-white border-orange-500 shadow-2xl scale-105 ring-4 ring-orange-300'
                      : 'bg-white/80 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="text-5xl sm:text-6xl mb-1 animate-bounce">{r.emoji}</div>
                  <div className="text-3xl">{r.car}</div>
                  <div className="font-black text-sm sm:text-base text-slate-900 mt-1">
                    {r.name}
                  </div>
                  {isSelected && (
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-orange-500 text-white">
                      Đã Chọn ⭐
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={startRace}
            className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-2xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer tv-focus-ring"
          >
            🚀 Bắt Đầu Đua Ngay!
          </button>
        </div>
      </div>
    );
  }

  // Finished Victory Screen
  if (gameState === 'FINISHED') {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-gradient-to-b from-yellow-100 to-amber-50 rounded-3xl p-8 sm:p-12 border-4 border-yellow-400 shadow-2xl">
          <div className="text-8xl mb-4 animate-bounce">🏆🏁</div>
          <h2 className="text-3xl sm:text-5xl font-black text-amber-950 mb-3 tracking-tight">
            VỀ ĐÍCH HẠNG NHẤT!
          </h2>
          <p className="text-xl font-black text-slate-800 mb-6">
            Bạn <span className="text-orange-600">{racer.name}</span> đã chiến thắng vẻ vang!
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-200 rounded-2xl border-2 border-yellow-400 mb-8 font-black text-xl text-yellow-950">
            <span>⭐</span>
            <span>Bé thu thập được {starsCollected} Ngôi Sao Tốc Độ!</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setGameState('SELECT')}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 text-white font-black text-xl rounded-2xl shadow-lg cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Đua Lại Chặng Mới</span>
            </button>
            <button
              onClick={onExit}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-white font-black text-xl rounded-2xl shadow-lg cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Về Kho Game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Race View
  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col justify-between py-2 px-2 sm:px-4 overflow-hidden">
      {/* Top HUD */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <button
          onClick={() => setGameState('SELECT')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-amber-300 rounded-2xl font-black text-xs sm:text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-amber-700" />
          <span>Đổi Xe</span>
        </button>

        {/* Progress bar to finish */}
        <div className="flex-1 max-w-md bg-white p-2 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-3">
          <span className="text-xs font-black text-slate-700">Đích đến:</span>
          <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full rounded-full transition-all duration-100"
              style={{ width: `${distance}%` }}
            />
          </div>
          <span className="text-sm font-black text-amber-900">🏁 {Math.floor(distance)}%</span>
        </div>

        <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl font-black text-sm text-yellow-950 flex items-center gap-1.5 shadow-sm">
          <span>⭐</span>
          <span>{starsCollected}</span>
        </div>
      </div>

      {/* Main Race Track */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl bg-gradient-to-b from-sky-300 via-indigo-200 to-amber-100 flex-1 min-h-[360px] select-none">
        {/* Background Track Scenery */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/assets/images/kid_pet_racing_1794368980202.jpg"
            alt="Track"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Rainbow Road Lanes */}
        <div className="absolute inset-x-8 sm:inset-x-24 top-0 bottom-0 bg-gradient-to-b from-purple-500 via-sky-400 to-emerald-400 opacity-90 rounded-3xl border-x-8 border-yellow-300 shadow-2xl flex">
          {/* Lane 1 */}
          <div className="flex-1 border-r-2 border-dashed border-white/60 relative">
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/70 uppercase">
              Làn Trái
            </span>
          </div>
          {/* Lane 2 */}
          <div className="flex-1 border-r-2 border-dashed border-white/60 relative">
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/70 uppercase">
              Làn Giữa
            </span>
          </div>
          {/* Lane 3 */}
          <div className="flex-1 relative">
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/70 uppercase">
              Làn Phải
            </span>
          </div>
        </div>

        {/* Track Obstacles & Collectibles */}
        {trackItems.map((it) => {
          const laneLeft =
            it.lane === 'left' ? '25%' : it.lane === 'center' ? '50%' : '75%';
          return (
            <div
              key={it.id}
              style={{
                left: laneLeft,
                top: `${it.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className="absolute z-10 text-4xl sm:text-5xl transition-all duration-75 filter drop-shadow-md"
            >
              {it.type === 'star' && <span className="animate-spin text-yellow-300">⭐</span>}
              {it.type === 'boost' && <span className="animate-bounce">⚡</span>}
              {it.type === 'banana' && <span>🍌</span>}
            </div>
          );
        })}

        {/* Player Kart */}
        <div
          style={{
            left: lane === 'left' ? '25%' : lane === 'center' ? '50%' : '75%',
            top: '72%',
            transform: 'translate(-50%, -50%)'
          }}
          className={`absolute z-20 transition-all duration-200 flex flex-col items-center ${
            boostActive ? 'scale-125 filter drop-shadow-2xl' : 'scale-100'
          }`}
        >
          <div className="text-5xl sm:text-6xl animate-bounce">{racer.emoji}</div>
          <div className="text-4xl sm:text-5xl">{racer.car}</div>
          {boostActive && (
            <div className="text-2xl text-orange-400 font-black animate-ping mt-1">
              🚀 VÈO!
            </div>
          )}
        </div>

        {/* Speedometer Gauge HUD */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-2xl text-white font-black text-xs sm:text-sm flex items-center gap-2 border border-white/20">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Tốc độ: <span className="tabular-nums text-yellow-300">{Math.floor(speed)}</span> km/h</span>
        </div>

        {/* Touch & TV Controls overlay at bottom */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              onClick={() => setLane('left')}
              className="px-5 py-3 bg-white/90 hover:bg-white text-slate-900 font-black text-base rounded-2xl border-2 border-slate-300 shadow-lg active:scale-95 cursor-pointer tv-focus-ring"
            >
              ⬅️ Làn Trái
            </button>
            <button
              onClick={() => setLane('center')}
              className="px-4 py-3 bg-white/90 hover:bg-white text-slate-900 font-black text-base rounded-2xl border-2 border-slate-300 shadow-lg active:scale-95 cursor-pointer tv-focus-ring"
            >
              ⏺️ Giữa
            </button>
            <button
              onClick={() => setLane('right')}
              className="px-5 py-3 bg-white/90 hover:bg-white text-slate-900 font-black text-base rounded-2xl border-2 border-slate-300 shadow-lg active:scale-95 cursor-pointer tv-focus-ring"
            >
              Làn Phải ➡️
            </button>
          </div>

          {/* Big Boost Button */}
          <button
            onClick={triggerBoost}
            className="flex-1 sm:flex-initial px-8 py-3.5 bg-gradient-to-r from-orange-500 via-rose-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
          >
            <Zap className="w-6 h-6 fill-current text-yellow-300" />
            <span>NHẤN TĂNG TỐC!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
