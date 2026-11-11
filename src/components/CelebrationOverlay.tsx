import React, { useEffect, useRef } from 'react';
import { playWinCelebrationAudio } from '../utils/audio';
import { Trophy, Star, Sparkles, Camera, ArrowRight, RotateCcw } from 'lucide-react';

interface CelebrationOverlayProps {
  score: number;
  starsEarned: number;
  gameTitle: string;
  onClose: () => void;
  onRestart: () => void;
  onOpenLeaderboardWithSnapshot: () => void;
}

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  score,
  starsEarned,
  gameTitle,
  onClose,
  onRestart,
  onOpenLeaderboardWithSnapshot
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Play cheer celebration sound
    playWinCelebrationAudio();

    // Canvas Fireworks & Star Rain effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particles array
    const particles: Particle[] = [];
    const colors = ['#FF5964', '#FFE74C', '#35A7FF', '#38B000', '#FF9F1C', '#9D4EDD', '#F72585'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      alpha: number;
      decay: number;
      isStar: boolean;

      constructor(x: number, y: number, isStar = false) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (isStar ? 1 : 2);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * (isStar ? 12 : 8) + 4;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.008;
        this.isStar = isStar;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.fillStyle = this.color;
        if (this.isStar) {
          c.beginPath();
          c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          c.fill();
        } else {
          c.beginPath();
          c.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
          c.fill();
        }
        c.restore();
      }
    }

    // Launch initial fireworks bursts
    const launchBurst = (cx: number, cy: number) => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(cx, cy, Math.random() > 0.5));
      }
    };

    // Burst at multiple points
    launchBurst(width * 0.25, height * 0.3);
    launchBurst(width * 0.75, height * 0.3);
    launchBurst(width * 0.5, height * 0.2);

    const interval = setInterval(() => {
      const rx = Math.random() * width;
      const ry = Math.random() * (height * 0.5);
      launchBurst(rx, ry);
    }, 800);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      {/* Background Canvas for Fireworks & Meteor Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Main Celebration Card */}
      <div className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 text-center border-4 border-yellow-400 shadow-2xl space-y-6 transform animate-pop-in">
        {/* Rainbow Glowing Badge Header */}
        <div className="relative mx-auto w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-300 to-orange-400 flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
          <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-950 drop-shadow-md" />
          <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-yellow-300 animate-spin" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
            XUẤT SẮC QUÁ BÉ ƠI! 🎉✨
          </h2>
          <p className="text-base sm:text-lg font-bold text-amber-800">
            Bé đã hoàn thành trò chơi: <span className="text-amber-950 underline">{gameTitle}</span>
          </p>
        </div>

        {/* Score & Stars Display Box */}
        <div className="grid grid-cols-2 gap-4 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-xs border border-amber-200">
            <span className="text-xs font-black uppercase text-amber-700">Điểm Số Đạt Đượng</span>
            <span className="text-3xl font-black text-amber-900 mt-1">{score}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-xs border border-amber-200">
            <span className="text-xs font-black uppercase text-amber-700">Sao Vàng Nhận Được</span>
            <div className="flex items-center gap-1 text-2xl font-black text-yellow-600 mt-1">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-500 animate-pulse" />
              <span>+{starsEarned}</span>
            </div>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Button 1: Take Photo Snapshot & Join Leaderboard */}
          <button
            onClick={onOpenLeaderboardWithSnapshot}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-lg rounded-2xl shadow-lg border-2 border-white flex items-center justify-center gap-3 cursor-pointer transform active:scale-95 transition-all"
          >
            <Camera className="w-6 h-6" />
            <span>Chụp Ảnh Lưu Vào Bảng Xếp Hạng 📸</span>
          </button>

          {/* Button 2: Play Again or Pick Next Game */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onRestart}
              className="py-3 px-4 bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-sm rounded-xl border border-amber-300 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại Trò Này</span>
            </button>

            <button
              onClick={onClose}
              className="py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
            >
              <span>Về Trang Chủ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
