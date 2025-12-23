import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
      index: true
    },
    userId: {
      type: String,
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: "chats"
  }
);

export default model("Chat", chatSchema);
