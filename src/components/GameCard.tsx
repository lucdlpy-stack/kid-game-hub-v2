import React from 'react';
import { Game } from '../types/game';
import { Play, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  isFocused?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect, isFocused }) => {
  const isQuiz = game.gameType === 'quiz';
  const itemCount = isQuiz
    ? (game as { interactiveQuestions: unknown[] }).interactiveQuestions.length
    : (game as { puzzlePairs: unknown[] }).puzzlePairs.length;

  const handleClick = () => {
    playClickSound();
    onSelect(game);
  };

  // Color theme palettes based on game type
  const themeStyles = isQuiz
    ? {
        cardBg: 'bg-gradient-to-b from-amber-50 to-orange-50/70',
        borderColor: 'border-orange-300 hover:border-orange-500',
        badgeBg: 'bg-orange-100 text-orange-900',
        buttonBg: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white',
        typeLabel: 'Đố Vui Âm Thanh',
        countLabel: `${itemCount} câu hỏi`
      }
    : {
        cardBg: 'bg-gradient-to-b from-sky-50 to-indigo-50/70',
        borderColor: 'border-sky-300 hover:border-sky-500',
        badgeBg: 'bg-sky-100 text-sky-900',
        buttonBg: 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white',
        typeLabel: 'Ghép Hình Tương Ứng',
        countLabel: `${itemCount} cặp ghép`
      };

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative group rounded-3xl p-5 sm:p-6 border-4 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-2xl hover:-translate-y-1.5 ${themeStyles.cardBg} ${themeStyles.borderColor} ${
        isFocused ? 'tv-focused' : ''
      } tv-focus-ring`}
    >
      {/* Top Bar with Icon & Age Tag */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-slate-200 shadow-inner flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform">
            {game.icon}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs font-black px-3 py-1 rounded-full ${themeStyles.badgeBg} shadow-xs`}>
              {themeStyles.typeLabel}
            </span>
            <span className="text-[11px] font-bold text-slate-500">
              {game.ageGroup || '3-5 tuổi'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-amber-800 transition-colors">
          {game.title}
        </h3>

        {/* Description */}
        <p className="text-sm font-semibold text-slate-600 mb-4 line-clamp-2">
          {game.description}
        </p>

        {/* Clean metadata without pill boxes */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-5">
          <span>{game.ageGroup}</span>
          <span aria-hidden="true">·</span>
          <span>{themeStyles.countLabel}</span>
          <span aria-hidden="true">·</span>
          <span>Smart TV</span>
        </div>
      </div>

      {/* Big Action Button */}
      <button
        type="button"
        tabIndex={-1}
        className={`w-full py-3.5 sm:py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg transition-all ${themeStyles.buttonBg}`}
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Vào Chơi Nào!</span>
      </button>
    </div>
  );
};
