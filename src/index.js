require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("LeetML Backend Running ");
});

// Connect Database & Start Server
async function startServer() {
    try {
        await connectDB();
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
}

startServer();