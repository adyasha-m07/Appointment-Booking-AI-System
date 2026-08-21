const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes = require("./routes/appointmentRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/appointments", appointmentRoutes);

// Test
app.get("/", (req, res) => {
    res.json({
        message: "SmartQueue server is running!"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});