require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const videoRoutes = require("./routes/videos");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Socket.io for chat
io.on("connection", socket => {
  console.log("User connected:", socket.id);
  socket.on("sendMessage", data => { io.emit("receiveMessage", data); });
  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
