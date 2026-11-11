import React from 'react';
import { Volume2, VolumeX, Tv, Sparkles, PlusCircle, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmActive: boolean;
  onToggleBgm: () => void;
  onOpenArchitect: () => void;
  onOpenSync: () => void;
  activeFilter: 'all' | 'quiz' | 'matching_puzzle';
  onChangeFilter: (f: 'all' | 'quiz' | 'matching_puzzle') => void;
  isGameActive: boolean;
  onBackToHub: () => void;
  starsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  bgmActive,
  onToggleBgm,
  onOpenArchitect,
  onOpenSync,
  activeFilter,
  onChangeFilter,
  isGameActive,
  onBackToHub,
  starsCount
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-4 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={onBackToHub}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
            🌟
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-amber-900">
                Kid Game Hub
              </span>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                3-5 Tuổi
              </span>
            </div>
            <p className="text-[11px] text-amber-700/80 font-medium hidden sm:block">
              Trò Chơi Giáo Dục Mầm Non & Smart TV
            </p>
          </div>
        </button>

        {/* Zone 2: Navigation Links / Interactive Filters */}
        {!isGameActive ? (
          <div className="hidden md:flex items-center gap-1.5 p-1 bg-amber-100/70 rounded-2xl border border-amber-200">
            <button
              onClick={() => onChangeFilter('all')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              🎡 Tất Cả Trò Chơi
            </button>
            <button
              onClick={() => onChangeFilter('quiz')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'quiz'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              🦁 Đố Vui Âm Thanh
            </button>
            <button
              onClick={() => onChangeFilter('matching_puzzle')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === 'matching_puzzle'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-900 hover:bg-amber-200/60'
              }`}
            >
              🧩 Ghép Đôi Hình Ảnh
            </button>
          </div>
        ) : (
          <button
            onClick={onBackToHub}
            className="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-sm rounded-2xl border border-amber-300 transition-all cursor-pointer shadow-sm"
          >
            🏠 Về Kho Trò Chơi (Trang Chủ)
          </button>
        )}

        {/* Zone 3: Actions & Indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Star collection reward pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-2xl border border-yellow-300 font-black text-sm shadow-inner">
            <span className="text-base animate-bounce">⭐</span>
            <span className="tabular-nums">{starsCount}</span>
            <span className="text-xs font-semibold text-yellow-700 hidden sm:inline">sao</span>
          </div>

          {/* Sound FX Button */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          {/* Background Chime Music Toggle */}
          <button
            onClick={onToggleBgm}
            title={bgmActive ? 'Tắt nhạc nền' : 'Bật nhạc nền vui nhộn'}
            className={`px-2.5 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer hidden sm:flex items-center gap-1.5 ${
              bgmActive
                ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
          >
            <span>🎵</span>
            <span>{bgmActive ? 'Nhạc: Bật' : 'Nhạc: Tắt'}</span>
          </button>

          {/* Smart TV / GitHub Sync Status */}
          <button
            onClick={onOpenSync}
            title="Đồng bộ GitHub & Smart TV"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Tv className="w-4 h-4 text-sky-600" />
            <span className="hidden lg:inline">Smart TV Sync</span>
          </button>

          {/* Game Architect Button */}
          <button
            onClick={onOpenArchitect}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition-all cursor-pointer hover:shadow-orange-400/40 hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Tạo Game Mới</span>
          </button>

          {/* Fullscreen Button for TV view */}
          <button
            onClick={toggleFullscreen}
            title="Bật/Tắt chế độ Toàn Màn Hình cho TV"
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 text-xs font-medium transition-all cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
