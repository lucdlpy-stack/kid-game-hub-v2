import React from 'react';
import { Sparkles, Tv, Volume2, Award, Zap } from 'lucide-react';
import { speakVietnamese } from '../utils/audio';

interface HeroBannerProps {
  totalGames: number;
  totalStars: number;
  onQuickStart: () => void;
  tvRemoteVisible: boolean;
  onToggleTvRemote: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  totalGames,
  totalStars,
  onQuickStart,
  tvRemoteVisible,
  onToggleTvRemote
}) => {
  const handleWelcomeSpeech = () => {
    speakVietnamese('Chào mừng các bé yêu đến với Kid Game Hub! Chúng mình cùng chơi đố vui và ghép hình thông minh nhé!');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-1 shadow-xl border-4 border-amber-300 mb-8">
      {/* Background illustration */}
      <div className="relative rounded-[22px] overflow-hidden bg-white/90">
        <div className="relative min-h-[220px] sm:min-h-[260px] flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 gap-6">
          {/* Background image overlay with scrim */}
          <img
            src="/src/assets/images/kid_banner_fun_1794364848216.jpg"
            alt="Kid Game Hub World"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />

          {/* Left Text Zone */}
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 border border-amber-300 rounded-full text-xs font-black text-amber-900 mb-3 shadow-sm">
              <span className="animate-spin text-sm">✨</span>
              <span>DÀNH RIÊNG CHO TRẺ TỪ 3 ĐẾN 5 TUỔI & SMART TV</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
              Vừa Chơi Vừa Học,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600">
                Bé Thông Minh!
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-bold mb-5 leading-relaxed">
              Thế giới trò chơi hoạt hình rực rỡ với âm thanh sống động, câu đố nhận biết, ghép đôi vũ trụ & muông thú. Nút bấm siêu to thích hợp cho Smart TV và máy tính bảng!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onQuickStart}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-lg rounded-2xl shadow-lg hover:shadow-emerald-400/50 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 tv-focus-ring"
              >
                <span>🎮</span>
                <span>Chơi Ngay Nào Bé Ơi!</span>
              </button>

              <button
                onClick={handleWelcomeSpeech}
                title="Bấm để nghe cô đọc lời chào"
                className="px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-sm rounded-2xl border-2 border-amber-300 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
              >
                <Volume2 className="w-5 h-5 text-amber-700" />
                <span>Nghe Cô Chào</span>
              </button>

              <button
                onClick={onToggleTvRemote}
                className={`px-4 py-3 font-extrabold text-sm rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                  tvRemoteVisible
                    ? 'bg-sky-500 text-white border-sky-600 shadow-sky-300'
                    : 'bg-white hover:bg-sky-50 text-sky-800 border-sky-300'
                }`}
              >
                <Tv className="w-5 h-5 text-sky-600" />
                <span>{tvRemoteVisible ? 'Đóng Remote TV' : 'Bật Remote TV ảo'}</span>
              </button>
            </div>
          </div>

          {/* Right Mascot Zone */}
          <div className="relative z-10 shrink-0 flex flex-col items-center">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-amber-100 p-1 group">
              <img
                src="/src/assets/images/kid_mascot_star_1794364848021.jpg"
                alt="Kid Game Hub Mascot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-xl py-1 text-center">
                <p className="text-[11px] font-black text-yellow-300 tracking-wider">
                  BẠN KHỦNG LONG & HỔ CON
                </p>
              </div>
            </div>

            {/* Quick stats badges */}
            <div className="mt-3 flex items-center gap-3">
              <div className="px-3 py-1 bg-amber-100 border border-amber-300 rounded-xl text-xs font-black text-amber-900 flex items-center gap-1.5 shadow-sm">
                <span>📚</span>
                <span>{totalGames} trò chơi</span>
              </div>
              <div className="px-3 py-1 bg-yellow-100 border border-yellow-300 rounded-xl text-xs font-black text-yellow-900 flex items-center gap-1.5 shadow-sm">
                <span>⭐</span>
                <span>{totalStars} sao thưởng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
