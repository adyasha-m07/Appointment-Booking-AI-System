const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes =
    require("./routes/appointmentRoutes");

const {
    predictWaitingTime
} = require("./mlService");
dotenv.config();

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());


// =========================
// ROUTES
// =========================

app.use(
    "/api/appointments",
    appointmentRoutes
);

// =========================
// ML WAITING TIME
// =========================

app.post("/api/predict-waiting-time", async (req, res) => {

    try {

        const result = await predictWaitingTime(req.body);

        res.json(result);

    } catch (error) {

        console.error("ML prediction error:", error);

        res.status(500).json({
            error: "Unable to predict waiting time"
        });

    }

});


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {

    res.json({
        message: "SmartQueue server is running!"
    });

});


// =========================
// SERVER
// =========================

const PORT =
    process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});