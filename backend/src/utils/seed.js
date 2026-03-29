// seed/product.seed.js

import mongoose from "mongoose";
import Product from "../models/product.model.js";
import dotenv from "dotenv";
dotenv.config();

const products = [
  {
    title: "1962 Ferrari 250 GTO (Replica)",
    description: "An ultra-rare piece of automotive history. This pristine replica looks and roars like the real legend.",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae", 
    category: "luxury",
    basePrice: 85000,
    minPrice: 75000,
    targetPrice: 82000,
    aiConfig: {
      personality: "arrogant",
      patienceLevel: 6,
      bluffTolerance: 0.4
    }
  },
  {
    title: "1985 Game-Worn & Signed Air Jordan 1s",
    description: "The pair that started it all. Worn and signed by Michael Jordan during his rookie season. Includes full certification.",
    image: "https://www.snipesusa.com/dw/image/v2/BFKF_PRD/on/demandware.static/-/Sites-snipes-master-catalog/default/dwf3f45230/images/hi-res/jordan_fd2596-602_10.jpg?sw=800&sh=1004", 
    category: "fashion",
    basePrice: 55000,
    minPrice: 42000,
    targetPrice: 47000, // User wants it to close around here
    aiConfig: {
      personality: "greedy",
      patienceLevel: 5,
      bluffTolerance: 0.6
    }
  },
  {
    title: "Virat Kohli's Match-Winning Bat",
    description: "The exact bat used in the 2024 final. Signed with a personal message from the legend himself.",
    image: "https://www.hindustantimes.com/ht-img/img/2023/06/27/1600x900/kohli_71_1683829193033_1687854858946.webp",
    category: "collectibles",
    basePrice: 15000,
    minPrice: 12000,
    targetPrice: 14000,
    aiConfig: {
      personality: "egoistic",
      patienceLevel: 9,
      bluffTolerance: 0.3
    }
  },
  {
    title: "Rolex Daytona 'Paul Newman'",
    description: "A legendary timepiece. The ultimate status symbol for high-stakes collectors.",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
    category: "luxury",
    basePrice: 35000,
    minPrice: 30000,
    targetPrice: 33000,
    aiConfig: {
      personality: "professional",
      patienceLevel: 7,
      bluffTolerance: 0.5
    }
  },
  {
    title: "Private Island - Azure Cove",
    description: "A tropical paradise in the Maldives. Your own private kingdom with white sands.",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5",
    category: "real estate",
    basePrice: 99000,
    minPrice: 90000,
    targetPrice: 95000,
    aiConfig: {
      personality: "emotional",
      patienceLevel: 4,
      bluffTolerance: 0.8
    }
  }
];

export const seedProducts = async () => {
  try {
    // 🔥 We force update by deleting old items first so user sees the change immediately
    await Product.deleteMany({});
    console.log("🗑️ Old products cleared.");

    await Product.insertMany(products);
    console.log("✅ New High-Stakes Products Seeded");

  } catch (err) {
    console.error("❌ Seeding Error:", err.message);
  }
};
