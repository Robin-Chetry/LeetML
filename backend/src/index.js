require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const redisClient = require("./config/redis");
const authRouter = require("./routes/userAuth");
const cookieParser = require("cookie-parser");
const testRoutes = require("./routes/test.routes");
const problemRouter = require("./routes/problemCreator");
const submitRouter = require("./routes/submission.routes");
const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/test", testRoutes);
app.use("/problem", problemRouter);
app.use("/submission", submitRouter);

// app.get("/", (req, res) => {
//     res.send("LeetML Backend Running");
// });

app.use("/user", authRouter);

const initializeConnection = async () => {
    try {

        await Promise.all([
            connectDB(),
            redisClient.connect()
        ]);

        console.log("MongoDB and Redis Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error("Connection Error:", err);
    }
};

initializeConnection();