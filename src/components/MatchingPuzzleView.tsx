import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { MatchingPuzzleGame, PuzzlePair } from '../types/game';
import {
  playCorrectSound,
  playWrongSound,
  playVictoryFanfare,
  playClickSound,
  speakVietnamese
} from '../utils/audio';
import { ArrowLeft, RotateCcw, Volume2, CheckCircle, HelpCircle, Sparkles } from 'lucide-react';

interface MatchingPuzzleViewProps {
  game: MatchingPuzzleGame;
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const MatchingPuzzleView: React.FC<MatchingPuzzleViewProps> = ({
  game,
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightTarget, setSelectedRightTarget] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shakePair, setShakePair] = useState<boolean>(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [shuffledTargets, setShuffledTargets] = useState<{ matchTarget: string; targetSymbol?: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize and shuffle target list
  useEffect(() => {
    handleRestart();
  }, [game]);

  const handleRestart = () => {
    setSelectedLeftId(null);
    setSelectedRightTarget(null);
    setMatchedIds([]);
    setShakePair(false);
    setActiveHint(null);
    setIsCompleted(false);

    // Shuffle targets on the right side
    const targets = game.puzzlePairs.map((p) => ({
      matchTarget: p.matchTarget,
      targetSymbol: p.targetSymbol || '🌟'
    }));
    // Fisher-Yates shuffle
    const shuffled = [...targets].sort(() => Math.random() - 0.5);
    setShuffledTargets(shuffled);

    if (soundEnabled) {
      speakVietnamese(`Bé hãy ghép đôi cho trò chơi: ${game.title}`);
    }
  };

  const handleSelectLeft = (pair: PuzzlePair) => {
    if (matchedIds.includes(pair.id)) return;
    playClickSound();
    setSelectedLeftId(pair.id);
    setActiveHint(pair.hint);
    if (soundEnabled) {
      speakVietnamese(pair.name);
    }
  };

  const handleSelectRight = (targetText: string) => {
    if (matchedIds.some((id) => game.puzzlePairs.find((p) => p.id === id)?.matchTarget === targetText)) {
      return; // Already solved
    }

    playClickSound();
    setSelectedRightTarget(targetText);

    if (!selectedLeftId) {
      // If no left card was selected yet, encourage user to pick one
      speakVietnamese('Bé hãy bấm chọn một hình ở bên trái trước nhé!');
      return;
    }

    const currentPair = game.puzzlePairs.find((p) => p.id === selectedLeftId);
    if (!currentPair) return;

    if (currentPair.matchTarget === targetText) {
      // 1. NHÁY XANH KHI ĐÚNG
      if (soundEnabled) {
        playCorrectSound();
      }
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
      speakVietnamese(`Hoan hô! ${currentPair.name} đi cùng ${targetText}!`);
      onRewardStar();

      const nextMatched = [...matchedIds, currentPair.id];
      setMatchedIds(nextMatched);
      setSelectedLeftId(null);
      setSelectedRightTarget(null);
      setActiveHint(null);

      // Check if all pairs are solved
      if (nextMatched.length === game.puzzlePairs.length) {
        setTimeout(() => {
          setIsCompleted(true);
          if (soundEnabled) {
            playVictoryFanfare();
          }
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.5 }
          });
        }, 800);
      }
    } else {
      // 2. NHÁY ĐỎ KHI SAI
      if (soundEnabled) {
        playWrongSound();
      }
      setShakePair(true);
      speakVietnamese('Chưa khớp rồi! Bé thử ghép lại nhé!');
      setTimeout(() => {
        setSelectedRightTarget(null);
        setShakePair(false);
      }, 1000);
    }
  };

  // Celebration Finished screen
  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <div className="bg-gradient-to-b from-sky-100 via-indigo-50 to-white rounded-3xl p-8 sm:p-12 border-4 border-sky-300 shadow-2xl">
          <div className="text-7xl sm:text-8xl mb-4 animate-bounce">🧩🎉</div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
            Bé Thật Tài Tình!
          </h2>

          <p className="text-lg sm:text-xl font-bold text-slate-700 mb-6">
            Bé đã ghép đúng toàn bộ các mảnh ghép trong <span className="text-sky-600 font-black">{game.title}</span>!
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-200 border-2 border-yellow-400 rounded-2xl mb-8 shadow-sm">
            <span className="text-3xl">⭐</span>
            <span className="text-xl sm:text-2xl font-black text-yellow-950">
              Bé nhận trọn bộ {game.puzzlePairs.length} Ngôi Sao Xuất Sắc!
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Chơi Lại Trò Này</span>
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-black text-xl rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Chọn Trò Khác</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-sky-50 text-slate-800 border-2 border-sky-300 rounded-2xl font-extrabold text-sm sm:text-base shadow-sm transition-all cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-white/95 border-2 border-sky-200 rounded-2xl shadow-sm">
          <span className="text-sm font-black text-slate-700">
            Tiến độ: {matchedIds.length} / {game.puzzlePairs.length} cặp
          </span>
          <div className="w-28 sm:w-36 bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-300">
            <div
              className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${(matchedIds.length / game.puzzlePairs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Guide Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-sky-100 to-indigo-100 rounded-3xl border-3 border-sky-300 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🧩</span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {game.title}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              Bé bấm chọn 1 hình ở cột TRÁI 👉 rồi bấm chọn mục tiêu tương ứng ở cột PHẢI nhé!
            </p>
          </div>
        </div>

        {activeHint && (
          <div className="px-4 py-2 bg-white/90 border border-sky-300 rounded-2xl text-xs sm:text-sm font-extrabold text-indigo-900 flex items-center gap-2 shadow-xs">
            <HelpCircle className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Gợi ý: {activeHint}</span>
          </div>
        )}
      </div>

      {/* Puzzle Matching Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
        {/* Left Column: Items */}
        <div className="space-y-3">
          <div className="text-center font-black text-slate-800 text-base sm:text-lg mb-2 flex items-center justify-center gap-2">
            <span>👈</span>
            <span>CỘT ĐỐI TƯỢNG (Chọn trước)</span>
          </div>

          {game.puzzlePairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedLeftId === pair.id;

            let cardClass =
              'bg-white border-slate-300 hover:border-amber-400 text-slate-900 shadow-md';

            if (isMatched) {
              cardClass =
                'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-90 cursor-default';
            } else if (isSelected) {
              if (shakePair) {
                cardClass = 'bg-rose-500 border-rose-600 text-white animate-shake shadow-xl';
              } else {
                cardClass =
                  'bg-amber-400 border-amber-500 text-amber-950 scale-102 shadow-xl ring-4 ring-amber-300/60';
              }
            }

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectLeft(pair)}
                className={`w-full min-h-[72px] sm:min-h-[84px] px-4 py-3 rounded-2xl border-4 font-black text-lg sm:text-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${cardClass} tv-focus-ring`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{pair.symbol}</span>
                  <span className="text-left font-black">{pair.name}</span>
                </div>

                {isMatched ? (
                  <CheckCircle className="w-7 h-7 text-emerald-600 shrink-0" />
                ) : isSelected ? (
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-white text-amber-950 shadow-xs animate-pulse">
                    Đang chọn 👉
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Chọn</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Column: Targets (Shuffled) */}
        <div className="space-y-3">
          <div className="text-center font-black text-slate-800 text-base sm:text-lg mb-2 flex items-center justify-center gap-2">
            <span>CỘT TƯƠNG ỨNG (Chọn sau)</span>
            <span>👉</span>
          </div>

          {shuffledTargets.map((item, idx) => {
            const matchedPair = game.puzzlePairs.find(
              (p) => p.matchTarget === item.matchTarget && matchedIds.includes(p.id)
            );
            const isMatched = !!matchedPair;
            const isSelected = selectedRightTarget === item.matchTarget;

            let cardClass =
              'bg-white border-slate-300 hover:border-sky-400 text-slate-900 shadow-md';

            if (isMatched) {
              cardClass =
                'bg-emerald-100 border-emerald-400 text-emerald-950 opacity-90 cursor-default';
            } else if (isSelected) {
              if (shakePair) {
                // RED FLASH & SHAKE
                cardClass = 'bg-rose-500 border-rose-600 text-white animate-shake shadow-xl';
              } else {
                // GREEN FLASH
                cardClass =
                  'bg-emerald-500 border-emerald-600 text-white scale-102 shadow-xl ring-4 ring-emerald-300/60 animate-flash-green';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectRight(item.matchTarget)}
                className={`w-full min-h-[72px] sm:min-h-[84px] px-4 py-3 rounded-2xl border-4 font-black text-lg sm:text-xl flex items-center justify-between gap-3 transition-all cursor-pointer ${cardClass} tv-focus-ring`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{item.targetSymbol}</span>
                  <span className="text-left font-black">{item.matchTarget}</span>
                </div>

                {isMatched ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-black text-xs sm:text-sm">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <span>Khớp!</span>
                  </div>
                ) : (
                  <span className="text-xs font-bold text-slate-400">Ghép</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TV Guide */}
      <div className="p-3 bg-white/70 rounded-2xl border border-sky-200 text-center text-xs sm:text-sm font-bold text-slate-600 shadow-xs">
        📺 <span className="font-extrabold text-sky-900">Mẹo Smart TV:</span> Dùng chuột hoặc điều khiển TV để bấm chọn cặp tương ứng. Bé hoàn thành đủ {game.puzzlePairs.length} cặp để nhận cúp vàng!
      </div>
    </div>
  );
};
