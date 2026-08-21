/* =====================================================
   SMARTQUEUE JAVASCRIPT
   Beginner-friendly version
   No i18next
   No data-i18n
   ===================================================== */


/* =====================================================
   1. LANGUAGE SYSTEM
   ===================================================== */

let currentLanguage = "en";


function changeLanguage(language) {

    currentLanguage = language;


    if (language === "hi") {

        /* HEADER */

        document.getElementById("websiteName").textContent =
            "स्मार्टक्यू";

        document.getElementById("subtitle").textContent =
            "AI-संचालित अस्पताल कतार प्रबंधन";


        /* NAVIGATION */

        document.getElementById("navHome").textContent =
            "होम";

        document.getElementById("navBooking").textContent =
            "अपॉइंटमेंट बुक करें";

        document.getElementById("navToken").textContent =
            "मेरा टोकन";

        document.getElementById("navStaff").textContent =
            "स्टाफ डैशबोर्ड";

        document.getElementById("navEmergency").textContent =
            "आपातकाल";


        /* HOME */

        document.getElementById("homeTitle").textContent =
            "स्मार्टक्यू में आपका स्वागत है";

        document.getElementById("homeDescription").textContent =
            "प्रतीक्षा समय कम करने के लिए एक स्मार्ट अस्पताल कतार प्रबंधन प्रणाली।";

        document.getElementById("startButton").textContent =
            "अपॉइंटमेंट बुक करें";


        document.getElementById("normalTitle").textContent =
            "सामान्य मरीज";

        document.getElementById("normalDescription").textContent =
            "अपना अपॉइंटमेंट बुक करें और टोकन प्राप्त करें.";

        document.getElementById("specialTitle").textContent =
            "विशेष रूप से सक्षम मरीज";

        document.getElementById("specialDescription").textContent =
            "प्राथमिकता सहायता और उपयुक्त डॉक्टर प्राप्त करें.";

        document.getElementById("emergencyTitle").textContent =
            "आपातकाल";

        document.getElementById("emergencyDescription").textContent =
            "आपातकालीन मरीज को तुरंत पंजीकृत करें.";


        /* BOOKING */

        document.getElementById("bookingTitle").textContent =
            "अपॉइंटमेंट बुक करें";

        document.getElementById("bookingDescription").textContent =
            "मरीज का प्रकार चुनें और अपनी जानकारी दर्ज करें.";

        document.getElementById("patientTypeLabel").textContent =
            "मरीज का प्रकार";

        document.getElementById("nameLabel").textContent =
            "मरीज का नाम";

        document.getElementById("ageLabel").textContent =
            "उम्र";

        document.getElementById("departmentLabel").textContent =
            "विभाग";

        document.getElementById("doctorLabel").textContent =
            "डॉक्टर";

        document.getElementById("aiTitle").textContent =
            "🤖 AI सुझाव";

        document.getElementById("aiButton").textContent =
            "कम प्रतीक्षा वाले डॉक्टर को खोजें";

        document.getElementById("bookButton").textContent =
            "अपॉइंटमेंट बुक करें";


        document.getElementById("normalOption").textContent =
            "सामान्य मरीज";

        document.getElementById("specialOption").textContent =
            "विशेष रूप से सक्षम मरीज";


        /* TOKEN */

        document.getElementById("tokenTitle").textContent =
            "आपका अपॉइंटमेंट टोकन";

        document.getElementById("tokenDescription").textContent =
            "आपके अपॉइंटमेंट की जानकारी यहां दिखाई देगी.";


        /* STAFF */

        document.getElementById("staffTitle").textContent =
            "स्टाफ डैशबोर्ड";

        document.getElementById("staffDescription").textContent =
            "मरीजों और कतार की स्थिति देखें.";

        document.getElementById("thToken").textContent =
            "टोकन";

        document.getElementById("thName").textContent =
            "मरीज";

        document.getElementById("thDoctor").textContent =
            "डॉक्टर";

        document.getElementById("thType").textContent =
            "प्रकार";

        document.getElementById("thWaiting").textContent =
            "प्रतीक्षा समय";

        document.getElementById("thStatus").textContent =
            "स्थिति";

        document.getElementById("thAction").textContent =
            "कार्य";

        document.getElementById("bedTitle").textContent =
            "आपातकालीन बेड की स्थिति";

        document.getElementById("totalBedsText").textContent =
            "कुल बेड";

        document.getElementById("occupiedBedsText").textContent =
            "भरे हुए";

        document.getElementById("availableBedsText").textContent =
            "उपलब्ध";


        /* EMERGENCY */

        document.getElementById("emergencyPageTitle").textContent =
            "आपातकालीन पंजीकरण";

        document.getElementById("emergencyPageDescription").textContent =
            "आपातकालीन मरीज को तुरंत पंजीकृत करें.";

        document.getElementById("emergencyWarningTitle").textContent =
            "🚑 आपातकालीन मरीज";

        document.getElementById("emergencyWarning").textContent =
            "आपातकालीन मरीजों को अस्पताल की कतार में प्राथमिकता दी जाती है.";

        document.getElementById("emergencyNameLabel").textContent =
            "मरीज का नाम";

        document.getElementById("emergencyAgeLabel").textContent =
            "उम्र";

        document.getElementById("emergencyDepartmentLabel").textContent =
            "विभाग";

        document.getElementById("emergencyButton").textContent =
            "आपातकालीन मरीज पंजीकृत करें";

    }

    else {

        /* ENGLISH */

        document.getElementById("websiteName").textContent =
            "SmartQueue";

        document.getElementById("subtitle").textContent =
            "AI-Powered Hospital Queue Management";


        /* NAVIGATION */

        document.getElementById("navHome").textContent =
            "Home";

        document.getElementById("navBooking").textContent =
            "Book Appointment";

        document.getElementById("navToken").textContent =
            "My Token";

        document.getElementById("navStaff").textContent =
            "Staff Dashboard";

        document.getElementById("navEmergency").textContent =
            "Emergency";


        /* HOME */

        document.getElementById("homeTitle").textContent =
            "Welcome to SmartQueue";

        document.getElementById("homeDescription").textContent =
            "A smart hospital queue management system designed to reduce waiting time.";

        document.getElementById("startButton").textContent =
            "Book an Appointment";


        document.getElementById("normalTitle").textContent =
            "Normal Patient";

        document.getElementById("normalDescription").textContent =
            "Book your appointment and receive a token.";

        document.getElementById("specialTitle").textContent =
            "Specially-Abled Patient";

        document.getElementById("specialDescription").textContent =
            "Get priority assistance and a suitable doctor.";

        document.getElementById("emergencyTitle").textContent =
            "Emergency";

        document.getElementById("emergencyDescription").textContent =
            "Quickly register an emergency patient.";


        /* BOOKING */

        document.getElementById("bookingTitle").textContent =
            "Book Appointment";

        document.getElementById("bookingDescription").textContent =
            "Select your patient type and enter your details.";

        document.getElementById("patientTypeLabel").textContent =
            "Patient Type";

        document.getElementById("nameLabel").textContent =
            "Patient Name";

        document.getElementById("ageLabel").textContent =
            "Age";

        document.getElementById("departmentLabel").textContent =
            "Department";

        document.getElementById("doctorLabel").textContent =
            "Doctor";

        document.getElementById("aiTitle").textContent =
            "🤖 AI Recommendation";

        document.getElementById("aiButton").textContent =
            "Find Doctor With Less Waiting";

        document.getElementById("bookButton").textContent =
            "Book Appointment";


        document.getElementById("normalOption").textContent =
            "Normal Patient";

        document.getElementById("specialOption").textContent =
            "Specially-Abled Patient";


        /* TOKEN */

        document.getElementById("tokenTitle").textContent =
            "Your Appointment Token";

        document.getElementById("tokenDescription").textContent =
            "Your appointment details will appear here.";


        /* STAFF */

        document.getElementById("staffTitle").textContent =
            "Staff Dashboard";

        document.getElementById("staffDescription").textContent =
            "Monitor patients and queue status.";

        document.getElementById("thToken").textContent =
            "Token";

        document.getElementById("thName").textContent =
            "Patient";

        document.getElementById("thDoctor").textContent =
            "Doctor";

        document.getElementById("thType").textContent =
            "Type";

        document.getElementById("thWaiting").textContent =
            "Waiting Time";

        document.getElementById("thStatus").textContent =
            "Status";

        document.getElementById("thAction").textContent =
            "Action";

        document.getElementById("bedTitle").textContent =
            "Emergency Bed Status";

        document.getElementById("totalBedsText").textContent =
            "Total Beds";

        document.getElementById("occupiedBedsText").textContent =
            "Occupied";

        document.getElementById("availableBedsText").textContent =
            "Available";


        /* EMERGENCY */

        document.getElementById("emergencyPageTitle").textContent =
            "Emergency Registration";

        document.getElementById("emergencyPageDescription").textContent =
            "Register an emergency patient immediately.";

        document.getElementById("emergencyWarningTitle").textContent =
            "🚑 Emergency Patient";

        document.getElementById("emergencyWarning").textContent =
            "Emergency patients receive priority in the hospital queue.";

        document.getElementById("emergencyNameLabel").textContent =
            "Patient Name";

        document.getElementById("emergencyAgeLabel").textContent =
            "Age";

        document.getElementById("emergencyDepartmentLabel").textContent =
            "Department";

        document.getElementById("emergencyButton").textContent =
            "Register Emergency";
    }
}



/* =====================================================
   2. PAGE NAVIGATION
   ===================================================== */

function showPage(pageName) {

    let pages = document.querySelectorAll(".page");


    for (let i = 0; i < pages.length; i++) {

        pages[i].classList.remove("active");

    }


    document.getElementById(pageName)
        .classList.add("active");
}



/* =====================================================
   3. DOCTOR DATA
   ===================================================== */

const doctors = {

    "General Medicine": [
        {
            name: "Doctor A"
        },
        {
            name: "Doctor B"
        }
    ],

    "Orthopedics": [
        {
            name: "Doctor X"
        },
        {
            name: "Doctor Y"
        }
    ]

};



/* =====================================================
   4. QUEUE DATA
   ===================================================== */

let queue = [];
let currentPateint= null;

let tokenNumber = 1;
let totalBeds=20;
let occupiedBeds=5;
function updateBedStatus() {

    occupiedBeds++;

    let availableBeds = totalBeds - occupiedBeds;

    document.getElementById("occupiedBeds").textContent = occupiedBeds;
    document.getElementById("availableBeds").textContent = availableBeds;
}


/* Each patient is assumed to take 10 minutes */

const consultationTime = 10;



/* =====================================================
   5. LOAD DOCTORS
   ===================================================== */

function loadDoctors() {

    // Get the selected department
    const department =
        document.getElementById("department").value;

    // Get the doctor dropdown
    const doctorSelect =
        document.getElementById("doctor");


    // Remove the previous doctors
    doctorSelect.innerHTML =
        '<option value="">Select Doctor</option>';


    // If no department is selected, stop here
    if (department === "") {
        return;
    }


    // Get doctors belonging to this department
    const departmentDoctors =
        doctors[department];


    // Add each doctor to the dropdown
    departmentDoctors.forEach(function(doctor) {

        const option =
            document.createElement("option");

        option.value =
            doctor.name;

        option.textContent =
            doctor.name;

        doctorSelect.appendChild(option);

    });
updateAIMessage();

}
/* =====================================================
   6. PATIENT TYPE
   ===================================================== */

function patientTypeChanged() {

    let type =
        document.getElementById("patientType").value;


    if (type === "special") {

        document.getElementById("aiMessage").textContent =
            "Specially-abled patients receive priority assistance.";

    }

    else {

        updateAIMessage();

    }
}



/* =====================================================
   7. AI WAITING-TIME CALCULATION
   ===================================================== */

function calculateWaitingTime(doctorName, currentIndex = -1) {

    let patientsWaiting = queue.filter(function(patient, index) {

        return patient.doctor === doctorName &&
               patient.status !== "Completed" &&
               (currentIndex === -1 || index < currentIndex);

    });

    return patientsWaiting.length * consultationTime;
}



/* =====================================================
   8. AI DOCTOR RECOMMENDATION
   ===================================================== */

function getAIRecommendation() {

    const department =
        document.getElementById("department").value;


    if (department === "") {

        alert("Please select a department first.");

        return;
    }


    // Get doctors for the selected department
    const departmentDoctors =
        doctors[department];


    const doctor1 =
        departmentDoctors[0].name;

    const doctor2 =
        departmentDoctors[1].name;


    // Calculate waiting times
    const wait1 =
        calculateWaitingTime(doctor1);

    const wait2 =
        calculateWaitingTime(doctor2);


    // Find the doctor with less waiting
    let recommendedDoctor;

    let recommendedWait;


    if (wait1 <= wait2) {

        recommendedDoctor = doctor1;
        recommendedWait = wait1;

    } else {

        recommendedDoctor = doctor2;
        recommendedWait = wait2;

    }


    // Select the recommended doctor
    document.getElementById("doctor").value =
        recommendedDoctor;


    // Show AI recommendation
    document.getElementById("aiMessage").textContent =
        "AI recommends " +
        recommendedDoctor +
        " — estimated waiting time: " +
        recommendedWait +
        " min.";
}



/* =====================================================
   9. UPDATE AI MESSAGE
   ===================================================== */

function updateAIMessage() {

    const department =
        document.getElementById("department").value;

    const aiMessage =
        document.getElementById("aiMessage");


    // No department selected
    if (department === "") {

        aiMessage.textContent =
            "Select a department to see waiting times.";

        return;
    }


    // Get the two doctors of this department
    const departmentDoctors =
        doctors[department];


    const doctor1 =
        departmentDoctors[0].name;

    const doctor2 =
        departmentDoctors[1].name;


    // Calculate their individual waiting times
    const wait1 =
        calculateWaitingTime(doctor1);

    const wait2 =
        calculateWaitingTime(doctor2);


    // Display the waiting times
    aiMessage.innerHTML =
    "<strong>" + doctor1 + ":</strong> " + wait1 + " min<br>" +
    "<strong>" + doctor2 + ":</strong> " + wait2 + " min";
}



/* =====================================================
   10. BOOK APPOINTMENT
   ===================================================== */

function bookAppointment() {

    let name =
        document.getElementById("patientName").value;

    let age =
        document.getElementById("patientAge").value;

    let type =
        document.getElementById("patientType").value;

    let department =
        document.getElementById("department").value;

    let doctor =
        document.getElementById("doctor").value;


    if (name === "" ||
        age === "" ||
        department === "" ||
        doctor === "") {

        alert(
            "Please fill all the required fields."
        );

        return;
    }


    let waitingTime =
        calculateWaitingTime(doctor);


    let tokenPrefix;


    if (type === "special") {

        tokenPrefix = "S";

    }

    else {

        tokenPrefix = "N";

    }


    let token =
        tokenPrefix + tokenNumber;


    tokenNumber++;


    let patient = {

        token: token,

        name: name,

        age: age,

        type: type,

        department: department,

        doctor: doctor,

        waiting: waitingTime,

        status: "Processing"

    };


    queue.push(patient);
    currentPatient=patient;


    displayToken(patient);


    updateQueueTable();


    updateAIMessage();


    showPage("token");


    /* Clear form */

    document.getElementById("patientName").value =
        "";

    document.getElementById("patientAge").value =
        "";
}
/* =====================================================
   11. DISPLAY TOKEN
   ===================================================== */

function displayToken(patient) {

    let tokenResult =
        document.getElementById("tokenResult");


    let typeText;


    if (patient.type === "special") {

        typeText =
            "Specially-Abled Patient";

    }

    else {

        typeText =
            "Normal Patient";

    }


    tokenResult.innerHTML = `

        <h3>Appointment Confirmed</h3>

        <div class="token-number">
            ${patient.token}
        </div>

        <div class="token-info">

            <p>
                <strong>Patient:</strong>
                ${patient.name}
            </p>

            <p>
                <strong>Type:</strong>
                ${typeText}
            </p>

            <p>
                <strong>Department:</strong>
                ${patient.department}
            </p>

            <p>
                <strong>Doctor:</strong>
                ${patient.doctor}
            </p>

            <p>
                <strong>Estimated Waiting Time:</strong>
                ${patient.waiting} minutes
            </p>

            <p>
                <strong>Status:</strong>
                ${patient.status}
            </p>

        </div>

    `;
}



/* =====================================================
   12. STAFF QUEUE TABLE
   ===================================================== */

function updateQueueTable() {

    let table =
        document.getElementById("queueTable");


    table.innerHTML = "";


    for (let i = 0;
         i < queue.length;
         i++) {


        let patient =
            queue[i];


        let row =
            document.createElement("tr");


        let actionButton =
            `<button
                class="status-button"
                onclick="completePatient(${i})">
                Complete
             </button>`;


        row.innerHTML = `

            <td>${patient.token}</td>

            <td>${patient.name}</td>

            <td>${patient.doctor}</td>

            <td>${patient.type}</td>

            <td>${patient.waiting} min</td>

            <td>${patient.status}</td>

            <td>${actionButton}</td>

        `;


        table.appendChild(row);

    }
}



/* =====================================================
   13. COMPLETE PATIENT
   ===================================================== */

function completePatient(index) {

    queue[index].status =
        "Completed";


    updateQueueTable();


    /*
       Recalculate waiting times
       for remaining patients.
    */

    recalculateWaitingTimes();
    if (currentPatient) displayToken(currentPatient);


    updateQueueTable();


    updateAIMessage();
}



/* =====================================================
   14. RECALCULATE WAITING TIMES
   ===================================================== */

function recalculateWaitingTimes() {

    for (let i = 0;
         i < queue.length;
         i++) {

        if (queue[i].status !== "Completed") {

            queue[i].waiting =
                calculateWaitingTime(
                    queue[i].doctor, i
                );

        }
    }
}



/* =====================================================
   15. EMERGENCY REGISTRATION
   ===================================================== */

function registerEmergency() {

    let name =
        document.getElementById("emergencyName").value;

    let age =
        document.getElementById("emergencyAge").value;

    let department =
        document.getElementById("emergencyDepartment").value;


    if (name === "" || age === "") {

        alert(
            "Please enter the emergency patient's name and age."
        );

        return;
    }


    let token =
        "E" + tokenNumber;


    tokenNumber++;


    let emergencyPatient = {

        token: token,

        name: name,

        age: age,

        type: "Emergency",

        department: department,

        doctor: "Emergency Doctor",

        waiting: 0,

        status: "Processing"

    };


    /*
       Emergency patients are added
       with priority.
    */

    queue.unshift(emergencyPatient);
    updateBedStatus();

    document.getElementById(
        "emergencyResult"
    ).innerHTML = `

        <h3>Emergency Patient Registered</h3>

        <p>
            Token:
            <strong>${token}</strong>
        </p>

        <p>
            Patient:
            ${name}
        </p>

        <p>
            Priority:
            Emergency
        </p>

        <p>
            Waiting Time:
            0 minutes
        </p>

    `;


    updateQueueTable();


    document.getElementById("emergencyName").value =
        "";

    document.getElementById("emergencyAge").value =
        "";


    showPage("emergency");
}



/* =====================================================
   16. INITIAL PAGE
   ===================================================== */

showPage("home");

