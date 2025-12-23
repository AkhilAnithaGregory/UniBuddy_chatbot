import { Schema, model } from "mongoose";

const JournalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true }
});

// A user can create ONLY ONE journal for a given date
JournalSchema.index({ userId: 1, date: 1 }, { unique: true });

export default model("Journal", JournalSchema);
