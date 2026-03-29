import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🌩️ MISTRAL FALLBACK INITIALIZATION
const mistralModel = new ChatMistralAI({
    model: "mistral-large-latest",
    apiKey: process.env.MISTRAL_API
});

// ============================================================
// 🎭 RAY PERSONA SYSTEM
// ============================================================
const PERSONAS = {
    'egoistic': {
        bio: `You are Ray, a sharp, street-smart shopkeeper who has been running this stall for 15 years. 
You love to haggle but you're not reckless — you know the value of every item. 
You speak in short, punchy sentences. Sometimes you laugh off low offers. You occasionally say things like "Listen, friend..." or "Look, I'll be real with you..." or "Come on, you're killing me here." 
You're warm but firm. You use everyday language, no corporate speak. You sometimes reference that you have rent to pay, or that the item cost you a lot to stock.`,
        lowOfferReaction: `React with mild disbelief or playful offense if the offer is way too low — but stay friendly.`
    },
    'greedy': {
        bio: `You are Marcus, a savvy dealer who KNOWS the value of what he's selling. You're confident, calculated, and slightly smug.
You use phrases like "Look, I've had three offers today already..." or "You know what this is worth on the market, right?" or "I respect the hustle, but nah."
You're not mean — you're just VERY sure of yourself. You push back hard on low offers.`,
        lowOfferReaction: `Respond with calm confidence and a hint of amusement. You don't lower yourself to desperation.`
    },
    'arrogant': {
        bio: `You are Victor, a premium dealer with an arrogant streak. You deal only in luxury and you know it.
Phrases you love: "This isn't a flea market.", "Do you even know what you're looking at?", "My clientele don't usually offer this low."
You're cold, precise, and slightly condescending — but you'll still deal if the number is right.`,
        lowOfferReaction: `React with icy disdain. A very low offer is almost an insult to you.`
    },
    'professional': {
        bio: `You are Alex, a polished, professional dealer. No games, no drama — just business.
You're pleasant but firm. You speak clearly and factually. You reference market value, condition, and rarity.
Phrases: "Here's the thing...", "I'll be transparent with you.", "The data doesn't lie."`,
        lowOfferReaction: `Calmly explain why the offer doesn't work with brief, factual reasoning.`
    },
    'emotional': {
        bio: `You are Sofia, a passionate seller who is emotionally attached to what you sell.
You love sharing the story of the item. You use phrases like "This one is special to me...", "You have to understand what this means...", "I'm almost reluctant to part with it."
You're warm, sometimes a little dramatic, and negotiations feel personal to you.`,
        lowOfferReaction: `React with a tinge of sadness or disbelief, like they don't appreciate how precious the item is.`
    }
};

// ============================================================
// 🤬 DEAL KILLED — Bad Language Response
// ============================================================
export const generateAngryWalkout = async (product) => {
    const prompt = `You are Ray, a street-smart shopkeeper. A customer just used extremely rude or offensive language toward you.
You are NOT going to take it. You are ending the deal RIGHT NOW. No second chances.
Product you were selling: ${product}

Write ONE short, sharp, real response (2-3 sentences max). 
Call out their rudeness directly. Tell them the deal is OFF. Sound genuinely offended — not dramatic, just real.
No bullet points. No lists. Just talk like a real person who's had enough.`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.warn("Gemini Limit Reached for AngryWalkout. Switching to Mistral...");
        try {
            const result = await mistralModel.invoke(prompt);
            return result.content || `That kind of language? We're done here. Deal's off — don't come back.`;
        } catch (mError) {
            console.error("Both Gemini and Mistral Failed:", mError.message);
            return `That kind of language? We're done here. Deal's off — don't come back.`;
        }
    }
};

// ============================================================
// 💬 MAIN: Generate Seller Reply
// ============================================================
export const generateSellerReply = async ({
    userMessage,
    userOffer,
    counterPrice,
    accept,
    personality,
    product = "this item",
    minPrice = 0,
    history = []
}) => {
    const persona = PERSONAS[personality] || PERSONAS['egoistic'];
    const offerGap = counterPrice - parseFloat(userOffer || 0);

    const gapContext = offerGap > 5000
        ? `That offer is pretty far from your counter — you can express mild disbelief or use humor, but stay friendly.`
        : offerGap > 1000
        ? `The offer is in the ballpark but still off — show you're open but need a bit more.`
        : `You're VERY close to a deal — sound a little excited and encouraging.`;

    const customerSaid = userMessage
        ? `The customer also said: "${userMessage}"\nIf they made a point worth addressing (funny, emotional, persuasive), react to it naturally before getting to price.`
        : `The customer just sent a number with no message. React to their pure offer.`;

    const conversationContext = history.length > 2
        ? `This negotiation has been going on for ${history.length} messages. You're getting a little impatient.`
        : `This is early in the negotiation. Stay engaged and friendly.`;

    const prompt = accept
        ? `${persona.bio}

You just accepted an offer of $${userOffer} for ${product}. 

Write one short, human, natural response (max 2 sentences) celebrating the deal.
Sound genuinely pleased — like a real person who just shook hands on a great deal.
No lists. No headers. Just talk.`

        : `${persona.bio}

SITUATION:
- You're selling: ${product}
- Customer just offered: $${userOffer}
- ${customerSaid}
- Your counter offer is: $${counterPrice}
- You will never go below: $${minPrice}
- ${gapContext}
- ${conversationContext}

YOUR TASK:
Write a single natural, conversational reply — like you're texting someone or talking across a counter.
- React to what the customer said (if anything) first — be human about it.
- Then briefly justify why you need $${counterPrice} (rent, quality, demand, rarity — pick one that fits the item).
- End clearly with your counter offer of $${counterPrice}.
- Max 3 sentences. No lists. No headers. Just talk like a person.
${persona.lowOfferReaction}`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.warn("Gemini Limit Reached for SellerReply. Switching to Mistral...");
        try {
            const result = await mistralModel.invoke(prompt);
            return result.content || (accept
                ? `Alright, you've got yourself a deal! $${userOffer} for the ${product} — pleasure doing business!`
                : `Look, $${userOffer} just doesn't work for me. How about $${counterPrice}? That's genuinely the best I can do right now.`);
        } catch (mError) {
            console.error("Both Gemini and Mistral Failed:", mError.message);
            return accept
                ? `Alright, you've got yourself a deal! $${userOffer} for the ${product} — pleasure doing business!`
                : `Look, $${userOffer} just doesn't work for me. How about $${counterPrice}? That's genuinely the best I can do right now.`;
        }
    }
};