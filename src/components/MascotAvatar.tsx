import React, { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';

interface MascotAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  showBadgePill?: boolean;
}

export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  className = '',
  size = 'md',
  onClick,
  showBadgePill = true
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const dimensionClass =
    size === 'lg' ? 'w-44 h-44 sm:w-52 sm:h-52' : size === 'sm' ? 'w-16 h-16' : 'w-28 h-28 sm:w-36 sm:h-36';

  return (
    <div
      onClick={onClick}
      className={`relative rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-gradient-to-tr from-amber-200 via-yellow-100 to-orange-200 p-1 group cursor-pointer hover:scale-105 transition-transform select-none ${dimensionClass} ${className}`}
    >
      {!imgFailed ? (
        <img
          src="/assets/images/kid_mascot_star_1794364848021.jpg"
          alt="Bé Siêu Nhí Mascot"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        /* Vector Cartoon Hero Mascot Avatar (100% guaranteed, zero broken image boxes!) */
        <div className="w-full h-full rounded-2xl bg-gradient-to-b from-amber-300 via-yellow-200 to-orange-300 flex flex-col items-center justify-center p-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent animate-pulse" />
          
          {/* Vector Crown & Star Hero Face */}
          <div className="relative z-10 text-5xl sm:text-6xl animate-bounce filter drop-shadow-md">
            🌟
          </div>
          <span className="relative z-10 text-xs sm:text-sm font-black text-amber-950 mt-1 drop-shadow-xs">
            Bé Siêu Nhí 👑
          </span>
          <Sparkles className="absolute top-2 left-2 w-5 h-5 text-yellow-500 animate-spin" />
        </div>
      )}

      {/* Floating Badge Button Icon */}
      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-950 p-1.5 rounded-full shadow-lg border border-white animate-bounce">
        <Award className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {showBadgePill && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md rounded-xl py-1 text-center">
          <p className="text-[10px] sm:text-[11px] font-black text-yellow-300 tracking-wider flex items-center justify-center gap-1">
            <span>🏆 BẢNG HUY HIỆU BÉ</span>
          </p>
        </div>
      )}
    </div>
  );
};
