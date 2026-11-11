/**
 * Kid Game Hub - Standard Game Data Contracts
 * Designed for Preschool Children (Ages 3-5) and Smart TV / Touch interfaces
 */

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  timeLimit?: number;
  hint?: string;
  soundType?: 'lion' | 'dog' | 'cat' | 'car' | 'bell' | 'star' | 'bird' | 'frog' | 'chime';
  emoji?: string;
}

export interface QuizGame {
  id: string;
  title: string;
  icon: string;
  ageGroup: string; // e.g. "3-5 tuổi"
  gameType: 'quiz';
  description: string;
  badgeTheme?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'purple';
  interactiveQuestions: QuizQuestion[];
}

export interface PuzzlePair {
  id: string;
  name: string;
  symbol: string;
  matchTarget: string;
  hint: string;
  targetSymbol?: string;
}

export interface MatchingPuzzleGame {
  id: string;
  title: string;
  icon: string;
  ageGroup: string; // e.g. "3-5 tuổi"
  gameType: 'matching_puzzle';
  description: string;
  badgeTheme?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'purple';
  puzzlePairs: PuzzlePair[];
}

export type Game = QuizGame | MatchingPuzzleGame;

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
