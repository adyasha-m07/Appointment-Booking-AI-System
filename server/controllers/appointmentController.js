// Temporary in-memory storage
let appointments = [];
let tokenNumber = 1;

// Doctors
const doctors = {
    "General Medicine": ["Doctor A", "Doctor B"],
    "Orthopedics": ["Doctor X", "Doctor Y"]
};

const CONSULTATION_TIME = 10;

// Calculate waiting time
function calculateWaitingTime(doctor) {
    const waitingPatients = appointments.filter(
        patient =>
            patient.doctor === doctor &&
            patient.status !== "Completed"
    );

    return waitingPatients.length * CONSULTATION_TIME;
}

// Create Appointment
exports.createAppointment = (req, res) => {
    const { name, age, type, department, doctor } = req.body;

    if (!name || !age || !department || !doctor) {
        return res.status(400).json({
            message: "Please fill all required fields."
        });
    }

    const waiting = calculateWaitingTime(doctor);

    const prefix = type === "special" ? "S" : "N";

    const appointment = {
        id: Date.now(),
        token: prefix + tokenNumber++,
        name,
        age,
        type,
        department,
        doctor,
        waiting,
        status: "Processing"
    };

    appointments.push(appointment);

    res.status(201).json(appointment);
};

// Get all appointments
exports.getAppointments = (req, res) => {
    res.json(appointments);
};