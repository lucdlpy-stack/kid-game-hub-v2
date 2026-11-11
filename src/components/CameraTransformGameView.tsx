import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { recordBadgeProgress } from '../services/badgeService';
import { Camera, CameraOff, ArrowLeft, RotateCcw, Volume2, Sparkles, Wand2, Image as ImageIcon } from 'lucide-react';
import { playCorrectSound, playClickSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface CharacterPersona {
  id: string;
  name: string;
  icon: string;
  hatEmoji: string;
  badgeEmoji: string;
  auraColor: string;
  soundPhrase: string;
  tagline: string;
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
    tagline: 'Bắn tơ dũng cảm, bảo vệ bạn bè!'
  },
  {
    id: 'avenger',
    name: 'Siêu Nhân Avengers',
    icon: '🦸‍♂️',
    hatEmoji: '🦸‍♂️',
    badgeEmoji: '⚡',
    auraColor: 'from-amber-400/40 via-yellow-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé biến hình thành Siêu Nhân Avengers sức mạnh vô song!',
    tagline: 'Anh hùng dũng cảm bảo vệ vũ trụ!'
  },
  {
    id: 'firefighter',
    name: 'Lính Cứu Hỏa Dũng Cảm',
    icon: '👨‍🚒',
    hatEmoji: '⛑️',
    badgeEmoji: '🚒',
    auraColor: 'from-orange-500/40 via-amber-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé là Chú Lính Cứu Hỏa 114 cầm vòi nước dập tắt lửa khẩn cấp!',
    tagline: 'Dũng cảm, sẵn sàng dập lửa cứu người!'
  },
  {
    id: 'police',
    name: 'Cảnh Sát Trưởng 113',
    icon: '👮',
    hatEmoji: '👮',
    badgeEmoji: '🚓',
    auraColor: 'from-sky-500/40 via-blue-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé hóa thân thành Cảnh Sát Trưởng giữ gìn trật tự an toàn!',
    tagline: 'Giữ trật tự phố phường an toàn!'
  },
  {
    id: 'doctor',
    name: 'Bác Sĩ Tí Hon',
    icon: '🩺',
    hatEmoji: '🩺',
    badgeEmoji: '🏥',
    auraColor: 'from-emerald-400/40 via-teal-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bác sĩ tí hon dùng ống nghe khám sức khỏe cho các bạn!',
    tagline: 'Tận tâm chăm sóc sức khỏe cho mọi người!'
  },
  {
    id: 'pilot',
    name: 'Phi Công Vũ Trụ',
    icon: '👨‍🚀',
    hatEmoji: '🚀',
    badgeEmoji: '🌟',
    auraColor: 'from-indigo-500/40 via-purple-400/30 to-transparent',
    soundPhrase: 'Ú òa! Bé làm Phi Công Vũ Trụ lái tên lửa bay vào ngân hà!',
    tagline: 'Lái máy bay & tên lửa vút bay không gian!'
  },
  {
    id: 'chef',
    name: 'Đầu Bếp Nhí Tài Ba',
    icon: '👨‍🍳',
    hatEmoji: '👨‍🍳',
    badgeEmoji: '🍳',
    auraColor: 'from-amber-400/40 via-orange-300/30 to-transparent',
    soundPhrase: 'Ú òa! Đầu bếp nhí nấu những món ăn ngon thơm phức!',
    tagline: 'Nấu món ăn ngon lành bổ dưỡng!'
  },
  {
    id: 'electrician',
    name: 'Thợ Điện Lực An Toàn',
    icon: '⚡',
    hatEmoji: '🦺',
    badgeEmoji: '🔌',
    auraColor: 'from-yellow-400/40 via-amber-300/30 to-transparent',
    soundPhrase: 'Ú òa! Chú thợ điện lực lắp đèn sáng lung linh cho mọi nhà!',
    tagline: 'Sửa chữa điện sáng rực rỡ và an toàn!'
  },
  {
    id: 'teacher',
    name: 'Cô Giáo / Thầy Giáo Mầm Non',
    icon: '👩‍🏫',
    hatEmoji: '📚',
    badgeEmoji: '✏️',
    auraColor: 'from-pink-400/40 via-purple-300/30 to-transparent',
    soundPhrase: 'Ú òa! Cô giáo mầm non kể truyện cổ tích và dạy bé múa hát!',
    tagline: 'Dạy bé múa hát và kể chuyện vui!'
  },
  {
    id: 'princess',
    name: 'Công Chúa Lộng Lẫy',
    icon: '👑',
    hatEmoji: '👑',
    badgeEmoji: '🌸',
    auraColor: 'from-pink-500/40 via-rose-300/30 to-transparent',
    soundPhrase: 'Ú òa! Công Chúa Lộng Lẫy xinh đẹp nhất thế giới mầm non!',
    tagline: 'Xinh xắn, rực rỡ và tỏa sáng!'
  },
  {
    id: 'dino',
    name: 'Khủng Long Dino',
    icon: '🦖',
    hatEmoji: '🦖',
    badgeEmoji: '⚡',
    auraColor: 'from-emerald-400/40 via-teal-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé đã biến hình thành Khủng Long Dino Siêu Cấp dũng mãnh!',
    tagline: 'Sức mạnh gầm vang thảo nguyên!'
  },
  {
    id: 'tiger',
    name: 'Hổ Vàng Con',
    icon: '🐯',
    hatEmoji: '🐯',
    badgeEmoji: '🔥',
    auraColor: 'from-amber-400/40 via-orange-300/30 to-transparent',
    soundPhrase: 'Ú òa! Bé đã hóa thân thành Chú Hổ Vàng siêu nhanh nhẹn!',
    tagline: 'Chạy nhanh vèo vèo rực rỡ!'
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
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [selectedHeroIdx, setSelectedHeroIdx] = useState<number>(0);
  const [flashing, setFlashing] = useState<boolean>(false);
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [transforming, setTransforming] = useState<boolean>(false);

  const hero = CHARACTERS[selectedHeroIdx];

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      recordBadgeProgress('camera', 1);
      speakVietnamese('Bé đứng trước camera và chọn nhân vật hoạt hình bé yêu thích để biến hình nhé!');
    } catch (err) {
      console.warn('Camera start error:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

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
    speakVietnamese(`Tách! Bức hình ${hero.name} của bé siêu ngầu!`);

    if (videoRef.current) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.translate(320, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(videoRef.current, 0, 0, 320, 240);
          const dataUrl = canvas.toDataURL('image/jpeg');
          setSnapshots((prev) => [dataUrl, ...prev.slice(0, 3)]);
        }
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 sm:px-4">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-4">
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

        <div className="px-4 py-2 bg-emerald-100 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-2 shadow-sm">
          <Wand2 className="w-4 h-4 text-emerald-700" />
          <span>Biến Hình Nhân Vật Hoạt Hình Camera</span>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Left 2 Cols: Camera Feed with Live Animated Costume & Aura */}
        <div className="md:col-span-2 relative rounded-3xl overflow-hidden border-8 border-emerald-300 shadow-2xl bg-gradient-to-b from-emerald-200 via-teal-100 to-amber-100 min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            <img
              src="/src/assets/images/kid_camera_faces_1794370847143.jpg"
              alt="Character Magic Mirror"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}

          {/* Flash Effect */}
          {flashing && (
            <div className="absolute inset-0 z-40 bg-white animate-flash-green pointer-events-none" />
          )}

          {/* Glowing Aura Effect around Kid */}
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-t ${hero.auraColor} pointer-events-none transition-all duration-300 ${
              transforming ? 'scale-110 opacity-100' : 'opacity-80'
            }`}
          />

          {/* Live Cartoon Character Frame & Overlays */}
          <div className="absolute inset-x-0 top-6 z-20 flex flex-col items-center pointer-events-none">
            {/* Character Crown/Hat Overlay */}
            <div className="text-7xl sm:text-8xl animate-bounce filter drop-shadow-2xl">
              {hero.hatEmoji}
            </div>
            <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-white font-black text-xs flex items-center gap-1.5 shadow-lg border border-white/30 mt-2">
              <span>{hero.badgeEmoji}</span>
              <span>{hero.name}</span>
            </div>
          </div>

          {/* Floating magical sparkles around character */}
          <div className="absolute top-12 left-10 z-20 text-3xl animate-ping pointer-events-none">✨</div>
          <div className="absolute top-20 right-10 z-20 text-3xl animate-bounce pointer-events-none">⭐</div>
          <div className="absolute bottom-20 left-12 z-20 text-3xl animate-pulse pointer-events-none">🌟</div>

          {/* Bottom Banner */}
          <div className="absolute bottom-4 inset-x-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border-3 border-emerald-400 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{hero.icon}</span>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                  Bé Đang Hóa Thân Thành:
                </span>
                <p className="text-base font-black text-slate-900 leading-tight">
                  {hero.name} · {hero.tagline}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Character Selection Menu */}
        <div className="bg-white rounded-3xl p-5 border-4 border-emerald-300 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <span>✨</span>
              <span>Chọn Nhân Vật Biến Hình</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-4">
              Bé bấm chọn một nhân vật hoạt hình ngầu nhất nhé!
            </p>

            <div className="space-y-2.5 mb-6">
              {CHARACTERS.map((c, idx) => {
                const isSelected = selectedHeroIdx === idx;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectHero(idx)}
                    className={`w-full p-3 rounded-2xl border-2 font-black text-sm flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-md ring-2 ring-emerald-300 scale-102'
                        : 'bg-slate-50 border-slate-200 hover:bg-emerald-50 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{c.icon}</span>
                      <div className="text-left">
                        <div>{c.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold">{c.tagline}</div>
                      </div>
                    </div>

                    {isSelected ? (
                      <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                        Đang Chọn ⭐
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-slate-400">Chọn</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Snapshot */}
          <div>
            <button
              onClick={takeSnapshot}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring mb-4"
            >
              <Camera className="w-6 h-6 fill-current" />
              <span>📸 Chụp Ảnh Biến Hình!</span>
            </button>

            {snapshots.length > 0 && (
              <div>
                <span className="text-[11px] font-black text-slate-500 mb-1 block">
                  Ảnh biến hình của bé:
                </span>
                <div className="flex gap-2">
                  {snapshots.map((s, idx) => (
                    <img
                      key={idx}
                      src={s}
                      alt="Kid Transformation"
                      className="w-16 h-12 object-cover rounded-xl border-2 border-emerald-300 shadow-sm"
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
