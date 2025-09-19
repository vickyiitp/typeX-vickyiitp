
import React from 'react';
import { UserProfile } from '../types';
import { LEADERBOARD_DATA } from '../constants';

interface LeaderboardProps {
    currentUser: UserProfile;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
    // For demo purposes, we'll create a mock entry for the current user.
    const userRank = { rank: '??', name: currentUser.username, wpm: '??', accuracy: '??' };

    // Check if the current user is already in the top 10 leaderboard data.
    const isUserInTop10 = LEADERBOARD_DATA.some(player => player.name === currentUser.username);

    return (
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 animate-fadeIn text-center">
            <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">Global Leaderboard</h2>
            <p className="text-center text-cyber-text-dark mb-4">Compete with the top operators. Ranks are updated in real-time.</p>

            <div className="w-full bg-cyber-surface/50 backdrop-blur-md border border-cyber-primary/20 rounded-lg p-4 sm:p-6">
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 text-cyber-text-dark font-bold uppercase tracking-widest text-xs border-b border-cyber-primary/20 pb-3 mb-3">
                    <div className="text-center">Rank</div>
                    <div className="col-span-2 sm:col-span-2">Operator</div>
                    <div className="text-center">WPM</div>
                    <div className="hidden sm:block text-center">Accuracy</div>
                </div>
                <div className="space-y-2">
                    {LEADERBOARD_DATA.map(player => {
                         const isCurrentUser = player.name === currentUser.username;
                         return (
                            <div key={player.rank} className={`grid grid-cols-4 sm:grid-cols-5 gap-2 items-center p-3 rounded-md transition-all ${isCurrentUser ? 'bg-cyber-primary/20 border border-cyber-primary text-cyber-text scale-105' : 'bg-cyber-bg/50'}`}>
                                <div className="text-center font-orbitron text-lg">{player.rank}</div>
                                <div className="col-span-2 sm:col-span-2 font-bold text-left">{player.name}</div>
                                <div className="text-center font-orbitron text-lg text-cyber-secondary">{player.wpm}</div>
                                <div className="hidden sm:block text-center font-orbitron text-lg text-cyber-secondary">{player.accuracy}%</div>
                            </div>
                         );
                    })}
                     {/* Current user's rank only if not in top 10 */}
                    {!isUserInTop10 && (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 items-center p-3 rounded-md border-t-2 border-dashed border-cyber-accent/30 mt-4 pt-4 bg-cyber-accent/10">
                            <div className="text-center font-orbitron text-lg text-cyber-accent">{userRank.rank}</div>
                            <div className="col-span-2 sm:col-span-2 font-bold text-left text-cyber-accent">{userRank.name} (You)</div>
                            <div className="text-center font-orbitron text-lg text-cyber-accent">{userRank.wpm}</div>
                            <div className="hidden sm:block text-center font-orbitron text-lg text-cyber-accent">{userRank.accuracy}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
