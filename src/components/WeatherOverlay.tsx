import React, { useEffect, useRef } from 'react';

export type WeatherSeason = 'spring' | 'summer' | 'autumn' | 'winter' | 'starry';

interface WeatherOverlayProps {
  season: WeatherSeason;
}

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ season }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      vRot: number;
      symbol: string;
      color?: string;
    }

    const particles: Particle[] = [];
    const count = season === 'winter' ? 45 : season === 'spring' ? 35 : season === 'autumn' ? 30 : 25;

    const getSymbolForSeason = (s: WeatherSeason): string[] => {
      switch (s) {
        case 'spring':
          return ['🌸', '🌺', '🍃', '✨'];
        case 'summer':
          return ['🦋', '☀️', '🌻', '✨'];
        case 'autumn':
          return ['🍁', '🍂', '🌾', '🍃'];
        case 'winter':
          return ['❄️', '🌨️', '✨', '⭐'];
        case 'starry':
        default:
          return ['⭐', '🌟', '✨', '💫'];
      }
    };

    const symbols = getSymbolForSeason(season);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (season === 'autumn' ? 1.5 : 0.8),
        vy: Math.random() * 1.5 + (season === 'winter' ? 0.8 : season === 'autumn' ? 1.2 : 0.6),
        size: Math.random() * 16 + 14,
        opacity: Math.random() * 0.7 + 0.3,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.03,
        symbol: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.4;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Wrap around canvas screen
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px 'Noto Color Emoji', 'Segoe UI Emoji', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [season]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-700"
    />
  );
};
