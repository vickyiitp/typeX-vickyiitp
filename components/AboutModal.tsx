
import React from 'react';
import { CloseIcon } from './icons/MenuIcons';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-cyber-bg/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="w-full max-w-2xl bg-cyber-surface/90 border border-cyber-primary/30 rounded-lg p-8 shadow-2xl shadow-cyber-secondary/20 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-cyber-text-dark hover:text-cyber-primary transition-colors"
                    aria-label="Close"
                >
                    <CloseIcon className="w-6 h-6"/>
                </button>
                <h2 className="font-orbitron text-2xl sm:text-3xl text-cyber-primary mb-4">Professional Summary</h2>
                <div className="font-rajdhani text-cyber-text-dark space-y-4 leading-relaxed">
                    <p>I am currently pursuing a Bachelor of Technology in Computer Science and Engineering at the Indian Institute of Technology, Patna (2nd year). My academic journey is complemented by hands-on experience in full-stack web development, backend engineering, and AI-driven applications.</p>
                    <p>As part of my academic curriculum, I successfully completed a Capstone Project, where my team and I developed a full-stack web platform designed to connect startups with contributors (students, freelancers, and professionals). In this project, I played a key role in:</p>
                    <ul className="list-disc list-inside pl-4 text-cyber-text space-y-1">
                        <li>Backend development using Flask and MongoDB</li>
                        <li>Database integration for user authentication and project management</li>
                        <li>Contributing to frontend development using HTML, CSS, and JavaScript</li>
                    </ul>
                    <p>Beyond academics, I actively engage in AI research (cybersecurity tools, digital content automation), content creation, entrepreneurial initiatives, and personal development, emphasizing fitness, discipline, and productivity.</p>
                    <p>I am committed to leveraging my technical expertise, creativity, and entrepreneurial mindset to build impactful solutions at the intersection of technology, AI, and innovation.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
