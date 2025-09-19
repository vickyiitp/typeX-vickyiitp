import React, { useState } from 'react';
import { PlayIcon } from './icons/ActionIcons';

const DURATIONS = [30, 60, 90, 120];

interface CustomTestProps {
    onStart: (text: string, duration: number) => void;
}

const CustomTest: React.FC<CustomTestProps> = ({ onStart }) => {
    const [text, setText] = useState('');
    const [duration, setDuration] = useState(60);
    const [error, setError] = useState<string | null>(null);

    const handleStart = () => {
        const trimmedText = text.trim();
        if (trimmedText.length < 20) {
            setError('Please provide a text with at least 20 characters.');
            return;
        }
        setError(null);
        onStart(trimmedText, duration);
    };

    return (
        <div className="w-full bg-cyber-surface/50 backdrop-blur-md border border-cyber-accent/30 rounded-lg p-6 flex flex-col gap-6 animate-fadeIn">
            <div>
                <h3 className="font-orbitron text-xl text-cyber-accent mb-2">Custom Test</h3>
                <p className="text-cyber-text-dark">Paste your own text and select a duration to create a personalized challenge.</p>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="custom-text-area" className="block text-cyber-text-dark font-bold mb-2">Paste your text here</label>
                    <textarea
                        id="custom-text-area"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-32 p-3 bg-cyber-bg/50 border border-cyber-primary/30 rounded-md text-cyber-text focus:ring-2 focus:ring-cyber-primary focus:outline-none transition-all duration-300 font-mono"
                        placeholder="Enter the text you want to practice with..."
                    />
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
                onClick={handleStart}
                disabled={!text.trim()}
                className="w-full flex items-center justify-center gap-3 bg-cyber-accent text-cyber-bg font-bold py-4 px-6 rounded-md hover:shadow-neon-primary transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                <PlayIcon />
                Start Test
            </button>
        </div>
    );
};

export default CustomTest;
