import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Tv,
  Sparkles,
  PlusCircle,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Bot,
  Home,
  Camera,
  Flame,
  Award,
  Menu,
  X,
  Music
} from 'lucide-react';

interface SidebarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  bgmActive: boolean;
  onToggleBgm: () => void;
  onOpenLeaderboard: () => void;
  onOpenSync: () => void;
  onOpenAiDino: () => void;
  onOpenBadges: () => void;
  activeFilter: 'all' | 'camera' | 'quiz' | 'matching_puzzle' | 'dynamic';
  onChangeFilter: (f: 'all' | 'camera' | 'quiz' | 'matching_puzzle' | 'dynamic') => void;
  isGameActive: boolean;
  onBackToHub: () => void;
  starsCount: number;
  hdmiMode: boolean;
  onToggleHdmiMode: () => void;
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'starry';
  onChangeSeason: (s: 'spring' | 'summer' | 'autumn' | 'winter' | 'starry') => void;
}

interface NavItem {
  id: 'all' | 'camera' | 'quiz' | 'matching_puzzle' | 'dynamic';
  label: string;
  icon: string;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  soundEnabled,
  onToggleSound,
  bgmActive,
  onToggleBgm,
  onOpenLeaderboard,
  onOpenSync,
  onOpenAiDino,
  onOpenBadges,
  activeFilter,
  onChangeFilter,
  isGameActive,
  onBackToHub,
  starsCount,
  hdmiMode,
  onToggleHdmiMode,
  season,
  onChangeSeason
}) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const navItems: NavItem[] = [
    { id: 'all', label: 'Tất Cả Trò Chơi', icon: '🎡' },
    { id: 'camera', label: 'Trò Chơi Camera', icon: '🫧', badge: '4 game Hot' },
    { id: 'dynamic', label: 'Đua Xe & Bắn Cung', icon: '🏎️', badge: 'Kịch tính' },
    { id: 'quiz', label: 'Đố Vui Hình Ảnh', icon: '🦁' },
    { id: 'matching_puzzle', label: 'Ghép Hình Dễ Thương', icon: '🧩' }
  ];

  return (
    <>
      {/* Floating Toggle Button on Mobile / Tablet */}
      <button
        onClick={() => setIsOpenMobile((prev) => !prev)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-amber-500 text-white rounded-2xl shadow-xl border-2 border-white flex items-center justify-center cursor-pointer active:scale-95"
        title="Mở Menu Điều Hướng"
      >
        {isOpenMobile ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop for Mobile */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs"
        />
      )}

      {/* Fixed Vertical Sidebar on Left */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 sm:w-80 bg-white/95 backdrop-blur-md border-r-4 border-amber-300 shadow-2xl flex flex-col justify-between p-4 sm:p-5 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Section: Brand & Copyright */}
        <div className="space-y-4">
          {/* Brand Wordmark */}
          <button
            onClick={() => {
              onBackToHub();
              setIsOpenMobile(false);
            }}
            className="w-full flex items-center gap-3 p-2 rounded-2xl hover:bg-amber-50 transition-all text-left cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-110 transition-transform">
              🌟
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-amber-950">
                  Thế giới trò chơi
                </span>
              </div>
              <span className="text-[11px] font-black bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full inline-block mt-0.5">
                Mầm Non 3-5 Tuổi
              </span>
            </div>
          </button>

          {/* GHI CHÚ BẢN QUYỀN NỔI BẬT THEO YÊU CẦU */}
          <div className="p-3 bg-gradient-to-r from-amber-100 via-yellow-100 to-orange-100 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center gap-2.5">
            <span className="text-xl">👑</span>
            <div>
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                Tác giả & Chủ sở hữu
              </div>
              <div className="text-xs font-black text-amber-950">
                Bản quyền: Dương Thị Minh Khiêm
              </div>
            </div>
          </div>

          {/* Star Counter & Badges Profile Pill - CLICK TO OPEN BADGES */}
          <button
            onClick={() => {
              onOpenBadges();
              setIsOpenMobile(false);
            }}
            className="w-full flex items-center justify-between p-3 bg-yellow-100/90 hover:bg-yellow-200/90 rounded-2xl border-2 border-yellow-300 shadow-inner cursor-pointer transition-transform active:scale-95 text-left"
            title="Bấm để xem Thành Tựu Nhỏ và Huy Hiệu của bé!"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-400 text-yellow-950 flex items-center justify-center font-black text-base shadow-xs">
                🏆
              </div>
              <div>
                <div className="text-xs font-black text-yellow-950">Thành Tựu Nhỏ</div>
                <div className="text-[10px] font-bold text-amber-800">Bé có {starsCount} sao ⭐</div>
              </div>
            </div>
            <Award className="w-5 h-5 text-amber-700" />
          </button>

          {/* Active Game Back Button */}
          {isGameActive && (
            <button
              onClick={() => {
                onBackToHub();
                setIsOpenMobile(false);
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer animate-pulse-subtle"
            >
              <Home className="w-5 h-5" />
              <span>Về Trang Chủ (Kho Game)</span>
            </button>
          )}

          {/* Vertical Navigation Filter Tabs */}
          <div className="space-y-1.5 pt-2">
            <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider px-2">
              Danh Mục Trò Chơi:
            </div>
            {navItems.map((item) => {
              const isActive = activeFilter === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangeFilter(item.id);
                    setIsOpenMobile(false);
                  }}
                  className={`w-full p-3 rounded-2xl font-black text-sm flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md scale-102 ring-2 ring-amber-300'
                      : 'bg-white hover:bg-amber-100/70 text-slate-800 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white text-amber-900' : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Section: Utility Tools (HDMI, AI Dino, Audio, Fullscreen) */}
        <div className="space-y-2 pt-4 border-t-2 border-amber-200 mt-4">
          {/* Weather Season Selector Pill Box */}
          <div className="p-2.5 bg-amber-50 rounded-2xl border-2 border-amber-200 space-y-1.5">
            <div className="text-[11px] font-black text-amber-900 flex items-center justify-between">
              <span>🌦️ Thời Tiết Bốn Mùa:</span>
              <span className="text-[10px] font-bold text-amber-700">
                {season === 'spring'
                  ? '🌸 Hoa Đào'
                  : season === 'summer'
                  ? '☀️ Nắng Hè'
                  : season === 'autumn'
                  ? '🍁 Lá Vàng'
                  : season === 'winter'
                  ? '❄️ Tuyết Rơi'
                  : '⭐ Mưa Sao'}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {[
                { id: 'spring', label: '🌸', title: 'Mùa Xuân' },
                { id: 'summer', label: '☀️', title: 'Mùa Hè' },
                { id: 'autumn', label: '🍁', title: 'Mùa Thu' },
                { id: 'winter', label: '❄️', title: 'Mùa Đông' },
                { id: 'starry', label: '⭐', title: 'Mưa Sao' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => onChangeSeason(s.id as any)}
                  title={s.title}
                  className={`py-1 rounded-xl text-base flex items-center justify-center transition-all cursor-pointer ${
                    season === s.id
                      ? 'bg-amber-400 text-amber-950 scale-110 shadow-xs ring-2 ring-amber-500'
                      : 'bg-white hover:bg-amber-100 text-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-black uppercase text-slate-500 tracking-wider px-2">
            Tiện Ích Smart TV & Trợ Lý:
          </div>

          {/* Cổng HDMI TV Mode */}
          <button
            onClick={onToggleHdmiMode}
            className={`w-full p-2.5 rounded-xl border-2 font-black text-xs flex items-center justify-between transition-all cursor-pointer ${
              hdmiMode
                ? 'bg-purple-600 text-white border-purple-700 shadow-md ring-2 ring-purple-300'
                : 'bg-slate-50 hover:bg-purple-50 text-purple-950 border-purple-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <MonitorPlay className="w-4 h-4 text-purple-500" />
              <span>Cổng HDMI TV (1080p/4K)</span>
            </div>
            <span className="text-[10px] font-bold">
              {hdmiMode ? 'ĐANG BẬT' : 'TẮT'}
            </span>
          </button>

          {/* AI Dino Buddy */}
          <button
            onClick={() => {
              onOpenAiDino();
              setIsOpenMobile(false);
            }}
            className="w-full p-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-black text-xs shadow-sm flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>Bạn Khủng Long Dino (AI)</span>
            </div>
            <span className="text-sm">🦖</span>
          </button>

          {/* Audio & Music quick buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onToggleSound}
              className={`p-2 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Hiệu ứng' : 'Tắt âm'}</span>
            </button>

            <button
              onClick={onToggleBgm}
              className={`p-2 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                bgmActive
                  ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                  : 'bg-slate-100 text-slate-500 border-slate-300'
              }`}
              title="Bật/Tắt nhạc nền mầm non 5 bài liên tục"
            >
              <Music className="w-4 h-4" />
              <span>{bgmActive ? 'Nhạc: Bật 🎵' : 'Nhạc: Tắt'}</span>
            </button>
          </div>

          {/* Smart TV Sync & Architect */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenSync();
                setIsOpenMobile(false);
              }}
              className="p-2 bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>TV Sync</span>
            </button>

            <button
              onClick={() => {
                onOpenLeaderboard();
                setIsOpenMobile(false);
              }}
              className="p-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-950 border border-yellow-300 rounded-xl font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-yellow-700" />
              <span>Bảng Xếp Hạng</span>
            </button>
          </div>

          {/* Fullscreen TV button */}
          <button
            onClick={toggleFullscreen}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs border border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Thu Nhỏ Màn Hình' : 'Toàn Màn Hình TV'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
