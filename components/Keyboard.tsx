
import React, { useState, useEffect } from 'react';

interface KeyboardProps {
    lastKeyPressed: string | null;
    highlightedKeys?: string[];
}

const KEY_LAYOUT = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'],
    ['Space']
];


const Key: React.FC<{
    char: string;
    isPressed: boolean;
    isHighlighted: boolean;
}> = ({ char, isPressed, isHighlighted }) => {
    const getWidth = () => {
        // Using flex-basis for better responsive scaling
        switch (char) {
            case 'Backspace':
                return 'flex-grow-[2] basis-16';
            case 'Tab':
                return 'flex-grow-[1.5] basis-12';
            case 'CapsLock':
                return 'flex-grow-[1.8] basis-14';
            case '\\':
                 return 'flex-grow-[1.5] basis-12';
            case 'Enter':
                return 'flex-grow-[2.2] basis-16';
            case 'Shift':
                return 'flex-grow-[2.5] basis-20';
            case 'Space':
                return 'flex-grow-[8] basis-72';
            default:
                return 'flex-grow basis-8'; // Base key size
        }
    };
    
    const baseClasses = "h-10 sm:h-12 flex items-center justify-center rounded-md transition-all duration-100 border-b-4 text-xs sm:text-base";
    const normalClasses = "bg-cyber-surface/50 border-cyber-primary/20 text-cyber-text";
    const pressedClasses = "bg-cyber-primary text-cyber-bg border-cyber-primary shadow-neon-primary scale-110 -translate-y-1";
    const highlightedClasses = "bg-cyber-accent/20 border-cyber-accent text-cyber-accent";

    let appliedClasses = normalClasses;
    if (isPressed) {
        appliedClasses = pressedClasses;
    } else if (isHighlighted) {
        appliedClasses = highlightedClasses;
    }

    return (
        <div className={`${baseClasses} ${getWidth()} ${appliedClasses}`}>
            {char !== 'Space' && char}
        </div>
    );
};

const Keyboard: React.FC<KeyboardProps> = ({ lastKeyPressed, highlightedKeys = [] }) => {
    const [pressedKey, setPressedKey] = useState<string | null>(null);

    useEffect(() => {
        if (lastKeyPressed) {
            const key = lastKeyPressed === ' ' ? 'Space' : lastKeyPressed;
            setPressedKey(key.toLowerCase());
            const timer = setTimeout(() => setPressedKey(null), 150);
            return () => clearTimeout(timer);
        }
    }, [lastKeyPressed]);

    const lowercasedHighlights = highlightedKeys.map(k => k.toLowerCase());

    return (
        <div className="w-full flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 md:p-4 bg-cyber-surface/30 backdrop-blur-sm rounded-lg">
            {KEY_LAYOUT.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-1 sm:gap-2 justify-center w-full">
                    {row.map((key, keyIndex) => (
                        <Key 
                            key={keyIndex} 
                            char={key} 
                            isPressed={pressedKey === key.toLowerCase()}
                            isHighlighted={lowercasedHighlights.includes(key.toLowerCase())}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
