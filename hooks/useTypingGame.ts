import { useState, useEffect, useCallback, useMemo } from 'react';

type CharState = 'correct' | 'incorrect' | 'untyped';

const useTypingGame = (text: string, duration: number) => {
    const [userInput, setUserInput] = useState('');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [errors, setErrors] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [lastKeyPressed, setLastKeyPressed] = useState<string | null>(null);

    const typedCharactersState: CharState[] = useMemo(() => {
        return text.split('').map((char, index) => {
            if (index < userInput.length) {
                return userInput[index] === char ? 'correct' : 'incorrect';
            }
            return 'untyped';
        });
    }, [text, userInput]);

    const reset = useCallback(() => {
        setUserInput('');
        setStartTime(null);
        setTimeLeft(duration);
        setErrors(0);
        setIsFinished(false);
    }, [duration]);

    useEffect(() => {
        if (startTime && timeLeft > 0 && !isFinished) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
        if (timeLeft === 0) {
            setIsFinished(true);
        }
    }, [startTime, timeLeft, isFinished]);


    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isFinished) return;

        const { key } = e;
        setLastKeyPressed(key);

        if (!startTime) {
            setStartTime(Date.now());
        }

        if (key === 'Backspace') {
            setUserInput(prev => prev.slice(0, -1));
            return;
        }

        if (key.length === 1 && userInput.length < text.length) {
            if (key !== text[userInput.length]) {
                setErrors(prev => prev + 1);
            }
            setUserInput(prev => prev + key);
        }
    }, [isFinished, startTime, userInput.length, text]);
    
    useEffect(() => {
        if(userInput.length === text.length){
            setIsFinished(true);
        }
    }, [userInput, text]);

    const wpm = useMemo(() => {
        if (!startTime) return 0;
        
        const timeElapsedInSeconds = (Date.now() - startTime) / 1000;
        if (timeElapsedInSeconds === 0) return 0;

        const correctChars = userInput.split('').filter((char, index) => char === text[index]).length;
        const words = correctChars / 5;
        const minutes = timeElapsedInSeconds / 60;
        return Math.round(words / minutes) || 0;

    }, [startTime, userInput, text]);

    const accuracy = useMemo(() => {
        if (userInput.length === 0) return 100;
        const correctChars = userInput.length - errors;
        return Math.round((correctChars / userInput.length) * 100) || 0;
    }, [userInput.length, errors]);

    return {
        userInput,
        typedCharactersState,
        wpm,
        accuracy,
        timeLeft,
        errors,
        handleKeyDown,
        reset,
        isFinished,
        lastKeyPressed,
        startTime
    };
};

export default useTypingGame;