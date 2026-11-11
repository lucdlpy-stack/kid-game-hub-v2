import React, { useRef, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Camera, CameraOff, ArrowLeft, RotateCcw, Volume2, Sparkles, Trophy, Hand } from 'lucide-react';
import { playCorrectSound, playClickSound, playVictoryFanfare, speakVietnamese } from '../utils/audio';

interface FallingStar {
  id: number;
  x: number; // percentage 15 to 85
  y: number; // percentage 0 to 105
  speed: number;
  emoji: string;
  points: number;
  type: 'star' | 'rainbow' | 'planet';
}

interface CameraStarsGameViewProps {
  onExit: () => void;
  onRewardStar: () => void;
  soundEnabled: boolean;
}

export const CameraStarsGameView: React.FC<CameraStarsGameViewProps> = ({
  onExit,
  onRewardStar,
  soundEnabled
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [basketX, setBasketX] = useState<number>(50); // percentage 15 - 85
  const [score, setScore] = useState<number>(0);
  const [starsCaught, setStarsCaught] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [fallingStars, setFallingStars] = useState<FallingStar[]>([]);
  const [handDetectedSide, setHandDetectedSide] = useState<'left' | 'right' | null>(null);

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
      speakVietnamese('Bé hãy vẫy tay sang trái sang phải để điều khiển giỏ thần kỳ hứng sao rơi nhé!');
    } catch (err) {
      console.warn('Camera error:', err);
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

  // Spawn stars
  useEffect(() => {
    if (isGameOver) return;
    const interval = setInterval(() => {
      setFallingStars((prev) => {
        if (prev.length >= 8) return prev;
        const starTypes = [
          { emoji: '⭐', points: 10, type: 'star' as const },
          { emoji: '🌟', points: 15, type: 'star' as const },
          { emoji: '🌠', points: 25, type: 'rainbow' as const },
          { emoji: '🪐', points: 20, type: 'planet' as const },
          { emoji: '✨', points: 10, type: 'star' as const }
        ];
        const chosen = starTypes[Math.floor(Math.random() * starTypes.length)];
        const newStar: FallingStar = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 70) + 15,
          y: -10,
          speed: Math.random() * 0.4 + 0.35,
          emoji: chosen.emoji,
          points: chosen.points,
          type: chosen.type
        };
        return [...prev, newStar];
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isGameOver]);

  // Main 60fps loop
  useEffect(() => {
    if (isGameOver) return;
    let animId: number;

    const tick = () => {
      setFallingStars((prev) => {
        const remaining: FallingStar[] = [];
        prev.forEach((s) => {
          const nextY = s.y + s.speed;

          // Check collision with basket at y ~ 75-85
          if (nextY >= 72 && nextY <= 85 && Math.abs(s.x - basketX) < 16) {
            // Caught star!
            playClickSound();
            setScore((sc) => sc + s.points);
            setStarsCaught((st) => st + 1);
            confetti({ particleCount: 15, spread: 40, origin: { y: 0.8 } });
          } else if (nextY < 105) {
            remaining.push({ ...s, y: nextY });
          }
        });
        return remaining;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, basketX]);

  // Optical hand tracking (Left vs Right half movement)
  useEffect(() => {
    if (!cameraActive || isGameOver) return;
    let animId: number;
    let lastData: Uint8ClampedArray | null = null;

    const detectHands = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState >= 2) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(video, 0, 0, 160, 120);
          const frame = ctx.getImageData(0, 0, 160, 120);
          const data = frame.data;

          if (lastData) {
            let leftDiff = 0;
            let rightDiff = 0;

            // Note: camera is mirrored (-scale-x-100), so left side of camera image is user's right hand
            for (let i = 0; i < data.length; i += 16) {
              const pixelX = (i / 4) % 160;
              const diff = Math.abs(data[i] - lastData[i]);
              if (diff > 45) {
                if (pixelX < 80) rightDiff++;
                else leftDiff++;
              }
            }

            if (leftDiff > 40 && leftDiff > rightDiff) {
              setHandDetectedSide('left');
              setBasketX((x) => Math.max(x - 2.5, 15));
            } else if (rightDiff > 40 && rightDiff > leftDiff) {
              setHandDetectedSide('right');
              setBasketX((x) => Math.min(x + 2.5, 85));
            } else {
              setHandDetectedSide(null);
            }
          }
          lastData = new Uint8ClampedArray(data);
        }
      }
      animId = requestAnimationFrame(detectHands);
    };

    animId = requestAnimationFrame(detectHands);
    return () => cancelAnimationFrame(animId);
  }, [cameraActive, isGameOver]);

  // Timer countdown
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsGameOver(true);
          if (soundEnabled) playVictoryFanfare();
          onRewardStar();
          confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
          speakVietnamese(`Hoan hô bé! Bé đã hứng được ${starsCaught} ngôi sao vũ trụ!`);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, starsCaught, soundEnabled, onRewardStar]);

  const handleRestart = () => {
    setScore(0);
    setStarsCaught(0);
    setTimeLeft(45);
    setIsGameOver(false);
    setFallingStars([]);
    setBasketX(50);
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
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-800 border-2 border-indigo-300 rounded-2xl font-black text-sm shadow-sm cursor-pointer tv-focus-ring"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-700" />
          <span>Về Kho Game</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-yellow-100 border-2 border-yellow-300 rounded-2xl text-yellow-950 font-black text-sm flex items-center gap-1.5 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Sao: <span className="tabular-nums text-base text-amber-900">{starsCaught}</span></span>
          </div>
          <div className="px-4 py-2 bg-rose-100 border-2 border-rose-300 rounded-2xl text-rose-950 font-black text-sm flex items-center gap-1.5 shadow-sm">
            <span>⏱️</span>
            <span><span className="tabular-nums text-base text-rose-700">{timeLeft}</span>s</span>
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
      </div>

      {/* Main Cosmic Play Area */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-indigo-400 shadow-2xl bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 min-h-[460px] sm:min-h-[520px] select-none">
        {/* Background / Video Feed */}
        {cameraActive ? (
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100 opacity-60"
            />
            <canvas ref={canvasRef} width={160} height={120} className="hidden" />
          </div>
        ) : (
          <img
            src="/src/assets/images/kid_camera_stars_1794370846892.jpg"
            alt="Cosmic Stars"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}

        {/* Hand direction alert */}
        {handDetectedSide && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 bg-yellow-400 text-yellow-950 rounded-full font-black text-xs flex items-center gap-2 shadow-lg animate-bounce">
            <Hand className="w-4 h-4" />
            <span>Đang vẫy tay sang {handDetectedSide === 'left' ? 'TRÁI ⬅️' : 'PHẢI ➡️'}</span>
          </div>
        )}

        {/* Falling Stars */}
        {fallingStars.map((s) => (
          <div
            key={s.id}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className="absolute z-10 text-4xl sm:text-5xl filter drop-shadow-lg transition-transform duration-75 select-none"
          >
            {s.emoji}
          </div>
        ))}

        {/* Magic Star Catching Basket */}
        <div
          style={{
            left: `${basketX}%`,
            top: '80%',
            transform: 'translate(-50%, -50%)'
          }}
          className="absolute z-20 flex flex-col items-center transition-all duration-100"
        >
          <div className="text-6xl sm:text-7xl filter drop-shadow-2xl animate-bounce">
            🧺
          </div>
          <span className="text-[11px] font-black bg-yellow-300 text-yellow-950 px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
            Giỏ Hứng Sao
          </span>
        </div>

        {/* Lane Touch Buttons at bottom */}
        <div className="absolute bottom-4 inset-x-4 z-30 flex items-center justify-between gap-3">
          <button
            onClick={() => setBasketX((x) => Math.max(x - 15, 15))}
            className="px-6 py-3.5 bg-white/90 hover:bg-white text-indigo-950 font-black text-base rounded-2xl border-2 border-indigo-300 shadow-xl active:scale-95 cursor-pointer tv-focus-ring"
          >
            ⬅️ Di Chuyển Trái
          </button>

          <span className="text-white/80 font-black text-xs hidden sm:inline">
            Vẫy tay hoặc bấm nút để hứng sao nhé!
          </span>

          <button
            onClick={() => setBasketX((x) => Math.min(x + 15, 85))}
            className="px-6 py-3.5 bg-white/90 hover:bg-white text-indigo-950 font-black text-base rounded-2xl border-2 border-indigo-300 shadow-xl active:scale-95 cursor-pointer tv-focus-ring"
          >
            Di Chuyển Phải ➡️
          </button>
        </div>

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 z-40 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center border-4 border-yellow-400 shadow-2xl animate-flash-green">
              <div className="text-7xl mb-3 animate-bounce">⭐🎉</div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">Bé Bắt Sao Giỏi Quá!</h3>
              <p className="text-base font-bold text-slate-600 mb-4">
                Bé đã hứng được vào giỏ ma thuật:
              </p>
              <div className="p-4 bg-yellow-100 rounded-2xl border-2 border-yellow-300 text-3xl font-black text-amber-900 mb-6">
                {starsCaught} Ngôi Sao Vũ Trụ
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Chơi Lại</span>
                </button>
                <button
                  onClick={() => {
                    stopCamera();
                    onExit();
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 text-white font-black text-lg rounded-2xl shadow-md cursor-pointer flex items-center justify-center gap-2 tv-focus-ring"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Về Kho Game</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
