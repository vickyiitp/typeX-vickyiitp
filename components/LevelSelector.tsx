import React, { useState, useMemo } from 'react';
import { TEXT_LEVELS } from '../constants';
import { Level, DisplayMode } from '../types';
import ChallengeGenerator from './ChallengeGenerator';
import CustomTest from './CustomTest';

interface LevelSelectorProps {
  onSelectLevel: (levelIndex: number) => void;
  onStartChallenge: (text: string, duration: number, difficulty: Level['difficulty']) => void;
  onStartCustomTest: (text: string, duration: number) => void;
  onShowTutorial: () => void;
}

const DIFFICULTIES: Level['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const LevelCard: React.FC<{ level: Level; originalIndex: number; onSelect: () => void }> = ({ level, originalIndex, onSelect }) => {
  const difficultyColors = {
    'Beginner': 'border-cyber-primary text-cyber-primary',
    'Intermediate': 'border-yellow-400 text-yellow-400',
    'Advanced': 'border-orange-500 text-orange-500',
    'Expert': 'border-cyber-secondary text-cyber-secondary',
  };

  const proModeStyles = level.mode === 'pro' ? 'border-cyber-secondary/50 shadow-neon-secondary/20' : 'border-cyber-primary/20';

  return (
    <button
      onClick={onSelect}
      className={`w-full bg-cyber-surface/50 backdrop-blur-md border rounded-lg p-6 text-left hover:bg-cyber-surface/80 hover:border-cyber-primary/60 hover:shadow-neon-primary transition-all duration-300 transform hover:-translate-y-1 ${proModeStyles}`}
      aria-label={`Select Level ${originalIndex + 1}: ${level.title}, Difficulty: ${level.difficulty}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-orbitron text-xl text-cyber-primary">{`${level.title}`}</h3>
        <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full border ${difficultyColors[level.difficulty]}`}>
          {level.difficulty}
        </span>
      </div>
      <p className="text-cyber-text-dark font-rajdhani">{level.description}</p>
    </button>
  );
};

const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel, onStartChallenge, onStartCustomTest, onShowTutorial }) => {
  const [mode, setMode] = useState<DisplayMode>('practice');
  const [difficulty, setDifficulty] = useState<'All' | Level['difficulty']>('All');

  const filteredLevels = useMemo(() => {
    return TEXT_LEVELS
      .map((level, index) => ({ ...level, originalIndex: index }))
      .filter(level => {
        const difficultyMatch = difficulty === 'All' || level.difficulty === difficulty;
        return difficultyMatch;
      });
  }, [difficulty]);
  
  const handleModeChange = (newMode: DisplayMode) => {
    setMode(newMode);
    setDifficulty('All');
  }

  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-6 animate-fadeIn">
      <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">Select a Challenge</h2>
      <p className="text-center text-cyber-text-dark mb-4">Choose your training module. Calibrate your skills and ascend the ranks.</p>
      
      <div className="w-full bg-cyber-surface/30 p-1 rounded-lg border border-cyber-primary/20 flex items-center justify-center gap-1 sm:gap-2">
        <button
            onClick={() => handleModeChange('practice')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-md font-bold transition-all duration-300 text-sm sm:text-base ${mode === 'practice' ? 'bg-cyber-primary text-cyber-bg shadow-neon-primary' : 'text-cyber-text-dark hover:bg-cyber-surface'}`}
        >
            Practice
        </button>
        <button
            onClick={() => handleModeChange('custom')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-md font-bold transition-all duration-300 text-sm sm:text-base ${mode === 'custom' ? 'bg-cyber-secondary text-white shadow-neon-secondary' : 'text-cyber-text-dark hover:bg-cyber-surface'}`}
        >
            Custom Test
        </button>
         <button
            onClick={() => handleModeChange('master')}
            className={`flex-1 py-2 px-2 sm:px-4 rounded-md font-bold transition-all duration-300 text-sm sm:text-base ${mode === 'master' ? 'bg-cyber-accent text-cyber-bg shadow-neon-primary' : 'text-cyber-text-dark hover:bg-cyber-surface'}`}
        >
            Typing Master
        </button>
      </div>

       {mode === 'master' ? (
        <ChallengeGenerator onStart={onStartChallenge} />
      ) : mode === 'custom' ? (
        <CustomTest onStart={onStartCustomTest} />
      ) : (
        <>
            <div className="w-full bg-cyber-surface/30 p-2 rounded-lg border border-cyber-primary/20 flex flex-wrap items-center justify-center gap-2">
                <button
                onClick={() => setDifficulty('All')}
                className={`px-3 py-1 text-sm rounded-md font-bold transition-all duration-300 ${difficulty === 'All' ? 'bg-cyber-accent text-cyber-bg' : 'bg-cyber-surface/50 text-cyber-text-dark hover:border-cyber-accent border border-transparent'}`}
                >
                All
                </button>
                {DIFFICULTIES.map(d => (
                <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`px-3 py-1 text-sm rounded-md font-bold transition-all duration-300 ${difficulty === d ? 'bg-cyber-accent text-cyber-bg' : 'bg-cyber-surface/50 text-cyber-text-dark hover:border-cyber-accent border border-transparent'}`}
                >
                    {d}
                </button>
                ))}
            </div>
            
            <div className="w-full bg-cyber-surface/30 p-4 rounded-lg border border-cyber-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="text-cyber-text">New to typing? Start with our beginner's guide!</p>
            <button 
                onClick={onShowTutorial}
                className="bg-cyber-secondary text-white font-bold py-2 px-4 rounded-md hover:shadow-neon-secondary transition-all duration-300 text-sm"
            >
                View Tutorial
            </button>
            </div>

            <div className="w-full flex flex-col gap-4">
                {filteredLevels.length > 0 ? (
                    filteredLevels.map((level) => (
                    <LevelCard key={level.originalIndex} level={level} originalIndex={level.originalIndex} onSelect={() => onSelectLevel(level.originalIndex)} />
                    ))
                ) : (
                    <div className="text-center p-8 bg-cyber-surface/50 rounded-lg border border-cyber-primary/20">
                        <p className="text-cyber-text-dark">No challenges found for this difficulty.</p>
                    </div>
                )}
            </div>
        </>
      )}
    </div>
  );
};

export default LevelSelector;