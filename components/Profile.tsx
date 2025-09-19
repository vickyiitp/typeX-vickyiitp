
import React from 'react';
import { UserProfile } from '../types';
import { ACHIEVEMENTS } from '../constants';

interface ProfileProps {
  userProfile: UserProfile;
}

const StatCard: React.FC<{ label: string; value: string | number; className?: string }> = ({ label, value, className }) => (
    <div className={`bg-cyber-bg/50 p-4 rounded-md border border-cyber-secondary/20 text-center ${className}`}>
        <p className="font-orbitron text-4xl text-cyber-secondary">{value}</p>
        <p className="text-cyber-text-dark uppercase tracking-widest text-xs">{label}</p>
    </div>
);

const AchievementCard: React.FC<{
    achievement: typeof ACHIEVEMENTS[string];
    isUnlocked: boolean;
}> = ({ achievement, isUnlocked }) => {
    const unlockedClasses = "bg-cyber-surface/50 border-cyber-secondary/30";
    const lockedClasses = "bg-cyber-bg/30 border-gray-600/30 grayscale opacity-60";
    
    return (
        <div className={`p-4 rounded-lg border flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? unlockedClasses : lockedClasses}`}>
            <achievement.icon className={`w-12 h-12 mb-3 ${isUnlocked ? 'text-cyber-secondary' : 'text-gray-500'}`} />
            <h4 className={`font-bold ${isUnlocked ? 'text-cyber-text' : 'text-gray-400'}`}>{achievement.name}</h4>
            <p className="text-xs text-cyber-text-dark mt-1">{achievement.description}</p>
        </div>
    );
};


const Profile: React.FC<ProfileProps> = ({ userProfile }) => {
  const { username, level, xp, xpToNextLevel, testsCompleted, proTestsCompleted, unlockedAchievements } = userProfile;
  const progressPercentage = (xp / xpToNextLevel) * 100;

  return (
    <div className="w-full max-w-4xl flex flex-col gap-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">{username}'s Profile</h2>
        <p className="text-center text-cyber-text-dark">Your personal operator statistics and achievements.</p>
      </div>

      <div className="bg-cyber-surface/50 backdrop-blur-md border border-cyber-primary/20 rounded-lg p-6 w-full">
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard label="Current Level" value={level} />
            <StatCard label="Total Tests" value={testsCompleted} />
            <StatCard label="Pro Challenges" value={proTestsCompleted} />
         </div>
         <div className="mt-6">
            <div className="flex justify-between text-sm text-cyber-text-dark mb-1">
                <span>XP Progress</span>
                <span>{xp} / {xpToNextLevel}</span>
            </div>
            <div className="w-full bg-cyber-bg/50 rounded-full h-4 border border-cyber-primary/20 p-0.5">
                <div
                    className="bg-cyber-primary h-full rounded-full transition-all duration-500 ease-out flex items-center justify-center text-xs font-bold text-cyber-bg"
                    style={{ width: `${progressPercentage}%` }}
                >
                   {Math.round(progressPercentage)}%
                </div>
            </div>
         </div>
      </div>

      <div className="bg-cyber-surface/50 backdrop-blur-md border border-cyber-primary/20 rounded-lg p-6 w-full">
        <div className="flex justify-between items-baseline mb-4">
            <h3 className="font-orbitron text-2xl text-cyber-primary">Achievement Badges</h3>
            <p className="font-rajdhani text-lg text-cyber-text-dark">
                <span className="font-orbitron text-cyber-secondary">{unlockedAchievements.length}</span> / {Object.keys(ACHIEVEMENTS).length} Unlocked
            </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.values(ACHIEVEMENTS).map(ach => (
                <AchievementCard
                    key={ach.id}
                    achievement={ach}
                    isUnlocked={unlockedAchievements.includes(ach.id)}
                />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
