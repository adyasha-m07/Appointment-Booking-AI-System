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
            waiting: 10,
            patients: 4,
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },

        {
            id: "gm2",
            name: "Dr. Rajesh Kumar",
            specialization: "Internal Medicine",
            qualification: "MBBS, MD",
            experience: "15 Years Experience",
            waiting: 18,
            patients: 7,
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },

        {
            id: "gm3",
            name: "Dr. Priya Nair",
            specialization: "General Physician",
            qualification: "MBBS, DNB",
            experience: "9 Years Experience",
            waiting: 7,
            patients: 3,
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
            waiting: 15,
            patients: 6,
            image: "https://randomuser.me/api/portraits/men/46.jpg"
        },

        {
            id: "ortho2",
            name: "Dr. Sneha Patel",
            specialization: "Joint & Bone Specialist",
            qualification: "MBBS, MS Ortho",
            experience: "11 Years Experience",
            waiting: 9,
            patients: 4,
            image: "https://randomuser.me/api/portraits/women/65.jpg"
        },

        {
            id: "ortho3",
            name: "Dr. Vikram Singh",
            specialization: "Sports Orthopedics",
            qualification: "MBBS, DNB",
            experience: "16 Years Experience",
            waiting: 22,
            patients: 9,
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
            waiting: 20,
            patients: 8,
            image: "https://randomuser.me/api/portraits/men/41.jpg"
        },

        {
            id: "cardio2",
            name: "Dr. Meera Kapoor",
            specialization: "Interventional Cardiologist",
            qualification: "MBBS, MD, DM",
            experience: "13 Years Experience",
            waiting: 12,
            patients: 5,
            image: "https://randomuser.me/api/portraits/women/50.jpg"
        },

        {
            id: "cardio3",
            name: "Dr. Amit Malhotra",
            specialization: "Heart Specialist",
            qualification: "MBBS, MD",
            experience: "20 Years Experience",
            waiting: 28,
            patients: 11,
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
            waiting: 14,
            patients: 5,
            image: "https://randomuser.me/api/portraits/women/47.jpg"
        },

        {
            id: "neuro2",
            name: "Dr. Sandeep Joshi",
            specialization: "Neuro Physician",
            qualification: "MBBS, MD, DM",
            experience: "19 Years Experience",
            waiting: 19,
            patients: 7,
            image: "https://randomuser.me/api/portraits/men/68.jpg"
        },

        {
            id: "neuro3",
            name: "Dr. Riya Das",
            specialization: "Neurological Specialist",
            qualification: "MBBS, MD",
            experience: "10 Years Experience",
            waiting: 8,
            patients: 3,
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

    const doctorGrid =
        document.getElementById("doctorGrid");

    if (!doctorGrid) {
        return;
    }


    const doctorList =
        doctors[department];


    if (!doctorList || doctorList.length === 0) {

        doctorGrid.innerHTML = `

            <div class="empty-doctors">

                <div>👨‍⚕️</div>

                <h3>
                    No doctors available
                </h3>

                <p>
                    Please select another department.
                </p>

            </div>

        `;

        return;
    }


    doctorGrid.innerHTML = doctorList.map(doctor => `

        <div class="doctor-card"
             data-doctor-id="${doctor.id}"
             onclick="selectDoctor('${doctor.id}')">

            <div class="doctor-image-wrapper">

                <img
                    src="${doctor.image}"
                    alt="${doctor.name}"
                    class="doctor-image"
                    onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=5d3140&color=fff&size=200';"
                >

                <span class="doctor-status">
                    ● Available
                </span>

            </div>


            <div class="doctor-card-content">

                <div class="doctor-top">

                    <div>

                        <h3>
                            ${doctor.name}
                        </h3>

                        <p class="doctor-specialization">
                            ${doctor.specialization}
                        </p>

                    </div>

                    <span class="doctor-rating">
                        ⭐ 4.9
                    </span>

                </div>


                <p class="doctor-qualification">
                    ${doctor.qualification}
                </p>


                <div class="doctor-details">

                    <span>
                        🎓 ${doctor.experience}
                    </span>

                    <span>
                        👥 ${doctor.patients} patients waiting
                    </span>

                </div>


                <div class="doctor-bottom">

                    <div class="waiting-time">

                        <span>
                            ⏱️
                        </span>

                        <div>

                            <strong>
                                ${doctor.waiting} min
                            </strong>

                            <small>
                                Estimated wait
                            </small>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="doctor-select-button"
                        onclick="event.stopPropagation(); selectDoctor('${doctor.id}')">

                        Select Doctor

                    </button>

                </div>

            </div>

        </div>

    `).join("");


    console.log(
        "Doctors loaded for:",
        department
    );

};


/* =========================================================
   SELECT DOCTOR
========================================================= */

window.selectDoctor = function(doctorId) {

    const department =
        document.getElementById("department")?.value ||
        selectedDepartment;


    const doctorList =
        doctors[department] || [];


    const doctor =
        doctorList.find(d => d.id === doctorId);


    if (!doctor) {

        console.error(
            "Doctor not found:",
            doctorId,
            department
        );

        return;
    }


    selectedDoctor = doctorId;


    const doctorInput =
        document.getElementById("doctor");

    if (doctorInput) {
        doctorInput.value = doctor.name;
    }


    document
        .querySelectorAll(".doctor-card")
        .forEach(card => {

            card.classList.remove("selected");

        });


    const selectedCard =
        document.querySelector(
            `[data-doctor-id="${doctorId}"]`
        );


    if (selectedCard) {
        selectedCard.classList.add("selected");
    }


    const aiMessage =
        document.getElementById("aiMessage");

    if (aiMessage) {

        aiMessage.innerHTML =
            `✅ <strong>${doctor.name}</strong> selected. Estimated waiting time is ${doctor.waiting} minutes.`;

    }

};


/* =========================================================
   AI RECOMMENDATION
========================================================= */

window.getAIRecommendation = function() {

    /*
       ALWAYS READ THE REAL HTML FIELD.
       This prevents the "Please select a department"
       problem.
    */

    const department =
        document.getElementById("department")?.value?.trim();


    console.log(
        "AI Department:",
        department
    );


    if (!department) {

        alert("Please select a department first.");

        return;
    }


    const doctorList =
        doctors[department] || [];


    if (!doctorList.length) {
        alert("No doctors available for this department.");
        return;
    }


    const bestDoctor =
        [...doctorList].sort(
            (a, b) => a.waiting - b.waiting
        )[0];


    selectDoctor(bestDoctor.id);


    const aiMessage =
        document.getElementById("aiMessage");


    if (aiMessage) {

        aiMessage.innerHTML = `

            🤖 <strong>AI Recommendation:</strong>

            ${bestDoctor.name}
            is currently the best choice with an estimated
            waiting time of ${bestDoctor.waiting} minutes.

        `;

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


    const waiting =
        doctorObject
            ? doctorObject.waiting
            : 15;


    /* =====================================================
       CREATE PATIENT
    ===================================================== */

    const patient = {

        id: Date.now(),

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


    /* =====================================================
       SAVE TO LOCAL STORAGE
    ===================================================== */

    try {

        localStorage.setItem(
            "smartqueuePatients",
            JSON.stringify(patients)
        );

    } catch (error) {

        console.warn(
            "Could not save patients:",
            error
        );

    }


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

    try {

        const saved =
            localStorage.getItem(
                "smartqueuePatients"
            );


        if (saved) {

            patients =
                JSON.parse(saved);

        }

    } catch (error) {

        console.warn(
            "Could not load saved patients:",
            error
        );

        patients = [];

    }

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


    updateQueueTable();

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

    const patient =
        patients.find(
            p => p.id === id
        );


    if (!patient) {
        return;
    }


    patient.status =
        "Completed";


    completedPatients++;


    localStorage.setItem(
        "smartqueuePatients",
        JSON.stringify(patients)
    );


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


    localStorage.setItem(
        "smartqueuePatients",
        JSON.stringify(patients)
    );


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
   LANGUAGE SWITCHER
========================================================= */

window.changeLanguage = function(language) {

    console.log(
        "Language changed to:",
        language
    );


    localStorage.setItem(
        "smartqueueLanguage",
        language
    );


    const dictionary =
        translations[language] ||
        translations.en;


    /*
       Navigation
    */

    const navButtons =
        document.querySelectorAll(
            ".nav-button span"
        );


    if (navButtons.length >= 5) {

        navButtons[0].textContent =
            dictionary.home ||
            "Home";

        navButtons[1].textContent =
            dictionary.booking ||
            "Book Appointment";

        navButtons[2].textContent =
            dictionary.token ||
            "My Token";

        navButtons[3].textContent =
            dictionary.staff ||
            "Staff Dashboard";

        navButtons[4].textContent =
            dictionary.emergency ||
            "Emergency";

    }


    /*
       Hero
    */

    const heroBadge =
        document.querySelector(
            ".hero-badge"
        );

    if (heroBadge &&
        dictionary.heroBadge) {

        heroBadge.textContent =
            dictionary.heroBadge;

    }


    const heroTitle =
        document.querySelector(
            ".hero-content h2"
        );

    if (heroTitle &&
        dictionary.heroTitle) {

        heroTitle.textContent =
            dictionary.heroTitle;

    }


    const heroText =
        document.querySelector(
            ".hero-content p"
        );

    if (heroText &&
        dictionary.heroText) {

        heroText.textContent =
            dictionary.heroText;

    }


    const heroButton =
        document.querySelector(
            ".hero-button"
        );

    if (heroButton &&
        dictionary.heroButton) {

        const arrow =
            heroButton.querySelector("span");

        heroButton.textContent =
            dictionary.heroButton + " ";

        if (arrow) {
            heroButton.appendChild(arrow);
        }

    }


    /*
       Services
    */

    const serviceTitle =
        document.querySelector(
            ".section-title span"
        );

    if (serviceTitle &&
        dictionary.services) {

        serviceTitle.textContent =
            dictionary.services;

    }


    const serviceHeading =
        document.querySelector(
            ".section-title h2"
        );

    if (serviceHeading &&
        dictionary.servicesTitle) {

        serviceHeading.textContent =
            dictionary.servicesTitle;

    }


    const serviceDescription =
        document.querySelector(
            ".section-title p"
        );

    if (serviceDescription &&
        dictionary.servicesText) {

        serviceDescription.textContent =
            dictionary.servicesText;

    }


    /*
       Service Cards
    */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    if (serviceCards.length >= 3) {

        const normalHeading =
            serviceCards[0].querySelector("h3");

        const normalText =
            serviceCards[0].querySelector("p");

        const normalLink =
            serviceCards[0].querySelector(
                ".service-link"
            );


        if (normalHeading) {
            normalHeading.textContent =
                dictionary.normal ||
                "Normal Patient";
        }

        if (normalText) {
            normalText.textContent =
                dictionary.normalDesc ||
                "Book a regular consultation with a doctor of your choice.";
        }

        if (normalLink) {
            normalLink.textContent =
                dictionary.bookNow ||
                "Book Now →";
        }


        const specialHeading =
            serviceCards[1].querySelector("h3");

        const specialText =
            serviceCards[1].querySelector("p");

        const specialLink =
            serviceCards[1].querySelector(
                ".service-link"
            );


        if (specialHeading) {
            specialHeading.textContent =
                dictionary.special ||
                "Specially-Abled Patient";
        }

        if (specialText) {
            specialText.textContent =
                dictionary.specialDesc ||
                "Receive priority assistance and suitable doctor recommendations.";
        }

        if (specialLink) {
            specialLink.textContent =
                dictionary.priority ||
                "Get Priority →";
        }


        const emergencyHeading =
            serviceCards[2].querySelector("h3");

        const emergencyText =
            serviceCards[2].querySelector("p");

        const emergencyLink =
            serviceCards[2].querySelector(
                ".service-link"
            );


        if (emergencyHeading) {
            emergencyHeading.textContent =
                dictionary.emergencyTitle ||
                "Emergency";
        }

        if (emergencyText) {
            emergencyText.textContent =
                dictionary.emergencyDesc ||
                "Quickly register an emergency patient for immediate attention.";
        }

        if (emergencyLink) {
            emergencyLink.textContent =
                dictionary.registerNow ||
                "Register Now →";
        }

    }

};


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