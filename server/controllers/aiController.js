const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});


// ==========================================
// AI DOCTOR RECOMMENDATION
// ==========================================

exports.getAIRecommendation = async (req, res) => {

    try {

        const {
            department,
            doctors,
            waitingTimes,
            patientType
        } = req.body;


        if (!department || !doctors || !waitingTimes) {

            return res.status(400).json({
                message: "Missing required information."
            });

        }


        const prompt = `
You are an AI assistant for SmartQueue,
an AI-powered hospital queue management system.

Patient type:
${patientType || "normal"}

Department:
${department}

Available doctors:
${doctors.join(", ")}

Current estimated waiting times:
${doctors[0]}: ${waitingTimes[doctors[0]]} minutes
${doctors[1]}: ${waitingTimes[doctors[1]]} minutes

Recommend the doctor who provides the shortest waiting time.

Give a short, clear recommendation.
Do not diagnose the patient.
Do not provide medical treatment advice.

Return the answer in this format:

Recommended Doctor: [doctor name]

Estimated Waiting Time: [number] minutes

Reason: [one short sentence]
`;


        const response = await client.responses.create({

            model: "gpt-5.6-luna",

            input: prompt

        });


        const recommendation =
            response.output_text;


        res.json({

            recommendation

        });

    }

    catch (error) {

        console.error(
            "AI Error:",
            error.message
        );


        res.status(500).json({

            message:
                "AI recommendation failed.",

            error:
                error.message

        });

    }

};