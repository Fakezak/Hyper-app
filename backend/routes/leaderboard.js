const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const User = require("../models/User");

// Weekly leaderboard
router.get("/weekly", async (req, res) => {
  try {
    const videos = await Video.find().populate("user");
    const leaderboard = {};
    videos.forEach(v => {
      const id = v.user._id.toString();
      leaderboard[id] = (leaderboard[id] || 0) + v.likes;
    });
    const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    const top = await Promise.all(sorted.map(async ([id, likes]) => {
      const user = await User.findById(id);
      return { user, likes };
    }));
    res.json(top);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
