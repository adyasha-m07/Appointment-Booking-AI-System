const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        age: {
            type: Number,
            required: true
        },

        type: {
            type: String,
            enum: ["normal", "special", "Emergency"],
            required: true
        },

        department: {
            type: String,
            required: true
        },

        doctor: {
            type: String,
            required: true
        },

        waiting: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["Processing", "Completed"],
            default: "Processing"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);