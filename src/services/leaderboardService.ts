/**
 * Leaderboard Service for "Thế giới trò chơi"
 * Stores kid profile snapshots, scores, stars, and game rankings.
 */

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarUrl: string; // Base64 data URI from webcam snapshot or emoji avatar
  score: number;
  stars: number;
  gameTitle: string;
  date: string;
  badgeTitle?: string;
  isCustomSnapshot?: boolean;
}

const STORAGE_KEY = 'THE_GIOI_TRO_CHOI_LEADERBOARD_V1';

const INITIAL_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Bé Suboi Siêu Nhí',
    avatarUrl: '🚀',
    score: 950,
    stars: 35,
    gameTitle: 'Biến Hình Siêu Nhân',
    date: 'Hôm nay',
    badgeTitle: 'Siêu sao Camera 🏆'
  },
  {
    id: 'lead-2',
    name: 'Bé Bún Cây Nấm',
    avatarUrl: '🌸',
    score: 880,
    stars: 28,
    gameTitle: 'Bé Học Kỹ Năng Khi Gặp Hỏa Hoạn',
    date: 'Hôm qua',
    badgeTitle: 'Anh Hùng Cứu Hỏa 🚒'
  },
  {
    id: 'lead-3',
    name: 'Bé Miu Miu',
    avatarUrl: '🐱',
    score: 820,
    stars: 24,
    gameTitle: 'Ghép Đồ Chơi Xinh Yêu',
    date: 'Hôm nay',
    badgeTitle: 'Chuyên Gia Ghép Hình 🧩'
  },
  {
    id: 'lead-4',
    name: 'Bé Ben Tốc Độ',
    avatarUrl: '🏎️',
    score: 790,
    stars: 20,
    gameTitle: 'Đua Xe Thú Cưng Cầu Vồng',
    date: '2 ngày trước',
    badgeTitle: 'Vô Địch Đường Đua 🏎️'
  }
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ENTRIES));
      return INITIAL_ENTRIES;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse leaderboard', err);
    return INITIAL_ENTRIES;
  }
};

export const addLeaderboardEntry = (newEntry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry => {
  const current = getLeaderboard();
  const entry: LeaderboardEntry = {
    ...newEntry,
    id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
    date: 'Vừa xong'
  };

  const updated = [entry, ...current].sort((a, b) => b.score - a.score).slice(0, 20);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save leaderboard', err);
  }
  return entry;
};
