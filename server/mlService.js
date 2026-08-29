async function predictWaitingTime(data) {
    const response = await fetch(
        "http://127.0.0.1:5001/predict-waiting-time",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {
        throw new Error("ML service failed");
    }

    return await response.json();
}

module.exports = {
    predictWaitingTime
};