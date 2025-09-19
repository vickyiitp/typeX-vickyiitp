
import React from 'react';
import { WorldwideStatsData } from '../types';
import { UsersIcon, ClipboardListIcon, SpeedIcon, TargetIcon } from './icons/StatIcons';

interface WorldwideStatsProps {
    stats: WorldwideStatsData;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode; }> = ({ label, value, icon }) => (
    <div className="bg-cyber-surface/70 backdrop-blur-md border border-cyber-primary/20 rounded-lg p-6 flex flex-col items-center justify-center text-center">
        <div className="text-cyber-primary mb-3">{icon}</div>
        <p className="font-orbitron text-4xl text-cyber-primary">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        <p className="text-cyber-text-dark uppercase tracking-widest text-sm mt-1">{label}</p>
    </div>
);

const WorldwideStats: React.FC<WorldwideStatsProps> = ({ stats }) => {

    return (
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 animate-fadeIn text-center">
            <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-cyber-primary mb-2">Worldwide Statistics</h2>
            <p className="text-center text-cyber-text-dark mb-4">Live data from all TypeX operators across the globe. Your performance contributes to these stats.</p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <StatCard 
                    label="Total Operators"
                    value={stats.totalUsers}
                    icon={<UsersIcon />}
                />
                 <StatCard 
                    label="Total Tests Completed"
                    value={stats.totalTests}
                    icon={<ClipboardListIcon />}
                />
                 <StatCard 
                    label="Average WPM"
                    value={stats.averageWpm}
                    icon={<SpeedIcon />}
                />
                 <StatCard 
                    label="Average Accuracy"
                    value={`${stats.averageAccuracy}%`}
                    icon={<TargetIcon />}
                />
            </div>
        </div>
    );
};

export default WorldwideStats;
