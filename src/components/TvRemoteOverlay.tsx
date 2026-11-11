import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Volume2,
  X,
  Maximize2
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface TvRemoteOverlayProps {
  onClose: () => void;
  onNavigate: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onConfirm: () => void;
  onBack: () => void;
  onToggleSound: () => void;
}

export const TvRemoteOverlay: React.FC<TvRemoteOverlayProps> = ({
  onClose,
  onNavigate,
  onConfirm,
  onBack,
  onToggleSound
}) => {
  const triggerKey = (action: () => void) => {
    playClickSound();
    action();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl border-2 border-slate-700 w-64 select-none">
      {/* Remote Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Điều Khiển Smart TV</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* D-Pad Circular Pad */}
      <div className="flex justify-center my-2">
        <div className="relative w-36 h-36 bg-slate-800 rounded-full border-2 border-slate-700 p-2 flex items-center justify-center shadow-inner">
          {/* UP */}
          <button
            onClick={() => triggerKey(() => onNavigate('up'))}
            className="absolute top-1 left-1/2 -translate-x-1/2 p-2 hover:bg-slate-700 active:bg-amber-500 rounded-t-full transition-colors cursor-pointer"
            title="Lên (Up)"
          >
            <ChevronUp className="w-6 h-6 text-slate-200" />
          </button>

          {/* DOWN */}
          <button
            onClick={() => triggerKey(() => onNavigate('down'))}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 p-2 hover:bg-slate-700 active:bg-amber-500 rounded-b-full transition-colors cursor-pointer"
            title="Xuống (Down)"
          >
            <ChevronDown className="w-6 h-6 text-slate-200" />
          </button>

          {/* LEFT */}
          <button
            onClick={() => triggerKey(() => onNavigate('left'))}
            className="absolute left-1 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 active:bg-amber-500 rounded-l-full transition-colors cursor-pointer"
            title="Trái (Left)"
          >
            <ChevronLeft className="w-6 h-6 text-slate-200" />
          </button>

          {/* RIGHT */}
          <button
            onClick={() => triggerKey(() => onNavigate('right'))}
            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 active:bg-amber-500 rounded-r-full transition-colors cursor-pointer"
            title="Phải (Right)"
          >
            <ChevronRight className="w-6 h-6 text-slate-200" />
          </button>

          {/* CENTER OK BUTTON */}
          <button
            onClick={() => triggerKey(onConfirm)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-95 text-white font-black text-sm flex items-center justify-center shadow-md transition-all cursor-pointer"
            title="OK (Chọn)"
          >
            OK
          </button>
        </div>
      </div>

      {/* Quick TV Action Keys */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-800">
        <button
          onClick={() => triggerKey(onBack)}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Quay Lại</span>
        </button>

        <button
          onClick={() => triggerKey(onToggleSound)}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5 text-sky-400" />
          <span>Âm Thanh</span>
        </button>
      </div>

      <p className="text-[10px] text-slate-400 text-center mt-2">
        Hỗ trợ cả bàn phím: Mũi tên & Enter
      </p>
    </div>
  );
};
