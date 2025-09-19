import React from 'react';

interface ToastProps {
  message: string;
  icon: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ message, icon }) => {
  return (
    <div className="flex items-center gap-4 bg-cyber-surface backdrop-blur-xl border border-cyber-secondary rounded-lg shadow-neon-secondary p-4 animate-fadeIn">
      <div className="text-cyber-secondary">{icon}</div>
      <div>
        <p className="font-bold text-cyber-text">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
