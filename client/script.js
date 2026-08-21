/* =====================================================
   SMARTQUEUE
   MODERN FRONTEND JAVASCRIPT

   Beginner-friendly
   No external JS libraries
===================================================== */


/* =====================================================
   1. LANGUAGE SYSTEM
===================================================== */

let currentLanguage = "en";


const translations = {

    en: {

        subtitle: "AI-Powered Hospital Queue Management",

        home: "🏠 Home",
        booking: "📅 Book Appointment",
        myToken: "🎫 My Token",
        staff: "📊 Staff Dashboard",
        emergency: "🚑 Emergency",

        smartHealthcare: "Smart Healthcare • Less Waiting",

        welcome: "Healthcare that puts you first.",

        heroDescription:
            "Book appointments, find the right doctor, and manage your hospital visit with ease.",

        startBooking: "Book an Appointment",

        servicesLabel: "OUR SERVICES",
        howCanWeHelp: "How can we help you?",

        serviceDescription:
            "Choose the service that best fits your needs.",

        regularCare: "REGULAR CARE",

        normalPatient: "Normal Patient",

        normalDescription:
            "Book a regular consultation with a doctor of your choice.",

        bookNow: "Book Now",

        priorityCare: "PRIORITY CARE",

        specialPatient: "Specially-Abled Patient",

        specialDescription:
            "Receive priority assistance and suitable doctor recommendations.",

        getPriority: "Get Priority",

        urgentCare: "URGENT CARE",

        emergencyDescription:
            "Quickly register an emergency patient for immediate attention.",

        registerNow: "Register Now",

        secure: "Secure",
        secureText: "Your information stays protected",

        aiPowered: "AI Powered",
        aiText: "Smarter doctor recommendations",

        lessWaiting: "Less Waiting",
        waitingText: "Know your estimated waiting time",

        appointment: "APPOINTMENT",

        bookAppointment: "Book Your Appointment",

        bookingDescription:
            "Tell us what you need and we'll help you find the right doctor.",

        simpleFast: "Simple & Fast",

        choosePatientType: "Choose Patient Type",

        patientTypeDescription:
            "Select the option that best describes your visit.",

        normalChoiceText:
            "Standard medical consultation",

        specialChoiceText:
            "Priority assistance and support",

        chooseDepartment: "Choose Department",

        departmentDescription:
            "Select a department to see available doctors.",

        chooseDoctor: "Choose Your Doctor",

        doctorDescription:
            "Compare doctors and choose the one that suits you best.",

        aiRecommendation:
            "SmartQueue AI Recommendation",

        smartPick: "SMART PICK",

        selectDepartment:
            "Select a department to see doctor waiting times.",

        findBestDoctor:
            "Find Best Doctor",

        selectDepartmentFirst:
            "Select a department first",

        selectDepartmentText:
            "Available doctors will appear here.",

        patientDetails:
            "Patient Details",

        detailsDescription:
            "Enter the patient's basic information.",

        patientName:
            "Patient Name",

        age:
            "Age",

        patientNamePlaceholder:
            "Enter patient name",

        agePlaceholder:
            "Enter age",

        ready:
            "Ready to book?",

        reviewDetails:
            "Review your details before confirming.",

        confirmAppointment:
            "Confirm Appointment",

        yourAppointment:
            "YOUR APPOINTMENT",

        appointmentToken:
            "Appointment Token",

        tokenDescription:
            "Your appointment details will appear here.",

        noAppointment:
            "No appointment booked yet",

        bookToGetToken:
            "Book an appointment to receive your token.",

        staffDashboard:
            "STAFF DASHBOARD",

        queueOverview:
            "Queue Overview",

        staffDescription:
            "Monitor patients, doctors and hospital capacity.",

        live:
            "Live",

        totalPatients:
            "Total Patients",

        waiting:
            "Waiting",

        completed:
            "Completed",

        availableBeds:
            "Available Beds",

        patientQueue:
            "Patient Queue",

        queueDescription:
            "Current appointments and their status.",

        token:
            "Token",

        patient:
            "Patient",

        doctor:
            "Doctor",

        type:
            "Type",

        waitingTime:
            "Waiting",

        status:
            "Status",

        action:
            "Action",

        bedStatus:
            "Emergency Bed Status",

        bedDescription:
            "Current emergency department capacity.",

        totalBeds:
            "Total Beds",

        occupied:
            "Occupied",

        available:
            "Available",

        emergencyRegistration:
            "Emergency Registration",

        emergencyPageDescription:
            "Register an emergency patient immediately.",

        emergencyPriority:
            "Emergency patients receive priority.",

        emergencyPriorityText:
            "Please provide accurate information so hospital staff can respond quickly.",

        department:
            "Department",

        registerEmergency:
            "Register Emergency Patient"

    },


    hi: {

        subtitle: "AI-संचालित अस्पताल कतार प्रबंधन",

        home: "🏠 होम",
        booking: "📅 अपॉइंटमेंट",
        myToken: "🎫 मेरा टोकन",
        staff: "📊 स्टाफ डैशबोर्ड",
        emergency: "🚑 आपातकाल",

        smartHealthcare: "स्मार्ट हेल्थकेयर • कम प्रतीक्षा",

        welcome: "आपका स्वास्थ्य, हमारी प्राथमिकता।",

        heroDescription:
            "अपॉइंटमेंट बुक करें, सही डॉक्टर खोजें और अपनी अस्पताल यात्रा आसानी से प्रबंधित करें।",

        startBooking: "अपॉइंटमेंट बुक करें",

        servicesLabel: "हमारी सेवाएं",

        howCanWeHelp:
            "हम आपकी कैसे मदद कर सकते हैं?",

        serviceDescription:
            "अपनी आवश्यकता के अनुसार सेवा चुनें।",

        regularCare:
            "सामान्य देखभाल",

        normalPatient:
            "सामान्य मरीज",

        normalDescription:
            "अपनी पसंद के डॉक्टर से नियमित परामर्श बुक करें।",

        bookNow:
            "अभी बुक करें",

        priorityCare:
            "प्राथमिकता देखभाल",

        specialPatient:
            "विशेष रूप से सक्षम मरीज",

        specialDescription:
            "प्राथमिकता सहायता और उपयुक्त डॉक्टर की सलाह प्राप्त करें।",

        getPriority:
            "प्राथमिकता प्राप्त करें",

        urgentCare:
            "आपातकालीन देखभाल",

        emergencyDescription:
            "आपातकालीन मरीज को तुरंत पंजीकृत करें।",

        registerNow:
            "अभी पंजीकरण करें",

        secure:
            "सुरक्षित",

        secureText:
            "आपकी जानकारी सुरक्षित रहती है",

        aiPowered:
            "AI संचालित",

        aiText:
            "स्मार्ट डॉक्टर सुझाव",

        lessWaiting:
            "कम प्रतीक्षा",

        waitingText:
            "अनुमानित प्रतीक्षा समय जानें",

        appointment:
            "अपॉइंटमेंट",

        bookAppointment:
            "अपना अपॉइंटमेंट बुक करें",

        bookingDescription:
            "अपनी आवश्यकता बताएं और हम सही डॉक्टर खोजने में मदद करेंगे।",

        simpleFast:
            "आसान और तेज़",

        choosePatientType:
            "मरीज का प्रकार चुनें",

        patientTypeDescription:
            "अपनी यात्रा के अनुसार विकल्प चुनें।",

        normalChoiceText:
            "सामान्य चिकित्सा परामर्श",

        specialChoiceText:
            "प्राथमिकता सहायता",

        chooseDepartment:
            "विभाग चुनें",

        departmentDescription:
            "उपलब्ध डॉक्टर देखने के लिए विभाग चुनें।",

        chooseDoctor:
            "अपना डॉक्टर चुनें",

        doctorDescription:
            "डॉक्टरों की तुलना करें और अपनी पसंद चुनें।",

        aiRecommendation:
            "SmartQueue AI सुझाव",

        smartPick:
            "स्मार्ट चयन",

        findBestDoctor:
            "सर्वश्रेष्ठ डॉक्टर खोजें",

        patientDetails:
            "मरीज की जानकारी",

        patientName:
            "मरीज का नाम",

        age:
            "उम्र",

        patientNamePlaceholder:
            "मरीज का नाम दर्ज करें",

        agePlaceholder:
            "उम्र दर्ज करें",

        ready:
            "बुक करने के लिए तैयार?",

        confirmAppointment:
            "अपॉइंटमेंट की पुष्टि करें",

        yourAppointment:
            "आपका अपॉइंटमेंट",

        appointmentToken:
            "अपॉइंटमेंट टोकन",

        noAppointment:
            "अभी कोई अपॉइंटमेंट नहीं है",

        staffDashboard:
            "स्टाफ डैशबोर्ड",

        queueOverview:
            "कतार का विवरण",

        totalPatients:
            "कुल मरीज",

        waiting:
            "प्रतीक्षा",

        completed:
            "पूर्ण",

        availableBeds:
            "उपलब्ध बेड",

        patientQueue:
            "मरीजों की कतार",

        token:
            "टोकन",

        patient:
            "मरीज",

        doctor:
            "डॉक्टर",

        type:
            "प्रकार",

        waitingTime:
            "प्रतीक्षा",

        status:
            "स्थिति",

        action:
            "कार्य",

        bedStatus:
            "आपातकालीन बेड स्थिति",

        totalBeds:
            "कुल बेड",

        occupied:
            "भरे हुए",

        available:
            "उपलब्ध",

        emergencyRegistration:
            "आपातकालीन पंजीकरण",

        emergencyPageDescription:
            "आपातकालीन मरीज को तुरंत पंजीकृत करें।",

        emergencyPriority:
            "आपातकालीन मरीजों को प्राथमिकता दी जाती है।",

        emergencyPriorityText:
            "कृपया सही जानकारी दें ताकि अस्पताल कर्मचारी जल्दी सहायता कर सकें।",

        department:
            "विभाग",

        registerEmergency:
            "आपातकालीन मरीज पंजीकृत करें"

    },


    mr: {

        subtitle: "AI-संचालित रुग्णालय रांग व्यवस्थापन",

        home: "🏠 मुख्यपृष्ठ",
        booking: "📅 अपॉइंटमेंट",
        myToken: "🎫 माझे टोकन",
        staff: "📊 कर्मचारी डॅशबोर्ड",
        emergency: "🚑 आपत्कालीन",

        smartHealthcare: "स्मार्ट हेल्थकेअर • कमी प्रतीक्षा",

        welcome: "तुमचे आरोग्य, आमचे प्राधान्य.",

        heroDescription:
            "अपॉइंटमेंट बुक करा, योग्य डॉक्टर शोधा आणि रुग्णालयातील भेट सहज व्यवस्थापित करा.",

        startBooking:
            "अपॉइंटमेंट बुक करा",

        servicesLabel:
            "आमच्या सेवा",

        howCanWeHelp:
            "आम्ही तुमची कशी मदत करू शकतो?",

        serviceDescription:
            "तुमच्या गरजेनुसार सेवा निवडा.",

        regularCare:
            "सामान्य उपचार",

        normalPatient:
            "सामान्य रुग्ण",

        normalDescription:
            "तुमच्या पसंतीच्या डॉक्टरांसोबत नियमित सल्ला बुक करा.",

        bookNow:
            "आता बुक करा",

        priorityCare:
            "प्राधान्य उपचार",

        specialPatient:
            "विशेष सक्षम रुग्ण",

        specialDescription:
            "प्राधान्य सहाय्य आणि योग्य डॉक्टरांची शिफारस मिळवा.",

        getPriority:
            "प्राधान्य मिळवा",

        urgentCare:
            "आपत्कालीन उपचार",

        emergencyDescription:
            "आपत्कालीन रुग्णाची त्वरित नोंदणी करा.",

        registerNow:
            "आता नोंदणी करा",

        choosePatientType:
            "रुग्णाचा प्रकार निवडा",

        chooseDepartment:
            "विभाग निवडा",

        chooseDoctor:
            "डॉक्टर निवडा",

        patientDetails:
            "रुग्णाची माहिती",

        patientName:
            "रुग्णाचे नाव",

        age:
            "वय",

        confirmAppointment:
            "अपॉइंटमेंट निश्चित करा",

        appointmentToken:
            "अपॉइंटमेंट टोकन",

        staffDashboard:
            "कर्मचारी डॅशबोर्ड",

        queueOverview:
            "रांगेचा आढावा",

        totalPatients:
            "एकूण रुग्ण",

        waiting:
            "प्रतीक्षेत",

        completed:
            "पूर्ण",

        availableBeds:
            "उपलब्ध बेड",

        patientQueue:
            "रुग्णांची रांग",

        token:
            "टोकन",

        patient:
            "रुग्ण",

        doctor:
            "डॉक्टर",

        type:
            "प्रकार",

        waitingTime:
            "प्रतीक्षा",

        status:
            "स्थिती",

        action:
            "कृती",

        totalBeds:
            "एकूण बेड",

        occupied:
            "वापरात",

        available:
            "उपलब्ध",

        emergencyRegistration:
            "आपत्कालीन नोंदणी",

        department:
            "विभाग",

        registerEmergency:
            "आपत्कालीन रुग्णाची नोंदणी करा"

    },


    od: {

        subtitle:
            "AI ଚାଳିତ ହସ୍ପିଟାଲ୍ କ୍ୟୁ ପରିଚାଳନା",

        home:
            "🏠 ମୁଖ୍ୟ ପୃଷ୍ଠା",

        booking:
            "📅 ଆପଏଣ୍ଟମେଣ୍ଟ",

        myToken:
            "🎫 ମୋ ଟୋକେନ୍",

        staff:
            "📊 ଷ୍ଟାଫ୍ ଡ୍ୟାସବୋର୍ଡ",

        emergency:
            "🚑 ଜରୁରୀକାଳୀନ",

        smartHealthcare:
            "ସ୍ମାର୍ଟ ହେଲଥକେୟାର • କମ୍ ଅପେକ୍ଷା",

        welcome:
            "ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ, ଆମର ପ୍ରାଥମିକତା।",

        startBooking:
            "ଆପଏଣ୍ଟମେଣ୍ଟ ବୁକ୍ କରନ୍ତୁ",

        normalPatient:
            "ସାଧାରଣ ରୋଗୀ",

        specialPatient:
            "ବିଶେଷ ସକ୍ଷମ ରୋଗୀ",

        emergency:
            "🚑 ଜରୁରୀକାଳୀନ",

        bookNow:
            "ବର୍ତ୍ତମାନ ବୁକ୍ କରନ୍ତୁ",

        choosePatientType:
            "ରୋଗୀ ପ୍ରକାର ବାଛନ୍ତୁ",

        chooseDepartment:
            "ବିଭାଗ ବାଛନ୍ତୁ",

        chooseDoctor:
            "ଡାକ୍ତର ବାଛନ୍ତୁ",

        patientDetails:
            "ରୋଗୀ ସୂଚନା",

        patientName:
            "ରୋଗୀଙ୍କ ନାମ",

        age:
            "ବୟସ",

        confirmAppointment:
            "ଆପଏଣ୍ଟମେଣ୍ଟ ନିଶ୍ଚିତ କରନ୍ତୁ",

        appointmentToken:
            "ଆପଏଣ୍ଟମେଣ୍ଟ ଟୋକେନ୍",

        staffDashboard:
            "ଷ୍ଟାଫ୍ ଡ୍ୟାସବୋର୍ଡ",

        queueOverview:
            "କ୍ୟୁ ସମୀକ୍ଷା",

        totalPatients:
            "ମୋଟ ରୋଗୀ",

        waiting:
            "ଅପେକ୍ଷାରତ",

        completed:
            "ସମାପ୍ତ",

        availableBeds:
            "ଉପଲବ୍ଧ ବେଡ୍",

        patientQueue:
            "ରୋଗୀ କ୍ୟୁ",

        token:
            "ଟୋକେନ୍",

        patient:
            "ରୋଗୀ",

        doctor:
            "ଡାକ୍ତର",

        type:
            "ପ୍ରକାର",

        waitingTime:
            "ଅପେକ୍ଷା",

        status:
            "ସ୍ଥିତି",

        action:
            "କାର୍ଯ୍ୟ",

        totalBeds:
            "ମୋଟ ବେଡ୍",

        occupied:
            "ବ୍ୟବହୃତ",

        available:
            "ଉପଲବ୍ଧ",

        emergencyRegistration:
            "ଜରୁରୀକାଳୀନ ପଞ୍ଜୀକରଣ",

        department:
            "ବିଭାଗ",

        registerEmergency:
            "ଜରୁରୀକାଳୀନ ରୋଗୀ ପଞ୍ଜୀକରଣ କରନ୍ତୁ"

    },


    ta: {

        home: "🏠 முகப்பு",
        booking: "📅 சந்திப்பு பதிவு",
        myToken: "🎫 எனது டோக்கன்",
        staff: "📊 பணியாளர் டாஷ்போர்டு",
        emergency: "🚑 அவசரம்",

        normalPatient:
            "சாதாரண நோயாளி",

        specialPatient:
            "மாற்றுத்திறனாளி நோயாளி",

        emergency:
            "🚑 அவசரம்",

        bookNow:
            "இப்போது பதிவு செய்க",

        choosePatientType:
            "நோயாளி வகையைத் தேர்வு செய்யவும்",

        chooseDepartment:
            "துறையைத் தேர்வு செய்யவும்",

        chooseDoctor:
            "மருத்துவரைத் தேர்வு செய்யவும்",

        patientDetails:
            "நோயாளி விவரங்கள்",

        patientName:
            "நோயாளியின் பெயர்",

        age:
            "வயது",

        confirmAppointment:
            "சந்திப்பை உறுதி செய்க",

        appointmentToken:
            "சந்திப்பு டோக்கன்",

        staffDashboard:
            "பணியாளர் டாஷ்போர்டு",

        totalPatients:
            "மொத்த நோயாளிகள்",

        waiting:
            "காத்திருக்கின்றனர்",

        completed:
            "முடிந்தது",

        availableBeds:
            "கிடைக்கும் படுக்கைகள்",

        patientQueue:
            "நோயாளி வரிசை",

        token:
            "டோக்கன்",

        patient:
            "நோயாளி",

        doctor:
            "மருத்துவர்",

        type:
            "வகை",

        waitingTime:
            "காத்திருப்பு",

        status:
            "நிலை",

        action:
            "செயல்",

        totalBeds:
            "மொத்த படுக்கைகள்",

        occupied:
            "நிரம்பியுள்ளது",

        available:
            "கிடைக்கும்",

        emergencyRegistration:
            "அவசர பதிவு",

        department:
            "துறை",

        registerEmergency:
            "அவசர நோயாளியை பதிவு செய்க"

    },


    te: {

        home: "🏠 హోమ్",
        booking: "📅 అపాయింట్మెంట్",
        myToken: "🎫 నా టోకెన్",
        staff: "📊 స్టాఫ్ డ్యాష్‌బోర్డ్",
        emergency: "🚑 అత్యవసరం",

        normalPatient:
            "సాధారణ రోగి",

        specialPatient:
            "ప్రత్యేక అవసరాల రోగి",

        bookNow:
            "ఇప్పుడే బుక్ చేయండి",

        choosePatientType:
            "రోగి రకాన్ని ఎంచుకోండి",

        chooseDepartment:
            "విభాగాన్ని ఎంచుకోండి",

        chooseDoctor:
            "డాక్టర్‌ను ఎంచుకోండి",

        patientDetails:
            "రోగి వివరాలు",

        patientName:
            "రోగి పేరు",

        age:
            "వయస్సు",

        confirmAppointment:
            "అపాయింట్మెంట్ నిర్ధారించండి",

        appointmentToken:
            "అపాయింట్మెంట్ టోకెన్",

        staffDashboard:
            "స్టాఫ్ డ్యాష్‌బోర్డ్",

        totalPatients:
            "మొత్తం రోగులు",

        waiting:
            "వేచి ఉన్నారు",

        completed:
            "పూర్తయింది",

        availableBeds:
            "అందుబాటులో ఉన్న బెడ్లు",

        patientQueue:
            "రోగుల క్యూ",

        token:
            "టోకెన్",

        patient:
            "రోగి",

        doctor:
            "డాక్టర్",

        type:
            "రకం",

        waitingTime:
            "వేచి ఉండే సమయం",

        status:
            "స్థితి",

        action:
            "చర్య",

        totalBeds:
            "మొత్తం బెడ్లు",

        occupied:
            "ఆక్యుపైడ్",

        available:
            "అందుబాటులో",

        emergencyRegistration:
            "అత్యవసర నమోదు",

        department:
            "విభాగం",

        registerEmergency:
            "అత్యవసర రోగిని నమోదు చేయండి"

    },


    kn: {

        home: "🏠 ಮುಖಪುಟ",
        booking: "📅 ಅಪಾಯಿಂಟ್ಮೆಂಟ್",
        myToken: "🎫 ನನ್ನ ಟೋಕನ್",
        staff: "📊 ಸಿಬ್ಬಂದಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        emergency: "🚑 ತುರ್ತು",

        normalPatient:
            "ಸಾಮಾನ್ಯ ರೋಗಿ",

        specialPatient:
            "ವಿಶೇಷ ಅಗತ್ಯದ ರೋಗಿ",

        bookNow:
            "ಈಗ ಬುಕ್ ಮಾಡಿ",

        choosePatientType:
            "ರೋಗಿಯ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ",

        chooseDepartment:
            "ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ",

        chooseDoctor:
            "ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ",

        patientDetails:
            "ರೋಗಿಯ ವಿವರಗಳು",

        patientName:
            "ರೋಗಿಯ ಹೆಸರು",

        age:
            "ವಯಸ್ಸು",

        confirmAppointment:
            "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಖಚಿತಪಡಿಸಿ",

        appointmentToken:
            "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಟೋಕನ್",

        staffDashboard:
            "ಸಿಬ್ಬಂದಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",

        totalPatients:
            "ಒಟ್ಟು ರೋಗಿಗಳು",

        waiting:
            "ಕಾಯುತ್ತಿದ್ದಾರೆ",

        completed:
            "ಪೂರ್ಣಗೊಂಡಿದೆ",

        availableBeds:
            "ಲಭ್ಯವಿರುವ ಹಾಸಿಗೆಗಳು",

        patientQueue:
            "ರೋಗಿಗಳ ಸರದಿ",

        token:
            "ಟೋಕನ್",

        patient:
            "ರೋಗಿ",

        doctor:
            "ವೈದ್ಯರು",

        type:
            "ಪ್ರಕಾರ",

        waitingTime:
            "ಕಾಯುವ ಸಮಯ",

        status:
            "ಸ್ಥಿತಿ",

        action:
            "ಕ್ರಿಯೆ",

        totalBeds:
            "ಒಟ್ಟು ಹಾಸಿಗೆಗಳು",

        occupied:
            "ಬಳಕೆಯಲ್ಲಿದೆ",

        available:
            "ಲಭ್ಯ",

        emergencyRegistration:
            "ತುರ್ತು ನೋಂದಣಿ",

        department:
            "ವಿಭಾಗ",

        registerEmergency:
            "ತುರ್ತು ರೋಗಿಯನ್ನು ನೋಂದಾಯಿಸಿ"

    },


    gu: {

        home: "🏠 હોમ",
        booking: "📅 એપોઇન્ટમેન્ટ",
        myToken: "🎫 મારું ટોકન",
        staff: "📊 સ્ટાફ ડેશબોર્ડ",
        emergency: "🚑 ઇમરજન્સી",

        normalPatient:
            "સામાન્ય દર્દી",

        specialPatient:
            "વિશેષ જરૂરિયાત ધરાવતા દર્દી",

        bookNow:
            "હવે બુક કરો",

        choosePatientType:
            "દર્દીનો પ્રકાર પસંદ કરો",

        chooseDepartment:
            "વિભાગ પસંદ કરો",

        chooseDoctor:
            "ડોક્ટર પસંદ કરો",

        patientDetails:
            "દર્દીની વિગતો",

        patientName:
            "દર્દીનું નામ",

        age:
            "ઉંમર",

        confirmAppointment:
            "એપોઇન્ટમેન્ટની પુષ્ટિ કરો",

        appointmentToken:
            "એપોઇન્ટમેન્ટ ટોકન",

        staffDashboard:
            "સ્ટાફ ડેશબોર્ડ",

        totalPatients:
            "કુલ દર્દીઓ",

        waiting:
            "રાહ જોઈ રહ્યા છે",

        completed:
            "પૂર્ણ",

        availableBeds:
            "ઉપલબ્ધ બેડ",

        patientQueue:
            "દર્દીઓની કતાર",

        token:
            "ટોકન",

        patient:
            "દર્દી",

        doctor:
            "ડોક્ટર",

        type:
            "પ્રકાર",

        waitingTime:
            "રાહ સમય",

        status:
            "સ્થિતિ",

        action:
            "કાર્ય",

        totalBeds:
            "કુલ બેડ",

        occupied:
            "ભરેલા",

        available:
            "ઉપલબ્ધ",

        emergencyRegistration:
            "ઇમરજન્સી નોંધણી",

        department:
            "વિભાગ",

        registerEmergency:
            "ઇમરજન્સી દર્દીની નોંધણી કરો"

    },


    pa: {

        home: "🏠 ਹੋਮ",
        booking: "📅 ਅਪਾਇੰਟਮੈਂਟ",
        myToken: "🎫 ਮੇਰਾ ਟੋਕਨ",
        staff: "📊 ਸਟਾਫ ਡੈਸ਼ਬੋਰਡ",
        emergency: "🚑 ਐਮਰਜੈਂਸੀ",

        normalPatient:
            "ਆਮ ਮਰੀਜ਼",

        specialPatient:
            "ਵਿਸ਼ੇਸ਼ ਲੋੜਾਂ ਵਾਲਾ ਮਰੀਜ਼",

        bookNow:
            "ਹੁਣੇ ਬੁੱਕ ਕਰੋ",

        choosePatientType:
            "ਮਰੀਜ਼ ਦੀ ਕਿਸਮ ਚੁਣੋ",

        chooseDepartment:
            "ਵਿਭਾਗ ਚੁਣੋ",

        chooseDoctor:
            "ਡਾਕਟਰ ਚੁਣੋ",

        patientDetails:
            "ਮਰੀਜ਼ ਦੇ ਵੇਰਵੇ",

        patientName:
            "ਮਰੀਜ਼ ਦਾ ਨਾਮ",

        age:
            "ਉਮਰ",

        confirmAppointment:
            "ਅਪਾਇੰਟਮੈਂਟ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",

        appointmentToken:
            "ਅਪਾਇੰਟਮੈਂਟ ਟੋਕਨ",

        staffDashboard:
            "ਸਟਾਫ ਡੈਸ਼ਬੋਰਡ",

        totalPatients:
            "ਕੁੱਲ ਮਰੀਜ਼",

        waiting:
            "ਉਡੀਕ ਵਿੱਚ",

        completed:
            "ਪੂਰਾ",

        availableBeds:
            "ਉਪਲਬਧ ਬੈੱਡ",

        patientQueue:
            "ਮਰੀਜ਼ਾਂ ਦੀ ਕਤਾਰ",

        token:
            "ਟੋਕਨ",

        patient:
            "ਮਰੀਜ਼",

        doctor:
            "ਡਾਕਟਰ",

        type:
            "ਕਿਸਮ",

        waitingTime:
            "ਉਡੀਕ ਸਮਾਂ",

        status:
            "ਸਥਿਤੀ",

        action:
            "ਕਾਰਵਾਈ",

        totalBeds:
            "ਕੁੱਲ ਬੈੱਡ",

        occupied:
            "ਭਰੇ ਹੋਏ",

        available:
            "ਉਪਲਬਧ",

        emergencyRegistration:
            "ਐਮਰਜੈਂਸੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ",

        department:
            "ਵਿਭਾਗ",

        registerEmergency:
            "ਐਮਰਜੈਂਸੀ ਮਰੀਜ਼ ਰਜਿਸਟਰ ਕਰੋ"

    },


    ur: {

        home: "🏠 ہوم",
        booking: "📅 اپائنٹمنٹ",
        myToken: "🎫 میرا ٹوکن",
        staff: "📊 اسٹاف ڈیش بورڈ",
        emergency: "🚑 ایمرجنسی",

        normalPatient:
            "عام مریض",

        specialPatient:
            "خصوصی ضروریات والا مریض",

        bookNow:
            "ابھی بک کریں",

        choosePatientType:
            "مریض کی قسم منتخب کریں",

        chooseDepartment:
            "شعبہ منتخب کریں",

        chooseDoctor:
            "ڈاکٹر منتخب کریں",

        patientDetails:
            "مریض کی معلومات",

        patientName:
            "مریض کا نام",

        age:
            "عمر",

        confirmAppointment:
            "اپائنٹمنٹ کی تصدیق کریں",

        appointmentToken:
            "اپائنٹمنٹ ٹوکن",

        staffDashboard:
            "اسٹاف ڈیش بورڈ",

        totalPatients:
            "کل مریض",

        waiting:
            "انتظار",

        completed:
            "مکمل",

        availableBeds:
            "دستیاب بیڈ",

        patientQueue:
            "مریضوں کی قطار",

        token:
            "ٹوکن",

        patient:
            "مریض",

        doctor:
            "ڈاکٹر",

        type:
            "قسم",

        waitingTime:
            "انتظار کا وقت",

        status:
            "حالت",

        action:
            "کارروائی",

        totalBeds:
            "کل بیڈ",

        occupied:
            "مصروف",

        available:
            "دستیاب",

        emergencyRegistration:
            "ایمرجنسی رجسٹریشن",

        department:
            "شعبہ",

        registerEmergency:
            "ایمرجنسی مریض رجسٹر کریں"

    },


    fa: {

        home: "🏠 خانه",
        booking: "📅 رزرو نوبت",
        myToken: "🎫 نوبت من",
        staff: "📊 داشبورد کارکنان",
        emergency: "🚑 اورژانس",

        normalPatient:
            "بیمار عادی",

        specialPatient:
            "بیمار دارای نیاز ویژه",

        bookNow:
            "اکنون رزرو کنید",

        choosePatientType:
            "نوع بیمار را انتخاب کنید",

        chooseDepartment:
            "بخش را انتخاب کنید",

        chooseDoctor:
            "پزشک را انتخاب کنید",

        patientDetails:
            "اطلاعات بیمار",

        patientName:
            "نام بیمار",

        age:
            "سن",

        confirmAppointment:
            "تأیید نوبت",

        appointmentToken:
            "کد نوبت",

        staffDashboard:
            "داشبورد کارکنان",

        totalPatients:
            "کل بیماران",

        waiting:
            "در انتظار",

        completed:
            "تکمیل شده",

        availableBeds:
            "تخت‌های موجود",

        patientQueue:
            "صف بیماران",

        token:
            "توکن",

        patient:
            "بیمار",

        doctor:
            "پزشک",

        type:
            "نوع",

        waitingTime:
            "زمان انتظار",

        status:
            "وضعیت",

        action:
            "عملیات",

        totalBeds:
            "کل تخت‌ها",

        occupied:
            "اشغال",

        available:
            "موجود",

        emergencyRegistration:
            "ثبت اورژانسی",

        department:
            "بخش",

        registerEmergency:
            "ثبت بیمار اورژانسی"

    },


    fr: {

        home: "🏠 Accueil",
        booking: "📅 Rendez-vous",
        myToken: "🎫 Mon ticket",
        staff: "📊 Tableau du personnel",
        emergency: "🚑 Urgence",

        normalPatient:
            "Patient normal",

        specialPatient:
            "Patient à besoins spéciaux",

        bookNow:
            "Réserver maintenant",

        choosePatientType:
            "Choisir le type de patient",

        chooseDepartment:
            "Choisir le service",

        chooseDoctor:
            "Choisir votre médecin",

        patientDetails:
            "Informations du patient",

        patientName:
            "Nom du patient",

        age:
            "Âge",

        confirmAppointment:
            "Confirmer le rendez-vous",

        appointmentToken:
            "Ticket de rendez-vous",

        staffDashboard:
            "Tableau du personnel",

        totalPatients:
            "Total des patients",

        waiting:
            "En attente",

        completed:
            "Terminé",

        availableBeds:
            "Lits disponibles",

        patientQueue:
            "File des patients",

        token:
            "Ticket",

        patient:
            "Patient",

        doctor:
            "Médecin",

        type:
            "Type",

        waitingTime:
            "Attente",

        status:
            "Statut",

        action:
            "Action",

        totalBeds:
            "Lits totaux",

        occupied:
            "Occupés",

        available:
            "Disponibles",

        emergencyRegistration:
            "Inscription d'urgence",

        department:
            "Service",

        registerEmergency:
            "Inscrire le patient en urgence"

    },


    es: {

        home: "🏠 Inicio",
        booking: "📅 Cita",
        myToken: "🎫 Mi turno",
        staff: "📊 Panel del personal",
        emergency: "🚑 Emergencia",

        normalPatient:
            "Paciente normal",

        specialPatient:
            "Paciente con necesidades especiales",

        bookNow:
            "Reservar ahora",

        choosePatientType:
            "Elegir tipo de paciente",

        chooseDepartment:
            "Elegir departamento",

        chooseDoctor:
            "Elegir médico",

        patientDetails:
            "Datos del paciente",

        patientName:
            "Nombre del paciente",

        age:
            "Edad",

        confirmAppointment:
            "Confirmar cita",

        appointmentToken:
            "Turno de cita",

        staffDashboard:
            "Panel del personal",

        totalPatients:
            "Total de pacientes",

        waiting:
            "Esperando",

        completed:
            "Completados",

        availableBeds:
            "Camas disponibles",

        patientQueue:
            "Cola de pacientes",

        token:
            "Turno",

        patient:
            "Paciente",

        doctor:
            "Médico",

        type:
            "Tipo",

        waitingTime:
            "Espera",

        status:
            "Estado",

        action:
            "Acción",

        totalBeds:
            "Camas totales",

        occupied:
            "Ocupadas",

        available:
            "Disponibles",

        emergencyRegistration:
            "Registro de emergencia",

        department:
            "Departamento",

        registerEmergency:
            "Registrar paciente de emergencia"

    },


    de: {

        home: "🏠 Startseite",
        booking: "📅 Termin buchen",
        myToken: "🎫 Mein Ticket",
        staff: "📊 Mitarbeiter-Dashboard",
        emergency: "🚑 Notfall",

        normalPatient:
            "Normaler Patient",

        specialPatient:
            "Patient mit besonderen Bedürfnissen",

        bookNow:
            "Jetzt buchen",

        choosePatientType:
            "Patiententyp auswählen",

        chooseDepartment:
            "Abteilung auswählen",

        chooseDoctor:
            "Arzt auswählen",

        patientDetails:
            "Patientendaten",

        patientName:
            "Patientenname",

        age:
            "Alter",

        confirmAppointment:
            "Termin bestätigen",

        appointmentToken:
            "Termin-Ticket",

        staffDashboard:
            "Mitarbeiter-Dashboard",

        totalPatients:
            "Patienten insgesamt",

        waiting:
            "Wartend",

        completed:
            "Abgeschlossen",

        availableBeds:
            "Verfügbare Betten",

        patientQueue:
            "Patientenwarteschlange",

        token:
            "Ticket",

        patient:
            "Patient",

        doctor:
            "Arzt",

        type:
            "Typ",

        waitingTime:
            "Wartezeit",

        status:
            "Status",

        action:
            "Aktion",

        totalBeds:
            "Betten insgesamt",

        occupied:
            "Belegt",

        available:
            "Verfügbar",

        emergencyRegistration:
            "Notfallregistrierung",

        department:
            "Abteilung",

        registerEmergency:
            "Notfallpatient registrieren"

    }

};


/* =====================================================
   2. DOCTOR DATA
===================================================== */

const doctors = {

    "General Medicine": [

        {
            name: "Dr. Ananya Sharma",
            specialty: "General Medicine",
            experience: "12 years",
            rating: "4.9",
            waiting: 10,
            available: true,
            image: "https://i.pravatar.cc/400?img=47"
        },

        {
            name: "Dr. Rahul Mehta",
            specialty: "General Medicine",
            experience: "9 years",
            rating: "4.8",
            waiting: 20,
            available: true,
            image: "https://i.pravatar.cc/400?img=12"
        },

        {
            name: "Dr. Priya Nair",
            specialty: "General Medicine",
            experience: "7 years",
            rating: "4.7",
            waiting: 30,
            available: true,
            image: "https://i.pravatar.cc/400?img=32"
        }

    ],


    "Orthopedics": [

        {
            name: "Dr. Arjun Kapoor",
            specialty: "Orthopedic Specialist",
            experience: "15 years",
            rating: "4.9",
            waiting: 15,
            available: true,
            image: "https://i.pravatar.cc/400?img=11"
        },

        {
            name: "Dr. Neha Verma",
            specialty: "Orthopedic Specialist",
            experience: "10 years",
            rating: "4.8",
            waiting: 25,
            available: true,
            image: "https://i.pravatar.cc/400?img=44"
        },

        {
            name: "Dr. Vikram Singh",
            specialty: "Orthopedic Specialist",
            experience: "8 years",
            rating: "4.6",
            waiting: 35,
            available: true,
            image: "https://i.pravatar.cc/400?img=68"
        }

    ],


    "Cardiology": [

        {
            name: "Dr. Rohan Desai",
            specialty: "Cardiologist",
            experience: "16 years",
            rating: "4.9",
            waiting: 20,
            available: true,
            image: "https://i.pravatar.cc/400?img=13"
        },

        {
            name: "Dr. Meera Joshi",
            specialty: "Cardiologist",
            experience: "13 years",
            rating: "4.8",
            waiting: 30,
            available: true,
            image: "https://i.pravatar.cc/400?img=49"
        }

    ],


    "Neurology": [

        {
            name: "Dr. Karan Malhotra",
            specialty: "Neurologist",
            experience: "14 years",
            rating: "4.9",
            waiting: 15,
            available: true,
            image: "https://i.pravatar.cc/400?img=60"
        },

        {
            name: "Dr. Sneha Rao",
            specialty: "Neurologist",
            experience: "11 years",
            rating: "4.8",
            waiting: 25,
            available: true,
            image: "https://i.pravatar.cc/400?img=45"
        }

    ]

};


/* =====================================================
   3. DEPARTMENT DATA
===================================================== */

const departments = [

    {
        name: "General Medicine",
        icon: "🩺",
        description: "General health & consultation"
    },

    {
        name: "Orthopedics",
        icon: "🦴",
        description: "Bones, joints & muscles"
    },

    {
        name: "Cardiology",
        icon: "❤️",
        description: "Heart & cardiovascular care"
    },

    {
        name: "Neurology",
        icon: "🧠",
        description: "Brain & nervous system"
    }

];


/* =====================================================
   4. QUEUE
===================================================== */

let queue = [];

let currentPatient = null;

let tokenNumber = 1;

let totalBeds = 20;

let occupiedBeds = 5;

const consultationTime = 10;


/* =====================================================
   5. LANGUAGE
===================================================== */

function changeLanguage(language) {

    currentLanguage = language;

    const languageData =
        translations[language] || translations.en;


    /* Change regular text */

    document
        .querySelectorAll("[data-i18n]")
        .forEach(function(element) {

            const key =
                element.getAttribute("data-i18n");

            if (languageData[key]) {

                element.textContent =
                    languageData[key];

            }

        });


    /* Change placeholders */

    document
        .querySelectorAll("[data-placeholder]")
        .forEach(function(element) {

            const key =
                element.getAttribute("data-placeholder");

            if (languageData[key]) {

                element.placeholder =
                    languageData[key];

            }

        });


    document.documentElement.lang =
        language;


    /* Urdu / Persian direction */

    if (
        language === "ur" ||
        language === "fa"
    ) {

        document.body.dir = "rtl";

    } else {

        document.body.dir = "ltr";

    }

}


/* =====================================================
   6. NAVIGATION
===================================================== */

function showPage(pageName, clickedButton = null) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageName);


    if (target) {

        target.classList.add("active");

    }


    const buttons =
        document.querySelectorAll(".nav-button");


    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        buttons.forEach(function(button) {

            const onclick =
                button.getAttribute("onclick") || "";

            if (
                onclick.includes(
                    "showPage('" + pageName
                )
            ) {

                button.classList.add("active");

            }

        });

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   7. OPEN BOOKING
===================================================== */

function openBooking(type) {

    showPage("booking");


    selectPatientType(type);


    const bookingButton =
        document.querySelector(
            '[onclick*="showPage(\'booking\'"]'
        );


    if (bookingButton) {

        document
            .querySelectorAll(".nav-button")
            .forEach(function(button) {

                button.classList.remove("active");

            });

        bookingButton.classList.add("active");

    }

}


/* =====================================================
   8. PATIENT TYPE
===================================================== */

function selectPatientType(type) {

    document.getElementById("patientType").value =
        type;


    const normalCard =
        document.getElementById("normalChoice");

    const specialCard =
        document.getElementById("specialChoice");


    normalCard.classList.remove("selected");

    specialCard.classList.remove("selected");


    if (type === "normal") {

        normalCard.classList.add("selected");

    } else {

        specialCard.classList.add("selected");

    }

}


/* =====================================================
   9. RENDER DEPARTMENTS
===================================================== */

function renderDepartments() {

    const grid =
        document.getElementById("departmentGrid");


    grid.innerHTML = "";


    departments.forEach(function(department) {

        const card =
            document.createElement("div");


        card.className =
            "department-card";


        card.onclick =
            function() {

                selectDepartment(
                    department.name,
                    card
                );

            };


        card.innerHTML = `

            <div class="department-icon">
                ${department.icon}
            </div>

            <h4>
                ${department.name}
            </h4>

            <p>
                ${department.description}
            </p>

        `;


        grid.appendChild(card);

    });

}


/* =====================================================
   10. SELECT DEPARTMENT
===================================================== */

function selectDepartment(
    departmentName,
    selectedCard
) {

    document.getElementById("department").value =
        departmentName;


    document
        .querySelectorAll(".department-card")
        .forEach(function(card) {

            card.classList.remove("selected");

        });


    selectedCard.classList.add("selected");


    renderDoctors(departmentName);

    updateAIMessage();

}


/* =====================================================
   11. RENDER DOCTORS
===================================================== */

function renderDoctors(departmentName) {

    const grid =
        document.getElementById("doctorGrid");


    grid.innerHTML = "";


    const departmentDoctors =
        doctors[departmentName] || [];


    if (departmentDoctors.length === 0) {

        grid.innerHTML = `

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


    departmentDoctors.forEach(function(
        doctor,
        index
    ) {

        const card =
            document.createElement("div");


        card.className =
            "doctor-card";


        card.setAttribute(
            "data-doctor",
            doctor.name
        );


        card.onclick =
            function() {

                selectDoctor(
                    doctor.name,
                    card
                );

            };


        const recommended =
            index === 0;


        card.innerHTML = `

            ${
                recommended
                ?
                `<div class="recommended-badge">
                    ✨ AI Recommended
                 </div>`
                :
                ""
            }

            <div class="doctor-photo">

                <img
                    src="${doctor.image}"
                    alt="${doctor.name}"
                    onerror="this.src='https://i.pravatar.cc/400?img=1'"
                >

            </div>


            <div class="doctor-details">

                <div class="doctor-name">
                    ${doctor.name}
                </div>

                <div class="doctor-specialty">
                    ${doctor.specialty}
                </div>


                <div class="doctor-meta">

                    <span class="doctor-wait">
                        ⏱ ${doctor.waiting} min
                    </span>

                    <span class="doctor-rating">
                        ⭐ ${doctor.rating}
                    </span>

                </div>


                <div class="doctor-meta">

                    <span class="available">
                        ● Available
                    </span>

                    <span>
                        ${doctor.experience}
                    </span>

                </div>


                <button
                    class="select-doctor-button"
                    type="button">

                    Select Doctor

                </button>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =====================================================
   12. SELECT DOCTOR
===================================================== */

function selectDoctor(
    doctorName,
    selectedCard
) {

    document.getElementById("doctor").value =
        doctorName;


    document
        .querySelectorAll(".doctor-card")
        .forEach(function(card) {

            card.classList.remove("selected");


            const button =
                card.querySelector(
                    ".select-doctor-button"
                );


            if (button) {

                button.textContent =
                    "Select Doctor";

            }

        });


    selectedCard.classList.add("selected");


    const selectedButton =
        selectedCard.querySelector(
            ".select-doctor-button"
        );


    if (selectedButton) {

        selectedButton.textContent =
            "✓ Doctor Selected";

    }

}


/* =====================================================
   13. WAITING TIME
===================================================== */

function calculateWaitingTime(
    doctorName,
    currentIndex = -1
) {

    const patientsWaiting =
        queue.filter(function(
            patient,
            index
        ) {

            return (

                patient.doctor === doctorName &&

                patient.status !== "Completed" &&

                (
                    currentIndex === -1 ||
                    index < currentIndex
                )

            );

        });


    const baseDoctor =
        Object.values(doctors)
            .flat()
            .find(function(doctor) {

                return doctor.name === doctorName;

            });


    const baseWait =
        baseDoctor
        ? baseDoctor.waiting
        : 0;


    return baseWait +
        (
            patientsWaiting.length *
            consultationTime
        );

}


/* =====================================================
   14. AI RECOMMENDATION
===================================================== */

function getAIRecommendation() {

    const department =
        document.getElementById("department").value;


    if (!department) {

        alert(
            "Please select a department first."
        );

        return;

    }


    const departmentDoctors =
        doctors[department] || [];


    if (departmentDoctors.length === 0) {

        return;

    }


    let bestDoctor =
        departmentDoctors[0];


    let bestWaiting =
        calculateWaitingTime(
            bestDoctor.name
        );


    departmentDoctors.forEach(function(
        doctor
    ) {

        const wait =
            calculateWaitingTime(
                doctor.name
            );


        if (wait < bestWaiting) {

            bestDoctor =
                doctor;

            bestWaiting =
                wait;

        }

    });


    document.getElementById("doctor").value =
        bestDoctor.name;


    document
        .querySelectorAll(".doctor-card")
        .forEach(function(card) {

            card.classList.remove("selected");

            const button =
                card.querySelector(
                    ".select-doctor-button"
                );

            if (button) {

                button.textContent =
                    "Select Doctor";

            }

            if (
                card.getAttribute(
                    "data-doctor"
                ) === bestDoctor.name
            ) {

                card.classList.add(
                    "selected"
                );

                if (button) {

                    button.textContent =
                        "✓ AI Recommended";

                }

            }

        });


    document.getElementById(
        "aiMessage"
    ).innerHTML = `

        <strong>
            ✨ ${bestDoctor.name}
        </strong>

        is recommended because they have the
        shortest estimated waiting time of

        <strong>
            ${bestWaiting} minutes
        </strong>.

    `;

}


/* =====================================================
   15. AI MESSAGE
===================================================== */

function updateAIMessage() {

    const department =
        document.getElementById("department").value;


    const message =
        document.getElementById("aiMessage");


    if (!department) {

        message.textContent =
            translations[currentLanguage]
                ?.selectDepartment ||
            translations.en.selectDepartment;

        return;

    }


    const departmentDoctors =
        doctors[department] || [];


    let text = "";


    departmentDoctors.forEach(function(
        doctor
    ) {

        const wait =
            calculateWaitingTime(
                doctor.name
            );


        text +=
            `${doctor.name}: ${wait} min<br>`;

    });


    message.innerHTML =
        text;

}


/* =====================================================
   16. BOOK APPOINTMENT
===================================================== */

function bookAppointment() {

    const name =
        document.getElementById(
            "patientName"
        ).value.trim();


    const age =
        document.getElementById(
            "patientAge"
        ).value;


    const type =
        document.getElementById(
            "patientType"
        ).value;


    const department =
        document.getElementById(
            "department"
        ).value;


    const doctor =
        document.getElementById(
            "doctor"
        ).value;


    if (
        !name ||
        !age ||
        !department ||
        !doctor
    ) {

        alert(
            "Please complete all required fields."
        );

        return;

    }


    const waitingTime =
        calculateWaitingTime(
            doctor
        );


    const tokenPrefix =
        type === "special"
        ? "S"
        : "N";


    const token =
        tokenPrefix +
        tokenNumber;


    tokenNumber++;


    const patient = {

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

    currentPatient =
        patient;


    displayToken(patient);

    updateQueueTable();

    updateDashboardStats();

    updateAIMessage();


    document.getElementById(
        "patientName"
    ).value = "";


    document.getElementById(
        "patientAge"
    ).value = "";


    showPage("token");

}


/* =====================================================
   17. TOKEN
===================================================== */

function displayToken(patient) {

    const tokenResult =
        document.getElementById(
            "tokenResult"
        );


    const typeText =
        patient.type === "special"
        ? "Specially-Abled Patient"
        : "Normal Patient";


    tokenResult.innerHTML = `

        <div class="confirmed-title">
            ✓ Appointment Confirmed
        </div>

        <div class="token-number">
            ${patient.token}
        </div>

        <div class="token-info">

            <p>
                <strong>Patient:</strong>
                ${patient.name}
            </p>

            <p>
                <strong>Age:</strong>
                ${patient.age}
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
                <strong>Estimated Waiting:</strong>
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
   18. UPDATE QUEUE TABLE
===================================================== */

function updateQueueTable() {

    const table =
        document.getElementById(
            "queueTable"
        );


    table.innerHTML = "";


    if (queue.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="7">

                    No patients in the queue.

                </td>

            </tr>

        `;

        updateDashboardStats();

        return;

    }


    queue.forEach(function(
        patient,
        index
    ) {

        const row =
            document.createElement("tr");


        let action;


        if (
            patient.status ===
            "Completed"
        ) {

            action = `

                <span class="status-completed">
                    ✓ Completed
                </span>

            `;

        } else {

            action = `

                <button
                    class="status-button"
                    onclick="completePatient(${index})">

                    Complete

                </button>

            `;

        }


        row.innerHTML = `

            <td>
                ${patient.token}
            </td>

            <td>
                ${patient.name}
            </td>

            <td>
                ${patient.doctor}
            </td>

            <td>
                ${patient.type}
            </td>

            <td>
                ${patient.waiting} min
            </td>

            <td>
                ${patient.status}
            </td>

            <td>
                ${action}
            </td>

        `;


        table.appendChild(row);

    });


    updateDashboardStats();

}


/* =====================================================
   19. COMPLETE PATIENT
===================================================== */

function completePatient(index) {

    if (!queue[index]) {

        return;

    }


    queue[index].status =
        "Completed";


    recalculateWaitingTimes();


    updateQueueTable();


    updateAIMessage();


    if (
        currentPatient &&
        currentPatient.token ===
        queue[index].token
    ) {

        displayToken(
            queue[index]
        );

    }

}


/* =====================================================
   20. RECALCULATE WAITING
===================================================== */

function recalculateWaitingTimes() {

    for (
        let i = 0;
        i < queue.length;
        i++
    ) {

        if (
            queue[i].status !==
            "Completed"
        ) {

            queue[i].waiting =
                calculateWaitingTime(
                    queue[i].doctor,
                    i
                );

        }

    }

}


/* =====================================================
   21. BED STATUS
===================================================== */

function updateBedStatus() {

    if (
        occupiedBeds >=
        totalBeds
    ) {

        alert(
            "No emergency beds are currently available."
        );

        return false;

    }


    occupiedBeds++;


    const availableBeds =
        totalBeds -
        occupiedBeds;


    document.getElementById(
        "occupiedBeds"
    ).textContent =
        occupiedBeds;


    document.getElementById(
        "availableBeds"
    ).textContent =
        availableBeds;


    document.getElementById(
        "dashboardAvailableBeds"
    ).textContent =
        availableBeds;


    return true;

}


/* =====================================================
   22. EMERGENCY REGISTRATION
===================================================== */

function registerEmergency() {

    const name =
        document.getElementById(
            "emergencyName"
        ).value.trim();


    const age =
        document.getElementById(
            "emergencyAge"
        ).value;


    const department =
        document.getElementById(
            "emergencyDepartment"
        ).value;


    if (
        !name ||
        !age
    ) {

        alert(
            "Please enter the emergency patient's name and age."
        );

        return;

    }


    if (!updateBedStatus()) {

        return;

    }


    const token =
        "E" +
        tokenNumber;


    tokenNumber++;


    const emergencyPatient = {

        token: token,

        name: name,

        age: age,

        type: "Emergency",

        department: department,

        doctor: "Emergency Doctor",

        waiting: 0,

        status: "Processing"

    };


    /* Emergency gets priority */

    queue.unshift(
        emergencyPatient
    );


    document.getElementById(
        "emergencyResult"
    ).innerHTML = `

        <strong>
            ✓ Emergency Patient Registered
        </strong>

        <br><br>

        Token:
        <strong>${token}</strong>

        <br>

        Patient:
        ${name}

        <br>

        Priority:
        Emergency

        <br>

        Waiting Time:
        0 minutes

    `;


    document.getElementById(
        "emergencyName"
    ).value = "";


    document.getElementById(
        "emergencyAge"
    ).value = "";


    updateQueueTable();


    updateDashboardStats();


    showPage("emergency");

}


/* =====================================================
   23. DASHBOARD STATS
===================================================== */

function updateDashboardStats() {

    const total =
        queue.length;


    const waiting =
        queue.filter(function(
            patient
        ) {

            return (
                patient.status !==
                "Completed"
            );

        }).length;


    const completed =
        queue.filter(function(
            patient
        ) {

            return (
                patient.status ===
                "Completed"
            );

        }).length;


    const totalPatients =
        document.getElementById(
            "totalPatients"
        );


    const waitingPatients =
        document.getElementById(
            "waitingPatients"
        );


    const completedPatients =
        document.getElementById(
            "completedPatients"
        );


    const queueCount =
        document.getElementById(
            "queueCount"
        );


    if (totalPatients) {

        totalPatients.textContent =
            total;

    }


    if (waitingPatients) {

        waitingPatients.textContent =
            waiting;

    }


    if (completedPatients) {

        completedPatients.textContent =
            completed;

    }


    if (queueCount) {

        queueCount.textContent =
            total +
            (total === 1
                ? " Patient"
                : " Patients");

    }

}


/* =====================================================
   24. INITIALIZE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderDepartments();

        updateQueueTable();

        updateDashboardStats();

        changeLanguage("en");

        showPage("home");

    }
);