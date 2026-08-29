from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load the trained model
model = joblib.load("waiting_time_model.pkl")


@app.route("/predict-waiting-time", methods=["POST"])
def predict_waiting_time():

    data = request.json

    patient = pd.DataFrame([{
        "patients_ahead": data["patients_ahead"],
        "active_queue_size": data["active_queue_size"],
        "patients_being_served": data["patients_being_served"],
        "emergency_patients": data["emergency_patients"],
        "daily_booking_count": data["daily_booking_count"],
        "department_daily_count": data["department_daily_count"],
        "doctor_daily_count": data["doctor_daily_count"],
        "completed_appointments_today": data["completed_appointments_today"],
        "available_slots_today": data["available_slots_today"],
        "cancellations_today": data["cancellations_today"]
    }])

    prediction = model.predict(patient)[0]

    # Convert prediction to a whole number
    prediction = max(0, int(round(prediction)))

    return jsonify({
        "waiting_time": prediction
    })


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)