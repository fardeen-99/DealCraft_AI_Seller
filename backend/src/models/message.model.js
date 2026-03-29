import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
    index: true
  },

  sender: {
    type: String,
    enum: ["user", "ai"],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  offer: Number
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);