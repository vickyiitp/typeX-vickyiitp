import React, { useState } from 'react';
import { Level } from '../types';
import { generateTypingChallenge } from '../services/geminiService';
import { BrainIcon } from './icons/GuideIcons';

const DIFFICULTIES: Level['difficulty'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const DURATIONS = [30, 60, 90, 120];

interface ChallengeGeneratorProps {
    onStart: (text: string, duration: number, difficulty: Level['difficulty']) => void;
}

const ChallengeGenerator: React.FC<ChallengeGeneratorProps> = ({ onStart }) => {
    const [difficulty, setDifficulty] = useState<Level['difficulty']>('Intermediate');
    const [duration, setDuration] = useState(60);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const text = await generateTypingChallenge(difficulty, duration);
            if (text) {
                onStart(text, duration, difficulty);
            } else {
                setError("AI failed to generate a valid challenge. Please try again.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const difficultyColors = {
        'Beginner': 'border-cyber-primary text-cyber-primary',
        'Intermediate': 'border-yellow-400 text-yellow-400',
        'Advanced': 'border-orange-500 text-orange-500',
        'Expert': 'border-cyber-secondary text-cyber-secondary',
    };

    return (
        <div className="w-full bg-cyber-surface/50 backdrop-blur-md border border-cyber-accent/30 rounded-lg p-6 flex flex-col gap-6 animate-fadeIn">
            <div>
                <h3 className="font-orbitron text-xl text-cyber-accent mb-2">Typing Master AI</h3>
                <p className="text-cyber-text-dark">Configure the parameters and let our AI create a unique mission just for you.</p>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-cyber-text-dark font-bold mb-2">Select Difficulty</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {DIFFICULTIES.map(d => (
                            <button
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`py-3 px-2 text-sm rounded-md font-bold border-2 transition-all duration-300 ${difficulty === d ? `${difficultyColors[d]} bg-cyber-bg/50` : 'border-cyber-surface text-cyber-text-dark hover:border-cyber-primary/50'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-cyber-text-dark font-bold mb-2">Select Duration (seconds)</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {DURATIONS.map(dur => (
                            <button
                                key={dur}
                                onClick={() => setDuration(dur)}
                                className={`py-3 px-2 text-sm rounded-md font-bold border-2 transition-all duration-300 ${duration === dur ? 'border-cyber-accent bg-cyber-accent/10' : 'border-cyber-surface text-cyber-text-dark hover:border-cyber-accent/50'}`}
                            >
                                {dur}s
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-md">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-cyber-accent text-cyber-bg font-bold py-4 px-6 rounded-md hover:shadow-neon-primary transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <div className="w-5 h-5 border-2 border-t-transparent border-cyber-bg rounded-full animate-spin"></div>
                        Generating Mission...
                    </>
                ) : (
                    <>
                        <BrainIcon />
                        Generate Mission
                    </>
                )}
            </button>
        </div>
    );
};

export default ChallengeGenerator;