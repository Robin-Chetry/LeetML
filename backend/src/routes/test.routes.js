// routes/test.routes.js

const express = require("express");
const router = express.Router();

const { executePython } = require("../services/codebox.service");

router.get("/codebox", async (req, res) => {
    try {
        const result = await executePython(
            `print("Hello from LeetML")`
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;