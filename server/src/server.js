const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/surprisedodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});