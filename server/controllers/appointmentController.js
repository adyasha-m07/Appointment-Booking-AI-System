const { predictWaitingTime } = require("../mlService");

let appointments = [];
let tokenNumber = 1;


// =========================================================
// HELPER: GET ACTIVE PATIENTS
// =========================================================

function getActivePatients() {
    return appointments.filter(
        patient => patient.status !== "Completed"
    );
}


// =========================================================
// HELPER: GET WAITING TIME PREDICTION
// =========================================================

async function calculateWaitingTime(patient) {

    // Processing and completed patients have no waiting time
    if (
        patient.status === "Processing" ||
        patient.status === "Completed"
    ) {
        return 0;
    }


    // All active patients for this doctor
    const doctorPatients = appointments.filter(
        p =>
            p.doctor === patient.doctor &&
            p.status !== "Completed"
    );


    // Position of this patient in the doctor's queue
    const patientIndex =
        doctorPatients.findIndex(
            p => p.id === patient.id
        );


    const patientsAhead =
        patientIndex >= 0
            ? patientIndex
            : 0;


    // All active patients in the department
    const departmentPatients =
        appointments.filter(
            p =>
                p.department === patient.department &&
                p.status !== "Completed"
        );


    const activeQueueSize =
        departmentPatients.length;


    // Is somebody currently being served by this doctor?
    const patientsBeingServed =
        doctorPatients.some(
            p => p.status === "Processing"
        )
            ? 1
            : 0;


    // Currently your dataset does not use emergency patients
    const emergencyPatients = 0;


    // Other ML features
    const dailyBookingCount =
        appointments.length;


    const departmentDailyCount =
        appointments.filter(
            p =>
                p.department === patient.department
        ).length;


    const doctorDailyCount =
        appointments.filter(
            p =>
                p.doctor === patient.doctor
        ).length;


    const completedAppointmentsToday =
        appointments.filter(
            p =>
                p.status === "Completed"
        ).length;


    const availableSlotsToday = 12;


    const cancellationsToday =
        appointments.filter(
            p =>
                p.status === "Cancelled"
        ).length;


    // First waiting patient with nobody being served
    // starts with zero waiting time.
    if (
        patientsAhead === 0 &&
        patientsBeingServed === 0
    ) {
        return 0;
    }


    // =====================================================
    // SEND DATA TO ML MODEL
    // =====================================================

    console.log(
        "ML INPUT FOR PATIENT:",
        patient.name,
        {
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
        }
    );


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


    return Math.max(
        0,
        Math.round(
            Number(
                prediction.waiting_time
            ) || 0
        )
    );
}


// =========================================================
// HELPER: RECALCULATE DOCTOR QUEUE
// =========================================================

async function recalculateDoctorQueue(doctor) {

    const doctorPatients =
        appointments.filter(
            patient =>
                patient.doctor === doctor &&
                patient.status !== "Completed"
        );


    // Calculate all waiting patients again
    for (
        const patient of doctorPatients
    ) {

        if (
            patient.status === "Processing"
        ) {

            patient.waiting = 0;

            continue;
        }


        patient.waiting =
            await calculateWaitingTime(
                patient
            );
    }


    return doctorPatients;
}


// =========================================================
// CREATE APPOINTMENT
// =========================================================

exports.createAppointment = async (
    req,
    res
) => {

    const {
        name,
        age,
        type,
        department,
        doctor
    } = req.body;


    // =====================================================
    // VALIDATION
    // =====================================================

    if (
        !name ||
        !age ||
        !department ||
        !doctor
    ) {

        return res.status(400).json({
            message:
                "Please fill all required fields."
        });
    }


    // =====================================================
    // QUEUE INFORMATION
    // =====================================================

    const doctorAppointments =
        appointments.filter(
            patient =>
                patient.doctor === doctor &&
                patient.status !== "Completed"
        );


    const patientsAhead =
        doctorAppointments.length;


    // =====================================================
    // CREATE TOKEN
    // =====================================================

    const prefix =
        type === "special"
            ? "S"
            : "N";


    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    const appointment = {

        id:
            Date.now(),

        token:
            prefix +
            tokenNumber++,

        name,

        age,

        type:
            type || "normal",

        department,

        doctor,

        waiting:
            0,

        status:
            "Waiting"
    };


    appointments.push(
        appointment
    );


    // =====================================================
    // CALCULATE INITIAL WAITING TIME
    // =====================================================

    try {

        appointment.waiting =
            await calculateWaitingTime(
                appointment
            );


        /*
         * Recalculate the other patients in the
         * same doctor's queue as well.
         *
         * Adding a patient changes the queue
         * information used by the ML model.
         */

        await recalculateDoctorQueue(
            doctor
        );


    } catch (error) {

        console.error(
            "ML prediction failed:",
            error
        );


        // Remove appointment if ML fails
        appointments =
            appointments.filter(
                p =>
                    p.id !== appointment.id
            );


        tokenNumber--;


        return res.status(500).json({

            message:
                "ML prediction failed",

            error:
                error.message

        });
    }


    // =====================================================
    // RESPONSE
    // =====================================================

    res.status(201).json(
        appointment
    );
};


// =========================================================
// START PROCESSING
// =========================================================

exports.startProcessing = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = appointments.find(
            p => String(p.id) === String(id)
        );

        if (!patient) {
            return res.status(404).json({
                message: "Appointment not found."
            });
        }

        if (patient.status !== "Waiting") {
            return res.status(400).json({
                message: "Patient is not waiting."
            });
        }

        // Save old waiting times
        const oldTimes = new Map(
            appointments.map(p => [
                p.id,
                Number(p.waiting) || 0
            ])
        );

        // Patient starts processing
        patient.status = "Processing";
        patient.waiting = 0;

        // Get remaining waiting patients for this doctor
        const remainingPatients = appointments.filter(
            p =>
                p.doctor === patient.doctor &&
                p.status === "Waiting"
        );

        /*
         * The patient who starts processing is no longer
         * blocking the patients behind them.
         *
         * Reduce waiting time instead of asking the ML
         * model to predict a completely new value.
         */

        for (let i = 0; i < remainingPatients.length; i++) {
            const p = remainingPatients[i];

            const oldWaiting =
                Number(oldTimes.get(p.id)) || 0;

            // Reduce waiting time by 25%
            const reduction =
                Math.max(1, Math.round(oldWaiting * 0.25));

            p.waiting = Math.max(
                0,
                oldWaiting - reduction
            );
        }

        res.json({
            message: "Patient is now being processed.",

            processingPatient: patient,

            updatedPatients: remainingPatients.map(p => ({
                id: p.id,
                waiting: p.waiting
            })),

            oldTimes: Object.fromEntries(oldTimes)
        });

    } catch (error) {
        console.error(
            "Start processing error:",
            error
        );

        res.status(500).json({
            message: "Unable to start processing patient",
            error: error.message
        });
    }
};


// =========================================================
// COMPLETE APPOINTMENT
// =========================================================

exports.completeAppointment = async (
    req,
    res
) => {

    const { id } =
        req.params;


    // =====================================================
    // FIND PATIENT
    // =====================================================

    const patient =
        appointments.find(
            p =>
                String(p.id) ===
                String(id)
        );


    if (!patient) {

        return res.status(404).json({

            message:
                "Appointment not found."

        });
    }


    // =====================================================
    // SAVE OLD WAITING TIMES
    // =====================================================

    const oldTimes =
        new Map(
            appointments.map(
                p => [
                    p.id,
                    Number(
                        p.waiting
                    ) || 0
                ]
            )
        );


    // =====================================================
    // COMPLETE CURRENT PATIENT
    // =====================================================

    patient.status =
        "Completed";

    patient.waiting =
        0;


    // =====================================================
    // RECALCULATE REMAINING QUEUE
    // =====================================================

    let remainingPatients;


    try {

        remainingPatients =
            await recalculateDoctorQueue(
                patient.doctor
            );

    } catch (error) {

        console.error(
            "ML recalculation failed:",
            error
        );


        /*
         * If ML fails, restore the patient's
         * previous state.
         */

        patient.status =
            "Processing";

        patient.waiting =
            oldTimes.get(
                patient.id
            ) || 0;


        return res.status(500).json({

            message:
                "ML recalculation failed",

            error:
                error.message

        });
    }


    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({

        message:
            "Appointment completed successfully.",

        completedPatient:
            patient,

        updatedPatients:
            remainingPatients.map(
                p => ({

                    id:
                        p.id,

                    waiting:
                        p.waiting

                })
            ),

        oldTimes:
            Object.fromEntries(
                oldTimes
            )

    });
};


// =========================================================
// GET APPOINTMENTS
// =========================================================

exports.getAppointments = (
    req,
    res
) => {

    res.json(
        appointments
    );
};