const { predictWaitingTime } = require("../mlService");

let appointments = [];

let tokenNumber = 1;


// =========================================================
// CREATE APPOINTMENT
// =========================================================

exports.createAppointment = async (req, res) => {

    const {
        name,
        age,
        type,
        department,
        doctor
    } = req.body;


    // =====================================================
    // VALIDATE
    // =====================================================

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


    // =====================================================
    // QUEUE INFORMATION
    // =====================================================

    const doctorAppointments =
        appointments.filter(
            patient =>
                patient.doctor === doctor &&
                patient.status !== "Completed"
        );


    const departmentAppointments =
        appointments.filter(
            patient =>
                patient.department === department &&
                patient.status !== "Completed"
        );


    /*
     * Number of patients already waiting/being served
     * for this doctor.
     */
    const patientsAhead =
        doctorAppointments.length;


    const activeQueueSize =
        departmentAppointments.length;


    const patientsBeingServed =
        doctorAppointments.some(
            patient =>
                patient.status === "Processing"
        )
            ? 1
            : 0;


    const emergencyPatients = 0;


    // =====================================================
    // OTHER ML FEATURES
    // =====================================================

    const dailyBookingCount =
        appointments.length + 1;


    const departmentDailyCount =
        appointments.filter(
            patient =>
                patient.department === department
        ).length + 1;


    const doctorDailyCount =
        appointments.filter(
            patient =>
                patient.doctor === doctor
        ).length + 1;


    const completedAppointmentsToday =
        appointments.filter(
            patient =>
                patient.status === "Completed"
        ).length;


    const availableSlotsToday = 12;


    const cancellationsToday =
        appointments.filter(
            patient =>
                patient.status === "Cancelled"
        ).length;


    // =====================================================
    // INITIAL WAITING TIME
    // =====================================================

    let waiting = 0;


    /*
     * The first patient for a doctor always starts at 0.
     */
    if (patientsAhead === 0) {

        waiting = 0;

    } else {

        try {

            console.log("ML INPUT:", {

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
                Math.max(
                    0,
                    Math.round(
                        Number(
                            prediction.waiting_time
                        )
                    )
                );


        } catch (error) {

            console.error(
                "ML prediction failed:",
                error
            );


            return res.status(500).json({

                message:
                    "ML prediction failed",

                error:
                    error.message

            });

        }

    }


    // =====================================================
    // TOKEN
    // =====================================================

    const prefix =
        type === "special"
            ? "S"
            : "N";


    // =====================================================
    // CREATE APPOINTMENT
    // =====================================================

    const appointment = {

        id: Date.now(),

        token:
            prefix + tokenNumber++,

        name,

        age,

        type:
            type || "normal",

        department,

        doctor,

        waiting,

        /*
         * IMPORTANT:
         * New patients WAIT until staff starts them.
         */
        status: "Waiting"

    };


    appointments.push(
        appointment
    );


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

    const { id } = req.params;


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
    // CHECK STATUS
    // =====================================================

    if (patient.status !== "Waiting") {

        return res.status(400).json({

            message:
                "Patient is not waiting."

        });

    }


    // =====================================================
    // SAVE OLD TIMES
    // =====================================================

    const oldTimes =
        new Map(

            appointments.map(
                p => [
                    p.id,
                    Number(p.waiting) || 0
                ]
            )

        );


    // =====================================================
    // PATIENT STARTS PROCESSING
    // =====================================================

    patient.status =
        "Processing";

    patient.waiting =
        0;


    // =====================================================
    // GET PATIENTS BEHIND THIS PATIENT
    // =====================================================

    const remainingPatients =
        appointments.filter(

            p =>
                p.doctor === patient.doctor &&

                p.id !== patient.id &&

                p.status !== "Completed"

        );


    /*
     * If there are patients behind this patient,
     * reduce their waiting times slightly.
     *
     * We deliberately DO NOT use a fixed 10-minute
     * reduction.
     *
     * The reduction is based on the current queue.
     */
    if (remainingPatients.length > 0) {

        const nextPatient =
            remainingPatients[0];


        const nextWaiting =
            Number(
                nextPatient.waiting
            ) || 0;


        /*
         * Small proportional reduction.
         *
         * Example:
         *
         * 30 min -> reduction of 7/8 min
         * 50 min -> reduction of 12/13 min
         *
         * This avoids the old constant 10-minute gap.
         */
        const reduction =
            Math.max(
                1,
                Math.round(
                    nextWaiting * 0.25
                )
            );


        remainingPatients.forEach(
            p => {

                p.waiting =
                    Math.max(
                        0,
                        (
                            Number(
                                p.waiting
                            ) || 0
                        ) - reduction
                    );

            }
        );

    }


    // =====================================================
    // RESPONSE
    // =====================================================

    res.json({

        message:
            "Patient is now being processed.",

        processingPatient:
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
// COMPLETE APPOINTMENT
// =========================================================

exports.completeAppointment = async (req, res) => {

    const { id } = req.params;


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
                    Number(p.waiting) || 0
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
    // GET REMAINING PATIENTS FOR SAME DOCTOR
    // =====================================================

    const remainingPatients =
        appointments.filter(

            p =>
                p.doctor === patient.doctor &&

                p.status !== "Completed"

        );


    // =====================================================
    // SHIFT QUEUE
    // =====================================================

    if (remainingPatients.length > 0) {

        /*
         * The first remaining patient is now
         * at the front of the queue.
         */
        const firstPatient =
            remainingPatients[0];


        /*
         * This patient's previous waiting time
         * becomes the amount of time removed
         * from everyone behind them.
         */
        const amountToShift =
            Math.max(
                0,
                Number(
                    firstPatient.waiting
                ) || 0
            );


        /*
         * First remaining patient now has
         * no estimated waiting time.
         */
        firstPatient.waiting =
            0;


        /*
         * Move the queue forward.
         */
        for (
            let i = 1;
            i < remainingPatients.length;
            i++
        ) {

            const currentPatient =
                remainingPatients[i];


            currentPatient.waiting =
                Math.max(
                    0,
                    (
                        Number(
                            currentPatient.waiting
                        ) || 0
                    ) - amountToShift
                );

        }

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

exports.getAppointments = (req, res) => {

    res.json(
        appointments
    );

};