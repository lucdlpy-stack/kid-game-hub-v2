import React from 'react';
import { KidBadge, getStoredBadges } from '../services/badgeService';
import { X, Award, Trophy, Sparkles, CheckCircle2, Lock, Volume2 } from 'lucide-react';
import { playClickSound, speakVietnamese } from '../utils/audio';
import { MascotAvatar } from './MascotAvatar';

interface BadgesModalProps {
  onClose: () => void;
  starsCount: number;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({ onClose, starsCount }) => {
  const [badges] = React.useState<KidBadge[]>(getStoredBadges());
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const handleBadgeClick = (badge: KidBadge) => {
    playClickSound();
    if (badge.unlocked) {
      speakVietnamese(`Huy hiệu ${badge.title}: ${badge.description}`);
    } else {
      speakVietnamese(`Huy hiệu ${badge.title}: Bé hãy chơi tiếp để mở khóa nhé! Tiến độ hiện tại ${badge.progress} trên ${badge.maxProgress}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-4 border-amber-400 shadow-2xl p-5 sm:p-8 my-6 text-slate-900 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 text-white flex items-center justify-center text-3xl shadow-md animate-bounce">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight">
                  Thành Tựu Nhỏ Của Bé
                </h2>
                <span className="text-xs font-black bg-yellow-100 text-amber-900 border border-yellow-300 px-2.5 py-0.5 rounded-full">
                  {unlockedCount}/{badges.length} Huy hiệu
                </span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-amber-800/90">
                Bảng vàng vinh danh những cột mốc đáng yêu của bé tại Kid Game Hub!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Summary Card */}
        <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-yellow-100 rounded-2xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MascotAvatar size="sm" showBadgePill={false} />
            <div>
              <div className="text-lg font-black text-amber-950">
                Bé Yêu Mầm Non (3-5 Tuổi)
              </div>
              <div className="text-xs font-extrabold text-amber-800">
                Tích lũy được <span className="text-orange-700 text-sm font-black">{starsCount}</span> ⭐ Ngôi Sao May Mắn
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-amber-300 text-xs font-black text-amber-900 shadow-xs">
            <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
            <span>Đã Mở Khoá {unlockedCount} Huy Hiệu Rực Rỡ!</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`relative p-4 rounded-3xl border-3 transition-all cursor-pointer flex flex-col justify-between select-none ${
                  badge.unlocked
                    ? 'bg-gradient-to-b from-amber-50 to-orange-50/80 border-amber-400 shadow-lg hover:shadow-xl hover:scale-102 ring-2 ring-amber-200'
                    : 'bg-slate-50 border-slate-200 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Badge Top Header */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner border-2 ${
                        badge.unlocked
                          ? 'bg-gradient-to-tr from-amber-400 to-orange-400 border-yellow-200 text-white animate-bounce'
                          : 'bg-slate-200 border-slate-300 text-slate-400'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    {badge.unlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Đã Đạt 🏆
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                        <Lock className="w-3 h-3 text-slate-500" />
                        Chưa Đạt
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-black text-slate-900 mb-1 leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mb-3 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                {/* Progress bar or unlock date */}
                {badge.unlocked ? (
                  <div className="text-[11px] font-extrabold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 flex items-center justify-between">
                    <span>Mở khóa: {badge.unlockedAt || 'Mới đạt được'}</span>
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-500 mb-1">
                      <span>Tiến độ:</span>
                      <span>
                        {badge.progress} / {badge.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden border border-slate-300">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (badge.progress / badge.maxProgress) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-bold text-slate-500">
          <span>💡 <span className="font-extrabold text-amber-900">Mẹo cho bé:</span> Bé hãy chơi thêm các trò chơi đố vui, ghép hình và camera để thu thập trọn bộ 7 huy hiệu nhé!</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-md cursor-pointer transition-transform active:scale-95"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
