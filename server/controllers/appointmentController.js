let appointments = [];

let tokenNumber = 1;

const CONSULTATION_TIME = 10;


// =========================
// CALCULATE WAITING TIME
// =========================

function calculateWaitingTime(doctor) {

    const waitingPatients = appointments.filter(
        (patient) =>
            patient.doctor === doctor &&
            patient.status !== "Completed"
    );

    return waitingPatients.length * CONSULTATION_TIME;
}


// =========================
// CREATE APPOINTMENT
// =========================

exports.createAppointment = (req, res) => {

    const {
        name,
        age,
        type,
        department,
        doctor
    } = req.body;


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


    const waiting =
        calculateWaitingTime(doctor);


    const prefix =
        type === "special"
            ? "S"
            : "N";


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


    res.status(201).json(appointment);

};


// =========================
// GET APPOINTMENTS
// =========================

exports.getAppointments = (req, res) => {

    res.json(appointments);

};