require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// const imageRoutes = require('./src/route/upload');
const profile = require('./src/route/userProfile');
const auths = require('./src/route/auth');

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/image', imageRoutes);
app.use('/info', profile); 
app.use('/auth', auths);

const port = 4000;

async function start() {
  try {
    await mongoose.connect(process.env.mongodbString);
    console.log('✅ Connected to MongoDB');

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  }
}

start();