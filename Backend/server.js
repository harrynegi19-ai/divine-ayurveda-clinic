const express = require("express");
const path = require("path");

const app = express();

const PORT = 5000;


// Allow Express to read JSON data
app.use(express.json());


// Serve frontend files
app.use(
    express.static(
        path.join(__dirname, "../frontend")
    )
);


// Homepage
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
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


// Start server
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});