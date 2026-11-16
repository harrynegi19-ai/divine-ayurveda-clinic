
const bookingForm = document.getElementById("bookingForm");

const bookingMessage = document.getElementById("bookingMessage");

// Handle appointment form submission
bookingForm.addEventListener("submit", async function (event) {

    // Stop the browser from refreshing the page
    event.preventDefault();

    // Collect form values
    const appointmentData = {

        patientName: document.getElementById("patientName").value.trim(),

        phone: document.getElementById("phone").value.trim(),

        age: document.getElementById("age").value,

        service: document.getElementById("service").value,

        appointmentDate:
            document.getElementById("appointmentDate").value,

        appointmentTime:
            document.getElementById("appointmentTime").value,

        message: document.getElementById("message").value.trim()

    };

    // Show loading message
    bookingMessage.textContent = "Sending appointment request...";
    bookingMessage.style.color = "black";

    try {

        // Send appointment data to the backend
        const response = await fetch("/api/appointments", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(appointmentData)

        });

        // Read backend response
        const result = await response.json();

        if (response.ok) {

            bookingMessage.textContent =
                result.message || "Appointment request submitted successfully.";

            bookingMessage.style.color = "green";

            // Clear form after successful submission
            bookingForm.reset();

        } else {

            bookingMessage.textContent =
                result.message || "Unable to submit appointment.";

            bookingMessage.style.color = "red";

        }

    } catch (error) {

        console.error("Booking error:", error);

        bookingMessage.textContent =
            "Unable to connect to the server. Please try again.";

        bookingMessage.style.color = "red";

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});