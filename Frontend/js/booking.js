const bookingForm = document.getElementById("bookingForm");

const bookingMessage = document.getElementById("bookingMessage");


bookingForm.addEventListener("submit", async function (event) {

    // Stop the browser from refreshing the page
    event.preventDefault();


    // Collect form values
    const appointmentData = {

        patientName: document.getElementById("patientName").value,

        phone: document.getElementById("phone").value,

        age: document.getElementById("age").value,

        service: document.getElementById("service").value,

        appointmentDate:
            document.getElementById("appointmentDate").value,

        appointmentTime:
            document.getElementById("appointmentTime").value,

        message: document.getElementById("message").value

    };


    bookingMessage.textContent = "Sending appointment request...";


    try {

        // Send data to backend
        const response = await fetch("/api/appointments", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(appointmentData)

        });


        const result = await response.json();


        if (response.ok) {

            bookingMessage.textContent =
                "Appointment request submitted successfully.";

            bookingMessage.style.color = "green";

            bookingForm.reset();

        } else {

            bookingMessage.textContent =
                result.message || "Something went wrong.";

            bookingMessage.style.color = "red";

        }

    } catch (error) {

        console.error("Booking error:", error);

        bookingMessage.textContent =
            "Unable to connect to the server.";

        bookingMessage.style.color = "red";

    }

});