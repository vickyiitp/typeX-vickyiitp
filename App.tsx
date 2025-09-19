
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import TypingTest from './components/TypingTest';
import Results from './components/Results';
import Footer from './components/Footer';
import LevelSelector from './components/LevelSelector';
import Tutorial from './components/Tutorial';
import WorldwideStats from './components/WorldwideStats';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import ToastContainer from './components/ToastContainer';
import AboutModal from './components/AboutModal';
import { AppView, GameStats, Level, WorldwideStatsData, UserProfile, Toast } from './types';
import { TEXT_LEVELS, INITIAL_WORLDWIDE_STATS, ACHIEVEMENTS, DIFFICULTY_XP_MULTIPLIERS } from './constants';
import { loadWorldwideStats, saveWorldwideStats, loadUserProfile, saveUserProfile } from './services/storageService';

interface ChallengeConfig {
  text: string;
  duration: number;
  difficulty: Level['difficulty'];
}

interface CustomTestConfig {
  text: string;
  duration: number;
}

const DEFAULT_USER_PROFILE: UserProfile = {
    username: 'Operator-01',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    testsCompleted: 0,
    proTestsCompleted: 0,
    unlockedAchievements: [],
};


const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<AppView>('levelSelector');
  const [gameStats, setGameStats] = useState<GameStats>({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [challengeConfig, setChallengeConfig] = useState<ChallengeConfig | null>(null);
  const [customTestConfig, setCustomTestConfig] = useState<CustomTestConfig | null>(null);
  const [worldwideStats, setWorldwideStats] = useState<WorldwideStatsData>(INITIAL_WORLDWIDE_STATS);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => loadUserProfile() || DEFAULT_USER_PROFILE);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  
  useEffect(() => {
    const stats = loadWorldwideStats();
    if (stats) {
        setWorldwideStats(stats);
    } else {
        const initialStats = { ...INITIAL_WORLDWIDE_STATS, totalUsers: 1 };
        setWorldwideStats(initialStats);
        saveWorldwideStats(initialStats);
    }
  }, []);

  useEffect(() => {
    saveUserProfile(userProfile);
  }, [userProfile]);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  const addToast = (message: string, icon: React.ReactNode) => {
      const id = Date.now();
      setToasts(prev => [...prev, { id, message, icon }]);
      setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
      }, 5000);
  };

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLevelSelect = useCallback((levelIndex: number) => {
    setCurrentLevel(levelIndex);
    setChallengeConfig(null);
    setCustomTestConfig(null);
    setView('typingTest');
  }, []);

  const handleStartChallenge = useCallback((text: string, duration: number, difficulty: Level['difficulty']) => {
    setCurrentLevel(null);
    setChallengeConfig({ text, duration, difficulty });
    setCustomTestConfig(null);
    setView('typingTest');
  }, []);
  
  const handleStartCustomTest = useCallback((text: string, duration: number) => {
    setCurrentLevel(null);
    setChallengeConfig(null);
    setCustomTestConfig({ text, duration });
    setView('typingTest');
  }, []);

  const handleTestFinish = useCallback((stats: GameStats) => {
    setGameStats(stats);
    
    let currentChallengeDifficulty: Level['difficulty'] = 'Beginner';
    let currentChallengeMode: Level['mode'] = 'standard';

    if (currentLevel !== null) {
        currentChallengeDifficulty = TEXT_LEVELS[currentLevel].difficulty;
        currentChallengeMode = TEXT_LEVELS[currentLevel].mode;
    } else if (challengeConfig) {
        currentChallengeDifficulty = challengeConfig.difficulty;
        currentChallengeMode = 'pro';
    } else if (customTestConfig) {
        currentChallengeDifficulty = 'Intermediate'; // Default for custom tests
    }
    
    // --- XP and Leveling Logic ---
    const xpMultiplier = DIFFICULTY_XP_MULTIPLIERS[currentChallengeDifficulty];
    const baseXP = Math.round(stats.wpm / 5 + stats.accuracy / 10);
    const earnedXP = Math.round(baseXP * xpMultiplier);

    setUserProfile(prevProfile => {
        let newXp = prevProfile.xp + earnedXP;
        let newLevel = prevProfile.level;
        let xpToNext = prevProfile.xpToNextLevel;

        if (newXp >= xpToNext) {
            newLevel += 1;
            newXp -= xpToNext;
            xpToNext = Math.round(xpToNext * 1.5);
            addToast(`Level Up! Reached Level ${newLevel}`, <div className="text-cyber-accent text-xl">🚀</div>);
        }
        
        // --- Achievement Logic ---
        const newTestsCompleted = prevProfile.testsCompleted + 1;
        const newProTestsCompleted = currentChallengeMode === 'pro' ? prevProfile.proTestsCompleted + 1 : prevProfile.proTestsCompleted;
        const updatedAchievements = [...prevProfile.unlockedAchievements];

        const checkAndAddAchievement = (id: string) => {
            if (!updatedAchievements.includes(id)) {
                updatedAchievements.push(id);
                const achievement = ACHIEVEMENTS[id];
                addToast(`Achievement Unlocked: ${achievement.name}`, <achievement.icon className="w-8 h-8"/>);
            }
        };

        if (newTestsCompleted >= 1) checkAndAddAchievement('test1');
        if (newTestsCompleted >= 10) checkAndAddAchievement('test10');
        if (newTestsCompleted >= 50) checkAndAddAchievement('test50');
        if (stats.wpm >= 80) checkAndAddAchievement('wpm80');
        if (stats.wpm >= 100) checkAndAddAchievement('wpm100');
        if (stats.wpm >= 120) checkAndAddAchievement('wpm120');
        if (stats.accuracy >= 99) checkAndAddAchievement('accuracy99');
        if (stats.errors === 0) checkAndAddAchievement('noErrors');
        if (newProTestsCompleted >= 1) checkAndAddAchievement('pro1');
        if (newProTestsCompleted >= 5) checkAndAddAchievement('pro5');

        return {
            ...prevProfile,
            level: newLevel,
            xp: newXp,
            xpToNextLevel: xpToNext,
            testsCompleted: newTestsCompleted,
            proTestsCompleted: newProTestsCompleted,
            unlockedAchievements: updatedAchievements,
        };
    });
    
    const updatedStats = ((prevStats: WorldwideStatsData) => {
        const newTotalTests = prevStats.totalTests + 1;
        const newAverageWpm = Math.round(((prevStats.averageWpm * prevStats.totalTests) + stats.wpm) / newTotalTests);
        const newAverageAccuracy = Math.round(((prevStats.averageAccuracy * prevStats.totalTests) + stats.accuracy) / newTotalTests);
        
        return {
            ...prevStats,
            totalTests: newTotalTests,
            averageWpm: newAverageWpm,
            averageAccuracy: newAverageAccuracy,
        };
    })(worldwideStats);

    setWorldwideStats(updatedStats);
    saveWorldwideStats(updatedStats);

    setView('results');
  }, [worldwideStats, currentLevel, challengeConfig, customTestConfig]);

  const handleReturnToLevels = useCallback(() => {
    setView('levelSelector');
    setGameStats({ wpm: 0, accuracy: 0, time: 0, errors: 0 });
    setCurrentLevel(null);
    setChallengeConfig(null);
    setCustomTestConfig(null);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'tutorial':
        return <Tutorial />;
      case 'worldwideStats':
        return <WorldwideStats stats={worldwideStats} />;
      case 'profile':
        return <Profile userProfile={userProfile} />;
      case 'leaderboard':
        return <Leaderboard currentUser={userProfile} />;
      case 'results':
        return <Results stats={gameStats} onRestart={handleReturnToLevels} />;
      case 'typingTest': {
        const testProps = currentLevel !== null 
          ? { text: TEXT_LEVELS[currentLevel].text, duration: 60 }
          : challengeConfig 
          ? { text: challengeConfig.text, duration: challengeConfig.duration }
          : customTestConfig
          ? { text: customTestConfig.text, duration: customTestConfig.duration }
          : null;
        
        if (!testProps) {
          setView('levelSelector');
          return null;
        }
        return (
          <TypingTest
            onFinish={handleTestFinish}
            text={testProps.text}
            duration={testProps.duration}
            worldwideStats={worldwideStats}
          />
        );
      }
      case 'levelSelector':
      default:
        return <LevelSelector onSelectLevel={handleLevelSelect} onStartChallenge={handleStartChallenge} onStartCustomTest={handleStartCustomTest} onShowTutorial={() => setView('tutorial')} />;
    }
  };
  
  const hexBackground = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2300f5d4' fill-opacity='0.07' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.99 7.5V30L0 22.5zM15 0l12.99 7.5V22.5L15 15zM28 15L15 7.5V0l13 7.5zM14 24.51l14-8.06v16.12l-14 8.06zM3 31.75L14 38v8.69L3 38.25zM15 38l13-7.25v8.69L15 46.69z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;


  return (
    <div className="min-h-screen font-rajdhani text-cyber-text bg-white dark:bg-cyber-bg flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden">
      <ToastContainer toasts={toasts} />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-100" 
        style={{ backgroundImage: hexBackground }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyber-bg via-transparent to-cyber-bg"></div>
      
      <Navbar theme={theme} toggleTheme={toggleTheme} currentView={view} setView={setView} userProfile={userProfile} onShowAbout={() => setIsAboutModalOpen(true)} />
      
      <main className="w-full max-w-5xl z-10 flex-grow flex items-center justify-center py-8">
        {renderContent()}
      </main>

      <Footer onShowAbout={() => setIsAboutModalOpen(true)} />
    </div>
  );
};

export default App;
