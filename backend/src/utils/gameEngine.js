

export const evaluateOffer = (session, product, userOffer) => {
    const {
        currentPrice,
        rounds,
        maxRounds
    } = session;

    const {
        minPrice,
        targetPrice,
        aiConfig
    } = product;

    const { personality, patienceLevel } = aiConfig;

    let accept = false;
    let counterPrice = currentPrice;
    let reason = "";

    // 🧠 1. Hard reject (too low)
    if (userOffer < minPrice) {
        return {
            accept: false,
            counterPrice: currentPrice,
            reason: "Offer below minimum price"
        };
    }

    // 🧠 2. Accept logic
    if (userOffer >= targetPrice) {
        accept = true;
        return {
            accept: true,
            counterPrice: userOffer,
            reason: "Good deal accepted"
        };
    }

    // 🧠 3. Last round pressure
    if (rounds >= maxRounds - 1) {
        if (userOffer >= minPrice) {
            accept = true;
            return {
                accept: true,
                counterPrice: userOffer,
                reason: "Final round acceptance"
            };
        }
    }

    // 🧠 4. Personality based reduction
    let reductionFactor = 0.25;

    if (personality === "friendly") reductionFactor = 0.45;
    if (personality === "greedy") reductionFactor = 0.18;
    if (personality === "aggressive") reductionFactor = 0.3;
    if (personality === "arrogant") reductionFactor = 0.2;
    if (personality === "emotional") reductionFactor = 0.4;

    // 🧠 5. Calculate gap
    const gap = currentPrice - userOffer;

    // Increased reduction for better "happening" feel
    let reduction = gap * reductionFactor;

    // Patience effect (as sessions go on, seller gets slightly more desperate or annoyed)
    // If patience is low (emotional), they drop price faster
    const frustrationBonus = (10 - patienceLevel) * (rounds * 50);
    reduction += frustrationBonus;

    // Add a bit of "personality" randomness (+/- 5%)
    const randomVibe = (Math.random() * 0.1) + 0.95; 
    reduction *= randomVibe;

    counterPrice = currentPrice - reduction;

    // never go below min
    counterPrice = Math.max(counterPrice, minPrice);

    return {
        accept: false,
        counterPrice: Math.round(counterPrice),
        reason: "Counter offer generated"
    };
};