const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  videoUrl: { type: String },
  thumbnail: { type: String },
  likes: { type: Number, default: 0 },
  comments: [{ user: String, text: String }],
}, { timestamps: true });

module.exports = mongoose.model("Video", videoSchema);
