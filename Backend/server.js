const express = require("express");
const path = require("path");

const app = express();

// Allow Express to read JSON data
app.use(express.json());


// Serve frontend files
app.use(
    express.static(
        path.join(__dirname, "../Frontend")
    )
);


// Homepage
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../Frontend/index.html")
    );
});


// Appointment API
app.post("/api/appointments", (req, res) => {

    const appointmentData = req.body;

    console.log("New Appointment Received:");
    console.log(appointmentData);

    res.status(201).json({
        message: "Appointment received successfully.",
        appointment: appointmentData
    });

});


const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});