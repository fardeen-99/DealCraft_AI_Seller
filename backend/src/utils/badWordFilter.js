import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Stage 1: Static fast check — no API cost
const COMMON_BAD_WORDS = [
    // English
    'fuck', 'shit', 'ass', 'bitch', 'bastard', 'crap', 'piss', 'dick',
    'cock', 'cunt', 'whore', 'slut', 'prick', 'asshole', 'bullshit',
    'motherfucker', 'fucker', 'fucking', 'dumbass', 'idiot', 'moron',
    'stupid', 'dumb', 'loser', 'scammer', 'liar', 'crook', 'retard',
    'jerk', 'imbecile', 'screw you', 'go to hell', 'shut up', 'hate you',
    // Hindi / Hinglish
    'gali', 'bc', 'behenchod', 'madarchod', 'chutiya', 'bakchod',
    'randi', 'saala', 'kamina', 'harami', 'gadha', 'bhadwa', 'lodu',
    'gaand', 'gaandu', 'betichod', 'kutta', 'suar', 'besharam', 'pagal','bsdk'
];

const staticCheck = (message) => {
    const lower = message.toLowerCase();
    for (const word of COMMON_BAD_WORDS) {
        if (word.includes(' ')) {
            if (lower.includes(word)) return true;
        } else {
            const regex = new RegExp(`\\b${word}\\b`, 'i');
            if (regex.test(lower)) return true;
        }
    }
    return false;
};

// Stage 2: AI multilingual check via Gemini
const aiCheck = async (message) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(
            `You are a content moderation classifier. Your ONLY job is to decide if a message is offensive, abusive, rude, contains profanity, insults, or disrespectful language — in ANY language, script, slang, or dialect (including English, Hindi, Spanish, French, Arabic, Bengali, Urdu, Hinglish, etc).

Message: "${message}"

Reply with ONLY one word — YES if offensive/rude/abusive, NO if it is acceptable. No explanation.`
        );
        const answer = result.response.text().trim().toUpperCase();
        return answer.startsWith("YES");
    } catch (err) {
        console.error("AI bad word check failed, defaulting to safe:", err.message);
        return false; // fail open — don't block if AI is unavailable
    }
};

/**
 * detectBadWords(message)
 * Returns { isBad: Boolean }
 * Stage 1: Instant static check. Stage 2: AI check if stage 1 passes.
 */
export const detectBadWords = async (message) => {
    if (!message || typeof message !== "string" || message.trim().length === 0) {
        return { isBad: false };
    }
    if (staticCheck(message)) {
        return { isBad: true };
    }
    const isOffensive = await aiCheck(message);
    return { isBad: isOffensive };
};
