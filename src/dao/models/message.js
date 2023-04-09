import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageCollection = "Message";

const messageSchema = new mongoose.Schema({
  chat: {
    type: Schema.ObjectId,
    ref: "Chat",
  },
  userId: {
    type: Schema.ObjectId,
    ref: "User",
  },
  user: {
    type: String, required: true
  },
  message: { type: String, required: true },
  date: Date,
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export { messageModel };
