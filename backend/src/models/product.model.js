// models/product.model.js

import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: String,

  image: String,

  category: String,

  // 🏷️ Original listed price (user ko dikhana)
  basePrice: {
    type: Number,
    required: true
  },

  // 🔥 Hidden minimum price (AI kabhi isse niche nahi jayega)
  minPrice: {
    type: Number,
    required: true
  },

  // 🎯 Ideal selling price
  targetPrice: {
    type: Number
  },

  // 📉 Maximum discount allowed
  maxDiscountPercent: {
    type: Number,
    default: 30
  },

  // 🤖 AI behavior config
  aiConfig: {
    personality: {
      type: String,
      enum: ["friendly", "aggressive", "greedy","egoistic","professional","arrogant","emotional"],
      default: "friendly"
    },

    patienceLevel: {
      type: Number, // 1 to 10
      default: 5
    },

    bluffTolerance: {
      type: Number, // how much low offer tolerate kare
      default: 0.3
    }
  },

  // 🔄 negotiation settings
  negotiation: {
    maxRounds: {
      type: Number,
      default: 5
    },

    cooldownSeconds: {
      type: Number,
      default: 0
    }
  }

}, { timestamps: true });

export default mongoose.model("Product", productSchema);