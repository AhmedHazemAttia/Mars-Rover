const express = require("express");
const cors = require("cors");
const Rover = require("../service/Rover");

const app = express()
app.use(express.json())
app.use(cors())


app.post("/rover", (req, res) => {
    const { x, y, direction, commands } = req.body;

    if (typeof x !== "number" || typeof y !== "number" || typeof commands !== "string") {
        return res.status(400).json({ error: "Invalid input" });
    }

    const rover = new Rover(x, y, direction);
    const result = rover.processCommands(commands);
    res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});