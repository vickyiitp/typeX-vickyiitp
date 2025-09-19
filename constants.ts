
import { Level, WorldwideStatsData, LeaderboardEntry, Achievement } from './types';
import {
    Test1Icon, Test10Icon, Test50Icon,
    Wpm80Icon, Wpm100Icon, Wpm120Icon,
    Accuracy99Icon, NoErrorsIcon,
    Pro1Icon, Pro5Icon
} from './components/icons/AchievementIcons';

export const TEXT_LEVELS: Level[] = [
    {
        title: "The Alphabet",
        description: "A classic sentence containing every letter, perfect for warming up your fingers and ensuring basic key familiarity.",
        difficulty: "Beginner",
        text: "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet. Practice it to improve your finger dexterity and speed. Typing is a skill that requires consistent practice and focus.",
        xp: 10,
        mode: 'standard',
    },
    {
        title: "Common English Words",
        description: "Practice with the most frequently used words in English to build a solid foundation for speed and accuracy.",
        difficulty: "Beginner",
        text: "The a of and to in is you that it he was for on are as with his they I at be this have from or one had by words but not what all were we when your can said there use an each which she do how their if.",
        xp: 15,
        mode: 'standard',
    },
    {
        title: "Practice Makes Perfect",
        description: "A simple, encouraging paragraph focusing on punctuation and common words.",
        difficulty: "Beginner",
        text: "The journey of a thousand miles begins with a single step. Similarly, the path to becoming a fast typist starts with one correct keystroke. Practice daily, stay focused, and celebrate your progress, no matter how small. Every word you type is a step forward.",
        xp: 12,
        mode: 'standard',
    },
    {
        title: "Digital Metropolis",
        description: "Navigate the neon-lit circuits with this cyberpunk-themed paragraph. Features common English words and punctuation.",
        difficulty: "Intermediate",
        text: "In the heart of the digital metropolis, sentient AI programs navigated circuits of pure light. Data streams flowed like rivers, carrying dreams and forgotten memories. A lone coder sought to unlock the city's deepest secrets, a password away from revolution.",
        xp: 25,
        mode: 'standard',
    },
    {
        title: "A Journey's Start",
        description: "A short quote from 'The Lord of the Rings' by J.R.R. Tolkien. Focus on punctuation and capitalization.",
        difficulty: "Intermediate",
        text: "It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to.",
        xp: 30,
        mode: 'standard',
    },
    {
        title: "Stellar Cartography",
        description: "Chart a course through the cosmos with this passage about space exploration. Mind the capitalized celestial bodies.",
        difficulty: "Intermediate",
        text: "The vast expanse of space, a silent theater of cosmic ballet, beckons humanity. We chart nebula clusters and map gravitational waves, seeking answers in the stardust. Each newly discovered exoplanet, a potential cradle for life, fuels our interstellar ambition.",
        xp: 35,
        mode: 'standard',
    },
    {
        title: "Voyager's Golden Record",
        description: "A passage about the contents of the Voyager Golden Record, including numbers and proper nouns.",
        difficulty: "Intermediate",
        text: "Launched in 1977, the Voyager 1 and 2 spacecraft each carry a Golden Record. This phonograph record contains sounds and images selected to portray the diversity of life and culture on Earth. It includes 115 images, greetings in 55 languages, and musical selections from artists like Bach and Chuck Berry.",
        xp: 32,
        mode: 'standard',
    },
    {
        title: "Quantum Computing",
        description: "Engage your mind and fingers with complex, technical vocabulary. A test of accuracy and focus with challenging terms.",
        difficulty: "Advanced",
        text: "Quantum computing leverages superposition and entanglement to perform calculations beyond the scope of classical machines. Qubits, unlike binary bits, can exist in multiple states simultaneously, enabling parallel processing on an unprecedented scale.",
        xp: 40,
        mode: 'standard',
    },
    {
        title: "The Great Gatsby",
        description: "An evocative excerpt from F. Scott Fitzgerald's classic novel. Tests endurance and consistency over a longer passage.",
        difficulty: "Advanced",
        text: "So we beat on, boats against the current, borne back ceaselessly into the past. He had a grand vision for his life, but he was always looking back, unable to escape the memories that defined him.",
        xp: 45,
        mode: 'standard',
    },
    {
        title: "Dune's Litany",
        description: "The iconic Litany Against Fear from Frank Herbert's \"Dune.\" A test of focus and rhythm under psychological pressure.",
        difficulty: "Advanced",
        text: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
        xp: 50,
        mode: 'standard',
    },
    {
        title: "JavaScript Merge Sort",
        description: "Type a real-world code snippet. This level tests your proficiency with symbols, indentation, and code-specific syntax.",
        difficulty: "Expert",
        text: "function mergeSort(arr) { if (arr.length <= 1) return arr; const mid = Math.floor(arr.length / 2); const left = mergeSort(arr.slice(0, mid)); const right = mergeSort(arr.slice(mid)); return merge(left, right); }",
        xp: 60,
        mode: 'standard',
    },
    {
        title: "Code of Hammurabi",
        description: "Transcribe ancient laws. This text contains unusual phrasing and requires careful attention to maintain rhythm and accuracy.",
        difficulty: "Expert",
        text: "An eye for an eye, and a tooth for a tooth. If a man has destroyed the eye of a free man, his own eye shall be destroyed. If he has broken the bone of a free man, his own bone shall be broken. Justice must be swift and absolute.",
        xp: 65,
        mode: 'standard',
    },
    {
        title: "Python List Comprehension",
        description: "A concise and powerful Python code snippet. Test your dexterity with brackets, colons, and Python-specific keywords.",
        difficulty: "Expert",
        text: "squares = [x**2 for x in range(10)]; even_squares = {x: x**2 for x in range(10) if x % 2 == 0}; print(f\"Squares: {squares}\")",
        xp: 68,
        mode: 'standard',
    },
    // Pro Mode Challenges
    {
        title: "The Woodchuck's Query",
        description: "A classic tongue-twister to challenge your dexterity and rhythm. Precision is key to mastering this tricky phrase.",
        difficulty: "Advanced",
        text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood? He would chuck, he would, as much as he could, and chuck as much wood as a woodchuck would if a woodchuck could chuck wood.",
        xp: 75,
        mode: 'pro',
    },
    {
        title: "Bioinformatics Jargon",
        description: "A highly technical paragraph filled with specialized terminology from the world of bioinformatics. An extreme test of accuracy.",
        difficulty: "Expert",
        text: "Genomic sequencing via shotgun metagenomics allows for phylogenetic analysis of uncultured microbial communities. The bioinformatics pipeline often involves contig assembly, gene prediction, and functional annotation using BLAST algorithms against curated databases.",
        xp: 100,
        mode: 'pro',
    },
    {
        title: "Philosophical Inquiry",
        description: "A dense and thought-provoking quote from Friedrich Nietzsche. This challenge requires focus on complex sentence structure.",
        difficulty: "Expert",
        text: "He who fights with monsters should be careful lest he thereby become a monster. And if thou gaze long into an abyss, the abyss will also gaze into thee.",
        xp: 90,
        mode: 'pro',
    },
    {
        title: "Gödel's Incompleteness",
        description: "A simplified explanation of Gödel's Incompleteness Theorems. This is an extreme challenge of technical vocabulary and logical structure.",
        difficulty: "Expert",
        text: "Kurt Gödel's incompleteness theorems demonstrated that for any consistent formal axiomatic system capable of expressing basic arithmetic, there exist true statements about the natural numbers that cannot be proven within that system. This fundamentally limited the ambitions of mathematical foundationalism and the Hilbert program.",
        xp: 110,
        mode: 'pro',
    }
];

export const INITIAL_WORLDWIDE_STATS: WorldwideStatsData = {
    totalUsers: 0,
    totalTests: 0,
    averageWpm: 0,
    averageAccuracy: 0,
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
    { rank: 1, name: 'CyberNinja', wpm: 185, accuracy: 99 },
    { rank: 2, name: 'GHOST', wpm: 172, accuracy: 100 },
    { rank: 3, name: 'Glitch', wpm: 168, accuracy: 98 },
    { rank: 4, name: 'DataWraith', wpm: 165, accuracy: 99 },
    { rank: 5, name: 'ZeroCool', wpm: 159, accuracy: 97 },
    { rank: 6, name: 'Proxy', wpm: 155, accuracy: 100 },
    { rank: 7, name: 'BitStream', wpm: 152, accuracy: 98 },
    { rank: 8, name: 'Matrix', wpm: 149, accuracy: 99 },
    { rank: 9, name: 'Apex', wpm: 147, accuracy: 97 },
    { rank: 10, name: 'Vortex', wpm: 145, accuracy: 98 },
];

export const ACHIEVEMENTS: Record<string, Achievement> = {
    'test1': { id: 'test1', name: 'First Test', description: 'Complete your first typing test.', icon: Test1Icon },
    'test10': { id: 'test10', name: 'Serial Tester', description: 'Complete 10 typing tests.', icon: Test10Icon },
    'test50': { id: 'test50', name: 'Veteran Typist', description: 'Complete 50 typing tests.', icon: Test50Icon },
    'wpm80': { id: 'wpm80', name: 'Speed Demon', description: 'Reach 80 WPM in any test.', icon: Wpm80Icon },
    'wpm100': { id: 'wpm100', name: 'Warp Speed', description: 'Reach 100 WPM in any test.', icon: Wpm100Icon },
    'wpm120': { id: 'wpm120', name: 'Light Speed', description: 'Reach 120 WPM in any test.', icon: Wpm120Icon },
    'accuracy99': { id: 'accuracy99', name: 'Precisionist', description: 'Achieve 99% accuracy.', icon: Accuracy99Icon },
    'noErrors': { id: 'noErrors', name: 'Flawless Victory', description: 'Complete a test with no errors.', icon: NoErrorsIcon },
    'pro1': { id: 'pro1', name: 'Pro Initiate', description: 'Complete your first Pro challenge.', icon: Pro1Icon },
    'pro5': { id: 'pro5', name: 'Pro Adept', description: 'Complete 5 Pro challenges.', icon: Pro5Icon },
};

export const DIFFICULTY_XP_MULTIPLIERS: Record<Level['difficulty'], number> = {
    'Beginner': 1.0,
    'Intermediate': 1.5,
    'Advanced': 2.0,
    'Expert': 2.5,
};
