import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    index: true
  },

  // 💰 live negotiation price
  currentPrice: {
    type: Number,
    required: true
  },

  // 🔒 copy of important product values (optimization 🔥)
  minPrice: Number,
  targetPrice: Number,

  // 🔄 game progress
  rounds: {
    type: Number,
    default: 0
  },

  maxRounds: {
    type: Number,
    default: 5
  },

  // 📊 status
  status: {
    type: String,
    enum: ["active", "won", "lost", "expired"],
    default: "active"
  },

  // 🏆 final result
  finalPrice: Number,

  // 👤 user info (denormalized for leaderboard)
  user: {
    id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String
  },

  // 🧠 analytics (future use 🔥)
  lastUserOffer: Number,

  lastAiPrice: Number,

  // ⏳ timing (for resurfacing / timeout)
  expiresAt: Date

}, { timestamps: true });

export default mongoose.model("Session", sessionSchema);