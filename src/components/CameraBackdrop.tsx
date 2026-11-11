import React, { useState } from 'react';
import { Sparkles, Camera } from 'lucide-react';

interface CameraBackdropProps {
  imageSrc?: string;
  theme?: 'faces' | 'bubbles' | 'stars' | 'transform';
  title?: string;
}

export const CameraBackdrop: React.FC<CameraBackdropProps> = ({
  imageSrc = '/assets/images/kid_camera_faces_1794370847143.jpg',
  theme = 'faces',
  title = 'Gương Thần Biểu Cảm'
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-purple-200 via-pink-100 to-amber-100 flex items-center justify-center">
      {!imgFailed && imageSrc ? (
        <img
          src={imageSrc}
          alt={title}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />
      ) : null}

      {/* Vector Cartoon Magic Mirror Backdrop (Guaranteed 100% no broken image box!) */}
      <div className="relative z-10 text-center p-6 bg-white/80 backdrop-blur-md rounded-3xl border-4 border-amber-300 shadow-2xl max-w-sm mx-auto flex flex-col items-center gap-3 animate-pop-in">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 text-white flex items-center justify-center text-5xl shadow-lg animate-bounce">
          {theme === 'stars' ? '⭐' : theme === 'bubbles' ? '🫧' : theme === 'transform' ? '✨' : '🦖'}
        </div>
        <div>
          <h4 className="text-xl font-black text-slate-900">{title}</h4>
          <p className="text-xs font-bold text-slate-600 mt-1">
            Bấm nút <span className="text-emerald-700 font-extrabold">"Bật Camera"</span> bên trên để soi gương ma thuật và hóa thân cùng các bạn nhé!
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-950 font-black text-xs rounded-full border border-emerald-300">
          <Camera className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Camera Sẵn Sàng 60 FPS</span>
        </div>
      </div>
    </div>
  );
};
