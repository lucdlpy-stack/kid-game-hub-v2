/**
 * Kid Game Hub - Standard Game Data Contracts
 * Designed for Preschool Children (Ages 3-5) and Smart TV / Touch / HDMI interfaces
 */

export interface QuizQuestion {
  question: string;
  options: string[];
  optionEmojis?: string[]; // Visual graphics for toddlers who can't read yet
  correctAnswer: string;
  timeLimit?: number;
  hint?: string;
  soundType?: 'lion' | 'dog' | 'cat' | 'car' | 'bell' | 'star' | 'bird' | 'frog' | 'chime';
  emoji?: string;
  visualScene?: string;
}

export interface QuizGame {
  id: string;
  title: string;
  icon: string;
  ageGroup: string; // e.g. "3-5 tuổi"
  gameType: 'quiz';
  description: string;
  badgeTheme?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'purple';
  bannerImage?: string;
  interactiveQuestions: QuizQuestion[];
}

export interface PuzzlePair {
  id: string;
  name: string;
  symbol: string;
  matchTarget: string;
  hint: string;
  targetSymbol?: string;
  colorBg?: string;
}

export interface MatchingPuzzleGame {
  id: string;
  title: string;
  icon: string;
  ageGroup: string;
  gameType: 'matching_puzzle';
  description: string;
  badgeTheme?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'purple';
  bannerImage?: string;
  puzzlePairs: PuzzlePair[];
}

export interface DynamicActionGame {
  id: string;
  title: string;
  icon: string;
  ageGroup: string;
  gameType:
    | 'camera_ar'
    | 'camera_faces'
    | 'camera_stars'
    | 'camera_transform'
    | 'archery_fun'
    | 'obstacle_runner'
    | 'pet_racer'
    | 'music_piano'
    | 'action_wheel';
  description: string;
  badgeTheme?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'purple';
  bannerImage?: string;
}

export type Game = QuizGame | MatchingPuzzleGame | DynamicActionGame;

export interface GithubSyncResult {
  success: boolean;
  gameId: string;
  commitHash: string;
  timestamp: string;
  branch: string;
  syncedTvCount: number;
  message: string;
  rawJson: string;
}
