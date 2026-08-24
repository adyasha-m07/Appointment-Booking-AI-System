const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentRoutes =
    require("./routes/appointmentRoutes");

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