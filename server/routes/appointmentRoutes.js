const express = require("express");

const router = express.Router();

const {
    createAppointment,
    getAppointments,
    startProcessing,
    completeAppointment
} = require("../controllers/appointmentController");


router.post(
    "/",
    createAppointment
);


router.get(
    "/",
    getAppointments
);


router.put(
    "/:id/processing",
    startProcessing
);


router.put(
    "/:id/complete",
    completeAppointment
);


module.exports = router;