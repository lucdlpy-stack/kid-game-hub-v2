import React from 'react';
import { Game } from '../types/game';
import { Play } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
  isFocused?: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelect, isFocused }) => {
  const [bannerFailed, setBannerFailed] = React.useState(false);

  const handleClick = () => {
    playClickSound();
    onSelect(game);
  };

  // Color theme palettes based on game type
  const getThemeStyles = () => {
    switch (game.gameType) {
      case 'camera_transform':
        return {
          cardBg: 'bg-gradient-to-b from-emerald-100/90 to-teal-50',
          borderColor: 'border-emerald-400 hover:border-emerald-600',
          badgeBg: 'bg-emerald-200 text-emerald-950 font-black',
          buttonBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white',
          typeLabel: 'Camera Biến Hình Hoạt Hình',
          badgeIcon: '✨'
        };
      case 'camera_ar':
        return {
          cardBg: 'bg-gradient-to-b from-sky-100/90 to-cyan-50',
          borderColor: 'border-cyan-400 hover:border-cyan-600',
          badgeBg: 'bg-cyan-200 text-cyan-950 font-black',
          buttonBg: 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700 text-white',
          typeLabel: 'Camera Bắt Bong Bóng',
          badgeIcon: '🫧'
        };
      case 'camera_faces':
        return {
          cardBg: 'bg-gradient-to-b from-rose-100/90 to-pink-50',
          borderColor: 'border-pink-400 hover:border-pink-600',
          badgeBg: 'bg-pink-200 text-pink-950 font-black',
          buttonBg: 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white',
          typeLabel: 'Camera Gương Thần & Mặt Nạ',
          badgeIcon: '🪞'
        };
      case 'camera_stars':
        return {
          cardBg: 'bg-gradient-to-b from-indigo-100/90 to-purple-50',
          borderColor: 'border-indigo-400 hover:border-indigo-600',
          badgeBg: 'bg-indigo-200 text-indigo-950 font-black',
          buttonBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white',
          typeLabel: 'Camera Bắt Sao Vũ Trụ',
          badgeIcon: '⭐'
        };
      case 'archery_fun':
        return {
          cardBg: 'bg-gradient-to-b from-amber-100/90 to-orange-50',
          borderColor: 'border-amber-400 hover:border-amber-600',
          badgeBg: 'bg-amber-200 text-amber-950 font-black',
          buttonBg: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white',
          typeLabel: 'Bắn Cung Tên Đồ Chơi',
          badgeIcon: '🏹'
        };
      case 'obstacle_runner':
        return {
          cardBg: 'bg-gradient-to-b from-teal-100/90 to-emerald-50',
          borderColor: 'border-teal-400 hover:border-teal-600',
          badgeBg: 'bg-teal-200 text-teal-950 font-black',
          buttonBg: 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white',
          typeLabel: 'Vượt Chướng Ngại Vật',
          badgeIcon: '🏃'
        };
      case 'pet_racer':
        return {
          cardBg: 'bg-gradient-to-b from-rose-100/90 to-orange-50',
          borderColor: 'border-rose-400 hover:border-rose-600',
          badgeBg: 'bg-rose-200 text-rose-950 font-black',
          buttonBg: 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white',
          typeLabel: 'Đua Xe Kịch Tính',
          badgeIcon: '🏎️'
        };
      case 'music_piano':
        return {
          cardBg: 'bg-gradient-to-b from-indigo-100/90 to-purple-50',
          borderColor: 'border-indigo-400 hover:border-indigo-600',
          badgeBg: 'bg-indigo-200 text-indigo-950 font-black',
          buttonBg: 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white',
          typeLabel: 'Đàn Phím Âm Nhạc',
          badgeIcon: '🎹'
        };
      case 'action_wheel':
        return {
          cardBg: 'bg-gradient-to-b from-emerald-100/90 to-teal-50',
          borderColor: 'border-emerald-400 hover:border-emerald-600',
          badgeBg: 'bg-emerald-200 text-emerald-950 font-black',
          buttonBg: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white',
          typeLabel: 'Vận Động Khỏe Vui',
          badgeIcon: '🎡'
        };
      case 'quiz':
        return {
          cardBg: 'bg-gradient-to-b from-amber-50 to-orange-50/70',
          borderColor: 'border-orange-300 hover:border-orange-500',
          badgeBg: 'bg-orange-100 text-orange-900',
          buttonBg: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white',
          typeLabel: 'Đố Vui Hình Ảnh',
          badgeIcon: '🦁'
        };
      case 'matching_puzzle':
      default:
        return {
          cardBg: 'bg-gradient-to-b from-sky-50 to-indigo-50/70',
          borderColor: 'border-sky-300 hover:border-sky-500',
          badgeBg: 'bg-sky-100 text-sky-900',
          buttonBg: 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white',
          typeLabel: 'Ghép Hình Tương Ứng',
          badgeIcon: '🧩'
        };
    }
  };

  const themeStyles = getThemeStyles();

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
      } tv-focus-ring overflow-hidden`}
    >
      {/* Optional decorative banner image preview */}
      {game.bannerImage && !bannerFailed && (
        <div className="absolute inset-0 z-0 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none">
          <img
            src={game.bannerImage}
            alt=""
            onError={() => setBannerFailed(true)}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Top Bar with Icon & Age Tag */}
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-3 border-amber-300 shadow-md flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-110 transition-transform select-none shrink-0 overflow-hidden font-['Apple_Color_Emoji','Segoe_UI_Emoji','Segoe_UI_Symbol','Noto_Color_Emoji',sans-serif]">
            {game.icon && game.icon.trim() ? (
              <span className="leading-none drop-shadow-sm">{game.icon}</span>
            ) : (
              <span className="leading-none drop-shadow-sm">🎮</span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`text-xs font-black px-3 py-1 rounded-full ${themeStyles.badgeBg} shadow-xs`}>
              {themeStyles.badgeIcon} {themeStyles.typeLabel}
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
          <span>Hình ảnh to rõ</span>
          <span aria-hidden="true">·</span>
          <span>Smart TV & HDMI</span>
        </div>
      </div>

      {/* Big Action Button */}
      <button
        type="button"
        tabIndex={-1}
        className={`relative z-10 w-full py-3.5 sm:py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-md group-hover:shadow-lg transition-all ${themeStyles.buttonBg}`}
      >
        <Play className="w-5 h-5 fill-current" />
        <span>Vào Chơi Nào Bé Ơi!</span>
      </button>
    </div>
  );
};
