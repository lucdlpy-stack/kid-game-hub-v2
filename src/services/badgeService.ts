import { playVictoryFanfare, speakVietnamese } from '../utils/audio';
import confetti from 'canvas-confetti';

export interface KidBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'puzzle' | 'camera' | 'archery' | 'runner' | 'music' | 'quiz' | 'stars';
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

const STORAGE_BADGES_KEY = 'kid_badges_list_v1';

export const INITIAL_BADGES: KidBadge[] = [
  {
    id: 'badge_puzzle_expert',
    title: 'Chuyên Gia Ghép Hình',
    description: 'Bé đã hoàn thành 2 trò chơi ghép hình tương ứng!',
    icon: '🧩',
    category: 'puzzle',
    unlocked: false,
    progress: 0,
    maxProgress: 2
  },
  {
    id: 'badge_camera_star',
    title: 'Siêu Sao Camera',
    description: 'Bé đã trải nghiệm trò chơi camera biến hình hoặc chụp ảnh kỷ niệm!',
    icon: '📸',
    category: 'camera',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'badge_archery_master',
    title: 'Bậc Thầy Bắn Cung',
    description: 'Bé đã ngắm bắn trúng các quả ngọt và đạt trên 50 điểm bắn cung!',
    icon: '🏹',
    category: 'archery',
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  {
    id: 'badge_speed_racer',
    title: 'Vô Địch Đường Đua',
    description: 'Bé đã tham gia đua xe thú cưng hoặc vượt chướng ngại vật về đích!',
    icon: '🏎️',
    category: 'runner',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'badge_little_maestro',
    title: 'Nhạc Sĩ Tí Hon',
    description: 'Bé đã gõ đàn piano âm nhạc và nhún nhảy theo giai điệu!',
    icon: '🎹',
    category: 'music',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'badge_quiz_genius',
    title: 'Thần Đồng Đố Vui',
    description: 'Bé đã trả lời đúng 5 câu đố vui hình ảnh!',
    icon: '🦁',
    category: 'quiz',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'badge_star_collector',
    title: 'Thợ Săn Sao Vàng',
    description: 'Bé đã tích lũy được 10 Ngôi Sao May Mắn!',
    icon: '⭐',
    category: 'stars',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  }
];

export function getStoredBadges(): KidBadge[] {
  try {
    const raw = localStorage.getItem(STORAGE_BADGES_KEY);
    if (!raw) return INITIAL_BADGES;
    const parsed: KidBadge[] = JSON.parse(raw);
    // Ensure all badges exist
    return INITIAL_BADGES.map((init) => {
      const found = parsed.find((p) => p.id === init.id);
      return found || init;
    });
  } catch {
    return INITIAL_BADGES;
  }
}

export function saveBadges(badges: KidBadge[]) {
  try {
    localStorage.setItem(STORAGE_BADGES_KEY, JSON.stringify(badges));
  } catch (err) {
    console.warn('Failed saving badges', err);
  }
}

/** Broadcast event for UI toast notifications */
export function recordBadgeProgress(
  category: KidBadge['category'],
  increment: number = 1,
  onBadgeUnlocked?: (badge: KidBadge) => void
) {
  const currentBadges = getStoredBadges();
  let updated = false;

  const nextBadges = currentBadges.map((b) => {
    if (b.category === category) {
      const nextProgress = Math.min(b.progress + increment, b.maxProgress);
      const isNowUnlocked = !b.unlocked && nextProgress >= b.maxProgress;

      if (isNowUnlocked) {
        updated = true;
        const unlockedBadge: KidBadge = {
          ...b,
          progress: nextProgress,
          unlocked: true,
          unlockedAt: new Date().toLocaleDateString('vi-VN')
        };

        // Trigger celebratory sound & toast
        setTimeout(() => {
          playVictoryFanfare();
          confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
          speakVietnamese(`Hoan hô! Bé đã mở khóa huy hiệu: ${b.title}!`);
          if (onBadgeUnlocked) onBadgeUnlocked(unlockedBadge);
        }, 300);

        return unlockedBadge;
      } else if (nextProgress !== b.progress) {
        updated = true;
        return { ...b, progress: nextProgress };
      }
    }
    return b;
  });

  if (updated) {
    saveBadges(nextBadges);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kid-badges-updated'));
    }
  }
}
