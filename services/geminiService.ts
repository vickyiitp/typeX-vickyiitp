
import { GoogleGenAI } from "@google/genai";
import { GameStats, Level } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTypingFeedback = async (stats: GameStats): Promise<string> => {
    const { wpm, accuracy, errors } = stats;
    const prompt = `
        You are an expert typing coach named TypeX AI. Your tone is encouraging, insightful, and slightly futuristic/cyberpunk.
        A user has just completed a typing test. Their stats are:
        - Words Per Minute (WPM): ${wpm}
        - Accuracy: ${accuracy}%
        - Errors: ${errors}

        Analyze their performance and provide concise, actionable feedback in 2-3 short paragraphs.
        - If the WPM is high but accuracy is low, focus on slowing down for precision.
        - If accuracy is high but WPM is low, suggest techniques to increase speed (like finger drills or focusing on rhythm).
        - If both are low, provide foundational advice.
        - If both are high, congratulate them and offer an advanced tip.
        - Mention specific stats to make it feel personal. Do not use markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Gemini API error in getTypingFeedback:", error);
        return "Comms link with TypeX AI disrupted. Analysis failed. Your core stats are solid, operator. Keep practicing and push through the static.";
    }
};

export const generateTypingChallenge = async (difficulty: Level['difficulty'], duration: number): Promise<string> => {
    // Estimate word count based on a moderate typing speed to ensure enough text.
    const averageWpmForDuration = 40;
    const wordCount = Math.round((duration / 60) * averageWpmForDuration);
    
    const prompt = `
        Generate a single paragraph of text for a typing test. The paragraph should be approximately ${wordCount} words long and have a difficulty level of "${difficulty}".

        Guidelines for difficulty:
        - "Beginner": Use simple, common English words and basic punctuation (periods, commas). Short sentences.
        - "Intermediate": Include a mix of common and less common words, more varied punctuation (quotes, question marks), and slightly longer sentences.
        - "Advanced": Use sophisticated vocabulary, technical terms, or literary excerpts. Include complex sentence structures with semicolons or colons.
        - "Expert": Generate text with very challenging vocabulary, special characters (like in programming code snippets: {}, [], (), =>, /), or classic tongue-twisters.
        
        The output must be a single block of text. Do not include a title, any introductory phrases like "Here is the text:", or markdown formatting.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        // Clean up the response to ensure it's a single line of text suitable for the test
        return response.text.trim().replace(/\\n/g, ' ');
    } catch (error) {
        console.error("Gemini API error in generateTypingChallenge:", error);
        throw new Error("AI communication link severed. Challenge generation failed.");
    }
};
