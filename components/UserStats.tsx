import React from 'react';
import { UserProfile } from '../types';

interface UserStatsProps {
    profile: UserProfile;
}

const UserStats: React.FC<UserStatsProps> = ({ profile }) => {
    const { level, xp, xpToNextLevel } = profile;
    const progressPercentage = (xp / xpToNextLevel) * 100;

    return (
        <div className="flex items-center gap-4 bg-cyber-surface/50 border border-cyber-primary/20 rounded-lg px-4 py-2">
            <div className="flex flex-col items-center">
                <span className="font-orbitron text-lg font-bold text-cyber-accent">LVL</span>
                <span className="font-orbitron text-2xl font-bold text-cyber-primary -mt-1">{level}</span>
            </div>
            <div className="w-32 sm:w-48">
                <div className="flex justify-between text-xs text-cyber-text-dark mb-1">
                    <span>XP</span>
                    <span>{xp} / {xpToNextLevel}</span>
                </div>
                <div className="w-full bg-cyber-bg/50 rounded-full h-2.5 border border-cyber-primary/20">
                    <div
                        className="bg-cyber-primary h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default UserStats;
