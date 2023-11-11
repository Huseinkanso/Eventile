import mongoose from "mongoose";

const event = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  ticket_number: {
    type: Number,
    required: true,
  },
  ticket_remaining: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  speaker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


export default mongoose.model("Event", event);