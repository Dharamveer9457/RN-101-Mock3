const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(process.env.mongoUrl)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("Error in conneccting to DB"));

module.exports = connection;