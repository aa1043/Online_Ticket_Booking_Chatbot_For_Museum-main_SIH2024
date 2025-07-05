let userData = {
    name: "",
    phone: "",
    email: "",
    date: "",
    tickets: {
        adult: 0,
        child: 0,
        foreigner: 0
    },
    idType: "",
    idNumber: ""
};

function clearChat() {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";
}

function showTypingIndicator(callback) {
    const typingIndicator = document.getElementById("typingIndicator");
    typingIndicator.style.display = "flex";
    setTimeout(() => {
        typingIndicator.style.display = "none";
        callback();
    }, 1500);
}

function appendMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);

    if(sender !== "user"){
        gsap.from(messageDiv, {
            duration: 0.5,
            opacity: 0,
            x: -100,
            ease: "power1.out"
        });
    }

    chatbox.scrollTop = chatbox.scrollHeight;
}

function startBooking() {
    userData = { name: "", phone: "", email: "", date: "", tickets: { adult: 0, child: 0, foreigner: 0 }, idType: "", idNumber: "" };
    clearChat();
    appendMessage("Good morning! How may I assist you?", "bot");
    showSuggestions();
}

function showSuggestions() {
    const chatbox = document.getElementById("chatbox");
    const suggestionsDiv = document.createElement("div");
    suggestionsDiv.classList.add("suggestions");

    const bookTicketButton = document.createElement("button");
    bookTicketButton.textContent = "Book a Ticket";
    bookTicketButton.onclick = function() {
        clearChat();
        showTypingIndicator(askName);
    };

    const viewTicketButton = document.createElement("button");
    viewTicketButton.textContent = "View My Ticket";
    viewTicketButton.onclick = function() {
        clearChat();
        appendMessage("This functionality is not implemented yet.", "bot");
    };

    suggestionsDiv.appendChild(bookTicketButton);
    suggestionsDiv.appendChild(viewTicketButton);
    chatbox.appendChild(suggestionsDiv);
    gsap.from(suggestionsDiv, { duration: 0.7, opacity: 0, y: 20, ease: "power1.out"  });
    chatbox.scrollTop = chatbox.scrollHeight;
}

function askName() {
    appendMessage("Please provide your name:", "bot");
    document.getElementById("userInput").disabled = false;
    document.getElementById("submitButton").onclick = saveName;
}

function saveName() {
    const name = document.getElementById("userInput").value.trim();
    const namePattern = /^[a-zA-Z\s]+$/;
    if (name && namePattern.test(name)) {
        userData.name = name;
        appendMessage(name, "user");
        document.getElementById("userInput").value = "";
        document.getElementById("userInput").disabled = true;
        showTypingIndicator(askPhoneNumber);
    } else {
        alert("Please enter a valid name (letters and spaces only).");
    }
}

function askPhoneNumber() {
    appendMessage("Please provide your 10-digit contact number:", "bot");
    document.getElementById("userInput").disabled = false;
    document.getElementById("submitButton").onclick = savePhoneNumber;
}

function savePhoneNumber() {
    const phone = document.getElementById("userInput").value.trim();
    const phonePattern = /^[0-9]{10}$/;
    if (phone && phonePattern.test(phone)) {
        userData.phone = phone;
        appendMessage(phone, "user");
        document.getElementById("userInput").value = "";
        document.getElementById("userInput").disabled = true;
        showTypingIndicator(askEmail);
    } else {
        alert("Please enter a valid 10-digit phone number.");
    }
}

function askEmail() {
    appendMessage("Please provide your email address:", "bot");
    document.getElementById("userInput").disabled = false;
    document.getElementById("submitButton").onclick = saveEmail;
}

function saveEmail() {
    const email = document.getElementById("userInput").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && emailPattern.test(email)) {
        userData.email = email;
        appendMessage(email, "user");
        document.getElementById("userInput").value = "";
        document.getElementById("userInput").disabled = true;
        showTypingIndicator(askIdType);
    } else {
        alert("Please enter a valid email address.");
    }
}

function askIdType() {
    appendMessage("Please select your ID type:", "bot");
    const chatbox = document.getElementById("chatbox");

    const idTypeDiv = document.createElement("div");
    idTypeDiv.classList.add("id-type-options");

    const aadharButton = document.createElement("button");
    aadharButton.textContent = "Aadhar Card";
    aadharButton.onclick = function() { selectIdType('Aadhar Card'); };
    aadharButton.classList.add("idType"); // Apply the style class
    
    const rfidButton = document.createElement("button");
    rfidButton.textContent = "RFID";
    rfidButton.onclick = function() { selectIdType('RFID'); };
    rfidButton.classList.add("idType"); // Apply the style class

    idTypeDiv.appendChild(aadharButton);
    idTypeDiv.appendChild(rfidButton);
    chatbox.appendChild(idTypeDiv);

    gsap.from(idTypeDiv, { duration: 0.7, opacity: 0, y: 20, ease: "power1.out" });
    chatbox.scrollTop = chatbox.scrollHeight;
}



function selectIdType(type) {
    userData.idType = type;
    appendMessage(type, "user");
    document.getElementById("userInput").disabled = true;
    document.querySelector(".id-type-options").remove();
    showTypingIndicator(askIdNumber);
}

function askIdNumber() {
    appendMessage(`Please enter your ${userData.idType} number:`, "bot");
    document.getElementById("userInput").disabled = false;
    document.getElementById("submitButton").onclick = saveIdNumber;
}

function saveIdNumber() {
    const idNumber = document.getElementById("userInput").value.trim();
    if (idNumber) {
        userData.idNumber = idNumber;
        appendMessage(idNumber, "user");
        document.getElementById("userInput").value = "";
        document.getElementById("userInput").disabled = true;
        showTypingIndicator(askDate);
    } else {
        alert("Please enter a valid ID number.");
    }
}

function askDate() {
    appendMessage("Please select the date you want to visit:", "bot");
    const chatbox = document.getElementById("chatbox");
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "dateInput";
    dateInput.min = new Date().toISOString().split("T")[0]; // Set the minimum selectable date to today
    chatbox.appendChild(dateInput);
    chatbox.scrollTop = chatbox.scrollHeight;
    dateInput.onchange = validateDate;
}

function validateDate() {
    const date = document.getElementById("dateInput").value;
    const selectedDate = new Date(date);
    const today = new Date();
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek === 1) { // Check if selected date is Monday
        alert("Bookings are not allowed on Mondays. Please select another date.");
        document.getElementById("dateInput").value = ""; // Clear the selected date
    } else if (selectedDate < today) {
        alert("Please select a valid future date.");
        document.getElementById("dateInput").value = ""; // Clear the selected date
    } else {
        userData.date = date;
        appendMessage(date, "user");
        showTicketOptions();
    }
}

function showTicketOptions() {
    const date = document.getElementById("dateInput").value;
    if (date) {
        userData.date = date;
        const chatbox = document.getElementById("chatbox");
        chatbox.innerHTML += `
            <div class="ticket-options">
                <div class="ticket-type">
                    <label>Adult - Rs. 75:</label>
                    <div class="increment">
                        <button onclick="changeTicket('adult', -1)">-</button>
                        <input type="text" id="adultCount" value="${userData.tickets.adult}" readonly>
                        <button onclick="changeTicket('adult', 1)">+</button>
                    </div>
                </div>
                <div class="ticket-type">
                    <label>Children - Rs. 20:</label>
                    <div class="increment">
                        <button onclick="changeTicket('child', -1)">-</button>
                        <input type="text" id="childCount" value="${userData.tickets.child}" readonly>
                        <button onclick="changeTicket('child', 1)">+</button>
                    </div>
                </div>
                <div class="ticket-type">
                    <label>Foreigner - Rs. 500:</label>
                    <div class="increment">
                        <button onclick="changeTicket('foreigner', -1)">-</button>
                        <input type="text" id="foreignerCount" value="${userData.tickets.foreigner}" readonly>
                        <button onclick="changeTicket('foreigner', 1)">+</button>
                    </div>
                </div>
                <div>Total Price: Rs. <span id="totalPrice">${calculateTotal()}</span></div>
                <button onclick="showPreview()" class="idType">Preview</button>
            </div>
        `;
        chatbox.scrollTop = chatbox.scrollHeight;
    } else {
        alert("Please select a valid date.");
    }
}

function changeTicket(type, increment) {
    if (userData.tickets[type] + increment >= 0) {
        userData.tickets[type] += increment;
        document.getElementById(`${type}Count`).value = userData.tickets[type];
        document.getElementById("totalPrice").textContent = calculateTotal();
    }
}

function calculateTotal() {
    return userData.tickets.adult * 75 + userData.tickets.child * 20 + userData.tickets.foreigner * 500;
}

function showPreview() {
    // Check if at least one ticket type has been selected
    if (userData.tickets.adult === 0 && userData.tickets.child === 0 && userData.tickets.foreigner === 0) {
        alert("Please select at least one ticket.");
        return;
    }

    // Clear the chat and display a preview message
    clearChat();
    appendMessage("Here's your booking preview:", "bot");

    // Get the chatbox element
    const chatbox = document.getElementById("chatbox");

    // Create the preview box element
    const previewBox = document.createElement("div");
    previewBox.classList.add("preview-box");
    previewBox.innerHTML = `
        <p><strong>Name:</strong> ${userData.name}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Visiting Date:</strong> ${userData.date}</p>
        <p><strong>ID Type:</strong> ${userData.idType}</p>
        <p><strong>ID Number:</strong> ${userData.idNumber}</p>
        <p><strong>Tickets:</strong></p>
        <ul>
            <li>Adult: ${userData.tickets.adult} x Rs. 75</li>
            <li>Child: ${userData.tickets.child} x Rs. 20</li>
            <li>Foreigner: ${userData.tickets.foreigner} x Rs. 500</li>
        </ul>
        <p><strong>Total Price:</strong> Rs. ${calculateTotal()}</p>
    `;

    // Append the preview box to the chatbox
    chatbox.appendChild(previewBox);

    // Create and style the Confirm Booking button
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Booking";
    confirmButton.classList.add("btn2");
    confirmButton.onclick = confirmBooking;

    // Create and style the Start Again button
    const startAgainButton = document.createElement("button");
    startAgainButton.textContent = "Start Again";
    startAgainButton.classList.add("btn2");
    startAgainButton.onclick = startBooking;

    // Create a container for the buttons to keep them together and style them
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(startAgainButton);

    // Append the button container to the chatbox below the preview box
    chatbox.appendChild(buttonContainer);

    // Apply animations to the preview box using GSAP
    gsap.from(previewBox, { duration: 0.7, opacity: 0, y: 20, ease: "power1.out" });

    // Apply animations to the button container using GSAP
    gsap.from(buttonContainer, { duration: 0.7, opacity: 0, y: 20, ease: "power1.out", delay: 0.3 });

    // Scroll to the bottom of the chatbox to ensure the new content is visible
    chatbox.scrollTop = chatbox.scrollHeight;
}





function confirmBooking() {
    // Collect all the data including ticket type and price for QR code generation
    const bookingData = {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        idNumber: userData.idNumber,
        date: userData.date,
        tickets: userData.tickets, // Include ticket type and quantity
        ticketPrice: calculateTotal() // Include total ticket price
    };

    // Prepare data to send to the PHP server to save it in the database (excluding ticket details)
    const dataToSave = {
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        idNumber: userData.idNumber,
        date: userData.date
    };

    // Send the booking data to the PHP server to save it in the database
    fetch('submit.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave) // Only send the data that should be saved
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // Generate QR code with full booking data including ticket type and price
            const qrCodeData = JSON.stringify(bookingData);
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=150x150`;

            clearChat();
            appendMessage("Thank you for your booking! Your ticket has been confirmed.", "bot");
            appendMessage("Here is your QR code:", "bot");

            const chatbox = document.getElementById("chatbox");
            const qrCodeImg = document.createElement("img");
            qrCodeImg.id = "qrCodeImg";
            qrCodeImg.src = qrCodeUrl;
            qrCodeImg.alt = "QR Code";

            chatbox.appendChild(qrCodeImg);

            // Add "Download QR Code" button
            const downloadButton = document.createElement("button");
            downloadButton.textContent = "Download QR Code";
            downloadButton.classList.add("btn2"); // Apply the btn2 class
            downloadButton.classList.add("btn3"); // Apply the btn2 class
            downloadButton.onclick = function() {
                fetch(qrCodeUrl)
                    .then(response => response.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'booking-qr-code.png';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(error => console.error('Error downloading QR code:', error));
            };
            chatbox.appendChild(downloadButton);

            // Add "Start Again" button
            const startAgainButton = document.createElement("button");
            startAgainButton.textContent = "Start Again";
            startAgainButton.classList.add("btn2"); // Apply the btn2 class
            startAgainButton.onclick = function() {
                startBooking(); // Restart the booking process
            };
            chatbox.appendChild(startAgainButton);

            // Ensure the chatbox scrolls to the bottom
            chatbox.scrollTop = chatbox.scrollHeight;

            // GSAP animations for the QR code and buttons
            gsap.from(qrCodeImg, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out" });
            gsap.from(downloadButton, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out", delay: 0.3 });
            gsap.from(startAgainButton, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out", delay: 0.6 });

            // Make sure the buttons are visible after the animation
            gsap.set([downloadButton, startAgainButton], { opacity: 1 });
        } else {
            // Handle errors from the server
            clearChat();
            appendMessage("There was an error saving your booking. Please try again.", "bot");
        }
    })
    .catch(error => {
        // Handle network or other errors
        console.error("Error:", error);
        clearChat();
        appendMessage("An error occurred. Please check your internet connection and try again.", "bot");
    });
}



function startOver() {
    startBooking(); // Restart the booking process
}

document.addEventListener("DOMContentLoaded", () => {
    startBooking(); // Start the chat when the page loads
});


