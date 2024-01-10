const express = require("express");
const cors=require('cors');
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json()); //to accept JSON data
const port = process.env.PORT;

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.get("/",(req,res)=>{
  res.send("Server is running");
})
app.get("/api/chats",(req,res)=>{
  res.header("Access-Control-Allow-Origin","http://localhost:3001")
})
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log("Server is running");
});
