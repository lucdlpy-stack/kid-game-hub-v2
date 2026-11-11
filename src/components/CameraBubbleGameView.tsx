import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Camera,
  CameraOff,
  ArrowLeft,
  RotateCcw,
  Volume2,
  Sparkles,
  Trophy,
  Zap,
  Hand
} from 'lucide-react';
import { playCorrectSound, playClickSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';
import { CameraBackdrop } from './CameraBackdrop';

interface BubbleItem {
  id: number;
  x: number; // percentage 5 - 90
  y: number; // percentage 100 -> -20
  speed: number;
  size: number;
  emoji: string;
  type: 'bubble' | 'fruit' | 'star';
  points: number;
  popped: boolean;
  color: string;
}

interface CameraBubbleGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

const EMOJI_ITEMS = [
  { emoji: '🫧', type: 'bubble' as const, points: 10, color: 'from-sky-300 to-blue-400' },
  { emoji: '🍓', type: 'fruit' as const, points: 20, color: 'from-rose-400 to-red-500' },
  { emoji: '🍌', type: 'fruit' as const, points: 20, color: 'from-amber-300 to-yellow-500' },
  { emoji: '🍎', type: 'fruit' as const, points: 20, color: 'from-red-400 to-rose-600' },
  { emoji: '🍇', type: 'fruit' as const, points: 20, color: 'from-purple-400 to-indigo-500' },
  { emoji: '⭐', type: 'star' as const, points: 30, color: 'from-yellow-300 to-amber-500' },
  { emoji: '🌟', type: 'star' as const, points: 30, color: 'from-yellow-400 to-orange-400' },
  { emoji: '🍊', type: 'fruit' as const, points: 20, color: 'from-orange-400 to-amber-500' }
];

export const CameraBubbleGameView: React.FC<CameraBubbleGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const [comboCount, setComboCount] = useState<number>(0);
  const [motionActive, setMotionActive] = useState<boolean>(false);

  // Initialize or toggle camera
  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
      speakVietnamese('Bé hãy đứng trước camera và vẫy tay để nổ bong bóng nhé!');
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Chưa bật được camera, bé có thể chạm trực tiếp hoặc dùng chuột/remote để chơi nhé!');
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
    // Attempt auto camera start
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Spawn bubbles periodically
  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setBubbles((prev) => {
        if (prev.length >= 10) return prev;
        const randomItem = EMOJI_ITEMS[Math.floor(Math.random() * EMOJI_ITEMS.length)];
        const newBubble: BubbleItem = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 80) + 10,
          y: 105, // start from bottom
          speed: Math.random() * 0.4 + 0.35,
          size: Math.floor(Math.random() * 20) + 60,
          emoji: randomItem.emoji,
          type: randomItem.type,
          points: randomItem.points,
          popped: false,
          color: randomItem.color
        };
        return [...prev, newBubble];
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isGameOver]);

  // Main 60fps Game Loop for bubble movement
  useEffect(() => {
    if (isGameOver) return;
    let animId: number;

    const update = () => {
      setBubbles((prev) =>
        prev
          .map((b) => (b.popped ? b : { ...b, y: b.y - b.speed }))
          .filter((b) => b.y > -20 && !b.popped)
      );
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver]);

  // Countdown timer
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsGameOver(true);
          if (soundEnabled) playVictoryFanfare();
          onRewardStar();
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
          speakVietnamese(`Hoan hô bé! Bé đã bắt được ${score} điểm!`);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameOver, score, soundEnabled, onRewardStar]);

  // Pop bubble handler
  const popBubble = useCallback(
    (id: number, points: number) => {
      playClickSound();
      setScore((s) => s + points);
      setComboCount((c) => c + 1);

      setBubbles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
      );

      // Trigger micro confetti
      confetti({
        particleCount: 15,
        spread: 35,
        origin: { y: 0.7 }
      });
    },
    []
  );

  // Optical Motion Detection with Canvas for Camera
  useEffect(() => {
    if (!cameraActive || isGameOver) return;
    let animId: number;
    let lastFrameData: Uint8ClampedArray | null = null;

    const processMotion = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState >= 2) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, 160, 120);
          const frame = ctx.getImageData(0, 0, 160, 120);
          const data = frame.data;

          if (lastFrameData) {
            let movementCount = 0;
            // Sample motion
            for (let i = 0; i < data.length; i += 16) {
              const diff = Math.abs(data[i] - lastFrameData[i]);
              if (diff > 45) {
                movementCount++;
              }
            }

            if (movementCount > 60) {
              setMotionActive(true);
              // Pop nearest bubbles
              setBubbles((prev) => {
                const target = prev.find((b) => !b.popped && b.y < 80 && b.y > 20);
                if (target) {
                  popBubble(target.id, target.points);
                }
                return prev;
              });
            } else {
              setMotionActive(false);
            }
          }
          lastFrameData = new Uint8ClampedArray(data);
        }
      }
      animId = requestAnimationFrame(processMotion);
    };

    animId = requestAnimationFrame(processMotion);
    return () => cancelAnimationFrame(animId);
  }, [cameraActive, isGameOver, popBubble]);

  const handleRestart = () => {
    setScore(0);
    setTimeLeft(45);
    setIsGameOver(false);
    setBubbles([]);
    setComboCount(0);
  };

  return (
    <div className="max-w-6xl mx-auto py-3 px-2 sm:px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => {
            stopCamera();
            onExit();
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-sky-50 text-slate-800 border-2 border-sky-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-5 h-5 text-sky-700" />
          <span>Về Kho Game</span>
        </button>

        {/* Score & Timer HUD */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl flex items-center gap-2 text-yellow-950 font-black text-base shadow-sm">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span>Điểm: <span className="tabular-nums text-lg text-amber-800">{score}</span></span>
          </div>

          <div className="px-4 py-2 bg-rose-100 border-2 border-rose-300 rounded-2xl flex items-center gap-2 text-rose-950 font-black text-base shadow-sm">
            <span>⏱️</span>
            <span><span className="tabular-nums text-lg text-rose-700">{timeLeft}</span>s</span>
          </div>

          <button
            onClick={() => (cameraActive ? stopCamera() : startCamera())}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-1.5 font-extrabold text-xs sm:text-sm ${
              cameraActive
                ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                : 'bg-slate-100 text-slate-700 border-slate-300'
            }`}
          >
            {cameraActive ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
            <span className="hidden sm:inline">{cameraActive ? 'Camera Bật' : 'Bật Camera'}</span>
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-sky-400 shadow-2xl bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 min-h-[460px] sm:min-h-[540px]">
        {/* Background Image / Camera Feed */}
        {cameraActive ? (
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100 opacity-80"
            />
            {/* Hidden canvas for optical motion detection */}
            <canvas ref={canvasRef} width={160} height={120} className="hidden" />
          </div>
        ) : (
          <CameraBackdrop
            imageSrc="/assets/images/kid_camera_bubbles_1794368979884.jpg"
            theme="bubbles"
            title="Bé Bắt Bong Bóng & Quả Ngọt"
          />
        )}

        {/* Motion Wave Indicator */}
        {motionActive && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-emerald-500 text-white rounded-full font-black text-xs flex items-center gap-1.5 shadow-lg animate-bounce">
            <Hand className="w-4 h-4" />
            <span>Phát hiện tay vẫy! Nổ bong bóng!</span>
          </div>
        )}

        {/* Floating Interactive Bubbles */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          {bubbles.map((b) => (
            <button
              key={b.id}
              onClick={() => popBubble(b.id, b.points)}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute rounded-full flex items-center justify-center cursor-pointer shadow-lg active:scale-125 transition-transform duration-75 select-none bg-gradient-to-tr ${b.color} border-2 border-white/80 animate-pulse-subtle`}
            >
              <span className="text-3xl sm:text-4xl filter drop-shadow-md">
                {b.emoji}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom Banner Instruction for Kids */}
        <div className="absolute bottom-3 left-4 right-4 z-20 bg-white/90 backdrop-blur-md p-3 rounded-2xl border-2 border-sky-300 text-center flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-sky-950">
            <span className="text-xl">🫧</span>
            <span>
              {cameraActive
                ? 'Bé đứng trước camera và vẫy tay thật nhanh, hoặc chạm vào màn hình để nổ bong bóng!'
                : 'Bé chạm tay vào màn hình hoặc bấm chuột để nổ bong bóng và nhặt trái cây nhé!'}
            </span>
          </div>
          {cameraError && (
            <span className="text-[11px] text-amber-700 font-bold hidden md:inline">
              (Chế độ chạm cảm ứng sẵn sàng)
            </span>
          )}
        </div>

        {/* Game Over Modal */}
        {isGameOver && (
          <div className="absolute inset-0 z-30 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-4 border-yellow-400 shadow-2xl animate-flash-green">
              <div className="text-6xl mb-3 animate-bounce">🏆🌟</div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Hoan Hô Bé Yêu!</h3>
              <p className="text-base font-bold text-slate-600 mb-4">
                Bé đã xuất sắc thu thập được:
              </p>
              <div className="p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300 text-3xl font-black text-amber-900 mb-6">
                {score} Điểm
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Chơi Lại</span>
                </button>
                <button
                  onClick={() => {
                    stopCamera();
                    onExit();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Chọn Trò Khác</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
