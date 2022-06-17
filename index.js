import express from "express";
const app = express();
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import axios from "axios";

app.use(bodyParser.json())


// Import Routes
import { router } from "./routes/posts.js";
app.use("/posts", router);
// ROUTES
app.get('/', (req, res) => {
  res.send('We are home!')
})


// Mongoose
mongoose.connect('mongodb+srv://skorzenstein:korzen84@cluster0.mxbmwh9.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('connected to db')
})

app.listen(3000)
