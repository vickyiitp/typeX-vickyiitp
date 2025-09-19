
export type GameState = 'waiting' | 'running' | 'finished';

export interface GameStats {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
}

export interface Level {
  title: string;
  description: string;
  text: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  xp: number;
  mode: 'standard' | 'pro';
}

export interface WorldwideStatsData {
    totalUsers: number;
    totalTests: number;
    averageWpm: number;
    averageAccuracy: number;
}


export type AppView = 'levelSelector' | 'typingTest' | 'results' | 'tutorial' | 'worldwideStats' | 'profile' | 'leaderboard';

export type DisplayMode = 'practice' | 'custom' | 'master';

export interface UserProfile {
  username: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  testsCompleted: number;
  proTestsCompleted: number;
  unlockedAchievements: string[];
}

export interface LeaderboardEntry {
    rank: number | string;
    name: string;
    wpm: number | string;
    accuracy: number | string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.FC<{className?: string}>;
}

export interface Toast {
    id: number;
    message: string;
    icon: React.ReactNode;
}
