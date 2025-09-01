const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const multer = require("multer");

// Storage for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "uploads/"); },
  filename: function (req, file, cb) { cb(null, Date.now() + "-" + file.originalname); }
});
const upload = multer({ storage });

// Create Video
router.post("/", upload.single("video"), async (req, res) => {
  const { user, title, thumbnail } = req.body;
  try {
    const video = await Video.create({ user, title, videoUrl: req.file.path, thumbnail });
    res.json(video);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get All Videos
router.get("/", async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).populate("user");
    res.json(videos);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Like Video
router.post("/like/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Add Comment
router.post("/comment/:id", async (req, res) => {
  const { user, text } = req.body;
  try {
    const video = await Video.findById(req.params.id);
    video.comments.push({ user, text });
    await video.save();
    res.json(video);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
