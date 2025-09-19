import React from 'react';
import Toast from './Toast';

interface ToastContainerProps {
  toasts: {
    id: number;
    message: string;
    icon: React.ReactNode;
  }[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="fixed top-24 right-4 md:right-8 z-[100] flex flex-col gap-4">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} icon={toast.icon} />
      ))}
    </div>
  );
};

export default ToastContainer;
