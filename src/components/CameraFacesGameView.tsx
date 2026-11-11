import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Camera, CameraOff, ArrowLeft, RotateCcw, Volume2, Sparkles, Smile, Image as ImageIcon } from 'lucide-react';
import { playCorrectSound, playClickSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';
import { CameraBackdrop } from './CameraBackdrop';

interface CameraFacesGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

interface ARMask {
  id: string;
  name: string;
  icon: string;
  overlayEmoji: string;
  subEmoji?: string;
  position: 'head' | 'eyes' | 'mouth';
}

const AR_MASKS: ARMask[] = [
  { id: 'dino', name: 'Nón Khủng Long', icon: '🦖', overlayEmoji: '🦖', position: 'head' },
  { id: 'tiger', name: 'Tai Hổ Vàng', icon: '🐯', overlayEmoji: '🐯', position: 'head' },
  { id: 'crown', name: 'Vương Miện', icon: '👑', overlayEmoji: '👑', position: 'head' },
  { id: 'bunny', name: 'Tai Thỏ Nhún', icon: '🐰', overlayEmoji: '🐰', position: 'head' },
  { id: 'glasses', name: 'Kính Ngôi Sao', icon: '👓', overlayEmoji: '⭐', subEmoji: '⭐', position: 'eyes' },
  { id: 'cat', name: 'Mèo Mướp Con', icon: '🐱', overlayEmoji: '🐱', position: 'head' }
];

const EMOTIONS = [
  { text: 'Bé hãy nở một nụ cười thật tươi toe toét nào!', emoji: '😄' },
  { text: 'Bé há to miệng ngạc nhiên ồ lên nào!', emoji: '😮' },
  { text: 'Bé chớp mắt tinh nghịch như chú mèo con nhé!', emoji: '😉' },
  { text: 'Bé chu môi gửi một nụ hôn gió ngọt ngào!', emoji: '😚' },
  { text: 'Bé làm mặt chú hổ con gừ gừ thật oai phong!', emoji: '🦁' }
];

export const CameraFacesGameView: React.FC<CameraFacesGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [selectedMaskIdx, setSelectedMaskIdx] = useState<number>(0);
  const [emotionIdx, setEmotionIdx] = useState<number>(0);
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [flashing, setFlashing] = useState<boolean>(false);

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
      speakVietnamese('Bé nhìn vào gương thần camera để đội nón hoạt hình và chụp hình thật đẹp nhé!');
    } catch (err) {
      console.warn('Camera not available:', err);
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

  const currentMask = AR_MASKS[selectedMaskIdx];
  const currentEmotion = EMOTIONS[emotionIdx];

  const handleNextEmotion = () => {
    playClickSound();
    const nextIdx = (emotionIdx + 1) % EMOTIONS.length;
    setEmotionIdx(nextIdx);
    speakVietnamese(EMOTIONS[nextIdx].text);
  };

  const takeSnapshot = () => {
    playCorrectSound();
    setFlashing(true);
    setTimeout(() => setFlashing(false), 300);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    onRewardStar();
    speakVietnamese('Tách! Bức hình đẹp tuyệt vời! Bé xinh quá!');

    // Capture frame to canvas if possible
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
        // fallback
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-3 px-2 sm:px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={() => {
            stopCamera();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-rose-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-rose-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="px-4 py-2 bg-rose-100 border-2 border-rose-300 rounded-2xl text-xs sm:text-sm font-black text-rose-950 flex items-center gap-2 shadow-sm">
          <span>🪞</span>
          <span>Gương Thần Biểu Cảm & Mặt Nạ Vui Nhộn</span>
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

      {/* Main Mirror Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Left 2 Cols: Mirror Viewport with AR Overlays */}
        <div className="md:col-span-2 relative rounded-3xl overflow-hidden border-8 border-amber-300 shadow-2xl bg-gradient-to-b from-purple-200 via-pink-100 to-amber-100 min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
          {cameraActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            <CameraBackdrop
              imageSrc="/assets/images/kid_camera_faces_1794370847143.jpg"
              theme="faces"
              title="Gương Thần Biểu Cảm"
            />
          )}

          {/* Flash animation on snapshot */}
          {flashing && (
            <div className="absolute inset-0 z-30 bg-white animate-flash-green pointer-events-none" />
          )}

          {/* AR Cartoon Overlays over Kid's Head/Face */}
          <div className="absolute top-10 inset-x-0 z-20 flex flex-col items-center pointer-events-none">
            {currentMask.position === 'head' && (
              <div className="text-7xl sm:text-8xl animate-bounce filter drop-shadow-xl transform -translate-y-2">
                {currentMask.overlayEmoji}
              </div>
            )}
            {currentMask.position === 'eyes' && (
              <div className="flex gap-12 text-6xl sm:text-7xl animate-pulse filter drop-shadow-xl mt-16">
                <span>⭐</span>
                <span>⭐</span>
              </div>
            )}
          </div>

          {/* Bottom Emotion Challenge Prompt Banner */}
          <div className="absolute bottom-4 inset-x-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border-3 border-amber-400 shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl animate-bounce">{currentEmotion.emoji}</span>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                  Thử Thách Biểu Cảm:
                </span>
                <p className="text-sm sm:text-base font-black text-slate-900 leading-tight">
                  {currentEmotion.text}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextEmotion}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-black border border-amber-300 cursor-pointer whitespace-nowrap"
            >
              Đổi Thử Thách ➡️
            </button>
          </div>
        </div>

        {/* Right 1 Col: Mask Wardrobe & Snapshot gallery */}
        <div className="bg-white rounded-3xl p-5 border-4 border-amber-300 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1 flex items-center gap-2">
              <span>🎭</span>
              <span>Tủ Đồ Mặt Nạ Hoạt Hình</span>
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-4">
              Bé bấm chọn một chiếc nón xinh xắn để đeo vào nhé!
            </p>

            {/* Mask buttons */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {AR_MASKS.map((mask, idx) => {
                const isSelected = selectedMaskIdx === idx;
                return (
                  <button
                    key={mask.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedMaskIdx(idx);
                      speakVietnamese(`Bé đang đội ${mask.name}!`);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-300 scale-102'
                        : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <span className="text-3xl">{mask.icon}</span>
                    <span className="text-xs font-black text-slate-800 line-clamp-1">
                      {mask.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Snapshot Button */}
          <div>
            <button
              onClick={takeSnapshot}
              className="w-full py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-lg rounded-2xl shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 tv-focus-ring mb-4"
            >
              <Camera className="w-6 h-6 fill-current" />
              <span>📸 Chụp Hình Kỷ Niệm!</span>
            </button>

            {/* Recent Snapshots Preview */}
            {snapshots.length > 0 && (
              <div>
                <span className="text-[11px] font-black text-slate-500 mb-1 block">
                  Ảnh kỷ niệm bé vừa chụp:
                </span>
                <div className="flex gap-2">
                  {snapshots.map((s, idx) => (
                    <img
                      key={idx}
                      src={s}
                      alt="Kid Snapshot"
                      className="w-16 h-12 object-cover rounded-xl border-2 border-amber-300 shadow-sm"
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
