
import React from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from './icons/SocialIcons';

interface FooterProps {
    onShowAbout: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowAbout }) => {
  return (
    <footer className="w-full max-w-5xl text-center py-4 text-cyber-text-dark text-sm z-10">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/vickyiitp" target="_blank" rel="noopener noreferrer" aria-label="View GitHub Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <GithubIcon />
        </a>
        <a href="https://www.linkedin.com/in/vicky-kumar-557166193/" target="_blank" rel="noopener noreferrer" aria-label="View LinkedIn Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <LinkedinIcon />
        </a>
        <a href="https://x.com/indigolens_in" target="_blank" rel="noopener noreferrer" aria-label="View Twitter Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <TwitterIcon />
        </a>
        <a href="https://instagram.com/vickyiitp" target="_blank" rel="noopener noreferrer" aria-label="View Instagram Profile" className="text-cyber-text-dark hover:text-cyber-primary transition-colors duration-300">
          <InstagramIcon />
        </a>
      </div>
      <div className="flex justify-center items-center gap-4 mb-2">
         <p>&copy; {new Date().getFullYear()} TypeX 2025. All Rights Reserved.</p>
         <button onClick={onShowAbout} className="hover:text-cyber-primary underline transition-colors duration-300">
            About Me
         </button>
      </div>
      <p>The Future of Typing is Now.</p>
    </footer>
  );
};

export default Footer;
