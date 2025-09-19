
import React, { useRef, useEffect, useCallback } from 'react';
import useTypingGame from '../hooks/useTypingGame';
import { GameStats, WorldwideStatsData } from '../types';
import Keyboard from './Keyboard';

interface TypingTestProps {
  onFinish: (stats: GameStats) => void;
  text: string;
  duration: number;
  worldwideStats: WorldwideStatsData;
}

const Caret: React.FC = () => (
    <span className="animate-blink text-cyber-primary text-xl sm:text-2xl absolute -left-1 -top-1">|</span>
);

const Character: React.FC<{
    char: string;
    state: 'correct' | 'incorrect' | 'untyped';
    isCurrent: boolean;
}> = ({ char, state, isCurrent }) => {
    const stateClasses = {
        correct: 'text-cyber-primary',
        incorrect: 'text-red-500 bg-red-500/20',
        untyped: 'text-cyber-text-dark',
    };
    return (
        <span className={`relative text-xl sm:text-2xl transition-colors duration-200 ${stateClasses[state]}`}>
            {isCurrent && <Caret />}
            {char}
        </span>
    );
};

const ComparisonBar: React.FC<{ currentUserWpm: number; worldAverageWpm: number }> = ({ currentUserWpm, worldAverageWpm }) => {
    const maxWpm = Math.max(150, worldAverageWpm + 20, currentUserWpm + 10);
    const userPercentage = (currentUserWpm / maxWpm) * 100;
    const worldPercentage = (worldAverageWpm / maxWpm) * 100;

    return (
        <div className="w-full bg-cyber-surface/50 backdrop-blur-md rounded-lg border border-cyber-secondary/20 p-4">
            <h3 className="text-center text-sm text-cyber-text-dark uppercase tracking-widest mb-3">Live WPM vs. World Average</h3>
            <div className="relative h-6 w-full bg-cyber-bg rounded-full">
                {/* World Average Marker */}
                <div 
                    className="absolute top-0 h-full flex items-center z-10"
                    style={{ left: `calc(${worldPercentage}% - 12px)`}}
                    title={`World Average: ${worldAverageWpm} WPM`}
                >
                    <div className="w-px h-8 bg-cyber-accent"></div>
                    <div className="absolute -top-6 text-xs text-cyber-accent font-bold">{worldAverageWpm}</div>
                </div>

                {/* User's Progress Bar */}
                <div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyber-secondary to-cyber-primary rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${userPercentage}%` }}
                >
                </div>
                {userPercentage > 5 && (
                     <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-cyber-bg">YOU</span>
                )}
            </div>
        </div>
    );
};


const TypingTest: React.FC<TypingTestProps> = ({ onFinish, text, duration, worldwideStats }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const {
        userInput,
        typedCharactersState,
        wpm,
        accuracy,
        timeLeft,
        errors,
        handleKeyDown,
        isFinished,
        lastKeyPressed,
        startTime
    } = useTypingGame(text, duration);

    useEffect(() => {
        if (isFinished) {
            const timeTaken = startTime ? (Date.now() - startTime) / 1000 : duration - timeLeft;
            onFinish({ wpm, accuracy, time: Math.round(timeTaken), errors });
        }
    }, [isFinished, wpm, accuracy, timeLeft, errors, onFinish, startTime, duration]);

    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        focusInput();
    }, [focusInput]);

    return (
        <div className="w-full flex flex-col items-center gap-8 animate-fadeIn">
            <div className="w-full flex justify-around p-4 bg-cyber-surface/50 backdrop-blur-md rounded-lg border border-cyber-secondary/20">
                <div className="text-center">
                    <p className="font-orbitron text-cyber-secondary text-3xl sm:text-4xl">{Math.round(wpm)}</p>
                    <p className="text-cyber-text-dark text-sm sm:text-base">WPM</p>
                </div>
                <div className="text-center">
                    <p className="font-orbitron text-cyber-primary text-3xl sm:text-4xl">{timeLeft}</p>
                    <p className="text-cyber-text-dark text-sm sm:text-base">SECONDS</p>
                </div>
                <div className="text-center">
                    <p className="font-orbitron text-cyber-secondary text-3xl sm:text-4xl">{Math.round(accuracy)}%</p>
                    <p className="text-cyber-text-dark text-sm sm:text-base">ACCURACY</p>
                </div>
            </div>

            <ComparisonBar currentUserWpm={wpm} worldAverageWpm={worldwideStats.averageWpm} />

            <div
                className="w-full p-6 bg-cyber-surface/50 backdrop-blur-md rounded-lg border border-cyber-primary/20 leading-relaxed font-mono cursor-text"
                onClick={focusInput}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="absolute opacity-0 w-0 h-0"
                    onKeyDown={handleKeyDown}
                    disabled={isFinished}
                />
                <p>
                    {text.split('').map((char, index) => (
                        <Character
                            key={index}
                            char={char}
                            state={typedCharactersState[index]}
                            isCurrent={index === userInput.length}
                        />
                    ))}
                </p>
            </div>
            <Keyboard lastKeyPressed={lastKeyPressed} />
        </div>
    );
};

export default TypingTest;
