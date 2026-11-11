import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { recordBadgeProgress } from '../services/badgeService';
import { Camera, CameraOff, ArrowLeft, Sparkles, Wand2, UserCheck, Shield, Sparkle } from 'lucide-react';
import { playCorrectSound, playClickSound, speakVietnamese } from '../utils/audio';
import { CameraBackdrop } from './CameraBackdrop';

interface CharacterPersona {
  id: string;
  name: string;
  icon: string;
  hatEmoji: string;
  badgeEmoji: string;
  auraColor: string;
  soundPhrase: string;
  tagline: string;
  suitTheme: {
    chestBg: string;
    chestSymbol: string;
    shoulderBg: string;
    subSymbol: string;
    suitTitle: string;
  };
}

const CHARACTERS: CharacterPersona[] = [
  {
    id: 'spiderman',
    name: 'Người Nhện Siêu Đẳng',
    icon: '🕸️',
    hatEmoji: '🕷️',
    badgeEmoji: '🕸️',
    auraColor: 'from-rose-500/40 via-red-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé đã hóa thân thành Người Nhện Siêu Đẳng bắng tơ bảo vệ phố phường!',
    tagline: 'Bắn tơ dũng cảm, bảo vệ bạn bè!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 border-yellow-300',
      chestSymbol: '🕷️',
      shoulderBg: 'bg-blue-600',
      subSymbol: '🕸️',
      suitTitle: 'Bộ Giáp Người Nhện Bắn Tơ AI'
    }
  },
  {
    id: 'avenger',
    name: 'Siêu Nhân Avengers',
    icon: '🦸‍♂️',
    hatEmoji: '🦸‍♂️',
    badgeEmoji: '⚡',
    auraColor: 'from-amber-400/40 via-yellow-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé biến hình thành Siêu Nhân Avengers sức mạnh vô song!',
    tagline: 'Anh hùng dũng cảm bảo vệ vũ trụ!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-yellow-500 via-amber-500 to-red-600 border-amber-300',
      chestSymbol: '⚡',
      shoulderBg: 'bg-red-600',
      subSymbol: '🛡️',
      suitTitle: 'Bộ Giáp Siêu Nhân Avengers AI'
    }
  },
  {
    id: 'firefighter',
    name: 'Lính Cứu Hỏa Dũng Cảm',
    icon: '👨‍🚒',
    hatEmoji: '⛑️',
    badgeEmoji: '🚒',
    auraColor: 'from-orange-500/40 via-amber-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé là Chú Lính Cứu Hỏa 114 cầm vòi nước dập tắt lửa khẩn cấp!',
    tagline: 'Dũng cảm, sẵn sàng dập lửa cứu người!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 border-yellow-200',
      chestSymbol: '🚒',
      shoulderBg: 'bg-orange-600',
      subSymbol: '🧯',
      suitTitle: 'Phục Trang Lính Cứu Hỏa 114 AI'
    }
  },
  {
    id: 'police',
    name: 'Cảnh Sát Trưởng 113',
    icon: '👮',
    hatEmoji: '👮',
    badgeEmoji: '🚓',
    auraColor: 'from-sky-500/40 via-blue-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé hóa thân thành Cảnh Sát Trưởng giữ gìn trật tự an toàn!',
    tagline: 'Giữ trật tự phố phường an toàn!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 border-sky-300',
      chestSymbol: '🚓',
      shoulderBg: 'bg-sky-500',
      subSymbol: '🚨',
      suitTitle: 'Đồng Phục Cảnh Sát Trưởng 113 AI'
    }
  },
  {
    id: 'doctor',
    name: 'Bác Sĩ Tí Hon',
    icon: '🩺',
    hatEmoji: '🩺',
    badgeEmoji: '🏥',
    auraColor: 'from-emerald-400/40 via-teal-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bác sĩ tí hon dùng ống nghe khám sức khỏe cho các bạn!',
    tagline: 'Tận tâm chăm sóc sức khỏe cho mọi người!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-white via-slate-100 to-teal-50 border-emerald-400 text-teal-950',
      chestSymbol: '🩺',
      shoulderBg: 'bg-teal-500',
      subSymbol: '🏥',
      suitTitle: 'Áo Blouse Bác Sĩ Tí Hon AI'
    }
  },
  {
    id: 'pilot',
    name: 'Phi Công Vũ Trụ',
    icon: '👨‍🚀',
    hatEmoji: '🚀',
    badgeEmoji: '🌟',
    auraColor: 'from-indigo-500/40 via-purple-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé làm Phi Công Vũ Trụ lái tên lửa bay vào ngân hà!',
    tagline: 'Lái máy bay & tên lửa vút bay không gian!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-indigo-700 via-purple-700 to-slate-800 border-indigo-300',
      chestSymbol: '🚀',
      shoulderBg: 'bg-purple-600',
      subSymbol: '🪐',
      suitTitle: 'Bộ Phi Hành Gia Vũ Trụ AI'
    }
  },
  {
    id: 'chef',
    name: 'Đầu Bếp Nhí Tài Ba',
    icon: '👨‍🍳',
    hatEmoji: '👨‍🍳',
    badgeEmoji: '🍳',
    auraColor: 'from-amber-400/40 via-orange-300/30 to-transparent',
    soundPhrase: 'Ú òa! Đầu bếp nhí nấu những món ăn ngon thơm phức!',
    tagline: 'Nấu món ăn ngon lành bổ dưỡng!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-white via-amber-50 to-orange-100 border-amber-400 text-amber-950',
      chestSymbol: '🍳',
      shoulderBg: 'bg-amber-500',
      subSymbol: '🥖',
      suitTitle: 'Trang Phục Đầu Bếp Nhí AI'
    }
  },
  {
    id: 'electrician',
    name: 'Thợ Điện Lực An Toàn',
    icon: '⚡',
    hatEmoji: '🦺',
    badgeEmoji: '🔌',
    auraColor: 'from-yellow-400/40 via-amber-300/30 to-transparent',
    soundPhrase: 'Ú òa! Chú thợ điện lực lắp đèn sáng lung linh cho mọi nhà!',
    tagline: 'Sửa chữa điện sáng rực rỡ và an toàn!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 border-yellow-200 text-amber-950',
      chestSymbol: '⚡',
      shoulderBg: 'bg-amber-600',
      subSymbol: '🔌',
      suitTitle: 'Áo Bảo Hộ Thợ Điện Lực AI'
    }
  },
  {
    id: 'teacher',
    name: 'Cô Giáo / Thầy Giáo Mầm Non',
    icon: '👩‍🏫',
    hatEmoji: '📚',
    badgeEmoji: '✏️',
    auraColor: 'from-pink-400/40 via-purple-300/30 to-transparent',
    soundPhrase: 'Ú òa! Cô giáo mầm non kể truyện cổ tích và dạy bé múa hát!',
    tagline: 'Dạy bé múa hát và kể chuyện vui!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 border-pink-300',
      chestSymbol: '📚',
      shoulderBg: 'bg-purple-600',
      subSymbol: '✏️',
      suitTitle: 'Trang Phục Cô Giáo Mầm Non AI'
    }
  },
  {
    id: 'princess',
    name: 'Công Chúa Lộng Lẫy',
    icon: '👑',
    hatEmoji: '👑',
    badgeEmoji: '🌸',
    auraColor: 'from-pink-500/40 via-rose-300/30 to-transparent',
    soundPhrase: 'Ú òa! Công Chúa Lộng Lẫy xinh đẹp nhất thế giới mầm non!',
    tagline: 'Xinh xắn, rực rỡ và tỏa sáng!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 border-pink-200',
      chestSymbol: '👑',
      shoulderBg: 'bg-pink-500',
      subSymbol: '🌸',
      suitTitle: 'Váy Công Chúa Lộng Lẫy AI'
    }
  },
  {
    id: 'dino',
    name: 'Khủng Long Dino',
    icon: '🦖',
    hatEmoji: '🦖',
    badgeEmoji: '⚡',
    auraColor: 'from-emerald-400/40 via-teal-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé đã biến hình thành Khủng Long Dino Siêu Cấp dũng mãnh!',
    tagline: 'Sức mạnh gầm vang thảo nguyên!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 border-emerald-300',
      chestSymbol: '🦖',
      shoulderBg: 'bg-emerald-500',
      subSymbol: '🌿',
      suitTitle: 'Bộ Onesie Khủng Long AI'
    }
  },
  {
    id: 'tiger',
    name: 'Hổ Vàng Con',
    icon: '🐯',
    hatEmoji: '🐯',
    badgeEmoji: '🔥',
    auraColor: 'from-amber-400/40 via-orange-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé đã hóa thân thành Chú Hổ Vàng siêu nhanh nhẹn!',
    tagline: 'Chạy nhanh vèo vèo rực rỡ!',
    suitTheme: {
      chestBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-600 border-amber-300 text-amber-950',
      chestSymbol: '🐯',
      shoulderBg: 'bg-orange-600',
      subSymbol: '🔥',
      suitTitle: 'Bộ Trang Phục Hổ Vàng AI'
    }
  }
];

interface CameraTransformGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const CameraTransformGameView: React.FC<CameraTransformGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [selectedHeroIdx, setSelectedHeroIdx] = useState<number>(0);
  const [flashing, setFlashing] = useState<boolean>(false);
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [transforming, setTransforming] = useState<boolean>(false);
  const [transformMode, setTransformMode] = useState<'fullbody' | 'mask'>('fullbody');

  const hero = CHARACTERS[selectedHeroIdx];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      setStream(mediaStream);
      setCameraActive(true);
      recordBadgeProgress('camera', 1);
      speakVietnamese('Bé đứng trước camera và chọn nhân vật hoạt hình bé yêu thích để biến hình toàn thân nhé!');
    } catch (err) {
      console.warn('Camera start error:', err);
      setCameraActive(false);
      setStream(null);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(() => {});
    }
  }, [stream, cameraActive]);

  const handleSelectHero = (idx: number) => {
    playClickSound();
    setSelectedHeroIdx(idx);
    setTransforming(true);
    setTimeout(() => setTransforming(false), 500);

    const chosen = CHARACTERS[idx];
    if (soundEnabled) {
      playCorrectSound();
      speakVietnamese(chosen.soundPhrase);
    }
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    recordBadgeProgress('camera', 1);
  };

  const takeSnapshot = () => {
    playCorrectSound();
    setFlashing(true);
    setTimeout(() => setFlashing(false), 300);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 }
    });

    onRewardStar();
    recordBadgeProgress('camera', 1);
    speakVietnamese(`Tách! Bức hình ${hero.name} toàn thân của bé siêu ngầu!`);

    if (videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Draw video frame mirrored
          ctx.translate(480, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0, 480, 360);
          ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform

          // Draw full body costume overlay watermark badge
          ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
          ctx.fillRect(10, 310, 460, 40);
          ctx.font = 'bold 16px sans-serif';
          ctx.fillStyle = '#fef08a';
          ctx.fillText(`✨ AI Transformer: ${hero.name}`, 20, 335);

          const dataUrl = canvas.toDataURL('image/jpeg');
          setSnapshots((prev) => [dataUrl, ...prev.slice(0, 3)]);
        }
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col justify-between py-2 px-2 sm:px-4 overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-3 mb-2 shrink-0">
        <button
          onClick={() => {
            stopCamera();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-emerald-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              setTransformMode((m) => (m === 'fullbody' ? 'mask' : 'fullbody'));
            }}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-amber-950 font-black text-xs sm:text-sm rounded-2xl border-2 border-amber-300 shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-950 animate-spin" />
            <span>{transformMode === 'fullbody' ? 'Chế Độ: Biến Hình Toàn Thân AI 🦸‍♂️' : 'Chế Độ: Mặt Nạ & Mũ 🎭'}</span>
          </button>
        </div>

        <button
          onClick={() => (cameraActive ? stopCamera() : startCamera())}
          className={`p-2.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer ${
            cameraActive
              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
              : 'bg-slate-100 text-slate-600 border-slate-300'
          }`}
        >
          {cameraActive ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          <span className="hidden sm:inline">{cameraActive ? 'Camera Bật' : 'Bật Camera'}</span>
        </button>
      </div>

      {/* Main View Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
        {/* Left 2 Cols: Smart Aspect-Ratio Camera Frame with Full Body AI Suit */}
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <div className="w-full max-w-xl aspect-[4/3] rounded-3xl overflow-hidden border-8 border-emerald-400 shadow-2xl relative bg-slate-900 flex items-center justify-center">
            {/* Camera Video Stream Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${
                cameraActive ? 'block' : 'hidden'
              }`}
            />

            {!cameraActive && (
              <CameraBackdrop
                imageSrc="/assets/images/kid_camera_faces_1794370847143.jpg"
                theme="transform"
                title="Gương Thần Biến Hình AI"
              />
            )}

            {/* Flash Effect on photo snapshot */}
            {flashing && (
              <div className="absolute inset-0 z-40 bg-white animate-flash-green pointer-events-none" />
            )}

            {/* Glowing Character Energy Aura */}
            <div
              className={`absolute inset-0 z-10 bg-gradient-to-t ${hero.auraColor} pointer-events-none transition-all duration-300 ${
                transforming ? 'scale-110 opacity-100' : 'opacity-80'
              }`}
            />

            {/* Head Gear Overlay (Mũ / Vương Miện) */}
            <div className="absolute top-4 inset-x-0 z-20 flex flex-col items-center pointer-events-none">
              <div className="text-6xl sm:text-7xl animate-bounce filter drop-shadow-2xl">
                {hero.hatEmoji}
              </div>
            </div>

            {/* SMART FULL-BODY AI COSTUME OVERLAY SUIT */}
            {transformMode === 'fullbody' && (
              <div className="absolute inset-x-8 bottom-12 z-20 pointer-events-none flex flex-col items-center animate-pop-in">
                {/* Full Body Suit Chest & Armor Plate */}
                <div
                  className={`w-5/6 sm:w-3/4 py-3 sm:py-4 px-4 rounded-3xl border-4 ${hero.suitTheme.chestBg} shadow-2xl flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xs`}
                >
                  <div className="absolute top-1 left-2 text-xs opacity-50 font-black">
                    AI COSTUME SUIT
                  </div>
                  
                  {/* Chest Emblem Badge */}
                  <div className="text-4xl sm:text-5xl filter drop-shadow-lg animate-pulse my-1">
                    {hero.suitTheme.chestSymbol}
                  </div>

                  <span className="text-xs sm:text-sm font-black tracking-wider uppercase drop-shadow-sm text-center">
                    {hero.suitTheme.suitTitle}
                  </span>

                  {/* Shoulder Armor Wing Badges */}
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-10 rounded-xl bg-amber-400 border-2 border-white flex items-center justify-center text-lg shadow-md">
                    {hero.suitTheme.subSymbol}
                  </div>
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-10 rounded-xl bg-amber-400 border-2 border-white flex items-center justify-center text-lg shadow-md">
                    {hero.suitTheme.subSymbol}
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Character Info Banner */}
            <div className="absolute bottom-2 inset-x-3 z-30 bg-black/75 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{hero.icon}</span>
                <div>
                  <div className="text-[10px] font-black uppercase text-emerald-300">
                    Bé Đang Biến Hình:
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white leading-tight">
                    {hero.name}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-1 bg-emerald-500 text-white rounded-full">
                {transformMode === 'fullbody' ? 'Trang Phục AI ⚡' : 'Mặt Nạ 🎭'}
              </span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Character Selection Menu */}
        <div className="bg-white rounded-3xl p-4 border-4 border-emerald-300 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 mb-1 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-emerald-600" />
              <span>Chọn Nhân Vật Biến Hình</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-3">
              Bấm chọn nhân vật để biến cả người thành anh hùng nhé!
            </p>

            <div className="space-y-2 max-h-[260px] sm:max-h-[300px] overflow-y-auto pr-1">
              {CHARACTERS.map((c, idx) => {
                const isSelected = selectedHeroIdx === idx;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectHero(idx)}
                    className={`w-full p-2.5 rounded-2xl border-2 font-black text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 scale-102'
                        : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl sm:text-3xl">{c.icon}</span>
                      <div className="text-left">
                        <div>{c.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold">{c.tagline}</div>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        Đang Chọn ⭐
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400">Chọn</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Snapshot Button */}
          <div className="mt-3">
            <button
              onClick={takeSnapshot}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring mb-2"
            >
              <Camera className="w-5 h-5 fill-current" />
              <span>📸 Chụp Ảnh Biến Hình AI!</span>
            </button>

            {snapshots.length > 0 && (
              <div>
                <span className="text-[10px] font-black text-slate-500 mb-1 block">
                  Ảnh biến hình của bé:
                </span>
                <div className="flex gap-2">
                  {snapshots.map((s, idx) => (
                    <img
                      key={idx}
                      src={s}
                      alt="Kid Transformation"
                      className="w-14 h-10 object-cover rounded-xl border-2 border-emerald-300 shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

