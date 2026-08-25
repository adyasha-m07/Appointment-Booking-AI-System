/* =========================================================
   SMARTQUEUE - COMPLETE SCRIPT.JS
   Matches the HTML provided by Adyasha
========================================================= */


/* =========================================================
   GLOBAL DATA
========================================================= */

let selectedPatientType = "normal";
let selectedDepartment = "";
let selectedDoctor = "";
let selectedGender = "Male";
let selectedDuration = "Today";

let patients = [];

let completedPatients = 0;

let tokenCounter = 101;

/* Current token shown on the My Token page. */
let currentTokenPatientId = null;

/* Each patient occupies a 10-minute slot in a doctor's queue. */
const WAITING_SLOT_MINUTES = 10;
const TOTAL_EMERGENCY_BEDS = 15;
function getOccupiedEmergencyBeds() {
    return patients.filter(patient =>
        patient.emergency === true &&
        patient.status !== "Completed"
    ).length;
}

function getAvailableEmergencyBeds() {
    return Math.max(
        0,
        TOTAL_EMERGENCY_BEDS - getOccupiedEmergencyBeds()
    );
}

function updateEmergencyBeds() {
    const totalBedsElement =
        document.getElementById("totalBeds");

    const occupiedBedsElement =
        document.getElementById("occupiedBeds");

    const availableBedsElement =
        document.getElementById("availableBeds");

    if (totalBedsElement) {
        totalBedsElement.textContent =
            TOTAL_EMERGENCY_BEDS;
    }

    if (occupiedBedsElement) {
        occupiedBedsElement.textContent =
            getOccupiedEmergencyBeds();
    }

    if (availableBedsElement) {
        availableBedsElement.textContent =
            getAvailableEmergencyBeds();
    }
}
/* ---------------------------------------------------------
   QUEUE / WAITING-TIME HELPERS
--------------------------------------------------------- */
function getDoctorQueue(doctorName) {
    return patients
        .filter(patient =>
            patient.doctor === doctorName &&
            patient.status !== "Completed" &&
            !patient.emergency
        )
        .sort((a, b) => (a.queueOrder || a.id) - (b.queueOrder || b.id));
}

function getDoctorQueueInfo(doctorName) {
    const queue = getDoctorQueue(doctorName);

    return {
        count: queue.length,
        waiting: queue.length * WAITING_SLOT_MINUTES,
        queue
    };
}
function getPatientWaitingTime(patient) {
    if (!patient || patient.emergency) return 0;
    const queue = getDoctorQueue(patient.doctor);
    const index = queue.findIndex(p => p.id === patient.id);
    return index >= 0 ? index * WAITING_SLOT_MINUTES : 0;
}

function saveQueueState() {
    /* Intentionally NOT stored in localStorage.
       Refreshing Edge starts a fresh queue/dashboard. */
}

function showWaitingNotification(patient, oldWaiting, newWaiting) {
    if (!patient || oldWaiting === newWaiting) return;

    const message = newWaiting < oldWaiting
        ? `⏱️ Your waiting time has decreased from ${oldWaiting} min to ${newWaiting} min for token ${patient.token}.`
        : `⏱️ Your estimated waiting time is now ${newWaiting} min for token ${patient.token}.`;

    const existing = document.getElementById("waitingNotification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.id = "waitingNotification";
    notification.className = "waiting-notification";
    notification.innerHTML = `<span>${message}</span><button type="button" aria-label="Close" onclick="this.parentElement.remove()">×</button>`;
    document.body.appendChild(notification);

    window.setTimeout(() => {
        if (notification.isConnected) notification.remove();
    }, 6000);
}

function recalculateWaitingTimes(showNotifications = true) {
    const oldTimes = new Map(
        patients.map(patient => [patient.id, Number(patient.waiting) || 0])
    );

    const doctorsWithQueues = [...new Set(
        patients
            .filter(patient => !patient.emergency && patient.status !== "Completed")
            .map(patient => patient.doctor)
    )];

    doctorsWithQueues.forEach(doctorName => {
        const queue = getDoctorQueue(doctorName);
        queue.forEach((patient, index) => {
            patient.waiting = index * WAITING_SLOT_MINUTES;
        });
    });

    /* Completed patients always have zero remaining queue time. */
    patients
        .filter(patient => patient.status === "Completed" || patient.emergency)
        .forEach(patient => { patient.waiting = 0; });

    const currentPatient = currentTokenPatientId == null
        ? null
        : patients.find(patient => patient.id === currentTokenPatientId);

    if (currentPatient && showNotifications) {
        const oldWaiting = oldTimes.get(currentPatient.id);
        if (oldWaiting !== undefined && oldWaiting !== currentPatient.waiting) {
            showWaitingNotification(currentPatient, oldWaiting, currentPatient.waiting);
        }
    }

    saveQueueState();

    if (selectedDepartment && typeof window.loadDoctors === "function") {
        window.loadDoctors(selectedDepartment);
    }

    updateDashboard();
}



/* =========================================================
   DOCTOR DATABASE
========================================================= */

const doctors = {

    "General Medicine": [

        {
            id: "gm1",
            name: "Dr. Ananya Sharma",
            specialization: "General Physician",
            qualification: "MBBS, MD",
            experience: "12 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },

        {
            id: "gm2",
            name: "Dr. Rajesh Kumar",
            specialization: "Internal Medicine",
            qualification: "MBBS, MD",
            experience: "15 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },

        {
            id: "gm3",
            name: "Dr. Priya Nair",
            specialization: "General Physician",
            qualification: "MBBS, DNB",
            experience: "9 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }

    ],


    "Orthopedics": [

        {
            id: "ortho1",
            name: "Dr. Arjun Mehta",
            specialization: "Orthopedic Surgeon",
            qualification: "MBBS, MS Ortho",
            experience: "14 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/46.jpg"
        },

        {
            id: "ortho2",
            name: "Dr. Sneha Patel",
            specialization: "Joint & Bone Specialist",
            qualification: "MBBS, MS Ortho",
            experience: "11 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },

        {
            id: "ortho3",
            name: "Dr. Vikram Singh",
            specialization: "Sports Orthopedics",
            qualification: "MBBS, DNB",
            experience: "16 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/52.jpg"
        }

    ],


    "Cardiology": [

        {
            id: "cardio1",
            name: "Dr. Rahul Verma",
            specialization: "Cardiologist",
            qualification: "MBBS, MD, DM",
            experience: "18 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/41.jpg"
        },

        {
            id: "cardio2",
            name: "Dr. Meera Kapoor",
            specialization: "Interventional Cardiologist",
            qualification: "MBBS, MD, DM",
            experience: "13 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/50.jpg"
        },

        {
            id: "cardio3",
            name: "Dr. Amit Malhotra",
            specialization: "Heart Specialist",
            qualification: "MBBS, MD",
            experience: "20 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/61.jpg"
        }

    ],


    "Neurology": [

        {
            id: "neuro1",
            name: "Dr. Kavita Rao",
            specialization: "Neurologist",
            qualification: "MBBS, MD, DM",
            experience: "16 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/47.jpg"
        },

        {
            id: "neuro2",
            name: "Dr. Sandeep Joshi",
            specialization: "Neuro Physician",
            qualification: "MBBS, MD, DM",
            experience: "19 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/men/68.jpg"
        },

        {
            id: "neuro3",
            name: "Dr. Riya Das",
            specialization: "Neurological Specialist",
            qualification: "MBBS, MD",
            experience: "10 Years Experience",
            waiting: 0,
            patients: 0,
            image: "https://randomuser.me/api/portraits/women/33.jpg"
        }

    ]

};


/* =========================================================
   LANGUAGE TRANSLATIONS
========================================================= */

const translations = {

    en: {
        home: "Home",
        booking: "Book Appointment",
        token: "My Token",
        staff: "Staff Dashboard",
        emergency: "Emergency",

        heroBadge: "✨ Smart Healthcare • Less Waiting",
        heroTitle: "Healthcare that puts you first.",
        heroText: "Book appointments, find the right doctor, and manage your hospital visit with ease.",
        heroButton: "Book an Appointment",

        services: "OUR SERVICES",
        servicesTitle: "How can we help you?",
        servicesText: "Choose the service that best fits your needs.",

        normal: "Normal Patient",
        special: "Specially-Abled Patient",
        emergencyTitle: "Emergency",

        normalDesc: "Book a regular consultation with a doctor of your choice.",
        specialDesc: "Receive priority assistance and suitable doctor recommendations.",
        emergencyDesc: "Quickly register an emergency patient for immediate attention.",

        bookNow: "Book Now",
        priority: "Get Priority",
        registerNow: "Register Now"
    },


    hi: {
        home: "होम",
        booking: "अपॉइंटमेंट बुक करें",
        token: "मेरा टोकन",
        staff: "स्टाफ डैशबोर्ड",
        emergency: "आपातकाल",

        heroBadge: "✨ स्मार्ट हेल्थकेयर • कम प्रतीक्षा",
        heroTitle: "स्वास्थ्य सेवा जो आपको प्राथमिकता देती है।",
        heroText: "अपॉइंटमेंट बुक करें, सही डॉक्टर खोजें और अस्पताल की यात्रा आसानी से प्रबंधित करें।",
        heroButton: "अपॉइंटमेंट बुक करें",

        services: "हमारी सेवाएं",
        servicesTitle: "हम आपकी कैसे मदद कर सकते हैं?",
        servicesText: "अपनी जरूरत के अनुसार सेवा चुनें।",

        normal: "सामान्य मरीज",
        special: "दिव्यांग मरीज",
        emergencyTitle: "आपातकाल",

        normalDesc: "अपनी पसंद के डॉक्टर से सामान्य परामर्श बुक करें।",
        specialDesc: "प्राथमिकता सहायता और उपयुक्त डॉक्टर की सिफारिश प्राप्त करें।",
        emergencyDesc: "आपातकालीन मरीज को तुरंत पंजीकृत करें।",

        bookNow: "अभी बुक करें",
        priority: "प्राथमिकता प्राप्त करें",
        registerNow: "अभी पंजीकरण करें"
    },


    od: {
        home: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
        booking: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",
        token: "ମୋ ଟୋକନ",
        staff: "ଷ୍ଟାଫ୍ ଡ୍ୟାସବୋର୍ଡ",
        emergency: "ଜରୁରୀକାଳୀନ",

        heroBadge: "✨ ସ୍ମାର୍ଟ ହେଲ୍ଥକେୟାର • କମ୍ ଅପେକ୍ଷା",
        heroTitle: "ଆପଣଙ୍କୁ ପ୍ରାଥମିକତା ଦେଉଥିବା ସ୍ୱାସ୍ଥ୍ୟସେବା।",
        heroText: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ, ସଠିକ୍ ଡାକ୍ତର ଖୋଜନ୍ତୁ ଏବଂ ହସ୍ପିଟାଲ୍ ଯାତ୍ରାକୁ ସହଜ କରନ୍ତୁ।",
        heroButton: "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",

        services: "ଆମ ସେବା",
        servicesTitle: "ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବୁ?",
        servicesText: "ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁସାରେ ସେବା ବାଛନ୍ତୁ।",

        normal: "ସାଧାରଣ ରୋଗୀ",
        special: "ବିଶେଷ ସହାୟତା ଆବଶ୍ୟକ ରୋଗୀ",
        emergencyTitle: "ଜରୁରୀକାଳୀନ",

        normalDesc: "ଆପଣଙ୍କ ପସନ୍ଦର ଡାକ୍ତରଙ୍କ ସହ ସାଧାରଣ ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ।",
        specialDesc: "ପ୍ରାଥମିକତା ସହାୟତା ଏବଂ ଉପଯୁକ୍ତ ଡାକ୍ତର ସୁପାରିଶ ପାଆନ୍ତୁ।",
        emergencyDesc: "ଜରୁରୀକାଳୀନ ରୋଗୀଙ୍କୁ ତୁରନ୍ତ ପଞ୍ଜୀକରଣ କରନ୍ତୁ।",

        bookNow: "ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ",
        priority: "ପ୍ରାଥମିକତା ପାଆନ୍ତୁ",
        registerNow: "ବର୍ତ୍ତମାନ ପଞ୍ଜୀକରଣ"
    },


    mr: {
        home: "मुख्यपृष्ठ",
        booking: "अपॉइंटमेंट बुक करा",
        token: "माझे टोकन",
        staff: "स्टाफ डॅशबोर्ड",
        emergency: "आपत्कालीन"
    },

    ta: {
        home: "முகப்பு",
        booking: "அப்பாயிண்ட்மென்ட்",
        token: "என் டோக்கன்",
        staff: "பணியாளர் டாஷ்போர்டு",
        emergency: "அவசரநிலை"
    },

    te: {
        home: "హోమ్",
        booking: "అపాయింట్‌మెంట్ బుక్ చేయండి",
        token: "నా టోకెన్",
        staff: "స్టాఫ్ డాష్‌బోర్డ్",
        emergency: "అత్యవసరం"
    },

    kn: {
        home: "ಮುಖಪುಟ",
        booking: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
        token: "ನನ್ನ ಟೋಕನ್",
        staff: "ಸ್ಟಾಫ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        emergency: "ತುರ್ತು"
    },

    gu: {
        home: "હોમ",
        booking: "અપોઇન્ટમેન્ટ બુક કરો",
        token: "મારો ટોકન",
        staff: "સ્ટાફ ડેશબોર્ડ",
        emergency: "કટોકટી"
    },

    pa: {
        home: "ਹੋਮ",
        booking: "ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ",
        token: "ਮੇਰਾ ਟੋਕਨ",
        staff: "ਸਟਾਫ ਡੈਸ਼ਬੋਰਡ",
        emergency: "ਐਮਰਜੈਂਸੀ"
    },

    ur: {
        home: "ہوم",
        booking: "اپائنٹمنٹ بک کریں",
        token: "میرا ٹوکن",
        staff: "اسٹاف ڈیش بورڈ",
        emergency: "ایمرجنسی"
    },

    fr: {
        home: "Accueil",
        booking: "Prendre rendez-vous",
        token: "Mon jeton",
        staff: "Tableau du personnel",
        emergency: "Urgence"
    },

    es: {
        home: "Inicio",
        booking: "Reservar cita",
        token: "Mi turno",
        staff: "Panel del personal",
        emergency: "Emergencia"
    }

};


/* =========================================================
   PAGE NAVIGATION
========================================================= */

window.showPage = function(pageId, button) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    document.querySelectorAll(".nav-button").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "staff") {
        updateDashboard();
    }
};


/* =========================================================
   OPEN BOOKING
========================================================= */

window.openBooking = function(type = "normal") {

    selectedPatientType = type;

    const patientType =
        document.getElementById("patientType");

    if (patientType) {
        patientType.value = type;
    }

    document.querySelectorAll(".choice-card").forEach(card => {
        card.classList.remove("selected");
    });

    if (type === "special") {

        document
            .getElementById("specialChoice")
            ?.classList.add("selected");

    } else {

        document
            .getElementById("normalChoice")
            ?.classList.add("selected");
    }

    const bookingButton =
        document.querySelector(
            '.nav-button[onclick*="booking"]'
        );

    window.showPage("booking", bookingButton);

};


/* =========================================================
   PATIENT TYPE
========================================================= */

window.selectPatientType = function(type) {

    selectedPatientType = type;

    const input =
        document.getElementById("patientType");

    if (input) {
        input.value = type;
    }

    document.querySelectorAll(".choice-card").forEach(card => {
        card.classList.remove("selected");
    });

    if (type === "normal") {

        document
            .getElementById("normalChoice")
            ?.classList.add("selected");

    } else {

        document
            .getElementById("specialChoice")
            ?.classList.add("selected");

    }

};


/* =========================================================
   DEPARTMENT SELECTION
   IMPORTANT FIX
========================================================= */

window.selectDepartment = function(value) {

    if (!value) {
        return;
    }

    console.log("Department selected:", value);

    selectedDepartment = value;

    /* -----------------------------------------------
       UPDATE HIDDEN INPUT
    ------------------------------------------------ */

    const departmentInput =
        document.getElementById("department");

    if (departmentInput) {

        departmentInput.value = value;

        console.log(
            "Hidden department value:",
            departmentInput.value
        );
    }


    /* -----------------------------------------------
       UPDATE DROPDOWN
    ------------------------------------------------ */

    const dropdown =
        document.getElementById("departmentDropdown");

    if (dropdown) {
        dropdown.value = value;
    }


    /* -----------------------------------------------
       SELECT DEPARTMENT CARD
    ------------------------------------------------ */

    document
        .querySelectorAll(".department-card")
        .forEach(card => {

            const cardDepartment =
                card.dataset.department ||
                card.getAttribute("data-department");

            if (cardDepartment === value) {
                card.classList.add("selected");
            } else {
                card.classList.remove("selected");
            }

        });


    /* -----------------------------------------------
       LOAD DOCTORS
    ------------------------------------------------ */

    window.loadDoctors(value);


    /* -----------------------------------------------
       AI MESSAGE
    ------------------------------------------------ */

    const aiMessage =
        document.getElementById("aiMessage");

    if (aiMessage) {

        aiMessage.textContent =
            `Doctors available in ${value}. Click "Find Best Doctor" for an AI recommendation.`;

    }

};


/* =========================================================
   LOAD DOCTORS
========================================================= */

window.loadDoctors = function(department) {
    const doctorGrid = document.getElementById("doctorGrid");
    if (!doctorGrid) return;

    const doctorList = doctors[department];

    if (!doctorList || doctorList.length === 0) {
        doctorGrid.innerHTML = `
            <div class="empty-doctors">
                <div>👨‍⚕️</div>
                <h3>No doctors available</h3>
                <p>Please select another department.</p>
            </div>`;
        return;
    }

    doctorGrid.innerHTML = doctorList.map(doctor => {
        const queueInfo = getDoctorQueueInfo(doctor.name);
        return `
        <div class="doctor-card" data-doctor-id="${doctor.id}"
             onclick="selectDoctor('${doctor.id}')">
            <div class="doctor-image-wrapper">
                <img src="${doctor.image}" alt="${doctor.name}" class="doctor-image"
                     onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=5d3140&color=fff&size=200';">
                <span class="doctor-status">● Available</span>
            </div>
            <div class="doctor-card-content">
                <div class="doctor-top">
                    <div>
                        <h3>${doctor.name}</h3>
                        <p class="doctor-specialization">${doctor.specialization}</p>
                    </div>
                    <span class="doctor-rating">⭐ 4.9</span>
                </div>
                <p class="doctor-qualification">${doctor.qualification}</p>
                <div class="doctor-details">
                    <span>🎓 ${doctor.experience}</span>
                    <span>👥 ${queueInfo.count} patients waiting</span>
                </div>
                <div class="doctor-bottom">
                    <div class="waiting-time">
                        <span>⏱️</span>
                        <div>
                            <strong>${queueInfo.waiting} min</strong>
                            <small>Estimated wait</small>
                        </div>
                    </div>
                    <button type="button" class="doctor-select-button"
                            onclick="event.stopPropagation(); selectDoctor('${doctor.id}')">
                        Select Doctor
                    </button>
                </div>
            </div>
        </div>`;
    }).join("");

    /* Re-apply the currently selected language to newly generated cards. */
    if (typeof applyTranslations === "function") applyTranslations(doctorGrid);
};


/* =========================================================
   SELECT DOCTOR
========================================================= */

window.selectDoctor = function(doctorId) {
    const department =
        document.getElementById("department")?.value || selectedDepartment;
    const doctorList = doctors[department] || [];
    const doctor = doctorList.find(d => d.id === doctorId);

    if (!doctor) {
        console.error("Doctor not found:", doctorId, department);
        return;
    }

    selectedDoctor = doctorId;

    const doctorInput = document.getElementById("doctor");
    if (doctorInput) doctorInput.value = doctor.name;

    document.querySelectorAll(".doctor-card").forEach(card => {
        card.classList.remove("selected");
    });

    const selectedCard = document.querySelector(`[data-doctor-id="${doctorId}"]`);
    if (selectedCard) selectedCard.classList.add("selected");

    const queueInfo = getDoctorQueueInfo(doctor.name);
    const aiMessage = document.getElementById("aiMessage");
    if (aiMessage) {
        aiMessage.innerHTML =
            `✅ <strong>${doctor.name}</strong> selected. Estimated waiting time is ${queueInfo.waiting} minutes.`;
        if (typeof applyTranslations === "function") applyTranslations(aiMessage);
    }
};


/* =========================================================
   AI RECOMMENDATION
========================================================= */

window.getAIRecommendation = function() {
    const department = document.getElementById("department")?.value?.trim();
    if (!department) {
        alert("Please select a department first.");
        return;
    }

    const doctorList = doctors[department] || [];
    if (!doctorList.length) {
        alert("No doctors available for this department.");
        return;
    }

    const bestDoctor = [...doctorList].sort((a, b) => {
        return getDoctorQueueInfo(a.name).waiting - getDoctorQueueInfo(b.name).waiting;
    })[0];

    selectDoctor(bestDoctor.id);

    const queueInfo = getDoctorQueueInfo(bestDoctor.name);
    const aiMessage = document.getElementById("aiMessage");
    if (aiMessage) {
        aiMessage.innerHTML = `
            🤖 <strong>AI Recommendation:</strong>
            ${bestDoctor.name} is currently the best choice with an estimated
            waiting time of ${queueInfo.waiting} minutes.
        `;
        if (typeof applyTranslations === "function") applyTranslations(aiMessage);
    }
};


/* =========================================================
   GENDER
========================================================= */

window.selectGender = function(button, gender) {

    selectedGender = gender;


    document
        .querySelectorAll(".gender-option")
        .forEach(option => {

            option.classList.remove("selected");

        });


    if (button) {
        button.classList.add("selected");
    }


    const input =
        document.getElementById("patientGender");


    if (input) {
        input.value = gender;
    }

};


/* =========================================================
   PROBLEM DROPDOWN
========================================================= */

window.selectProblemDropdown = function(value) {

    const input =
        document.getElementById(
            "patientProblemCategory"
        );


    if (input) {
        input.value = value;
    }

};


/* =========================================================
   DURATION
========================================================= */

window.selectDuration = function(button, duration) {

    selectedDuration = duration;


    document
        .querySelectorAll(".duration-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    if (button) {
        button.classList.add("selected");
    }


    const input =
        document.getElementById("problemDuration");


    if (input) {
        input.value = duration;
    }

};


/* =========================================================
   MEDICAL CONDITIONS
========================================================= */

let selectedConditions = ["None"];


window.toggleCondition = function(button, condition) {

    const buttons =
        document.querySelectorAll(
            ".condition-card"
        );


    if (condition === "None") {

        selectedConditions = ["None"];

        buttons.forEach(btn => {
            btn.classList.remove("selected");
        });

        button.classList.add("selected");

        return;
    }


    selectedConditions =
        selectedConditions.filter(
            item => item !== "None"
        );


    const noneButton =
        Array.from(buttons).find(
            btn => btn.textContent.includes("None")
        );


    if (noneButton) {
        noneButton.classList.remove("selected");
    }


    if (selectedConditions.includes(condition)) {

        selectedConditions =
            selectedConditions.filter(
                item => item !== condition
            );

        button.classList.remove("selected");

    } else {

        selectedConditions.push(condition);

        button.classList.add("selected");

    }


    if (selectedConditions.length === 0) {

        selectedConditions = ["None"];

        if (noneButton) {
            noneButton.classList.add("selected");
        }

    }

};


/* =========================================================
   BOOK APPOINTMENT
   MAIN FIX FOR DEPARTMENT ERROR
========================================================= */

window.bookAppointment = function() {

    /*
       IMPORTANT:
       We read the department DIRECTLY from the hidden
       input in the HTML.

       This is the main fix.
    */

    const departmentInput =
        document.getElementById("department");


    const department =
        departmentInput
            ? departmentInput.value.trim()
            : "";


    console.log(
        "BOOK APPOINTMENT - Department:",
        department
    );


    /* -----------------------------------------------------
       PATIENT TYPE
    ----------------------------------------------------- */

    const patientType =
        document.getElementById("patientType")?.value ||
        "normal";


    /* -----------------------------------------------------
       DOCTOR
    ----------------------------------------------------- */

    const doctor =
        document.getElementById("doctor")?.value?.trim() ||
        "";


    /* -----------------------------------------------------
       PATIENT DETAILS
    ----------------------------------------------------- */

    const patientName =
        document
            .getElementById("patientName")
            ?.value
            .trim() || "";


    const patientAge =
        document
            .getElementById("patientAge")
            ?.value
            .trim() || "";


    const patientGender =
        document
            .getElementById("patientGender")
            ?.value ||
        "Male";


    const patientMobile =
        document
            .getElementById("patientMobile")
            ?.value
            .trim() || "";


    const patientEmail =
        document
            .getElementById("patientEmail")
            ?.value
            .trim() || "";


    const patientProblemCategory =
        document
            .getElementById("patientProblemCategory")
            ?.value ||
        "";


    const patientProblem =
        document
            .getElementById("patientProblem")
            ?.value
            .trim() || "";


    const problemDuration =
        document
            .getElementById("problemDuration")
            ?.value ||
        "Today";


    const allergies =
        document
            .getElementById("patientAllergies")
            ?.value ||
        "No Known Allergies";


    const medications =
        document
            .getElementById("currentMedications")
            ?.value
            .trim() || "";


    const otherCondition =
        document
            .getElementById("otherCondition")
            ?.value
            .trim() || "";


    /* =====================================================
       VALIDATION
    ===================================================== */


    if (!department) {

        alert("Please select a department.");

        document
            .getElementById("departmentDropdown")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        return;
    }


    if (!doctor) {

        alert("Please select a doctor.");

        document
            .getElementById("doctorGrid")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        return;
    }


    if (!patientName) {

        alert("Please enter the patient's name.");

        document
            .getElementById("patientName")
            ?.focus();

        return;
    }


    if (!patientAge) {

        alert("Please enter the patient's age.");

        document
            .getElementById("patientAge")
            ?.focus();

        return;
    }


    if (!patientMobile ||
        patientMobile.length !== 10) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        document
            .getElementById("patientMobile")
            ?.focus();

        return;
    }


    if (!patientProblem) {

        alert(
            "Please describe the patient's problem."
        );

        document
            .getElementById("patientProblem")
            ?.focus();

        return;
    }


    /* =====================================================
       FIND DOCTOR
    ===================================================== */

    const doctorList =
        doctors[department] || [];


    const doctorObject =
        doctorList.find(
            d => d.name === doctor
        );


    /* =====================================================
       GENERATE TOKEN
    ===================================================== */

    const prefix =
        patientType === "special"
            ? "P"
            : "A";


    const token =
        `${prefix}${tokenCounter++}`;


    /* First patient for a doctor gets 0 min; each patient behind
       them gets another 10 minutes. */
    const doctorQueueBeforeBooking =
        doctorObject ? getDoctorQueue(doctorObject.name) : [];

    const waiting =
        doctorObject
            ? doctorQueueBeforeBooking.length * WAITING_SLOT_MINUTES
            : 0;


    /* =====================================================
       CREATE PATIENT
    ===================================================== */

    const patient = {

        id: Date.now(),

        queueOrder: Date.now(),

        token: token,

        name: patientName,

        age: patientAge,

        gender: patientGender,

        mobile: patientMobile,

        email: patientEmail,

        type: patientType,

        department: department,

        doctor: doctor,

        problemCategory:
            patientProblemCategory,

        problem:
            patientProblem,

        duration:
            problemDuration,

        conditions:
            [...selectedConditions],

        otherCondition:
            otherCondition,

        allergies:
            allergies,

        medications:
            medications,

        waiting:
            waiting,

        status:
            "Waiting",

        createdAt:
            new Date().toLocaleString()

    };


    patients.push(patient);

    /* Recalculate every doctor's live queue immediately. */
    recalculateWaitingTimes(false);
    window.loadDoctors(department);


    /* =====================================================
       SHOW TOKEN
    ===================================================== */

    showToken(patient);


    /* =====================================================
       GO TO TOKEN PAGE
    ===================================================== */

    const tokenButton =
        document.querySelector(
            '.nav-button[onclick*="token"]'
        );


    window.showPage(
        "token",
        tokenButton
    );


    /* =====================================================
       UPDATE DASHBOARD
    ===================================================== */

    updateDashboard();


    /* =====================================================
       SUCCESS MESSAGE
    ===================================================== */

    console.log(
        "Appointment successfully booked:",
        patient
    );

};


/* =========================================================
   SHOW TOKEN
========================================================= */

function showToken(patient) {

    currentTokenPatientId = patient?.id ?? null;

    const tokenResult =
        document.getElementById("tokenResult");


    if (!tokenResult) {
        return;
    }


    const typeText =
        patient.type === "special"
            ? "Priority Patient"
            : "Regular Patient";


    tokenResult.innerHTML = `

        <div class="token-success">

            <div class="token-success-icon">
                ✓
            </div>

            <span class="token-status">
                APPOINTMENT CONFIRMED
            </span>

            <h3>
                Your Token Number
            </h3>

            <div class="big-token">
                ${patient.token}
            </div>

            <p>
                Please keep this token number safe.
            </p>


            <div class="token-details">

                <div>
                    <span>Patient</span>
                    <strong>${patient.name}</strong>
                </div>

                <div>
                    <span>Department</span>
                    <strong>${patient.department}</strong>
                </div>

                <div>
                    <span>Doctor</span>
                    <strong>${patient.doctor}</strong>
                </div>

                <div>
                    <span>Patient Type</span>
                    <strong>${typeText}</strong>
                </div>

                <div>
                    <span>Estimated Waiting</span>
                    <strong>${patient.waiting} min</strong>
                </div>

                <div>
                    <span>Problem</span>
                    <strong>${patient.problem}</strong>
                </div>

            </div>


            <div class="token-note">

                ⏱️ Please arrive at the hospital
                before your estimated appointment time.

            </div>

        </div>

    `;

}


/* =========================================================
   LOAD SAVED PATIENTS
========================================================= */

function loadPatients() {
    /* Do not restore appointments from localStorage.
       A browser refresh starts a fresh queue and an empty Staff Dashboard. */
    patients = [];
    completedPatients = 0;
    tokenCounter = 101;
}


/* =========================================================
   STAFF DASHBOARD
========================================================= */

function updateDashboard() {

    const total =
        patients.length;


    const waiting =
        patients.filter(
            patient =>
                patient.status === "Waiting"
        ).length;


    const completed =
        patients.filter(
            patient =>
                patient.status === "Completed"
        ).length;


    const totalPatients =
        document.getElementById(
            "totalPatients"
        );


    const waitingPatients =
        document.getElementById(
            "waitingPatients"
        );


    const completedPatientsElement =
        document.getElementById(
            "completedPatients"
        );

    const availableBeds =
    document.getElementById("availableBeds");

    if (totalPatients) {
        totalPatients.textContent = total;
    }


    if (waitingPatients) {
        waitingPatients.textContent = waiting;
    }


    if (completedPatientsElement) {
        completedPatientsElement.textContent =
            completed;
    }

    if (availableBeds) {
       availableBeds.textContent =
             getAvailableEmergencyBeds();
    }


    updateQueueTable();
    updateEmergencyBeds();

}


/* =========================================================
   QUEUE TABLE
========================================================= */

function updateQueueTable() {

    const table =
        document.getElementById(
            "queueTable"
        );


    if (!table) {
        return;
    }


    const queueCount =
        document.getElementById(
            "queueCount"
        );


    if (queueCount) {

        queueCount.textContent =
            `${patients.length} Patients`;

    }


    if (patients.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="9"
                    style="text-align:center;padding:40px;">

                    No patients in the queue.

                </td>

            </tr>

        `;

        return;
    }


    table.innerHTML =
        patients.map(patient => `

            <tr>

                <td>
                    <strong>
                        ${patient.token}
                    </strong>
                </td>

                <td>
                    ${patient.name}
                </td>

                <td>
                    ${patient.mobile}
                </td>

                <td>
                    ${patient.problem || "-"}
                </td>

                <td>
                    ${patient.doctor}
                </td>

                <td>
                    ${patient.type === "special"
                        ? "Priority"
                        : "Regular"}
                </td>

                <td>
                    ${patient.waiting} min
                </td>

                <td>

                    <span class="status-badge">
                        ${patient.status}
                    </span>

                </td>

                <td>

                    ${
                        patient.status === "Waiting"
                        ?

                        `<button
                            type="button"
                            onclick="completePatient(${patient.id})">

                            Complete

                        </button>`

                        :

                        "✓ Done"
                    }

                </td>

            </tr>

        `).join("");

}


/* =========================================================
   COMPLETE PATIENT
========================================================= */

window.completePatient = function(id) {
    const patient = patients.find(p => p.id === id);
    if (!patient) return;

    /* Remember all waiting times before removing this patient. */
    const oldTimes = new Map(
        patients.map(p => [p.id, Number(p.waiting) || 0])
    );

    patient.status = "Completed";
    patient.waiting = 0;
    completedPatients = patients.filter(p => p.status === "Completed").length;

    /* Patients behind the completed patient move forward immediately. */
    recalculateWaitingTimes(false);

    /* Notify the patient whose currently displayed token moved forward. */
    if (currentTokenPatientId != null) {
        const currentPatient = patients.find(p => p.id === currentTokenPatientId);
        if (currentPatient) {
            const oldWaiting = oldTimes.get(currentPatient.id);
            if (oldWaiting !== undefined && oldWaiting !== currentPatient.waiting) {
                showToken(currentPatient);
                showWaitingNotification(currentPatient, oldWaiting, currentPatient.waiting);
            } else if (currentPatient.id === patient.id) {
                showToken(currentPatient);
            }
        }
    }

    updateDashboard();
};


/* =========================================================
   EMERGENCY REGISTRATION
========================================================= */

window.registerEmergency = function() {

    const name =
        document
            .getElementById("emergencyName")
            ?.value
            .trim() || "";


    const age =
        document
            .getElementById("emergencyAge")
            ?.value
            .trim() || "";


    const mobile =
        document
            .getElementById("emergencyMobile")
            ?.value
            .trim() || "";


    const problem =
        document
            .getElementById("emergencyProblem")
            ?.value
            .trim() || "";


    const department =
        document
            .getElementById("emergencyDepartment")
            ?.value ||
        "Emergency Care";


    if (!name) {

        alert(
            "Please enter the emergency patient's name."
        );

        return;
    }


    if (!age) {

        alert(
            "Please enter the patient's age."
        );

        return;
    }


    if (!mobile ||
        mobile.length !== 10) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;
    }


    if (!problem) {

        alert(
            "Please describe the emergency."
        );

        return;
    }

    if (getAvailableEmergencyBeds() <= 0) {
    alert("No more emergency beds available.");
    return;
    }
    const token =
        `E${tokenCounter++}`;


    const emergencyPatient = {

        id: Date.now(),

        token: token,

        name: name,

        age: age,

        gender: "Not Specified",

        mobile: mobile,

        email: "",

        type: "Emergency",

        department: department,

        doctor: "Emergency Team",

        problemCategory: "Emergency",

        problem: problem,

        duration: "Immediate",

        conditions: [],

        otherCondition: "",

        allergies: "",

        medications: "",

        waiting: 0,

        status: "Waiting",

        emergency: true,

        createdAt:
            new Date().toLocaleString()

    };


    patients.push(
        emergencyPatient
    );

    recalculateWaitingTimes(false);


    const result =
        document.getElementById(
            "emergencyResult"
        );


    if (result) {

        result.innerHTML = `

            <div class="emergency-success">

                <div>
                    🚑
                </div>

                <h3>
                    Emergency Patient Registered
                </h3>

                <div class="emergency-token">
                    ${token}
                </div>

                <p>
                    Please immediately inform the
                    emergency department staff.
                </p>

            </div>

        `;

    }


    updateDashboard();


    document
        .getElementById("emergencyName")
        .value = "";

    document
        .getElementById("emergencyAge")
        .value = "";

    document
        .getElementById("emergencyMobile")
        .value = "";

    document
        .getElementById("emergencyProblem")
        .value = "";

};


/* =========================================================
   COMPLETE MULTILINGUAL UI SYSTEM
   Translates static HTML, placeholders, dropdowns and
   dynamically generated doctor/token/dashboard/emergency UI.
========================================================= */

let currentLanguage = localStorage.getItem("smartqueueLanguage") || "en";
let isApplyingTranslations = false;
const originalTextNodes = new WeakMap();
const originalAttributes = new WeakMap();

const uiTranslations = {
    en: {
        "SmartQueue - Smart Hospital Queue Management":"SmartQueue - Smart Hospital Queue Management",
        "AI-Powered Hospital Queue Management":"AI-Powered Hospital Queue Management",
        "Home":"Home","Book Appointment":"Book Appointment","My Token":"My Token","Staff Dashboard":"Staff Dashboard","Emergency":"Emergency",
        "✨ Smart Healthcare • Less Waiting":"✨ Smart Healthcare • Less Waiting","Healthcare that puts you first.":"Healthcare that puts you first.",
        "Book appointments, find the right doctor, and manage your hospital visit with ease.":"Book appointments, find the right doctor, and manage your hospital visit with ease.",
        "Book an Appointment":"Book an Appointment","Avg. Waiting":"Avg. Waiting","Smart Recommendation":"Smart Recommendation",
        "OUR SERVICES":"OUR SERVICES","How can we help you?":"How can we help you?","Choose the service that best fits your needs.":"Choose the service that best fits your needs.",
        "REGULAR CARE":"REGULAR CARE","Normal Patient":"Normal Patient","Book a regular consultation with a doctor of your choice.":"Book a regular consultation with a doctor of your choice.","Book Now":"Book Now",
        "PRIORITY CARE":"PRIORITY CARE","Specially-Abled Patient":"Specially-Abled Patient","Receive priority assistance and suitable doctor recommendations.":"Receive priority assistance and suitable doctor recommendations.","Get Priority":"Get Priority",
        "URGENT CARE":"URGENT CARE","Emergency":"Emergency","Quickly register an emergency patient for immediate attention.":"Quickly register an emergency patient for immediate attention.","Register Now":"Register Now",
        "Secure":"Secure","Your information stays protected":"Your information stays protected","AI Powered":"AI Powered","Smarter doctor recommendations":"Smarter doctor recommendations","Less Waiting":"Less Waiting","Know your estimated waiting time":"Know your estimated waiting time",
        "APPOINTMENT":"APPOINTMENT","Book Your Appointment":"Book Your Appointment","Complete the steps below to book your visit.":"Complete the steps below to book your visit.","Simple & Fast":"Simple & Fast",
        "Patient":"Patient","Department":"Department","Doctor":"Doctor","Details":"Details","Patient Type":"Patient Type","Who are you booking the appointment for?":"Who are you booking the appointment for?",
        "Standard medical consultation":"Standard medical consultation","Priority assistance and support":"Priority assistance and support","Choose the medical department you need.":"Choose the medical department you need.","Select Department":"Select Department","-- Select Department --":"-- Select Department --",
        "General Medicine":"General Medicine","Orthopedics":"Orthopedics","Cardiology":"Cardiology","Neurology":"Neurology","General health & consultation":"General health & consultation","Bones, joints & muscles":"Bones, joints & muscles","Heart & cardiovascular care":"Heart & cardiovascular care","Brain & nervous system":"Brain & nervous system",
        "Choose Your Doctor":"Choose Your Doctor","Compare doctors and waiting times.":"Compare doctors and waiting times.","SmartQueue AI":"SmartQueue AI","SMART PICK":"SMART PICK","Select a department to see doctor recommendations.":"Select a department to see doctor recommendations.","Find Best Doctor":"Find Best Doctor","Select a department first":"Select a department first","Available doctors will appear here.":"Available doctors will appear here.","No doctors available":"No doctors available","Please select another department.":"Please select another department.",
        "Available":"Available","patients waiting":"patients waiting","Estimated wait":"Estimated wait","Select Doctor":"Select Doctor","Years Experience":"Years Experience","Estimated waiting time":"Estimated waiting time",
        "Patient Details":"Patient Details","Provide information to help the doctor prepare for the consultation.":"Provide information to help the doctor prepare for the consultation.","Basic Information":"Basic Information","Name, age, gender & contact":"Name, age, gender & contact",
        "Patient Name":"Patient Name","Enter full name":"Enter full name","Age":"Age","Gender":"Gender","Male":"Male","Female":"Female","Other":"Other","Mobile Number":"Mobile Number","10-digit mobile number":"10-digit mobile number","Email":"Email","Optional":"Optional",
        "Reason for Visit":"Reason for Visit","Symptoms and reason for consultation":"Symptoms and reason for consultation","Select Main Problem":"Select Main Problem","Select the main problem":"Select the main problem","Fever / Infection":"Fever / Infection","Pain / Injury":"Pain / Injury","Breathing Problem":"Breathing Problem","Heart Related":"Heart Related","Bone / Joint":"Bone / Joint","Cold / Cough":"Cold / Cough","Stomach / Digestive":"Stomach / Digestive","Neurological":"Neurological","Eye Problem":"Eye Problem","Dental":"Dental","Describe the Problem":"Describe the Problem","Please briefly describe the patient's symptoms or reason for the visit.":"Please briefly describe the patient's symptoms or reason for the visit.","How long has the patient had this problem?":"How long has the patient had this problem?","Today":"Today","2–3 Days":"2–3 Days","About a Week":"About a Week","More than a Week":"More than a Week",
        "Medical Information":"Medical Information","Conditions, allergies & medications":"Conditions, allergies & medications","Existing Medical Conditions":"Existing Medical Conditions","None":"None","Diabetes":"Diabetes","Hypertension":"Hypertension","Asthma":"Asthma","Heart Disease":"Heart Disease","Other":"Other","Other Medical Condition":"Other Medical Condition","Enter other condition":"Enter other condition","Allergies":"Allergies","No Known Allergies":"No Known Allergies","Medicine Allergy":"Medicine Allergy","Food Allergy":"Food Allergy","Environmental Allergy":"Environmental Allergy","Other Allergy":"Other Allergy","Current Medications":"Current Medications","List medicines currently being taken...":"List medicines currently being taken...",
        "Ready to book?":"Ready to book?","Review your details before confirming.":"Review your details before confirming.","Confirm Appointment":"Confirm Appointment",
        "YOUR APPOINTMENT":"YOUR APPOINTMENT","Appointment Token":"Appointment Token","Your appointment details will appear here.":"Your appointment details will appear here.","No appointment booked yet":"No appointment booked yet","Book an appointment to receive your token.":"Book an appointment to receive your token.","APPOINTMENT CONFIRMED":"APPOINTMENT CONFIRMED","Your Token Number":"Your Token Number","Please keep this token number safe.":"Please keep this token number safe.","Estimated Waiting":"Estimated Waiting","Problem":"Problem","Priority Patient":"Priority Patient","Regular Patient":"Regular Patient","Please arrive at the hospital before your estimated appointment time.":"Please arrive at the hospital before your estimated appointment time.",
        "STAFF DASHBOARD":"STAFF DASHBOARD","Queue Overview":"Queue Overview","Monitor patients, doctors and hospital capacity.":"Monitor patients, doctors and hospital capacity.","Live":"Live","Total Patients":"Total Patients","Waiting":"Waiting","Completed":"Completed","Available Beds":"Available Beds","Patient Queue":"Patient Queue","Current appointments and their status.":"Current appointments and their status.","Patients":"Patients","Token":"Token","Contact":"Contact","Type":"Type","Status":"Status","Action":"Action","Complete":"Complete","Done":"Done","No patients in the queue.":"No patients in the queue.","Emergency Bed Status":"Emergency Bed Status","Current emergency department capacity.":"Current emergency department capacity.","Total Beds":"Total Beds","Occupied":"Occupied","Available":"Available",
        "EMERGENCY":"EMERGENCY","Emergency Registration":"Emergency Registration","Register an emergency patient immediately.":"Register an emergency patient immediately.","Emergency patients receive priority.":"Emergency patients receive priority.","Please provide accurate information so hospital staff can respond quickly.":"Please provide accurate information so hospital staff can respond quickly.","Emergency Problem":"Emergency Problem","Describe the emergency...":"Describe the emergency...","Emergency Care":"Emergency Care","Register Emergency Patient":"Register Emergency Patient","Emergency Patient Registered":"Emergency Patient Registered","Please immediately inform the emergency department staff.":"Please immediately inform the emergency department staff.",
        "Please select a department first.":"Please select a department first.","No doctors available for this department.":"No doctors available for this department.","Please select a department.":"Please select a department.","Please select a doctor.":"Please select a doctor.","Please enter the patient's name.":"Please enter the patient's name.","Please enter the patient's age.":"Please enter the patient's age.","Please enter a valid 10-digit mobile number.":"Please enter a valid 10-digit mobile number.","Please describe the patient's problem.":"Please describe the patient's problem.","Please describe the emergency.":"Please describe the emergency."
    }
};

/* Hindi, Odia and the other selectable languages. */
const commonTranslations = {
hi:{"AI-Powered Hospital Queue Management":"एआई-संचालित अस्पताल कतार प्रबंधन","Home":"होम","Book Appointment":"अपॉइंटमेंट बुक करें","My Token":"मेरा टोकन","Staff Dashboard":"स्टाफ डैशबोर्ड","Emergency":"आपातकाल","Healthcare that puts you first.":"स्वास्थ्य सेवा जो आपको प्राथमिकता देती है।","Book an Appointment":"अपॉइंटमेंट बुक करें","Avg. Waiting":"औसत प्रतीक्षा","Smart Recommendation":"स्मार्ट सिफारिश","OUR SERVICES":"हमारी सेवाएं","How can we help you?":"हम आपकी कैसे मदद कर सकते हैं?","Choose the service that best fits your needs.":"अपनी जरूरत के अनुसार सेवा चुनें।","Normal Patient":"सामान्य मरीज","Specially-Abled Patient":"दिव्यांग मरीज","Emergency":"आपातकाल","Book Now":"अभी बुक करें","Get Priority":"प्राथमिकता प्राप्त करें","Register Now":"अभी पंजीकरण करें","Secure":"सुरक्षित","Your information stays protected":"आपकी जानकारी सुरक्षित रहती है","AI Powered":"एआई संचालित","Smarter doctor recommendations":"बेहतर डॉक्टर सिफारिशें","Less Waiting":"कम प्रतीक्षा","Know your estimated waiting time":"अपना अनुमानित प्रतीक्षा समय जानें","APPOINTMENT":"अपॉइंटमेंट","Book Your Appointment":"अपना अपॉइंटमेंट बुक करें","Complete the steps below to book your visit.":"अपनी यात्रा बुक करने के लिए नीचे दिए चरण पूरे करें।","Simple & Fast":"सरल और तेज","Patient":"मरीज","Department":"विभाग","Doctor":"डॉक्टर","Details":"विवरण","Patient Type":"मरीज का प्रकार","Who are you booking the appointment for?":"आप किसके लिए अपॉइंटमेंट बुक कर रहे हैं?","Standard medical consultation":"सामान्य चिकित्सा परामर्श","Priority assistance and support":"प्राथमिकता सहायता और सहयोग","Choose the medical department you need.":"अपनी आवश्यक चिकित्सा शाखा चुनें।","Select Department":"विभाग चुनें","-- Select Department --":"-- विभाग चुनें --","General Medicine":"सामान्य चिकित्सा","Orthopedics":"हड्डी रोग","Cardiology":"हृदय रोग","Neurology":"न्यूरोलॉजी","General health & consultation":"सामान्य स्वास्थ्य और परामर्श","Bones, joints & muscles":"हड्डियां, जोड़ और मांसपेशियां","Heart & cardiovascular care":"हृदय और हृदय-वाहिका देखभाल","Brain & nervous system":"मस्तिष्क और तंत्रिका तंत्र","Choose Your Doctor":"अपना डॉक्टर चुनें","Compare doctors and waiting times.":"डॉक्टरों और प्रतीक्षा समय की तुलना करें।","SMART PICK":"स्मार्ट चयन","Select a department to see doctor recommendations.":"डॉक्टर की सिफारिश देखने के लिए विभाग चुनें।","Find Best Doctor":"सर्वश्रेष्ठ डॉक्टर खोजें","Select a department first":"पहले विभाग चुनें","Available doctors will appear here.":"उपलब्ध डॉक्टर यहां दिखाई देंगे।","No doctors available":"कोई डॉक्टर उपलब्ध नहीं है","Please select another department.":"कृपया कोई दूसरा विभाग चुनें।","Available":"उपलब्ध","patients waiting":"मरीज प्रतीक्षा में","Estimated wait":"अनुमानित प्रतीक्षा","Select Doctor":"डॉक्टर चुनें","Years Experience":"वर्षों का अनुभव","Patient Details":"मरीज का विवरण","Provide information to help the doctor prepare for the consultation.":"डॉक्टर को परामर्श के लिए तैयार करने में मदद करने हेतु जानकारी दें।","Basic Information":"मूल जानकारी","Name, age, gender & contact":"नाम, आयु, लिंग और संपर्क","Patient Name":"मरीज का नाम","Enter full name":"पूरा नाम दर्ज करें","Age":"आयु","Gender":"लिंग","Male":"पुरुष","Female":"महिला","Other":"अन्य","Mobile Number":"मोबाइल नंबर","10-digit mobile number":"10 अंकों का मोबाइल नंबर","Email":"ईमेल","Optional":"वैकल्पिक","Reason for Visit":"मुलाकात का कारण","Symptoms and reason for consultation":"लक्षण और परामर्श का कारण","Select Main Problem":"मुख्य समस्या चुनें","Select the main problem":"मुख्य समस्या चुनें","Fever / Infection":"बुखार / संक्रमण","Pain / Injury":"दर्द / चोट","Breathing Problem":"सांस की समस्या","Heart Related":"हृदय संबंधी","Bone / Joint":"हड्डी / जोड़","Cold / Cough":"जुकाम / खांसी","Stomach / Digestive":"पेट / पाचन","Neurological":"तंत्रिका संबंधी","Eye Problem":"आंख की समस्या","Dental":"दांतों की समस्या","Describe the Problem":"समस्या का विवरण दें","Please briefly describe the patient's symptoms or reason for the visit.":"कृपया मरीज के लक्षण या मुलाकात का कारण संक्षेप में बताएं।","How long has the patient had this problem?":"मरीज को यह समस्या कब से है?","Today":"आज","2–3 Days":"2–3 दिन","About a Week":"लगभग एक सप्ताह","More than a Week":"एक सप्ताह से अधिक","Medical Information":"चिकित्सीय जानकारी","Conditions, allergies & medications":"बीमारियां, एलर्जी और दवाएं","Existing Medical Conditions":"मौजूदा चिकित्सीय स्थितियां","None":"कोई नहीं","Diabetes":"मधुमेह","Hypertension":"उच्च रक्तचाप","Asthma":"अस्थमा","Heart Disease":"हृदय रोग","Other":"अन्य","Other Medical Condition":"अन्य चिकित्सीय स्थिति","Enter other condition":"अन्य स्थिति दर्ज करें","Allergies":"एलर्जी","No Known Allergies":"कोई ज्ञात एलर्जी नहीं","Medicine Allergy":"दवा से एलर्जी","Food Allergy":"भोजन से एलर्जी","Environmental Allergy":"पर्यावरणीय एलर्जी","Other Allergy":"अन्य एलर्जी","Current Medications":"वर्तमान दवाएं","List medicines currently being taken...":"वर्तमान में ली जा रही दवाओं की सूची दें...","Ready to book?":"बुक करने के लिए तैयार?","Review your details before confirming.":"पुष्टि से पहले अपना विवरण जांचें।","Confirm Appointment":"अपॉइंटमेंट की पुष्टि करें","YOUR APPOINTMENT":"आपका अपॉइंटमेंट","Appointment Token":"अपॉइंटमेंट टोकन","Your appointment details will appear here.":"आपके अपॉइंटमेंट का विवरण यहां दिखाई देगा।","No appointment booked yet":"अभी कोई अपॉइंटमेंट बुक नहीं है","Book an appointment to receive your token.":"टोकन पाने के लिए अपॉइंटमेंट बुक करें।","APPOINTMENT CONFIRMED":"अपॉइंटमेंट की पुष्टि हो गई","Your Token Number":"आपका टोकन नंबर","Please keep this token number safe.":"कृपया इस टोकन नंबर को सुरक्षित रखें।","Estimated Waiting":"अनुमानित प्रतीक्षा","Problem":"समस्या","Priority Patient":"प्राथमिकता मरीज","Regular Patient":"सामान्य मरीज","Please arrive at the hospital before your estimated appointment time.":"अपने अनुमानित अपॉइंटमेंट समय से पहले अस्पताल पहुंचें।","Queue Overview":"कतार अवलोकन","Monitor patients, doctors and hospital capacity.":"मरीजों, डॉक्टरों और अस्पताल की क्षमता पर नजर रखें।","Live":"लाइव","Total Patients":"कुल मरीज","Waiting":"प्रतीक्षा","Completed":"पूर्ण","Available Beds":"उपलब्ध बेड","Patient Queue":"मरीजों की कतार","Current appointments and their status.":"वर्तमान अपॉइंटमेंट और उनकी स्थिति।","Patients":"मरीज","Token":"टोकन","Contact":"संपर्क","Type":"प्रकार","Status":"स्थिति","Action":"कार्रवाई","Complete":"पूर्ण करें","Done":"हो गया","No patients in the queue.":"कतार में कोई मरीज नहीं है।","Emergency Bed Status":"आपातकालीन बेड स्थिति","Current emergency department capacity.":"आपातकालीन विभाग की वर्तमान क्षमता।","Total Beds":"कुल बेड","Occupied":"भरे हुए","Available":"उपलब्ध","Emergency Registration":"आपातकालीन पंजीकरण","Register an emergency patient immediately.":"आपातकालीन मरीज का तुरंत पंजीकरण करें।","Emergency patients receive priority.":"आपातकालीन मरीजों को प्राथमिकता मिलती है।","Please provide accurate information so hospital staff can respond quickly.":"कृपया सही जानकारी दें ताकि अस्पताल कर्मचारी जल्दी प्रतिक्रिया दे सकें।","Emergency Problem":"आपातकालीन समस्या","Describe the emergency...":"आपातकाल का विवरण दें...","Emergency Care":"आपातकालीन देखभाल","Register Emergency Patient":"आपातकालीन मरीज का पंजीकरण करें","Emergency Patient Registered":"आपातकालीन मरीज पंजीकृत है","Please immediately inform the emergency department staff.":"कृपया तुरंत आपातकालीन विभाग के कर्मचारियों को सूचित करें।","Please select a department first.":"कृपया पहले विभाग चुनें।","No doctors available for this department.":"इस विभाग के लिए कोई डॉक्टर उपलब्ध नहीं है।","Please select a department.":"कृपया विभाग चुनें।","Please select a doctor.":"कृपया डॉक्टर चुनें।","Please enter the patient's name.":"कृपया मरीज का नाम दर्ज करें।","Please enter the patient's age.":"कृपया मरीज की आयु दर्ज करें।","Please enter a valid 10-digit mobile number.":"कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।","Please describe the patient's problem.":"कृपया मरीज की समस्या का विवरण दें।","Please describe the emergency.":"कृपया आपातकाल का विवरण दें।"},
od:{"AI-Powered Hospital Queue Management":"ଏଆଇ ଚାଳିତ ହସ୍ପିଟାଲ୍ ଧାଡ଼ି ପରିଚାଳନା","Home":"ମୁଖ୍ୟ ପୃଷ୍ଠା","Book Appointment":"ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ","My Token":"ମୋ ଟୋକନ","Staff Dashboard":"ଷ୍ଟାଫ୍ ଡ୍ୟାସବୋର୍ଡ","Emergency":"ଜରୁରୀକାଳୀନ","Healthcare that puts you first.":"ଆପଣଙ୍କୁ ପ୍ରାଥମିକତା ଦେଉଥିବା ସ୍ୱାସ୍ଥ୍ୟସେବା।","Book an Appointment":"ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ","Avg. Waiting":"ହାରାହାରି ଅପେକ୍ଷା","Smart Recommendation":"ସ୍ମାର୍ଟ ସୁପାରିଶ","OUR SERVICES":"ଆମ ସେବା","How can we help you?":"ଆମେ କିପରି ସାହାଯ୍ୟ କରିପାରିବୁ?","Choose the service that best fits your needs.":"ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁସାରେ ସେବା ବାଛନ୍ତୁ।","Normal Patient":"ସାଧାରଣ ରୋଗୀ","Specially-Abled Patient":"ବିଶେଷ ସହାୟତା ଆବଶ୍ୟକ ରୋଗୀ","Book Now":"ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ","Get Priority":"ପ୍ରାଥମିକତା ପାଆନ୍ତୁ","Register Now":"ବର୍ତ୍ତମାନ ପଞ୍ଜୀକରଣ କରନ୍ତୁ","Secure":"ସୁରକ୍ଷିତ","Your information stays protected":"ଆପଣଙ୍କ ସୂଚନା ସୁରକ୍ଷିତ ରହେ","AI Powered":"ଏଆଇ ଚାଳିତ","Smarter doctor recommendations":"ଉନ୍ନତ ଡାକ୍ତର ସୁପାରିଶ","Less Waiting":"କମ୍ ଅପେକ୍ଷା","Know your estimated waiting time":"ଆପଣଙ୍କ ଅନୁମାନିତ ଅପେକ୍ଷା ସମୟ ଜାଣନ୍ତୁ","APPOINTMENT":"ଆପଏଣ୍ଟମେଣ୍ଟ","Book Your Appointment":"ଆପଣଙ୍କ ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ","Complete the steps below to book your visit.":"ଆପଣଙ୍କ ଯାତ୍ରା ବୁକ୍ କରିବାକୁ ତଳର ପଦକ୍ଷେପଗୁଡ଼ିକ ପୂରଣ କରନ୍ତୁ।","Simple & Fast":"ସରଳ ଏବଂ ଦ୍ରୁତ","Patient":"ରୋଗୀ","Department":"ବିଭାଗ","Doctor":"ଡାକ୍ତର","Details":"ବିବରଣୀ","Patient Type":"ରୋଗୀ ପ୍ରକାର","Who are you booking the appointment for?":"ଆପଣ କାହା ପାଇଁ ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରୁଛନ୍ତି?","Standard medical consultation":"ସାଧାରଣ ଚିକିତ୍ସା ପରାମର୍ଶ","Priority assistance and support":"ପ୍ରାଥମିକତା ସହାୟତା ଏବଂ ସମର୍ଥନ","Choose the medical department you need.":"ଆବଶ୍ୟକ ଚିକିତ୍ସା ବିଭାଗ ବାଛନ୍ତୁ।","Select Department":"ବିଭାଗ ବାଛନ୍ତୁ","-- Select Department --":"-- ବିଭାଗ ବାଛନ୍ତୁ --","General Medicine":"ସାଧାରଣ ଚିକିତ୍ସା","Orthopedics":"ଅସ୍ଥି ରୋଗ","Cardiology":"ହୃଦ୍ରୋଗ","Neurology":"ସ୍ନାୟୁ ବିଜ୍ଞାନ","General health & consultation":"ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ ପରାମର୍ଶ","Bones, joints & muscles":"ହାଡ଼, ଯୋଡ଼ ଏବଂ ମାଂସପେଶୀ","Heart & cardiovascular care":"ହୃଦୟ ଏବଂ ହୃଦ୍-ରକ୍ତନାଳୀ ଯତ୍ନ","Brain & nervous system":"ମସ୍ତିଷ୍କ ଏବଂ ସ୍ନାୟୁତନ୍ତ୍ର","Choose Your Doctor":"ଆପଣଙ୍କ ଡାକ୍ତର ବାଛନ୍ତୁ","Compare doctors and waiting times.":"ଡାକ୍ତର ଏବଂ ଅପେକ୍ଷା ସମୟ ତୁଳନା କରନ୍ତୁ।","SMART PICK":"ସ୍ମାର୍ଟ ଚୟନ","Select a department to see doctor recommendations.":"ଡାକ୍ତର ସୁପାରିଶ ଦେଖିବାକୁ ବିଭାଗ ବାଛନ୍ତୁ।","Find Best Doctor":"ଶ୍ରେଷ୍ଠ ଡାକ୍ତର ଖୋଜନ୍ତୁ","Select a department first":"ପ୍ରଥମେ ବିଭାଗ ବାଛନ୍ତୁ","Available doctors will appear here.":"ଉପଲବ୍ଧ ଡାକ୍ତର ଏଠାରେ ଦେଖାଯିବେ।","No doctors available":"କୌଣସି ଡାକ୍ତର ଉପଲବ୍ଧ ନାହାନ୍ତି","Please select another department.":"ଦୟାକରି ଅନ୍ୟ ବିଭାଗ ବାଛନ୍ତୁ।","Available":"ଉପଲବ୍ଧ","patients waiting":"ରୋଗୀ ଅପେକ୍ଷାରେ","Estimated wait":"ଅନୁମାନିତ ଅପେକ୍ଷା","Select Doctor":"ଡାକ୍ତର ବାଛନ୍ତୁ","Years Experience":"ବର୍ଷର ଅଭିଜ୍ଞତା","Patient Details":"ରୋଗୀ ବିବରଣୀ","Provide information to help the doctor prepare for the consultation.":"ଡାକ୍ତରଙ୍କୁ ପରାମର୍ଶ ପାଇଁ ପ୍ରସ୍ତୁତ ହେବାରେ ସାହାଯ୍ୟ ପାଇଁ ସୂଚନା ଦିଅନ୍ତୁ।","Basic Information":"ମୌଳିକ ସୂଚନା","Name, age, gender & contact":"ନାମ, ବୟସ, ଲିଙ୍ଗ ଏବଂ ଯୋଗାଯୋଗ","Patient Name":"ରୋଗୀଙ୍କ ନାମ","Enter full name":"ପୂର୍ଣ୍ଣ ନାମ ଲେଖନ୍ତୁ","Age":"ବୟସ","Gender":"ଲିଙ୍ଗ","Male":"ପୁରୁଷ","Female":"ମହିଳା","Other":"ଅନ୍ୟ","Mobile Number":"ମୋବାଇଲ୍ ନମ୍ବର","10-digit mobile number":"୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର","Email":"ଇମେଲ୍","Optional":"ଇଚ୍ଛାଧୀନ","Reason for Visit":"ଭେଟିବାର କାରଣ","Symptoms and reason for consultation":"ଲକ୍ଷଣ ଏବଂ ପରାମର୍ଶର କାରଣ","Select Main Problem":"ମୁଖ୍ୟ ସମସ୍ୟା ବାଛନ୍ତୁ","Select the main problem":"ମୁଖ୍ୟ ସମସ୍ୟା ବାଛନ୍ତୁ","Fever / Infection":"ଜ୍ୱର / ସଂକ୍ରମଣ","Pain / Injury":"ବେଦନା / ଆଘାତ","Breathing Problem":"ଶ୍ୱାସ ସମସ୍ୟା","Heart Related":"ହୃଦୟ ସମ୍ବନ୍ଧୀୟ","Bone / Joint":"ହାଡ଼ / ଯୋଡ଼","Cold / Cough":"ସର୍ଦ୍ଦି / କାଶ","Stomach / Digestive":"ପେଟ / ହଜମ","Neurological":"ସ୍ନାୟୁ ସମ୍ବନ୍ଧୀୟ","Eye Problem":"ଆଖି ସମସ୍ୟା","Dental":"ଦାନ୍ତ ସମସ୍ୟା","Describe the Problem":"ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ","Please briefly describe the patient's symptoms or reason for the visit.":"ଦୟାକରି ରୋଗୀଙ୍କ ଲକ୍ଷଣ କିମ୍ବା ଭେଟିବାର କାରଣ ସଂକ୍ଷେପରେ ଲେଖନ୍ତୁ।","How long has the patient had this problem?":"ରୋଗୀଙ୍କର ଏହି ସମସ୍ୟା କେତେ ଦିନ ହେଲା?","Today":"ଆଜି","2–3 Days":"୨–୩ ଦିନ","About a Week":"ପ୍ରାୟ ଏକ ସପ୍ତାହ","More than a Week":"ଏକ ସପ୍ତାହରୁ ଅଧିକ","Medical Information":"ଚିକିତ୍ସା ସୂଚନା","Conditions, allergies & medications":"ରୋଗ, ଆଲର୍ଜି ଏବଂ ଔଷଧ","Existing Medical Conditions":"ବର୍ତ୍ତମାନର ଚିକିତ୍ସା ଅବସ୍ଥା","None":"କିଛି ନାହିଁ","Diabetes":"ମଧୁମେହ","Hypertension":"ଉଚ୍ଚ ରକ୍ତଚାପ","Asthma":"ଆସ୍ଥମା","Heart Disease":"ହୃଦ୍ରୋଗ","Other":"ଅନ୍ୟ","Other Medical Condition":"ଅନ୍ୟ ଚିକିତ୍ସା ଅବସ୍ଥା","Enter other condition":"ଅନ୍ୟ ଅବସ୍ଥା ଲେଖନ୍ତୁ","Allergies":"ଆଲର୍ଜି","No Known Allergies":"ଜଣାଶୁଣା ଆଲର୍ଜି ନାହିଁ","Medicine Allergy":"ଔଷଧ ଆଲର୍ଜି","Food Allergy":"ଖାଦ୍ୟ ଆଲର୍ଜି","Environmental Allergy":"ପରିବେଶ ଆଲର୍ଜି","Other Allergy":"ଅନ୍ୟ ଆଲର୍ଜି","Current Medications":"ବର୍ତ୍ତମାନର ଔଷଧ","List medicines currently being taken...":"ବର୍ତ୍ତମାନ ନେଉଥିବା ଔଷଧଗୁଡ଼ିକ ଲେଖନ୍ତୁ...","Ready to book?":"ବୁକ୍ କରିବାକୁ ପ୍ରସ୍ତୁତ?","Review your details before confirming.":"ନିଶ୍ଚିତ କରିବା ପୂର୍ବରୁ ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ।","Confirm Appointment":"ଆପଏଣ୍ଟମେଣ୍ଟ ନିଶ୍ଚିତ କରନ୍ତୁ","YOUR APPOINTMENT":"ଆପଣଙ୍କ ଆପଏଣ୍ଟମେଣ୍ଟ","Appointment Token":"ଆପଏଣ୍ଟମେଣ୍ଟ ଟୋକନ","Your appointment details will appear here.":"ଆପଣଙ୍କ ଆପଏଣ୍ଟମେଣ୍ଟ ବିବରଣୀ ଏଠାରେ ଦେଖାଯିବ","No appointment booked yet":"ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ ହୋଇନାହିଁ","Book an appointment to receive your token.":"ଟୋକନ ପାଇବାକୁ ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ।","APPOINTMENT CONFIRMED":"ଆପଏଣ୍ଟମେଣ୍ଟ ନିଶ୍ଚିତ ହୋଇଛି","Your Token Number":"ଆପଣଙ୍କ ଟୋକନ ନମ୍ବର","Please keep this token number safe.":"ଦୟାକରି ଏହି ଟୋକନ ନମ୍ବରକୁ ସୁରକ୍ଷିତ ରଖନ୍ତୁ।","Estimated Waiting":"ଅନୁମାନିତ ଅପେକ୍ଷା","Problem":"ସମସ୍ୟା","Priority Patient":"ପ୍ରାଥମିକତା ରୋଗୀ","Regular Patient":"ସାଧାରଣ ରୋଗୀ","Please arrive at the hospital before your estimated appointment time.":"ଆପଣଙ୍କ ଅନୁମାନିତ ଆପଏଣ୍ଟମେଣ୍ଟ ସମୟ ପୂର୍ବରୁ ହସ୍ପିଟାଲକୁ ଆସନ୍ତୁ।","Queue Overview":"ଧାଡ଼ି ସମୀକ୍ଷା","Monitor patients, doctors and hospital capacity.":"ରୋଗୀ, ଡାକ୍ତର ଏବଂ ହସ୍ପିଟାଲ୍ କ୍ଷମତା ଉପରେ ନଜର ରଖନ୍ତୁ।","Live":"ଲାଇଭ୍","Total Patients":"ମୋଟ ରୋଗୀ","Waiting":"ଅପେକ୍ଷାରେ","Completed":"ସମ୍ପୂର୍ଣ୍ଣ","Available Beds":"ଉପଲବ୍ଧ ବେଡ୍","Patient Queue":"ରୋଗୀ ଧାଡ଼ି","Current appointments and their status.":"ବର୍ତ୍ତମାନର ଆପଏଣ୍ଟମେଣ୍ଟ ଏବଂ ସେମାନଙ୍କ ସ୍ଥିତି।","Patients":"ରୋଗୀ","Token":"ଟୋକନ","Contact":"ଯୋଗାଯୋଗ","Type":"ପ୍ରକାର","Status":"ସ୍ଥିତି","Action":"କାର୍ଯ୍ୟ","Complete":"ସମ୍ପୂର୍ଣ୍ଣ କରନ୍ତୁ","Done":"ସରିଲା","No patients in the queue.":"ଧାଡ଼ିରେ କୌଣସି ରୋଗୀ ନାହାନ୍ତି।","Emergency Bed Status":"ଜରୁରୀକାଳୀନ ବେଡ୍ ସ୍ଥିତି","Current emergency department capacity.":"ଜରୁରୀକାଳୀନ ବିଭାଗର ବର୍ତ୍ତମାନ କ୍ଷମତା।","Total Beds":"ମୋଟ ବେଡ୍","Occupied":"ବ୍ୟବହୃତ","Available":"ଉପଲବ୍ଧ","Emergency Registration":"ଜରୁରୀକାଳୀନ ପଞ୍ଜୀକରଣ","Register an emergency patient immediately.":"ଜରୁରୀକାଳୀନ ରୋଗୀଙ୍କୁ ତୁରନ୍ତ ପଞ୍ଜୀକରଣ କରନ୍ତୁ।","Emergency patients receive priority.":"ଜରୁରୀକାଳୀନ ରୋଗୀଙ୍କୁ ପ୍ରାଥମିକତା ମିଳେ।","Please provide accurate information so hospital staff can respond quickly.":"ହସ୍ପିଟାଲ୍ କର୍ମଚାରୀ ଶୀଘ୍ର ପ୍ରତିକ୍ରିୟା କରିପାରିବା ପାଇଁ ସଠିକ୍ ସୂଚନା ଦିଅନ୍ତୁ।","Emergency Problem":"ଜରୁରୀକାଳୀନ ସମସ୍ୟା","Describe the emergency...":"ଜରୁରୀକାଳୀନ ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ...","Emergency Care":"ଜରୁରୀକାଳୀନ ଯତ୍ନ","Register Emergency Patient":"ଜରୁରୀକାଳୀନ ରୋଗୀ ପଞ୍ଜୀକରଣ କରନ୍ତୁ","Emergency Patient Registered":"ଜରୁରୀକାଳୀନ ରୋଗୀ ପଞ୍ଜୀକୃତ ହୋଇଛନ୍ତି","Please immediately inform the emergency department staff.":"ଦୟାକରି ତୁରନ୍ତ ଜରୁରୀକାଳୀନ ବିଭାଗ କର୍ମଚାରୀଙ୍କୁ ଜଣାନ୍ତୁ।","Please select a department first.":"ଦୟାକରି ପ୍ରଥମେ ବିଭାଗ ବାଛନ୍ତୁ।","No doctors available for this department.":"ଏହି ବିଭାଗ ପାଇଁ କୌଣସି ଡାକ୍ତର ଉପଲବ୍ଧ ନାହାନ୍ତି।","Please select a department.":"ଦୟାକରି ବିଭାଗ ବାଛନ୍ତୁ।","Please select a doctor.":"ଦୟାକରି ଡାକ୍ତର ବାଛନ୍ତୁ।","Please enter the patient's name.":"ଦୟାକରି ରୋଗୀଙ୍କ ନାମ ଲେଖନ୍ତୁ।","Please enter the patient's age.":"ଦୟାକରି ରୋଗୀଙ୍କ ବୟସ ଲେଖନ୍ତୁ।","Please enter a valid 10-digit mobile number.":"ଦୟାକରି ଏକ ବୈଧ ୧୦ ଅଙ୍କର ମୋବାଇଲ୍ ନମ୍ବର ଲେଖନ୍ତୁ।","Please describe the patient's problem.":"ଦୟାକରି ରୋଗୀଙ୍କ ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ।","Please describe the emergency.":"ଦୟାକରି ଜରୁରୀକାଳୀନ ସମସ୍ୟା ବର୍ଣ୍ଣନା କରନ୍ତୁ।"}
};

/* For the remaining languages, the UI is fully routed through the same
   translation engine. These maps contain the labels most likely to appear
   on every screen; unknown text safely falls back to English rather than
   breaking the interface. */
commonTranslations.mr={"Home":"मुख्यपृष्ठ","Book Appointment":"अपॉइंटमेंट बुक करा","My Token":"माझे टोकन","Staff Dashboard":"स्टाफ डॅशबोर्ड","Emergency":"आपत्कालीन","Book an Appointment":"अपॉइंटमेंट बुक करा","Normal Patient":"सामान्य रुग्ण","Specially-Abled Patient":"विशेष सहाय्य आवश्यक रुग्ण","Book Now":"आता बुक करा","Get Priority":"प्राधान्य मिळवा","Register Now":"आता नोंदणी करा","OUR SERVICES":"आमच्या सेवा","How can we help you?":"आम्ही आपली कशी मदत करू शकतो?","Choose the service that best fits your needs.":"आपल्या गरजेनुसार सेवा निवडा.","Secure":"सुरक्षित","AI Powered":"एआय संचालित","Less Waiting":"कमी प्रतीक्षा","APPOINTMENT":"अपॉइंटमेंट","Book Your Appointment":"आपली अपॉइंटमेंट बुक करा","Simple & Fast":"सोपे आणि जलद","Patient":"रुग्ण","Department":"विभाग","Doctor":"डॉक्टर","Details":"तपशील","Patient Type":"रुग्णाचा प्रकार","Who are you booking the appointment for?":"आपण कोणासाठी अपॉइंटमेंट बुक करत आहात?","Standard medical consultation":"सामान्य वैद्यकीय सल्ला","Priority assistance and support":"प्राधान्य सहाय्य आणि समर्थन","Select Department":"विभाग निवडा","General Medicine":"सामान्य औषधोपचार","Orthopedics":"अस्थिरोग","Cardiology":"हृदयरोग","Neurology":"न्यूरोलॉजी","Choose Your Doctor":"आपला डॉक्टर निवडा","Compare doctors and waiting times.":"डॉक्टर आणि प्रतीक्षा वेळेची तुलना करा.","SMART PICK":"स्मार्ट निवड","Find Best Doctor":"सर्वोत्तम डॉक्टर शोधा","Select a department first":"प्रथम विभाग निवडा","Available doctors will appear here.":"उपलब्ध डॉक्टर येथे दिसतील.","No doctors available":"डॉक्टर उपलब्ध नाहीत","Please select another department.":"कृपया दुसरा विभाग निवडा.","Available":"उपलब्ध","patients waiting":"रुग्ण प्रतीक्षेत","Estimated wait":"अंदाजे प्रतीक्षा","Select Doctor":"डॉक्टर निवडा","Patient Details":"रुग्ण तपशील","Basic Information":"मूलभूत माहिती","Patient Name":"रुग्णाचे नाव","Enter full name":"पूर्ण नाव प्रविष्ट करा","Age":"वय","Gender":"लिंग","Male":"पुरुष","Female":"स्त्री","Other":"इतर","Mobile Number":"मोबाइल क्रमांक","Email":"ईमेल","Optional":"पर्यायी","Reason for Visit":"भेटीचे कारण","Select Main Problem":"मुख्य समस्या निवडा","Describe the Problem":"समस्येचे वर्णन करा","Today":"आज","Medical Information":"वैद्यकीय माहिती","Existing Medical Conditions":"विद्यमान वैद्यकीय स्थिती","None":"काहीही नाही","Diabetes":"मधुमेह","Hypertension":"उच्च रक्तदाब","Asthma":"दमा","Heart Disease":"हृदयरोग","Allergies":"अॅलर्जी","No Known Allergies":"ज्ञात अॅलर्जी नाही","Current Medications":"सध्याची औषधे","Ready to book?":"बुक करण्यासाठी तयार?","Review your details before confirming.":"पुष्टी करण्यापूर्वी तपशील तपासा.","Confirm Appointment":"अपॉइंटमेंट निश्चित करा","YOUR APPOINTMENT":"आपली अपॉइंटमेंट","Appointment Token":"अपॉइंटमेंट टोकन","No appointment booked yet":"अजून अपॉइंटमेंट बुक केलेली नाही","Book an appointment to receive your token.":"टोकन मिळवण्यासाठी अपॉइंटमेंट बुक करा.","APPOINTMENT CONFIRMED":"अपॉइंटमेंट निश्चित झाली","Your Token Number":"आपला टोकन क्रमांक","Estimated Waiting":"अंदाजे प्रतीक्षा","Queue Overview":"रांग आढावा","Total Patients":"एकूण रुग्ण","Waiting":"प्रतीक्षेत","Completed":"पूर्ण","Available Beds":"उपलब्ध बेड","Patient Queue":"रुग्णांची रांग","Token":"टोकन","Contact":"संपर्क","Problem":"समस्या","Type":"प्रकार","Status":"स्थिती","Action":"कृती","Complete":"पूर्ण करा","Done":"पूर्ण","Emergency Bed Status":"आपत्कालीन बेड स्थिती","Total Beds":"एकूण बेड","Occupied":"व्याप्त","Available":"उपलब्ध","Emergency Registration":"आपत्कालीन नोंदणी","Register an emergency patient immediately.":"आपत्कालीन रुग्णाची त्वरित नोंदणी करा.","Emergency patients receive priority.":"आपत्कालीन रुग्णांना प्राधान्य मिळते.","Patient Name":"रुग्णाचे नाव","Emergency Problem":"आपत्कालीन समस्या","Department":"विभाग","Emergency Care":"आपत्कालीन सेवा","Register Emergency Patient":"आपत्कालीन रुग्णाची नोंदणी करा"};
commonTranslations.ta={"Home":"முகப்பு","Book Appointment":"அப்பாயிண்ட்மென்ட் பதிவு","My Token":"என் டோக்கன்","Staff Dashboard":"பணியாளர் டாஷ்போர்டு","Emergency":"அவசரநிலை","Book an Appointment":"அப்பாயிண்ட்மென்ட் பதிவு செய்யவும்","Normal Patient":"சாதாரண நோயாளர்","Specially-Abled Patient":"சிறப்பு உதவி தேவைப்படும் நோயாளர்","Book Now":"இப்போது பதிவு செய்யவும்","Get Priority":"முன்னுரிமை பெறவும்","Register Now":"இப்போது பதிவு செய்யவும்","OUR SERVICES":"எங்கள் சேவைகள்","How can we help you?":"நாங்கள் எவ்வாறு உதவலாம்?","Choose the service that best fits your needs.":"உங்கள் தேவைக்கு ஏற்ற சேவையைத் தேர்ந்தெடுக்கவும்.","Secure":"பாதுகாப்பானது","AI Powered":"AI இயக்கம்","Less Waiting":"குறைந்த காத்திருப்பு","APPOINTMENT":"அப்பாயிண்ட்மென்ட்","Book Your Appointment":"உங்கள் அப்பாயிண்ட்மென்ட்டை பதிவு செய்யவும்","Simple & Fast":"எளிமை மற்றும் வேகம்","Patient":"நோயாளர்","Department":"துறை","Doctor":"மருத்துவர்","Details":"விவரங்கள்","Patient Type":"நோயாளர் வகை","Who are you booking the appointment for?":"யாருக்காக அப்பாயிண்ட்மென்ட் பதிவு செய்கிறீர்கள்?","Standard medical consultation":"சாதாரண மருத்துவ ஆலோசனை","Priority assistance and support":"முன்னுரிமை உதவி மற்றும் ஆதரவு","Select Department":"துறையைத் தேர்ந்தெடுக்கவும்","General Medicine":"பொது மருத்துவம்","Orthopedics":"எலும்பியல்","Cardiology":"இதயவியல்","Neurology":"நரம்பியல்","Choose Your Doctor":"உங்கள் மருத்துவரைத் தேர்ந்தெடுக்கவும்","Compare doctors and waiting times.":"மருத்துவர்களையும் காத்திருப்பு நேரத்தையும் ஒப்பிடவும்.","SMART PICK":"ஸ்மார்ட் தேர்வு","Find Best Doctor":"சிறந்த மருத்துவரைக் கண்டறியவும்","Select a department first":"முதலில் ஒரு துறையைத் தேர்ந்தெடுக்கவும்","Available doctors will appear here.":"கிடைக்கும் மருத்துவர்கள் இங்கே தோன்றுவார்கள்.","No doctors available":"மருத்துவர்கள் கிடைக்கவில்லை","Available":"கிடைக்கும்","patients waiting":"நோயாளிகள் காத்திருக்கிறார்கள்","Estimated wait":"மதிப்பிடப்பட்ட காத்திருப்பு","Select Doctor":"மருத்துவரைத் தேர்ந்தெடுக்கவும்","Patient Details":"நோயாளர் விவரங்கள்","Basic Information":"அடிப்படை தகவல்","Patient Name":"நோயாளர் பெயர்","Age":"வயது","Gender":"பாலினம்","Male":"ஆண்","Female":"பெண்","Other":"மற்றவை","Mobile Number":"மொபைல் எண்","Email":"மின்னஞ்சல்","Optional":"விருப்பத்தேர்வு","Reason for Visit":"வருகைக்கான காரணம்","Select Main Problem":"முக்கிய பிரச்சனையைத் தேர்ந்தெடுக்கவும்","Describe the Problem":"பிரச்சனையை விவரிக்கவும்","Today":"இன்று","Medical Information":"மருத்துவ தகவல்","Existing Medical Conditions":"தற்போதைய மருத்துவ நிலைகள்","None":"எதுவுமில்லை","Diabetes":"நீரிழிவு","Hypertension":"உயர் இரத்த அழுத்தம்","Asthma":"ஆஸ்துமா","Heart Disease":"இதய நோய்","Allergies":"ஒவ்வாமைகள்","No Known Allergies":"தெரிந்த ஒவ்வாமை இல்லை","Current Medications":"தற்போதைய மருந்துகள்","Ready to book?":"பதிவு செய்யத் தயாரா?","Confirm Appointment":"அப்பாயிண்ட்மென்ட்டை உறுதிப்படுத்தவும்","YOUR APPOINTMENT":"உங்கள் அப்பாயிண்ட்மென்ட்","Appointment Token":"அப்பாயிண்ட்மென்ட் டோக்கன்","No appointment booked yet":"இன்னும் அப்பாயிண்ட்மென்ட் பதிவு செய்யப்படவில்லை","Book an appointment to receive your token.":"டோக்கனைப் பெற அப்பாயிண்ட்மென்ட் பதிவு செய்யவும்","APPOINTMENT CONFIRMED":"அப்பாயிண்ட்மென்ட் உறுதி செய்யப்பட்டது","Your Token Number":"உங்கள் டோக்கன் எண்","Estimated Waiting":"மதிப்பிடப்பட்ட காத்திருப்பு","Queue Overview":"வரிசை மேலோட்டம்","Total Patients":"மொத்த நோயாளிகள்","Waiting":"காத்திருப்பு","Completed":"முடிந்தது","Available Beds":"கிடைக்கும் படுக்கைகள்","Patient Queue":"நோயாளர் வரிசை","Token":"டோக்கன்","Contact":"தொடர்பு","Problem":"பிரச்சனை","Type":"வகை","Status":"நிலை","Action":"செயல்","Complete":"முடிக்கவும்","Done":"முடிந்தது","Emergency Bed Status":"அவசர படுக்கை நிலை","Total Beds":"மொத்த படுக்கைகள்","Occupied":"பயன்பாட்டில்","Available":"கிடைக்கும்","Emergency Registration":"அவசர பதிவு","Emergency patients receive priority.":"அவசர நோயாளிகளுக்கு முன்னுரிமை வழங்கப்படும்.","Emergency Problem":"அவசர பிரச்சனை","Emergency Care":"அவசர சிகிச்சை","Register Emergency Patient":"அவசர நோயாளியை பதிவு செய்யவும்"};
commonTranslations.te={"Home":"హోమ్","Book Appointment":"అపాయింట్‌మెంట్ బుక్ చేయండి","My Token":"నా టోకెన్","Staff Dashboard":"స్టాఫ్ డ్యాష్‌బోర్డ్","Emergency":"అత్యవసరం","Book an Appointment":"అపాయింట్‌మెంట్ బుక్ చేయండి","Normal Patient":"సాధారణ రోగి","Specially-Abled Patient":"ప్రత్యేక సహాయం అవసరమైన రోగి","Book Now":"ఇప్పుడే బుక్ చేయండి","Get Priority":"ప్రాధాన్యత పొందండి","Register Now":"ఇప్పుడే నమోదు చేయండి","OUR SERVICES":"మా సేవలు","How can we help you?":"మేము మీకు ఎలా సహాయపడగలం?","Choose the service that best fits your needs.":"మీ అవసరానికి సరిపోయే సేవను ఎంచుకోండి.","Secure":"సురక్షితం","AI Powered":"AI ఆధారితం","Less Waiting":"తక్కువ నిరీక్షణ","APPOINTMENT":"అపాయింట్‌మెంట్","Book Your Appointment":"మీ అపాయింట్‌మెంట్ బుక్ చేయండి","Simple & Fast":"సులభం మరియు వేగం","Patient":"రోగి","Department":"విభాగం","Doctor":"డాక్టర్","Details":"వివరాలు","Patient Type":"రోగి రకం","Who are you booking the appointment for?":"మీరు ఎవరి కోసం అపాయింట్‌మెంట్ బుక్ చేస్తున్నారు?","Standard medical consultation":"సాధారణ వైద్య సంప్రదింపు","Priority assistance and support":"ప్రాధాన్యత సహాయం మరియు మద్దతు","Select Department":"విభాగాన్ని ఎంచుకోండి","General Medicine":"సాధారణ వైద్యం","Orthopedics":"ఆర్థోపెడిక్స్","Cardiology":"కార్డియాలజీ","Neurology":"న్యూరాలజీ","Choose Your Doctor":"మీ డాక్టర్‌ను ఎంచుకోండి","Compare doctors and waiting times.":"డాక్టర్లు మరియు నిరీక్షణ సమయాలను పోల్చండి.","SMART PICK":"స్మార్ట్ ఎంపిక","Find Best Doctor":"ఉత్తమ డాక్టర్‌ను కనుగొనండి","Select a department first":"ముందుగా విభాగాన్ని ఎంచుకోండి","Available doctors will appear here.":"అందుబాటులో ఉన్న డాక్టర్లు ఇక్కడ కనిపిస్తారు.","No doctors available":"డాక్టర్లు అందుబాటులో లేరు","Available":"అందుబాటులో ఉంది","patients waiting":"రోగులు వేచి ఉన్నారు","Estimated wait":"అంచనా నిరీక్షణ","Select Doctor":"డాక్టర్‌ను ఎంచుకోండి","Patient Details":"రోగి వివరాలు","Basic Information":"ప్రాథమిక సమాచారం","Patient Name":"రోగి పేరు","Age":"వయస్సు","Gender":"లింగం","Male":"పురుషుడు","Female":"స్త్రీ","Other":"ఇతర","Mobile Number":"మొబైల్ నంబర్","Email":"ఇమెయిల్","Optional":"ఐచ్ఛికం","Reason for Visit":"వచ్చిన కారణం","Select Main Problem":"ప్రధాన సమస్యను ఎంచుకోండి","Describe the Problem":"సమస్యను వివరించండి","Today":"ఈరోజు","Medical Information":"వైద్య సమాచారం","Existing Medical Conditions":"ప్రస్తుత వైద్య పరిస్థితులు","None":"ఏదీ లేదు","Diabetes":"మధుమేహం","Hypertension":"అధిక రక్తపోటు","Asthma":"ఆస్తమా","Heart Disease":"గుండె వ్యాధి","Allergies":"అలర్జీలు","No Known Allergies":"తెలిసిన అలర్జీలు లేవు","Current Medications":"ప్రస్తుత మందులు","Ready to book?":"బుక్ చేయడానికి సిద్ధంగా ఉన్నారా?","Confirm Appointment":"అపాయింట్‌మెంట్ నిర్ధారించండి","YOUR APPOINTMENT":"మీ అపాయింట్‌మెంట్","Appointment Token":"అపాయింట్‌మెంట్ టోకెన్","No appointment booked yet":"ఇంకా అపాయింట్‌మెంట్ బుక్ కాలేదు","Book an appointment to receive your token.":"టోకెన్ పొందడానికి అపాయింట్‌మెంట్ బుక్ చేయండి","APPOINTMENT CONFIRMED":"అపాయింట్‌మెంట్ నిర్ధారించబడింది","Your Token Number":"మీ టోకెన్ నంబర్","Estimated Waiting":"అంచనా నిరీక్షణ","Queue Overview":"క్యూ అవలోకనం","Total Patients":"మొత్తం రోగులు","Waiting":"వేచి ఉన్నారు","Completed":"పూర్తయింది","Available Beds":"అందుబాటులో ఉన్న పడకలు","Patient Queue":"రోగుల క్యూ","Token":"టోకెన్","Contact":"సంప్రదింపు","Problem":"సమస్య","Type":"రకం","Status":"స్థితి","Action":"చర్య","Complete":"పూర్తి చేయండి","Done":"పూర్తయింది","Emergency Bed Status":"అత్యవసర పడక స్థితి","Total Beds":"మొత్తం పడకలు","Occupied":"ఆక్రమించబడినవి","Available":"అందుబాటులో ఉంది","Emergency Registration":"అత్యవసర నమోదు","Emergency patients receive priority.":"అత్యవసర రోగులకు ప్రాధాన్యత లభిస్తుంది.","Emergency Problem":"అత్యవసర సమస్య","Emergency Care":"అత్యవసర సంరక్షణ","Register Emergency Patient":"అత్యవసర రోగిని నమోదు చేయండి"};
commonTranslations.kn={"Home":"ಮುಖಪುಟ","Book Appointment":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ","My Token":"ನನ್ನ ಟೋಕನ್","Staff Dashboard":"ಸ್ಟಾಫ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್","Emergency":"ತುರ್ತು","Book an Appointment":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ","Normal Patient":"ಸಾಮಾನ್ಯ ರೋಗಿ","Specially-Abled Patient":"ವಿಶೇಷ ಸಹಾಯ ಅಗತ್ಯವಿರುವ ರೋಗಿ","Book Now":"ಈಗ ಬುಕ್ ಮಾಡಿ","Get Priority":"ಆದ್ಯತೆ ಪಡೆಯಿರಿ","Register Now":"ಈಗ ನೋಂದಾಯಿಸಿ","OUR SERVICES":"ನಮ್ಮ ಸೇವೆಗಳು","How can we help you?":"ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?","Choose the service that best fits your needs.":"ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ಸೂಕ್ತವಾದ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.","Secure":"ಸುರಕ್ಷಿತ","AI Powered":"AI ಚಾಲಿತ","Less Waiting":"ಕಡಿಮೆ ಕಾಯುವಿಕೆ","APPOINTMENT":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್","Book Your Appointment":"ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ","Simple & Fast":"ಸರಳ ಮತ್ತು ವೇಗ","Patient":"ರೋಗಿ","Department":"ವಿಭಾಗ","Doctor":"ವೈದ್ಯರು","Details":"ವಿವರಗಳು","Patient Type":"ರೋಗಿಯ ಪ್ರಕಾರ","Who are you booking the appointment for?":"ನೀವು ಯಾರಿಗಾಗಿ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡುತ್ತಿದ್ದೀರಿ?","Standard medical consultation":"ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನೆ","Priority assistance and support":"ಆದ್ಯತೆಯ ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ","Select Department":"ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ","General Medicine":"ಸಾಮಾನ್ಯ ವೈದ್ಯಕೀಯ","Orthopedics":"ಮೂಳೆ ವೈದ್ಯಕೀಯ","Cardiology":"ಹೃದ್ರೋಗ","Neurology":"ನರವಿಜ್ಞಾನ","Choose Your Doctor":"ನಿಮ್ಮ ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ","Compare doctors and waiting times.":"ವೈದ್ಯರು ಮತ್ತು ಕಾಯುವ ಸಮಯವನ್ನು ಹೋಲಿಸಿ.","SMART PICK":"ಸ್ಮಾರ್ಟ್ ಆಯ್ಕೆ","Find Best Doctor":"ಅತ್ಯುತ್ತಮ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ","Select a department first":"ಮೊದಲು ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ","Available doctors will appear here.":"ಲಭ್ಯವಿರುವ ವೈದ್ಯರು ಇಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.","No doctors available":"ವೈದ್ಯರು ಲಭ್ಯವಿಲ್ಲ","Available":"ಲಭ್ಯ","patients waiting":"ರೋಗಿಗಳು ಕಾಯುತ್ತಿದ್ದಾರೆ","Estimated wait":"ಅಂದಾಜು ಕಾಯುವಿಕೆ","Select Doctor":"ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ","Patient Details":"ರೋಗಿಯ ವಿವರಗಳು","Basic Information":"ಮೂಲ ಮಾಹಿತಿ","Patient Name":"ರೋಗಿಯ ಹೆಸರು","Age":"ವಯಸ್ಸು","Gender":"ಲಿಂಗ","Male":"ಪುರುಷ","Female":"ಮಹಿಳೆ","Other":"ಇತರೆ","Mobile Number":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ","Email":"ಇಮೇಲ್","Optional":"ಐಚ್ಛಿಕ","Reason for Visit":"ಭೇಟಿಯ ಕಾರಣ","Select Main Problem":"ಮುಖ್ಯ ಸಮಸ್ಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ","Describe the Problem":"ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ","Today":"ಇಂದು","Medical Information":"ವೈದ್ಯಕೀಯ ಮಾಹಿತಿ","Existing Medical Conditions":"ಪ್ರಸ್ತುತ ವೈದ್ಯಕೀಯ ಪರಿಸ್ಥಿತಿಗಳು","None":"ಯಾವುದೂ ಇಲ್ಲ","Diabetes":"ಮಧುಮೇಹ","Hypertension":"ಅಧಿಕ ರಕ್ತದೊತ್ತಡ","Asthma":"ಆಸ್ತಮಾ","Heart Disease":"ಹೃದ್ರೋಗ","Allergies":"ಅಲರ್ಜಿಗಳು","No Known Allergies":"ತಿಳಿದ ಅಲರ್ಜಿ ಇಲ್ಲ","Current Medications":"ಪ್ರಸ್ತುತ ಔಷಧಿಗಳು","Ready to book?":"ಬುಕ್ ಮಾಡಲು ಸಿದ್ಧವೇ?","Confirm Appointment":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದೃಢೀಕರಿಸಿ","YOUR APPOINTMENT":"ನಿಮ್ಮ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್","Appointment Token":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಟೋಕನ್","No appointment booked yet":"ಇನ್ನೂ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಆಗಿಲ್ಲ","Book an appointment to receive your token.":"ಟೋಕನ್ ಪಡೆಯಲು ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ","APPOINTMENT CONFIRMED":"ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ದೃಢವಾಗಿದೆ","Your Token Number":"ನಿಮ್ಮ ಟೋಕನ್ ಸಂಖ್ಯೆ","Estimated Waiting":"ಅಂದಾಜು ಕಾಯುವಿಕೆ","Queue Overview":"ಸರತಿ ಅವಲೋಕನ","Total Patients":"ಒಟ್ಟು ರೋಗಿಗಳು","Waiting":"ಕಾಯುತ್ತಿದ್ದಾರೆ","Completed":"ಪೂರ್ಣಗೊಂಡಿದೆ","Available Beds":"ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು","Patient Queue":"ರೋಗಿಗಳ ಸರತಿ","Token":"ಟೋಕನ್","Contact":"ಸಂಪರ್ಕ","Problem":"ಸಮಸ್ಯೆ","Type":"ಪ್ರಕಾರ","Status":"ಸ್ಥಿತಿ","Action":"ಕ್ರಿಯೆ","Complete":"ಪೂರ್ಣಗೊಳಿಸಿ","Done":"ಮುಗಿದಿದೆ","Emergency Bed Status":"ತುರ್ತು ಹಾಸಿಗೆ ಸ್ಥಿತಿ","Total Beds":"ಒಟ್ಟು ಹಾಸಿಗೆಗಳು","Occupied":"ಭರ್ತಿಯಾದವು","Available":"ಲಭ್ಯ","Emergency Registration":"ತುರ್ತು ನೋಂದಣಿ","Emergency patients receive priority.":"ತುರ್ತು ರೋಗಿಗಳಿಗೆ ಆದ್ಯತೆ ದೊರೆಯುತ್ತದೆ.","Emergency Problem":"ತುರ್ತು ಸಮಸ್ಯೆ","Emergency Care":"ತುರ್ತು ಆರೈಕೆ","Register Emergency Patient":"ತುರ್ತು ರೋಗಿಯನ್ನು ನೋಂದಾಯಿಸಿ"};
commonTranslations.gu={"Home":"હોમ","Book Appointment":"એપોઇન્ટમેન્ટ બુક કરો","My Token":"મારો ટોકન","Staff Dashboard":"સ્ટાફ ડેશબોર્ડ","Emergency":"કટોકટી","Book an Appointment":"એપોઇન્ટમેન્ટ બુક કરો","Normal Patient":"સામાન્ય દર્દી","Specially-Abled Patient":"વિશેષ સહાય જરૂરી દર્દી","Book Now":"હમણાં બુક કરો","Get Priority":"પ્રાથમિકતા મેળવો","Register Now":"હમણાં નોંધણી કરો","OUR SERVICES":"અમારી સેવાઓ","How can we help you?":"અમે તમને કેવી રીતે મદદ કરી શકીએ?","Choose the service that best fits your needs.":"તમારી જરૂરિયાત મુજબ સેવા પસંદ કરો.","Secure":"સુરક્ષિત","AI Powered":"AI સંચાલિત","Less Waiting":"ઓછી રાહ","APPOINTMENT":"એપોઇન્ટમેન્ટ","Book Your Appointment":"તમારી એપોઇન્ટમેન્ટ બુક કરો","Simple & Fast":"સરળ અને ઝડપી","Patient":"દર્દી","Department":"વિભાગ","Doctor":"ડોક્ટર","Details":"વિગતો","Patient Type":"દર્દીનો પ્રકાર","Who are you booking the appointment for?":"તમે કોના માટે એપોઇન્ટમેન્ટ બુક કરી રહ્યા છો?","Standard medical consultation":"સામાન્ય તબીબી સલાહ","Priority assistance and support":"પ્રાથમિકતા સહાય અને સહયોગ","Select Department":"વિભાગ પસંદ કરો","General Medicine":"સામાન્ય દવા વિભાગ","Orthopedics":"હાડકાં વિભાગ","Cardiology":"હૃદયરોગ વિભાગ","Neurology":"ન્યુરોલોજી","Choose Your Doctor":"તમારો ડોક્ટર પસંદ કરો","Compare doctors and waiting times.":"ડોક્ટરો અને રાહ સમયની સરખામણી કરો.","SMART PICK":"સ્માર્ટ પસંદગી","Find Best Doctor":"શ્રેષ્ઠ ડોક્ટર શોધો","Select a department first":"પહેલા વિભાગ પસંદ કરો","Available doctors will appear here.":"ઉપલબ્ધ ડોક્ટરો અહીં દેખાશે.","No doctors available":"ડોક્ટરો ઉપલબ્ધ નથી","Available":"ઉપલબ્ધ","patients waiting":"દર્દીઓ રાહ જોઈ રહ્યા છે","Estimated wait":"અંદાજિત રાહ","Select Doctor":"ડોક્ટર પસંદ કરો","Patient Details":"દર્દીની વિગતો","Basic Information":"મૂળભૂત માહિતી","Patient Name":"દર્દીનું નામ","Age":"ઉંમર","Gender":"લિંગ","Male":"પુરુષ","Female":"સ્ત્રી","Other":"અન્ય","Mobile Number":"મોબાઇલ નંબર","Email":"ઇમેઇલ","Optional":"વૈકલ્પિક","Reason for Visit":"મુલાકાતનું કારણ","Select Main Problem":"મુખ્ય સમસ્યા પસંદ કરો","Describe the Problem":"સમસ્યાનું વર્ણન કરો","Today":"આજે","Medical Information":"તબીબી માહિતી","Existing Medical Conditions":"હાલની તબીબી સ્થિતિઓ","None":"કંઈ નહીં","Diabetes":"ડાયાબિટીસ","Hypertension":"હાઈ બ્લડ પ્રેશર","Asthma":"અસ્થમા","Heart Disease":"હૃદય રોગ","Allergies":"એલર્જી","No Known Allergies":"કોઈ જાણીતી એલર્જી નથી","Current Medications":"હાલની દવાઓ","Ready to book?":"બુક કરવા તૈયાર છો?","Confirm Appointment":"એપોઇન્ટમેન્ટની પુષ્ટિ કરો","YOUR APPOINTMENT":"તમારી એપોઇન્ટમેન્ટ","Appointment Token":"એપોઇન્ટમેન્ટ ટોકન","No appointment booked yet":"હજુ કોઈ એપોઇન્ટમેન્ટ બુક નથી","Book an appointment to receive your token.":"ટોકન મેળવવા એપોઇન્ટમેન્ટ બુક કરો","APPOINTMENT CONFIRMED":"એપોઇન્ટમેન્ટની પુષ્ટિ થઈ","Your Token Number":"તમારો ટોકન નંબર","Estimated Waiting":"અંદાજિત રાહ","Queue Overview":"કતારનો સારાંશ","Total Patients":"કુલ દર્દીઓ","Waiting":"રાહ જોઈ રહ્યા છે","Completed":"પૂર્ણ","Available Beds":"ઉપલબ્ધ બેડ","Patient Queue":"દર્દીઓની કતાર","Token":"ટોકન","Contact":"સંપર્ક","Problem":"સમસ્યા","Type":"પ્રકાર","Status":"સ્થિતિ","Action":"ક્રિયા","Complete":"પૂર્ણ કરો","Done":"થઈ ગયું","Emergency Bed Status":"કટોકટી બેડ સ્થિતિ","Total Beds":"કુલ બેડ","Occupied":"ભરેલા","Available":"ઉપલબ્ધ","Emergency Registration":"કટોકટી નોંધણી","Emergency patients receive priority.":"કટોકટીના દર્દીઓને પ્રાથમિકતા મળે છે.","Emergency Problem":"કટોકટીની સમસ્યા","Emergency Care":"કટોકટી સારવાર","Register Emergency Patient":"કટોકટીના દર્દીની નોંધણી કરો"};
commonTranslations.pa={"Home":"ਹੋਮ","Book Appointment":"ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ","My Token":"ਮੇਰਾ ਟੋਕਨ","Staff Dashboard":"ਸਟਾਫ ਡੈਸ਼ਬੋਰਡ","Emergency":"ਐਮਰਜੈਂਸੀ","Book an Appointment":"ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ","Normal Patient":"ਆਮ ਮਰੀਜ਼","Specially-Abled Patient":"ਵਿਸ਼ੇਸ਼ ਸਹਾਇਤਾ ਲੋੜੀਂਦਾ ਮਰੀਜ਼","Book Now":"ਹੁਣੇ ਬੁੱਕ ਕਰੋ","Get Priority":"ਤਰਜੀਹ ਲਵੋ","Register Now":"ਹੁਣੇ ਰਜਿਸਟਰ ਕਰੋ","OUR SERVICES":"ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ","How can we help you?":"ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?","Choose the service that best fits your needs.":"ਆਪਣੀ ਲੋੜ ਅਨੁਸਾਰ ਸੇਵਾ ਚੁਣੋ।","Secure":"ਸੁਰੱਖਿਅਤ","AI Powered":"AI ਸੰਚਾਲਿਤ","Less Waiting":"ਘੱਟ ਉਡੀਕ","APPOINTMENT":"ਅਪਾਇੰਟਮੈਂਟ","Book Your Appointment":"ਆਪਣੀ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ","Simple & Fast":"ਸੌਖਾ ਅਤੇ ਤੇਜ਼","Patient":"ਮਰੀਜ਼","Department":"ਵਿਭਾਗ","Doctor":"ਡਾਕਟਰ","Details":"ਵੇਰਵੇ","Patient Type":"ਮਰੀਜ਼ ਦੀ ਕਿਸਮ","Who are you booking the appointment for?":"ਤੁਸੀਂ ਕਿਸ ਲਈ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰ ਰਹੇ ਹੋ?","Standard medical consultation":"ਆਮ ਡਾਕਟਰੀ ਸਲਾਹ","Priority assistance and support":"ਤਰਜੀਹੀ ਸਹਾਇਤਾ ਅਤੇ ਸਹਿਯੋਗ","Select Department":"ਵਿਭਾਗ ਚੁਣੋ","General Medicine":"ਜਨਰਲ ਮੈਡੀਸਨ","Orthopedics":"ਆਰਥੋਪੀਡਿਕਸ","Cardiology":"ਕਾਰਡੀਓਲੋਜੀ","Neurology":"ਨਿਊਰੋਲੋਜੀ","Choose Your Doctor":"ਆਪਣਾ ਡਾਕਟਰ ਚੁਣੋ","Compare doctors and waiting times.":"ਡਾਕਟਰਾਂ ਅਤੇ ਉਡੀਕ ਸਮੇਂ ਦੀ ਤੁਲਨਾ ਕਰੋ।","SMART PICK":"ਸਮਾਰਟ ਚੋਣ","Find Best Doctor":"ਸਭ ਤੋਂ ਵਧੀਆ ਡਾਕਟਰ ਲੱਭੋ","Select a department first":"ਪਹਿਲਾਂ ਵਿਭਾਗ ਚੁਣੋ","Available doctors will appear here.":"ਉਪਲਬਧ ਡਾਕਟਰ ਇੱਥੇ ਦਿਖਾਈ ਦੇਣਗੇ।","No doctors available":"ਕੋਈ ਡਾਕਟਰ ਉਪਲਬਧ ਨਹੀਂ","Available":"ਉਪਲਬਧ","patients waiting":"ਮਰੀਜ਼ ਉਡੀਕ ਵਿੱਚ","Estimated wait":"ਅਨੁਮਾਨਿਤ ਉਡੀਕ","Select Doctor":"ਡਾਕਟਰ ਚੁਣੋ","Patient Details":"ਮਰੀਜ਼ ਦੇ ਵੇਰਵੇ","Basic Information":"ਮੁੱਢਲੀ ਜਾਣਕਾਰੀ","Patient Name":"ਮਰੀਜ਼ ਦਾ ਨਾਮ","Age":"ਉਮਰ","Gender":"ਲਿੰਗ","Male":"ਮਰਦ","Female":"ਔਰਤ","Other":"ਹੋਰ","Mobile Number":"ਮੋਬਾਈਲ ਨੰਬਰ","Email":"ਈਮੇਲ","Optional":"ਵਿਕਲਪਿਕ","Reason for Visit":"ਮੁਲਾਕਾਤ ਦਾ ਕਾਰਨ","Select Main Problem":"ਮੁੱਖ ਸਮੱਸਿਆ ਚੁਣੋ","Describe the Problem":"ਸਮੱਸਿਆ ਦਾ ਵੇਰਵਾ ਦਿਓ","Today":"ਅੱਜ","Medical Information":"ਡਾਕਟਰੀ ਜਾਣਕਾਰੀ","Existing Medical Conditions":"ਮੌਜੂਦਾ ਡਾਕਟਰੀ ਹਾਲਤਾਂ","None":"ਕੋਈ ਨਹੀਂ","Diabetes":"ਸ਼ੂਗਰ","Hypertension":"ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ","Asthma":"ਦਮਾ","Heart Disease":"ਦਿਲ ਦੀ ਬਿਮਾਰੀ","Allergies":"ਐਲਰਜੀਆਂ","No Known Allergies":"ਕੋਈ ਜਾਣੀ ਐਲਰਜੀ ਨਹੀਂ","Current Medications":"ਮੌਜੂਦਾ ਦਵਾਈਆਂ","Ready to book?":"ਬੁੱਕ ਕਰਨ ਲਈ ਤਿਆਰ?","Confirm Appointment":"ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ","YOUR APPOINTMENT":"ਤੁਹਾਡੀ ਅਪਾਇੰਟਮੈਂਟ","Appointment Token":"ਅਪਾਇੰਟਮੈਂਟ ਟੋਕਨ","No appointment booked yet":"ਅਜੇ ਕੋਈ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਨਹੀਂ","Book an appointment to receive your token.":"ਟੋਕਨ ਲੈਣ ਲਈ ਅਪਾਇੰਟਮੈਂਟ ਬੁੱਕ ਕਰੋ","APPOINTMENT CONFIRMED":"ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ","Your Token Number":"ਤੁਹਾਡਾ ਟੋਕਨ ਨੰਬਰ","Estimated Waiting":"ਅਨੁਮਾਨਿਤ ਉਡੀਕ","Queue Overview":"ਕਤਾਰ ਦਾ ਜਾਇਜ਼ਾ","Total Patients":"ਕੁੱਲ ਮਰੀਜ਼","Waiting":"ਉਡੀਕ","Completed":"ਪੂਰਾ","Available Beds":"ਉਪਲਬਧ ਬੈੱਡ","Patient Queue":"ਮਰੀਜ਼ਾਂ ਦੀ ਕਤਾਰ","Token":"ਟੋਕਨ","Contact":"ਸੰਪਰਕ","Problem":"ਸਮੱਸਿਆ","Type":"ਕਿਸਮ","Status":"ਸਥਿਤੀ","Action":"ਕਾਰਵਾਈ","Complete":"ਪੂਰਾ ਕਰੋ","Done":"ਹੋ ਗਿਆ","Emergency Bed Status":"ਐਮਰਜੈਂਸੀ ਬੈੱਡ ਸਥਿਤੀ","Total Beds":"ਕੁੱਲ ਬੈੱਡ","Occupied":"ਭਰੇ ਹੋਏ","Available":"ਉਪਲਬਧ","Emergency Registration":"ਐਮਰਜੈਂਸੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ","Emergency patients receive priority.":"ਐਮਰਜੈਂਸੀ ਮਰੀਜ਼ਾਂ ਨੂੰ ਤਰਜੀਹ ਮਿਲਦੀ ਹੈ।","Emergency Problem":"ਐਮਰਜੈਂਸੀ ਸਮੱਸਿਆ","Emergency Care":"ਐਮਰਜੈਂਸੀ ਦੇਖਭਾਲ","Register Emergency Patient":"ਐਮਰਜੈਂਸੀ ਮਰੀਜ਼ ਰਜਿਸਟਰ ਕਰੋ"};
commonTranslations.ur={"Home":"ہوم","Book Appointment":"اپائنٹمنٹ بک کریں","My Token":"میرا ٹوکن","Staff Dashboard":"اسٹاف ڈیش بورڈ","Emergency":"ایمرجنسی","Book an Appointment":"اپائنٹمنٹ بک کریں","Normal Patient":"عام مریض","Specially-Abled Patient":"خصوصی مدد کے ضرورت مند مریض","Book Now":"ابھی بک کریں","Get Priority":"ترجیح حاصل کریں","Register Now":"ابھی رجسٹر کریں","OUR SERVICES":"ہماری خدمات","How can we help you?":"ہم آپ کی کیسے مدد کر سکتے ہیں؟","Choose the service that best fits your needs.":"اپنی ضرورت کے مطابق خدمت منتخب کریں۔","Secure":"محفوظ","AI Powered":"AI سے چلنے والا","Less Waiting":"کم انتظار","APPOINTMENT":"اپائنٹمنٹ","Book Your Appointment":"اپنی اپائنٹمنٹ بک کریں","Simple & Fast":"آسان اور تیز","Patient":"مریض","Department":"شعبہ","Doctor":"ڈاکٹر","Details":"تفصیلات","Patient Type":"مریض کی قسم","Who are you booking the appointment for?":"آپ کس کے لیے اپائنٹمنٹ بک کر رہے ہیں؟","Standard medical consultation":"معمول کا طبی مشورہ","Priority assistance and support":"ترجیحی مدد اور معاونت","Select Department":"شعبہ منتخب کریں","General Medicine":"جنرل میڈیسن","Orthopedics":"آرتھوپیڈکس","Cardiology":"کارڈیالوجی","Neurology":"نیورولوجی","Choose Your Doctor":"اپنا ڈاکٹر منتخب کریں","Compare doctors and waiting times.":"ڈاکٹروں اور انتظار کے اوقات کا موازنہ کریں۔","SMART PICK":"اسمارٹ انتخاب","Find Best Doctor":"بہترین ڈاکٹر تلاش کریں","Select a department first":"پہلے شعبہ منتخب کریں","Available doctors will appear here.":"دستیاب ڈاکٹر یہاں نظر آئیں گے۔","No doctors available":"کوئی ڈاکٹر دستیاب نہیں","Available":"دستیاب","patients waiting":"مریض انتظار میں","Estimated wait":"متوقع انتظار","Select Doctor":"ڈاکٹر منتخب کریں","Patient Details":"مریض کی تفصیلات","Basic Information":"بنیادی معلومات","Patient Name":"مریض کا نام","Age":"عمر","Gender":"صنف","Male":"مرد","Female":"خاتون","Other":"دیگر","Mobile Number":"موبائل نمبر","Email":"ای میل","Optional":"اختیاری","Reason for Visit":"ملاقات کی وجہ","Select Main Problem":"اہم مسئلہ منتخب کریں","Describe the Problem":"مسئلہ بیان کریں","Today":"آج","Medical Information":"طبی معلومات","Existing Medical Conditions":"موجودہ طبی حالات","None":"کوئی نہیں","Diabetes":"ذیابیطس","Hypertension":"ہائی بلڈ پریشر","Asthma":"دمہ","Heart Disease":"دل کی بیماری","Allergies":"الرجی","No Known Allergies":"کوئی معلوم الرجی نہیں","Current Medications":"موجودہ ادویات","Ready to book?":"بک کرنے کے لیے تیار؟","Confirm Appointment":"اپائنٹمنٹ کی تصدیق کریں","YOUR APPOINTMENT":"آپ کی اپائنٹمنٹ","Appointment Token":"اپائنٹمنٹ ٹوکن","No appointment booked yet":"ابھی کوئی اپائنٹمنٹ بک نہیں ہوئی","Book an appointment to receive your token.":"ٹوکن حاصل کرنے کے لیے اپائنٹمنٹ بک کریں","APPOINTMENT CONFIRMED":"اپائنٹمنٹ کی تصدیق ہو گئی","Your Token Number":"آپ کا ٹوکن نمبر","Estimated Waiting":"متوقع انتظار","Queue Overview":"قطار کا جائزہ","Total Patients":"کل مریض","Waiting":"انتظار","Completed":"مکمل","Available Beds":"دستیاب بیڈز","Patient Queue":"مریضوں کی قطار","Token":"ٹوکن","Contact":"رابطہ","Problem":"مسئلہ","Type":"قسم","Status":"حیثیت","Action":"کارروائی","Complete":"مکمل کریں","Done":"ہو گیا","Emergency Bed Status":"ایمرجنسی بیڈ کی حالت","Total Beds":"کل بیڈز","Occupied":"مصروف","Available":"دستیاب","Emergency Registration":"ایمرجنسی رجسٹریشن","Emergency patients receive priority.":"ایمرجنسی مریضوں کو ترجیح دی جاتی ہے۔","Emergency Problem":"ایمرجنسی مسئلہ","Emergency Care":"ایمرجنسی نگہداشت","Register Emergency Patient":"ایمرجنسی مریض رجسٹر کریں"};
commonTranslations.fr={"Home":"Accueil","Book Appointment":"Prendre rendez-vous","My Token":"Mon jeton","Staff Dashboard":"Tableau du personnel","Emergency":"Urgence","Book an Appointment":"Prendre rendez-vous","Normal Patient":"Patient standard","Specially-Abled Patient":"Patient ayant besoin d'une assistance spéciale","Book Now":"Réserver","Get Priority":"Obtenir la priorité","Register Now":"S'inscrire","OUR SERVICES":"NOS SERVICES","How can we help you?":"Comment pouvons-nous vous aider ?","Choose the service that best fits your needs.":"Choisissez le service qui correspond le mieux à vos besoins.","Secure":"Sécurisé","AI Powered":"Propulsé par l'IA","Less Waiting":"Moins d'attente","APPOINTMENT":"RENDEZ-VOUS","Book Your Appointment":"Prenez votre rendez-vous","Simple & Fast":"Simple et rapide","Patient":"Patient","Department":"Service","Doctor":"Médecin","Details":"Détails","Patient Type":"Type de patient","Who are you booking the appointment for?":"Pour qui prenez-vous le rendez-vous ?","Standard medical consultation":"Consultation médicale standard","Priority assistance and support":"Assistance prioritaire et accompagnement","Select Department":"Sélectionner le service","General Medicine":"Médecine générale","Orthopedics":"Orthopédie","Cardiology":"Cardiologie","Neurology":"Neurologie","Choose Your Doctor":"Choisissez votre médecin","Compare doctors and waiting times.":"Comparez les médecins et les temps d'attente.","SMART PICK":"CHOIX INTELLIGENT","Find Best Doctor":"Trouver le meilleur médecin","Select a department first":"Sélectionnez d'abord un service","Available doctors will appear here.":"Les médecins disponibles apparaîtront ici.","No doctors available":"Aucun médecin disponible","Available":"Disponible","patients waiting":"patients en attente","Estimated wait":"Attente estimée","Select Doctor":"Sélectionner le médecin","Patient Details":"Détails du patient","Basic Information":"Informations de base","Patient Name":"Nom du patient","Age":"Âge","Gender":"Sexe","Male":"Homme","Female":"Femme","Other":"Autre","Mobile Number":"Numéro de mobile","Email":"E-mail","Optional":"Facultatif","Reason for Visit":"Motif de consultation","Select Main Problem":"Sélectionner le problème principal","Describe the Problem":"Décrire le problème","Today":"Aujourd'hui","Medical Information":"Informations médicales","Existing Medical Conditions":"Antécédents médicaux","None":"Aucun","Diabetes":"Diabète","Hypertension":"Hypertension","Asthma":"Asthme","Heart Disease":"Maladie cardiaque","Allergies":"Allergies","No Known Allergies":"Aucune allergie connue","Current Medications":"Médicaments actuels","Ready to book?":"Prêt à réserver ?","Confirm Appointment":"Confirmer le rendez-vous","YOUR APPOINTMENT":"VOTRE RENDEZ-VOUS","Appointment Token":"Jeton de rendez-vous","No appointment booked yet":"Aucun rendez-vous réservé","Book an appointment to receive your token.":"Réservez un rendez-vous pour recevoir votre jeton.","APPOINTMENT CONFIRMED":"RENDEZ-VOUS CONFIRMÉ","Your Token Number":"Votre numéro de jeton","Estimated Waiting":"Attente estimée","Queue Overview":"Aperçu de la file","Total Patients":"Nombre total de patients","Waiting":"En attente","Completed":"Terminé","Available Beds":"Lits disponibles","Patient Queue":"File des patients","Token":"Jeton","Contact":"Contact","Problem":"Problème","Type":"Type","Status":"Statut","Action":"Action","Complete":"Terminer","Done":"Terminé","Emergency Bed Status":"État des lits d'urgence","Total Beds":"Nombre total de lits","Occupied":"Occupés","Available":"Disponibles","Emergency Registration":"Enregistrement d'urgence","Emergency patients receive priority.":"Les patients en urgence sont prioritaires.","Emergency Problem":"Problème urgent","Emergency Care":"Soins d'urgence","Register Emergency Patient":"Enregistrer le patient en urgence"};
commonTranslations.es={"Home":"Inicio","Book Appointment":"Reservar cita","My Token":"Mi turno","Staff Dashboard":"Panel del personal","Emergency":"Emergencia","Book an Appointment":"Reservar una cita","Normal Patient":"Paciente normal","Specially-Abled Patient":"Paciente que requiere asistencia especial","Book Now":"Reservar ahora","Get Priority":"Obtener prioridad","Register Now":"Registrar ahora","OUR SERVICES":"NUESTROS SERVICIOS","How can we help you?":"¿Cómo podemos ayudarle?","Choose the service that best fits your needs.":"Elija el servicio que mejor se adapte a sus necesidades.","Secure":"Seguro","AI Powered":"Impulsado por IA","Less Waiting":"Menos espera","APPOINTMENT":"CITA","Book Your Appointment":"Reserve su cita","Simple & Fast":"Simple y rápido","Patient":"Paciente","Department":"Departamento","Doctor":"Médico","Details":"Detalles","Patient Type":"Tipo de paciente","Who are you booking the appointment for?":"¿Para quién está reservando la cita?","Standard medical consultation":"Consulta médica estándar","Priority assistance and support":"Asistencia prioritaria y apoyo","Select Department":"Seleccionar departamento","General Medicine":"Medicina general","Orthopedics":"Ortopedia","Cardiology":"Cardiología","Neurology":"Neurología","Choose Your Doctor":"Elija su médico","Compare doctors and waiting times.":"Compare médicos y tiempos de espera.","SMART PICK":"SELECCIÓN INTELIGENTE","Find Best Doctor":"Encontrar el mejor médico","Select a department first":"Primero seleccione un departamento","Available doctors will appear here.":"Los médicos disponibles aparecerán aquí.","No doctors available":"No hay médicos disponibles","Available":"Disponible","patients waiting":"pacientes esperando","Estimated wait":"Espera estimada","Select Doctor":"Seleccionar médico","Patient Details":"Datos del paciente","Basic Information":"Información básica","Patient Name":"Nombre del paciente","Age":"Edad","Gender":"Género","Male":"Hombre","Female":"Mujer","Other":"Otro","Mobile Number":"Número de móvil","Email":"Correo electrónico","Optional":"Opcional","Reason for Visit":"Motivo de la visita","Select Main Problem":"Seleccionar problema principal","Describe the Problem":"Describa el problema","Today":"Hoy","Medical Information":"Información médica","Existing Medical Conditions":"Enfermedades existentes","None":"Ninguna","Diabetes":"Diabetes","Hypertension":"Hipertensión","Asthma":"Asma","Heart Disease":"Enfermedad cardíaca","Allergies":"Alergias","No Known Allergies":"Sin alergias conocidas","Current Medications":"Medicamentos actuales","Ready to book?":"¿Listo para reservar?","Confirm Appointment":"Confirmar cita","YOUR APPOINTMENT":"SU CITA","Appointment Token":"Turno de cita","No appointment booked yet":"Aún no hay ninguna cita reservada","Book an appointment to receive your token.":"Reserve una cita para recibir su turno.","APPOINTMENT CONFIRMED":"CITA CONFIRMADA","Your Token Number":"Su número de turno","Estimated Waiting":"Espera estimada","Queue Overview":"Resumen de la cola","Total Patients":"Pacientes totales","Waiting":"En espera","Completed":"Completado","Available Beds":"Camas disponibles","Patient Queue":"Cola de pacientes","Token":"Turno","Contact":"Contacto","Problem":"Problema","Type":"Tipo","Status":"Estado","Action":"Acción","Complete":"Completar","Done":"Listo","Emergency Bed Status":"Estado de camas de emergencia","Total Beds":"Camas totales","Occupied":"Ocupadas","Available":"Disponibles","Emergency Registration":"Registro de emergencia","Emergency patients receive priority.":"Los pacientes de emergencia reciben prioridad.","Emergency Problem":"Problema de emergencia","Emergency Care":"Atención de emergencia","Register Emergency Patient":"Registrar paciente de emergencia"};

Object.assign(uiTranslations, commonTranslations);
const extraLabels = {
hi:{"REGULAR CARE":"नियमित देखभाल","PRIORITY CARE":"प्राथमिकता देखभाल","URGENT CARE":"तत्काल देखभाल","AI Recommendation:":"एआई सिफारिश:","Doctors available in":"इस विभाग में उपलब्ध डॉक्टर:","Click \"Find Best Doctor\" for an AI recommendation.":"एआई सिफारिश के लिए \"सर्वश्रेष्ठ डॉक्टर खोजें\" पर क्लिक करें।","is currently the best choice with an estimated waiting time of":"अभी सबसे अच्छा विकल्प है, अनुमानित प्रतीक्षा समय","selected. Estimated waiting time is":"चयनित किया गया। अनुमानित प्रतीक्षा समय है","min":"मिनट","minutes":"मिनट"},
od:{"REGULAR CARE":"ନିୟମିତ ଯତ୍ନ","PRIORITY CARE":"ପ୍ରାଥମିକତା ଯତ୍ନ","URGENT CARE":"ତୁରନ୍ତ ଯତ୍ନ","AI Recommendation:":"ଏଆଇ ସୁପାରିଶ:","Doctors available in":"ଏହି ବିଭାଗରେ ଉପଲବ୍ଧ ଡାକ୍ତର:","Click \"Find Best Doctor\" for an AI recommendation.":"ଏଆଇ ସୁପାରିଶ ପାଇଁ \"ଶ୍ରେଷ୍ଠ ଡାକ୍ତର ଖୋଜନ୍ତୁ\" ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।","is currently the best choice with an estimated waiting time of":"ବର୍ତ୍ତମାନ ସର୍ବୋତ୍ତମ ବିକଳ୍ପ, ଅନୁମାନିତ ଅପେକ୍ଷା ସମୟ","selected. Estimated waiting time is":"ଚୟନ କରାଗଲା। ଅନୁମାନିତ ଅପେକ୍ଷା ସମୟ","min":"ମିନିଟ୍","minutes":"ମିନିଟ୍"},
mr:{"REGULAR CARE":"नियमित सेवा","PRIORITY CARE":"प्राधान्य सेवा","URGENT CARE":"तातडीची सेवा","AI Recommendation:":"एआय शिफारस:","Doctors available in":"या विभागातील उपलब्ध डॉक्टर:","Click \"Find Best Doctor\" for an AI recommendation.":"एआय शिफारसीसाठी \"सर्वोत्तम डॉक्टर शोधा\" वर क्लिक करा.","is currently the best choice with an estimated waiting time of":"सध्या सर्वोत्तम पर्याय आहे, अंदाजे प्रतीक्षा वेळ","selected. Estimated waiting time is":"निवडले. अंदाजे प्रतीक्षा वेळ","min":"मिनिटे","minutes":"मिनिटे"},
ta:{"REGULAR CARE":"வழக்கமான பராமரிப்பு","PRIORITY CARE":"முன்னுரிமை பராமரிப்பு","URGENT CARE":"அவசர பராமரிப்பு","AI Recommendation:":"AI பரிந்துரை:","Doctors available in":"இந்தத் துறையில் கிடைக்கும் மருத்துவர்கள்:","Click \"Find Best Doctor\" for an AI recommendation.":"AI பரிந்துரைக்கு \"சிறந்த மருத்துவரைக் கண்டறியவும்\" என்பதைக் கிளிக் செய்யவும்.","is currently the best choice with an estimated waiting time of":"தற்போது சிறந்த தேர்வு, மதிப்பிடப்பட்ட காத்திருப்பு நேரம்","selected. Estimated waiting time is":"தேர்ந்தெடுக்கப்பட்டது. மதிப்பிடப்பட்ட காத்திருப்பு நேரம்","min":"நிமிடம்","minutes":"நிமிடங்கள்"},
te:{"REGULAR CARE":"సాధారణ సంరక్షణ","PRIORITY CARE":"ప్రాధాన్యత సంరక్షణ","URGENT CARE":"అత్యవసర సంరక్షణ","AI Recommendation:":"AI సిఫార్సు:","Doctors available in":"ఈ విభాగంలో అందుబాటులో ఉన్న డాక్టర్లు:","Click \"Find Best Doctor\" for an AI recommendation.":"AI సిఫార్సు కోసం \"ఉత్తమ డాక్టర్‌ను కనుగొనండి\" క్లిక్ చేయండి.","is currently the best choice with an estimated waiting time of":"ప్రస్తుతం ఉత్తమ ఎంపిక, అంచనా నిరీక్షణ సమయం","selected. Estimated waiting time is":"ఎంచుకోబడింది. అంచనా నిరీక్షణ సమయం","min":"నిమిషాలు","minutes":"నిమిషాలు"},
kn:{"REGULAR CARE":"ಸಾಮಾನ್ಯ ಆರೈಕೆ","PRIORITY CARE":"ಆದ್ಯತೆಯ ಆರೈಕೆ","URGENT CARE":"ತುರ್ತು ಆರೈಕೆ","AI Recommendation:":"AI ಶಿಫಾರಸು:","Doctors available in":"ಈ ವಿಭಾಗದಲ್ಲಿ ಲಭ್ಯವಿರುವ ವೈದ್ಯರು:","Click \"Find Best Doctor\" for an AI recommendation.":"AI ಶಿಫಾರಸಿಗಾಗಿ \"ಅತ್ಯುತ್ತಮ ವೈದ್ಯರನ್ನು ಹುಡುಕಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ.","is currently the best choice with an estimated waiting time of":"ಪ್ರಸ್ತುತ ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ, ಅಂದಾಜು ಕಾಯುವ ಸಮಯ","selected. Estimated waiting time is":"ಆಯ್ಕೆ ಮಾಡಲಾಗಿದೆ. ಅಂದಾಜು ಕಾಯುವ ಸಮಯ","min":"ನಿಮಿಷ","minutes":"ನಿಮಿಷಗಳು"},
gu:{"REGULAR CARE":"નિયમિત સંભાળ","PRIORITY CARE":"પ્રાથમિક સંભાળ","URGENT CARE":"તાત્કાલિક સંભાળ","AI Recommendation:":"AI ભલામણ:","Doctors available in":"આ વિભાગમાં ઉપલબ્ધ ડોક્ટરો:","Click \"Find Best Doctor\" for an AI recommendation.":"AI ભલામણ માટે \"શ્રેષ્ઠ ડોક્ટર શોધો\" પર ક્લિક કરો.","is currently the best choice with an estimated waiting time of":"હાલમાં શ્રેષ્ઠ વિકલ્પ, અંદાજિત રાહ સમય","selected. Estimated waiting time is":"પસંદ કરેલ. અંદાજિત રાહ સમય","min":"મિનિટ","minutes":"મિનિટ"},
pa:{"REGULAR CARE":"ਨਿਯਮਤ ਦੇਖਭਾਲ","PRIORITY CARE":"ਤਰਜੀਹੀ ਦੇਖਭਾਲ","URGENT CARE":"ਤੁਰੰਤ ਦੇਖਭਾਲ","AI Recommendation:":"AI ਸਿਫ਼ਾਰਸ਼:","Doctors available in":"ਇਸ ਵਿਭਾਗ ਵਿੱਚ ਉਪਲਬਧ ਡਾਕਟਰ:","Click \"Find Best Doctor\" for an AI recommendation.":"AI ਸਿਫ਼ਾਰਸ਼ ਲਈ \"ਸਭ ਤੋਂ ਵਧੀਆ ਡਾਕਟਰ ਲੱਭੋ\" ਤੇ ਕਲਿੱਕ ਕਰੋ।","is currently the best choice with an estimated waiting time of":"ਇਸ ਵੇਲੇ ਸਭ ਤੋਂ ਵਧੀਆ ਚੋਣ ਹੈ, ਅਨੁਮਾਨਿਤ ਉਡੀਕ ਸਮਾਂ","selected. Estimated waiting time is":"ਚੁਣਿਆ ਗਿਆ। ਅਨੁਮਾਨਿਤ ਉਡੀਕ ਸਮਾਂ","min":"ਮਿੰਟ","minutes":"ਮਿੰਟ"},
ur:{"REGULAR CARE":"معمول کی نگہداشت","PRIORITY CARE":"ترجیحی نگہداشت","URGENT CARE":"فوری نگہداشت","AI Recommendation:":"AI سفارش:","Doctors available in":"اس شعبے میں دستیاب ڈاکٹر:","Click \"Find Best Doctor\" for an AI recommendation.":"AI سفارش کے لیے \"بہترین ڈاکٹر تلاش کریں\" پر کلک کریں۔","is currently the best choice with an estimated waiting time of":"فی الحال بہترین انتخاب ہے، متوقع انتظار کا وقت","selected. Estimated waiting time is":"منتخب کیا گیا۔ متوقع انتظار کا وقت","min":"منٹ","minutes":"منٹ"},
fr:{"REGULAR CARE":"SOINS STANDARD","PRIORITY CARE":"SOINS PRIORITAIRES","URGENT CARE":"SOINS URGENTS","AI Recommendation:":"Recommandation IA :","Doctors available in":"Médecins disponibles dans ce service :","Click \"Find Best Doctor\" for an AI recommendation.":"Cliquez sur « Trouver le meilleur médecin » pour une recommandation IA.","is currently the best choice with an estimated waiting time of":"est actuellement le meilleur choix, avec un temps d'attente estimé de","selected. Estimated waiting time is":"sélectionné. Le temps d'attente estimé est de","min":"min","minutes":"minutes"},
es:{"REGULAR CARE":"ATENCIÓN REGULAR","PRIORITY CARE":"ATENCIÓN PRIORITARIA","URGENT CARE":"ATENCIÓN URGENTE","AI Recommendation:":"Recomendación de IA:","Doctors available in":"Médicos disponibles en este departamento:","Click \"Find Best Doctor\" for an AI recommendation.":"Haga clic en « Encontrar el mejor médico » para una recomendación de IA.","is currently the best choice with an estimated waiting time of":"es actualmente la mejor opción, con un tiempo de espera estimado de","selected. Estimated waiting time is":"seleccionado. El tiempo de espera estimado es de","min":"min","minutes":"minutos"}
};
Object.entries(extraLabels).forEach(([code, map]) => Object.assign(uiTranslations[code], map));

Object.keys(uiTranslations).forEach(code => {
    const d = uiTranslations[code];
    if (code === "en") {
        d["min"] = "min"; d["minutes"] = "minutes"; d["Doctors available in"] = "Doctors available in";
        d["Click \"Find Best Doctor\" for an AI recommendation."] = "Click \"Find Best Doctor\" for an AI recommendation.";
        d["is currently the best choice with an estimated waiting time of"] = "is currently the best choice with an estimated waiting time of";
        d["selected. Estimated waiting time is"] = "selected. Estimated waiting time is";
        d["AI Recommendation:"] = "AI Recommendation:";
    }
});


const languageNames = {
    en:"English", hi:"हिन्दी", od:"ଓଡ଼ିଆ", mr:"मराठी", ta:"தமிழ்", te:"తెలుగు", kn:"ಕನ್ನಡ", gu:"ગુજરાતી", pa:"ਪੰਜਾਬੀ", ur:"اردو", fr:"Français", es:"Español"
};

const translatePatterns = (text, dict) => {
    let m;
    if ((m = text.match(/^(\d+)\s*min$/i))) return `${m[1]} ${dict["min"] || "min"}`;
    if ((m = text.match(/^(\d+)\s*minutes$/i))) return `${m[1]} ${dict["minutes"] || "minutes"}`;
    if ((m = text.match(/^(\d+)\s+patients waiting$/i))) return `${m[1]} ${dict["patients waiting"] || "patients waiting"}`;
    if ((m = text.match(/^(\d+)\s+Patients$/i))) return `${m[1]} ${dict["Patients"] || "Patients"}`;
    if ((m = text.match(/^Doctors available in (.+)\. Click "Find Best Doctor" for an AI recommendation\.$/))) {
        return `${dict["Doctors available in"] || "Doctors available in"} ${dict[m[1]] || m[1]}. ${dict["Click \"Find Best Doctor\" for an AI recommendation."] || "Click \"Find Best Doctor\" for an AI recommendation."}`;
    }
    if ((m = text.match(/^(.+) is currently the best choice with an estimated waiting time of (\d+) minutes\.$/))) {
        return `${dict[m[1]] || m[1]} ${dict["is currently the best choice with an estimated waiting time of"] || "is currently the best choice with an estimated waiting time of"} ${m[2]} ${dict["minutes"] || "minutes"}.`;
    }
    if ((m = text.match(/^(.+) selected\. Estimated waiting time is (\d+) minutes\.$/))) {
        return `${dict[m[1]] || m[1]} ${dict["selected. Estimated waiting time is"] || "selected. Estimated waiting time is"} ${m[2]} ${dict["minutes"] || "minutes"}.`;
    }
    if ((m = text.match(/^AI Recommendation:\s*(.*)$/))) {
        return `${dict["AI Recommendation:"] || "AI Recommendation:"} ${m[1]}`;
    }
    return null;
};

function translateText(text) {
    const clean = text.trim();
    if (!clean) return text;
    const dict = uiTranslations[currentLanguage] || uiTranslations.en;
    const translated = dict[clean] || translatePatterns(clean, dict) || clean;
    return text.replace(clean, translated);
}

function applyTranslations(root = document.body) {
    if (!root) return;
    isApplyingTranslations = true;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (parent && ["SCRIPT","STYLE","NOSCRIPT"].includes(parent.tagName)) continue;
        if (parent && parent.closest("#languageSelect")) continue;
        if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
        nodes.push(node);
    }

    nodes.forEach(textNode => {
        const original = originalTextNodes.get(textNode);
        if (original) textNode.nodeValue = translateText(original);
    });

    root.querySelectorAll?.("input[placeholder], textarea[placeholder], [title], [aria-label]").forEach(el => {
        ["placeholder","title","aria-label"].forEach(attr => {
            if (!el.hasAttribute(attr)) return;
            if (!originalAttributes.has(el)) originalAttributes.set(el, {});
            const originals = originalAttributes.get(el);
            if (!(attr in originals)) originals[attr] = el.getAttribute(attr);
            const original = originals[attr];
            el.setAttribute(attr, translateText(original));
        });
    });

    isApplyingTranslations = false;
}

window.changeLanguage = function(language) {
    currentLanguage = uiTranslations[language] ? language : "en";
    localStorage.setItem("smartqueueLanguage", currentLanguage);

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ur" ? "rtl" : "ltr";
    document.title = translateText("SmartQueue - Smart Hospital Queue Management");

    const languageSelect = document.getElementById("languageSelect");
    if (languageSelect) languageSelect.value = currentLanguage;

    /* Translate the language selector labels too, while keeping each
       language's native spelling. */
    languageSelect?.querySelectorAll("option").forEach(option => {
        const code = option.value;
        option.textContent = languageNames[code] || option.textContent;
    });

    applyTranslations(document.body);
    updateDashboard();

    if (selectedDepartment && typeof window.loadDoctors === "function") {
        window.loadDoctors(selectedDepartment);
    }

};

/* Automatically translate newly generated cards, tables, token panels and
   emergency results. */
const translationObserver = new MutationObserver(mutations => {
    if (isApplyingTranslations || !uiTranslations[currentLanguage]) return;
    mutations.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === Node.ELEMENT_NODE) applyTranslations(n);
        else if (n.nodeType === Node.TEXT_NODE && !originalTextNodes.has(n)) {
            originalTextNodes.set(n, n.nodeValue);
            n.nodeValue = translateText(n.nodeValue);
        }
    }));
});

if (document.body) {
    translationObserver.observe(document.body, { childList: true, subtree: true });
}

/* Add the generic multilingual system on startup. */
document.addEventListener("DOMContentLoaded", function() {
    changeLanguage(localStorage.getItem("smartqueueLanguage") || "en");
});

/* =========================================================
   MOBILE NUMBER VALIDATION
========================================================= */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target.id ===
            "patientMobile" ||

            event.target.id ===
            "emergencyMobile"
        ) {

            event.target.value =
                event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }

    }
);


/* =========================================================
   DEPARTMENT CARD FALLBACK
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const card =
            event.target.closest(
                ".department-card"
            );


        if (!card) {
            return;
        }


        const value =
            card.dataset.department ||
            card.getAttribute(
                "data-department"
            );


        if (value) {

            window.selectDepartment(
                value
            );

        }

    }
);


/* =========================================================
   KEYBOARD SUPPORT FOR DEPARTMENT CARDS
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        const card =
            event.target.closest(
                ".department-card"
            );


        if (!card) {
            return;
        }


        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();


            const value =
                card.dataset.department ||
                card.getAttribute(
                    "data-department"
                );


            if (value) {

                window.selectDepartment(
                    value
                );

            }

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "SmartQueue initialized."
        );


        /* Load saved patients */

        loadPatients();


        /* Update dashboard */

        updateDashboard();


        /* Default patient type */

        const patientType =
            document.getElementById(
                "patientType"
            );

        if (patientType) {

            patientType.value =
                "normal";

        }


        /* Default department */

        const department =
            document.getElementById(
                "department"
            );


        if (department) {

            department.value =
                "";

        }


        /* Restore language */

        const savedLanguage =
            localStorage.getItem(
                "smartqueueLanguage"
            );


        const languageSelect =
            document.getElementById(
                "languageSelect"
            );


        if (
            savedLanguage &&
            languageSelect
        ) {

            languageSelect.value =
                savedLanguage;


            changeLanguage(
                savedLanguage
            );

        }

    }
);

/* Keep doctor cards and the token page synchronized while this tab is open. */
window.setInterval(function() {
    if (!patients.length) return;
    recalculateWaitingTimes(true);

    if (currentTokenPatientId != null) {
        const currentPatient = patients.find(p => p.id === currentTokenPatientId);
        if (currentPatient) showToken(currentPatient);
    }
}, 1000);