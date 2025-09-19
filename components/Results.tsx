
import React, { useState, useEffect } from 'react';
import { GameStats } from '../types';
import { getTypingFeedback } from '../services/geminiService';
import { ShareIcon, ReplayIcon, AIBrainIcon, ClipboardIcon } from './icons/ActionIcons';
import { RocketIcon } from './icons/GuideIcons';

interface ResultsProps {
  stats: GameStats;
  onRestart: () => void;
}

const getCoachNote = (stats: GameStats): { note: string; icon: React.ReactNode } => {
    const { wpm, accuracy, errors } = stats;
    if (wpm > 100 && accuracy > 98) return { note: "Elite performance! A true cybernetic typist.", icon: <RocketIcon/> };
    if (wpm > 80 && accuracy < 95) return { note: "Incredible speed, but precision is drifting. Recalibrate for accuracy.", icon: <RocketIcon /> };
    if (wpm < 50 && accuracy > 98) return { note: "Flawless precision. Now, let's engage the boosters and build up speed.", icon: <RocketIcon /> };
    if (errors > 5) return { note: "Multiple system errors detected. Focus on smooth, deliberate keystrokes.", icon: <RocketIcon /> };
    return { note: "Solid run, Operator. Consistency is the key to breaking new records.", icon: <RocketIcon /> };
};


const Results: React.FC<ResultsProps> = ({ stats, onRestart }) => {
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const coachsNote = getCoachNote(stats);

  useEffect(() => {
    const fetchFeedback = async () => {
      setIsLoading(true);
      try {
        const aiFeedback = await getTypingFeedback(stats);
        setFeedback(aiFeedback);
      } catch (error) {
        console.error("Failed to get AI feedback:", error);
        const errorMessage = error instanceof Error ? error.message : "Could not retrieve AI feedback.";
        setFeedback(`${errorMessage}\n\nDespite the comms issue, your performance was solid. Keep practicing to reach new heights!`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeedback();
  }, [stats]);
  
  const shareResults = () => {
    const text = `I just hit ${stats.wpm} WPM with ${stats.accuracy}% accuracy on TypeX 2025! Can you beat my score? #TypeX2025 #TypingChallenge`;
    const url = "https://example.com"; // Replace with actual app URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <div className="w-full max-w-3xl bg-cyber-surface/70 backdrop-blur-xl border border-cyber-primary/30 rounded-lg p-8 shadow-2xl shadow-cyber-secondary/10 animate-fadeIn">
      <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">Test Complete</h2>
      <p className="text-center text-cyber-text-dark mb-8">Here is your performance analysis:</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20 text-center">
          <p className="font-orbitron text-4xl text-cyber-secondary">{stats.wpm}</p>
          <p className="text-cyber-text-dark uppercase tracking-widest text-xs">WPM</p>
        </div>
        <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20 text-center">
          <p className="font-orbitron text-4xl text-cyber-secondary">{stats.accuracy}%</p>
          <p className="text-cyber-text-dark uppercase tracking-widest text-xs">Accuracy</p>
        </div>
        <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20 text-center">
          <p className="font-orbitron text-4xl text-cyber-secondary">{stats.time}s</p>
          <p className="text-cyber-text-dark uppercase tracking-widest text-xs">Time</p>
        </div>
        <div className="bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20 text-center">
          <p className="font-orbitron text-4xl text-cyber-secondary">{stats.errors}</p>
          <p className="text-cyber-text-dark uppercase tracking-widest text-xs">Errors</p>
        </div>
      </div>

      <div className="bg-cyber-bg/50 p-6 rounded-md border border-cyber-accent/20 mb-8">
        <h3 className="flex items-center gap-2 font-orbitron text-xl text-cyber-accent mb-3">
          <ClipboardIcon />
          Coach's Quick Note
        </h3>
        <div className="flex items-center gap-3 text-cyber-text">
            <div className="text-cyber-accent">{coachsNote.icon}</div>
            <p className="italic">{coachsNote.note}</p>
        </div>
      </div>

      <div className="bg-cyber-bg/50 p-6 rounded-md border border-cyber-primary/20 mb-8">
        <h3 className="flex items-center gap-2 font-orbitron text-xl text-cyber-primary mb-3">
          <AIBrainIcon />
          AI Feedback
        </h3>
        {isLoading ? (
          <div className="flex items-center gap-2 text-cyber-text-dark">
            <div className="w-4 h-4 border-2 border-t-transparent border-cyber-primary rounded-full animate-spin"></div>
            Analyzing your keystrokes...
          </div>
        ) : (
          <p className="text-cyber-text whitespace-pre-line">{feedback}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={onRestart} className="flex items-center justify-center gap-2 bg-cyber-primary text-cyber-bg font-bold py-3 px-6 rounded-md hover:shadow-neon-primary transition-all duration-300">
          <ReplayIcon />
          New Test
        </button>
        <button onClick={shareResults} className="flex items-center justify-center gap-2 bg-cyber-secondary text-white font-bold py-3 px-6 rounded-md hover:shadow-neon-secondary transition-all duration-300">
          <ShareIcon />
          Share
        </button>
      </div>
    </div>
  );
};

export default Results;
