import React from 'react';
import { Volume2, VolumeX, Tv, Sparkles, PlusCircle, Maximize2, Minimize2, MonitorPlay, Bot } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmActive: boolean;
  onToggleBgm: () => void;
  onOpenArchitect: () => void;
  onOpenSync: () => void;
  onOpenAiDino: () => void;
  activeFilter: 'all' | 'quiz' | 'matching_puzzle' | 'dynamic';
  onChangeFilter: (f: 'all' | 'quiz' | 'matching_puzzle' | 'dynamic') => void;
  isGameActive: boolean;
  onBackToHub: () => void;
  starsCount: number;
  hdmiMode: boolean;
  onToggleHdmiMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  bgmActive,
  onToggleBgm,
  onOpenArchitect,
  onOpenSync,
  onOpenAiDino,
  activeFilter,
  onChangeFilter,
  isGameActive,
  onBackToHub,
  starsCount,
  hdmiMode,
  onToggleHdmiMode
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200 shadow-sm px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Top Row: Zone 1 (Wordmark) & Zone 3 Right Corner (Copyright: Dương Thị Minh Khiêm) */}
        <div className="w-full flex items-center justify-between gap-3">
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
                Hoạt Hình · Âm Thanh · Camera · AI · Smart TV & HDMI
              </p>
            </div>
          </button>

          {/* GHI CHÚ BẢN QUYỀN Ở GÓC TRÊN BÊN PHẢI MÀN HÌNH THEO YÊU CẦU */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 rounded-2xl shadow-xs flex items-center gap-1.5">
              <span className="text-sm">👑</span>
              <span className="text-xs font-black text-amber-950 tracking-tight whitespace-nowrap">
                Bản quyền: Dương Thị Minh Khiêm
              </span>
            </div>
          </div>
        </div>

        {/* Lower Row / Middle Controls: Filter Tabs + Actions */}
        <div className="w-full flex items-center justify-between gap-2 pt-1 border-t border-amber-100 md:border-none md:pt-0">
          {/* Zone 2: Interactive Filter Controls */}
          {!isGameActive ? (
            <div className="flex items-center gap-1 p-1 bg-amber-100/70 rounded-2xl border border-amber-200 overflow-x-auto">
              <button
                onClick={() => onChangeFilter('all')}
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                🎡 Tất Cả
              </button>
              <button
                onClick={() => onChangeFilter('dynamic')}
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'dynamic'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                🫧 Camera & Đua Xe
              </button>
              <button
                onClick={() => onChangeFilter('quiz')}
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'quiz'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                🦁 Đố Vui
              </button>
              <button
                onClick={() => onChangeFilter('matching_puzzle')}
                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeFilter === 'matching_puzzle'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-amber-900 hover:bg-amber-200/60'
                }`}
              >
                🧩 Ghép Hình
              </button>
            </div>
          ) : (
            <button
              onClick={onBackToHub}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-xs sm:text-sm rounded-2xl border border-amber-300 cursor-pointer shadow-xs"
            >
              🏠 Về Trang Chủ
            </button>
          )}

          {/* Action Tools: Star count, AI Dino, HDMI Mode, Sound, Fullscreen */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Stars pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-100 text-yellow-900 rounded-xl border border-yellow-300 font-black text-xs shadow-inner">
              <span className="text-sm">⭐</span>
              <span className="tabular-nums">{starsCount}</span>
            </div>

            {/* AI Dino Buddy Button */}
            <button
              onClick={onOpenAiDino}
              title="Trò chuyện AI cùng Bạn Khủng Long Dino"
              className="px-2.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs rounded-xl shadow-sm flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">AI Bạn Dino</span>
            </button>

            {/* HDMI TV Mode Toggle */}
            <button
              onClick={onToggleHdmiMode}
              title="Chế độ chiếu HDMI sang TV 4K (Tối ưu tỷ lệ, viền và font to)"
              className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
                hdmiMode
                  ? 'bg-purple-600 text-white border-purple-700 shadow-md ring-2 ring-purple-300'
                  : 'bg-white hover:bg-purple-50 text-purple-900 border-purple-300'
              }`}
            >
              <MonitorPlay className="w-4 h-4" />
              <span className="hidden sm:inline">{hdmiMode ? 'HDMI TV: Bật' : 'Cổng HDMI TV'}</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Game Architect Button */}
            <button
              onClick={onOpenArchitect}
              title="Kiến trúc sư thiết kế trò chơi"
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden lg:inline">Tạo Game</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title="Toàn màn hình"
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
