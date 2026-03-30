import mongoose from "mongoose";
import Session from "../models/session.model.js";
import Product from "../models/product.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import Leaderboard from "../models/leaderboard.js";
export const startGame = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // 🔥 1. Product fetch
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 2. Create session
    const session = await Session.create({
      productId: product._id,
      userId: userId, // ✅ Added missing userId
      currentPrice: product.basePrice,

      // copy important values
      minPrice: product.minPrice,
      targetPrice: product.targetPrice,

      maxRounds: product.negotiation?.maxRounds || 5,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

    // 🔥 3. Create first AI message
    const firstMessage = await Message.create({
      sessionId: session._id,
      sender: "ai",
      message: `This product is listed at ${product.basePrice}. What's your offer?`,
      offer: product.basePrice
    });

    // 🔥 4. Response
    res.json({
      sessionId: session._id,
      message: firstMessage.message,
      currentPrice: session.currentPrice,
      product: {
        title: product.title,
        image: product.image,
        basePrice: product.basePrice
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/game.controller.js


import { evaluateOffer } from "../utils/gameEngine.js";
import { generateSellerReply, generateAngryWalkout } from "../services/ai.service.js";
import { detectBadWords } from "../utils/badWordFilter.js";

export const makeOffer = async (req, res) => {
  try {
    const { sessionId, offer, message } = req.body;

    // 🛡️ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid Session ID format" });
    }

    // 🔥 1. Session fetch
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 🔒 Security: Check if session belongs to user
    if (session.user.id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to this session" });
    }

    if (session.status !== "active") {
      return res.json({
        message: "Game already finished",
        status: session.status
      });
    }

    // 🔥 2. Product fetch (for AI personality)
    const product = await Product.findById(session.productId);

    // 🔥 3. Bad Word Check — deal is immediately killed
    const { isBad } = await detectBadWords(message);
    if (isBad) {
      const angryReply = await generateAngryWalkout(product.title);

      await Message.insertMany([
        { sessionId, sender: "user", message, offer },
        { sessionId, sender: "ai", message: angryReply, offer: session.currentPrice }
      ]);

      session.status = "lost";
      session.finalPrice = session.currentPrice;
      await session.save();

      return res.json({
        reply: angryReply,
        price: session.currentPrice,
        status: "lost",
        reason: "deal_killed_bad_language"
      });
    }

    // 🔥 4. Pricing Engine
    const result = evaluateOffer(session, product, offer);

    // 🔥 5. Fetch chat history for AI context
    const history = await Message.find({ sessionId }).sort({ createdAt: 1 });

    // 🔥 6. AI Reply — Rich context with Ray/Marcus/Victor persona
    const aiReply = await generateSellerReply({
      userMessage: message,
      userOffer: offer,
      counterPrice: result.counterPrice,
      accept: result.accept,
      personality: product.aiConfig.personality,
      product: product.title,
      minPrice: product.minPrice,
      history
    });

    // 🔥 7. Save messages to collection
    await Message.insertMany([
      { sessionId, sender: "user", message, offer },
      { sessionId, sender: "ai", message: aiReply, offer: result.counterPrice }
    ]);

    // 🔥 8. Update session
    session.currentPrice = result.counterPrice;
    session.rounds += 1;

    // 🏁 End conditions
    if (result.accept) {
      session.status = "won";
      session.finalPrice = result.counterPrice;
      const leaderboard=new Leaderboard({
        user:req.user.id,
        rounds:session.rounds,
        productId:session.productId,
        finalPrice: result.counterPrice
      })
      await leaderboard.save();
    } else if (session.rounds >= session.maxRounds) {
      session.status = "lost";
    }

    await session.save();

    res.json({
      reply: aiReply,
      price: session.currentPrice,
      status: session.status
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // 🛡️ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: "Invalid Session ID format" });
    }

    // 🔥 1. Session fetch
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // 🔒 Security: Check if session belongs to user
    if (session.user.id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to this session" });
    }

    // 🔥 2. Product fetch (for UI)
    const product = await Product.findById(session.productId);

    // 🔥 3. Fetch messages from collection
    const messages = await Message.find({ sessionId }).sort({ createdAt: 1 });

    // 🔥 4. Response
    res.json({
      sessionId: session._id,
      currentPrice: session.currentPrice,
      status: session.status,
      rounds: session.rounds,
      maxRounds: session.maxRounds,

      // 💬 chat history
      messages,

      // 🖼️ product info
      product: {
        title: product.title,
        image: product.image,
        basePrice: product.basePrice
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().select("title image basePrice category");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getLeaderboard = async (req, res) => {
  try {

    // // 🔥 1. Top sessions (won only) with product info populated
    // const sessions = await Session.find({ status: "won" })
    //   .populate("productId", "title image basePrice")
    //   .sort({ finalPrice: 1 }) // lowest price first
    //   .limit(10)

    // console.log(sessions)

    // // 🔥 2. Format response
    // const leaderboard = sessions.map((s) => ({
    //   sessionId: s._id,
    //   finalPrice: s.finalPrice,
    //   rounds: s.rounds,
    //   user: s.user,

    //   product: {
    //     title: s.productId?.title,
    //     image: s.productId?.image,
    //     basePrice: s.productId?.basePrice
    //   }
    // }));

    // console.log(leaderboard.product)


    const board=await Leaderboard.find().populate("user","username").populate("productId","title image basePrice").sort({finalPrice:1}).limit(10).select("user productId rounds")

    res.json({ board, success: true, message: "Leaderboard fetched successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};