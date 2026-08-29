const { predictWaitingTime } = require("../mlService");

let appointments = [];

let tokenNumber = 1;


// =========================
// CREATE APPOINTMENT
// =========================

exports.createAppointment = async (req, res) => {

    const {
        name,
        age,
        type,
        department,
        doctor
    } = req.body;


    // Validate required fields
    if (
        !name ||
        !age ||
        !department ||
        !doctor
    ) {

        return res.status(400).json({
            message: "Please fill all required fields."
        });

    }


    // =========================
    // QUEUE INFORMATION
    // =========================

    const doctorAppointments = appointments.filter(
        (patient) =>
            patient.doctor === doctor &&
            patient.status !== "Completed"
    );

    const departmentAppointments = appointments.filter(
        (patient) =>
            patient.department === department &&
            patient.status !== "Completed"
    );


    const patientsAhead =
        doctorAppointments.length;

    const activeQueueSize =
        departmentAppointments.length;

    const patientsBeingServed =
        doctorAppointments.length > 0 ? 1 : 0;


    // For now, your system does not have
    // a separate emergency field.
    const emergencyPatients = 0;


    // =========================
    // OTHER ML FEATURES
    // =========================

    const dailyBookingCount =
        appointments.length + 1;

    const departmentDailyCount =
        appointments.filter(
            (patient) =>
                patient.department === department
        ).length + 1;

    const doctorDailyCount =
        appointments.filter(
            (patient) =>
                patient.doctor === doctor
        ).length + 1;

    const completedAppointmentsToday =
        appointments.filter(
            (patient) =>
                patient.status === "Completed"
        ).length;

    const availableSlotsToday = 12;

    const cancellationsToday =
        appointments.filter(
            (patient) =>
                patient.status === "Cancelled"
        ).length;


    // =========================
    // SEND DATA TO ML MODEL
    // =========================

    let waiting = 0;

    try {

        const prediction =
            await predictWaitingTime({

                patients_ahead:
                    patientsAhead,

                active_queue_size:
                    activeQueueSize,

                patients_being_served:
                    patientsBeingServed,

                emergency_patients:
                    emergencyPatients,

                daily_booking_count:
                    dailyBookingCount,

                department_daily_count:
                    departmentDailyCount,

                doctor_daily_count:
                    doctorDailyCount,

                completed_appointments_today:
                    completedAppointmentsToday,

                available_slots_today:
                    availableSlotsToday,

                cancellations_today:
                    cancellationsToday

            });


        waiting =
            Math.round(
                Number(prediction.waiting_time)
            );


    } catch (error) {

    console.error("ML prediction failed:", error);

    return res.status(500).json({
        message: "ML prediction failed",
        error: error.message
    });
}


    // =========================
    // TOKEN
    // =========================

    const prefix =
        type === "special"
            ? "S"
            : "N";


    // =========================
    // CREATE APPOINTMENT
    // =========================

    const appointment = {

        id: Date.now(),

        token:
            prefix + tokenNumber++,

        name,

        age,

        type: type || "normal",

        department,

        doctor,

        waiting,

        status: "Processing"

    };


    appointments.push(appointment);


    // =========================
    // RESPONSE
    // =========================

    res.status(201).json(appointment);

};


// =========================
// GET APPOINTMENTS
// =========================

exports.getAppointments = (req, res) => {

    res.json(appointments);

};