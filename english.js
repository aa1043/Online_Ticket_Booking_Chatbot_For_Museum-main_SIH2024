const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});



let elements = document.querySelectorAll(".text");

elements.forEach((element)=>{
  let innertext = element.innerText;
  element.innerHTML = "";
  
  let textContainer = document.createElement("div");
  textContainer.classList.add("block");   
  
  for(let letter of innertext){
    let span = document.createElement("span");
    span.innerText = letter.trim() === "" ? "\xa0" : letter;
    span.classList.add("letter");
    textContainer.appendChild(span);
  }  
  
  element.appendChild(textContainer);
  element.appendChild(textContainer.cloneNode(true));
});  

elements.forEach((element)=>{
  element.addEventListener("mouseover",()=>{
    element.classList.remove("play");
  });  
});  

// swiper js code

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
});



// Aira

// script.js

let userData = {
  name: '',
  phone: '',
  email: '',
  idNumber: '',
  date: '',
  tickets: {
      adult: 0,
      child: 0,
      foreigner: 0
  },
  addons: {
      concert: 0,
      exhibition: 0,
      workshop: 0
  }
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
  userData = { name: "", phone: "", email: "", date: "", tickets: { adult: 0, child: 0, foreigner: 0 }, addons: { concert: 0,
    exhibition: 0,
    workshop: 0 }, idType: "", idNumber: "" };
  clearChat();
  appendMessage("Good morning! How may I assist you?", "bot");
  showSuggestions();
}

function showSuggestions() {
  const chatbox = document.getElementById("chatbox");
  const suggestionsDiv = document.createElement("div");
  suggestionsDiv.classList.add("suggestions");

  // Clear the chatbox and show the welcome message before showing suggestions
  clearChat();
  appendMessage("Welcome! How can I assist you today?", "bot");

  // Create the "Book a Ticket" button
  const bookTicketButton = document.createElement("button");
  bookTicketButton.textContent = "Book a Ticket";
  bookTicketButton.onclick = function () {
    clearChat();
    showTypingIndicator(askName);
  };

  // Create the "Locate Us" button
  const locateButton = document.createElement("button");
  locateButton.textContent = "Locate Us";
  locateButton.onclick = function () {
    clearChat();
    window.open("https://www.google.com/maps?q=Indian+Museum+Kolkata", "_blank");
    startOver();
  };

  // Create the "About Museum" button
  const aboutMuseumButton = document.createElement("button");
  aboutMuseumButton.textContent = "About Museum";
  aboutMuseumButton.onclick = function () {
    clearChat();
    appendMessage(
      "The Indian Museum in Kolkata, established in 1814, is the largest and oldest museum in India. It houses rare collections of antiques, armor, ornaments, fossils, skeletons, mummies, and Mughal paintings.",
      "bot"
    );
    showStartOverOption();
  };

  // Create the "Visiting Time" button
  const visitingTimeButton = document.createElement("button");
  visitingTimeButton.textContent = "Visiting Time";
  visitingTimeButton.onclick = function () {
    clearChat();
    appendMessage(
      "The Indian Museum is open from Tuesday to Sunday, 10:00 AM to 5:00 PM. It remains closed on Mondays and certain public holidays.",
      "bot"
    );
    showStartOverOption();
  };

  // Create the "Contact Us" button
  const contactUsButton = document.createElement("button");
  contactUsButton.textContent = "Contact Us";
  contactUsButton.onclick = function () {
    clearChat();
    window.location.href = "/contact-us"; // Assuming your contact page is named contact-us.html
    startOver(); // Call startOver to show the main menu again
  };

  // Append buttons to the suggestions div
  suggestionsDiv.appendChild(bookTicketButton);
  suggestionsDiv.appendChild(locateButton);
  suggestionsDiv.appendChild(aboutMuseumButton);
  suggestionsDiv.appendChild(visitingTimeButton);
  suggestionsDiv.appendChild(contactUsButton);

  // Append suggestions div to chatbox
  chatbox.appendChild(suggestionsDiv);

  // GSAP animation for suggestions
  gsap.from(suggestionsDiv, { duration: 0.7, opacity: 0, y: 20, ease: "power1.out" });
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Function to show a "Start Over" option
function showStartOverOption() {
  const chatbox = document.getElementById("chatbox");
  const startOverDiv = document.createElement("div");
  startOverDiv.classList.add("start-over");

  const startOverButton = document.createElement("button");
  startOverButton.textContent = "Start Over";
  startOverButton.classList.add("btn2"); // Apply custom style
  startOverButton.onclick = function () {
    clearChat();
    showSuggestions(); // Show suggestions again with welcome text
  };

  startOverDiv.appendChild(startOverButton);
  chatbox.appendChild(startOverDiv);

  // GSAP animation for start over button
  gsap.from(startOverDiv, { duration: 0.5, opacity: 0, y: 10, ease: "power1.out" });
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
  // Define a more refined email pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && emailPattern.test(email)) {
      // Email is valid
      userData.email = email;
      appendMessage(email, "user"); // Show the user email in the chat
      document.getElementById("userInput").value = ""; // Clear input field
      document.getElementById("userInput").disabled = true; // Disable input field
      showTypingIndicator(askIdType); // Move to the next question
  } else {
      // Email is invalid
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
  let isValid = false;

  // Validate Aadhaar number specifically
  if (userData.idType === 'Aadhar Card') {
    // Aadhaar number should be exactly 12 digits long
    const aadharPattern = /^\d{12}$/;
    isValid = aadharPattern.test(idNumber);
  } else {
    // General validation for other ID types (if applicable)
    isValid = idNumber.length > 0; // Non-empty check
  }

  if (isValid) {
      userData.idNumber = idNumber;
      appendMessage(idNumber, "user");
      document.getElementById("userInput").value = "";
      document.getElementById("userInput").disabled = true;
      showTypingIndicator(askDate);
  } else {
      alert("Please enter a valid ID number.");
  }
}

// function saveIdNumber() {
//   const idNumber = document.getElementById("userInput").value.trim();
//   if (idNumber) {
//       userData.idNumber = idNumber;
//       appendMessage(idNumber, "user");
//       document.getElementById("userInput").value = "";
//       document.getElementById("userInput").disabled = true;
//       showTypingIndicator(askDate);
//   } else {
//       alert("Please enter a valid ID number.");
//   }
// }

function askDate() {
  appendMessage("Please select the date you want to visit:", "bot");
  const chatbox = document.getElementById("chatbox");
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "dateInput";
  dateInput.min = new Date().toISOString().split("T")[0];
  chatbox.appendChild(dateInput);
  chatbox.scrollTop = chatbox.scrollHeight;
  dateInput.addEventListener("change", validateDate); // Use addEventListener for consistency
}

function validateDate() {
  const date = document.getElementById("dateInput").value;
  const selectedDate = new Date(date);
  const today = new Date();
  const dayOfWeek = selectedDate.getDay();

  if (dayOfWeek === 1) {
      alert("Bookings are not allowed on Mondays. Please select another date.");
      document.getElementById("dateInput").value = "";
  } else if (selectedDate < today) {
      alert("Please select a valid future date.");
      document.getElementById("dateInput").value = "";
  } else {
      userData.date = date;
      appendMessage(`Selected Date: ${date}`, "user");
      showTicketOptions(); // Correctly call showTicketOptions
  }
}

function showTicketOptions() {
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
          <div id="addonTickets"></div>
          <div>Total Price: Rs. <span id="totalPrice">${calculateTotal()}</span></div>
          <button onclick="showPreview()" class="idType" id="previewButton6">Preview</button>
      </div>
  `;
  showAddOnTicketOptions(); // Show add-ons after main tickets
  chatbox.scrollTop = chatbox.scrollHeight;
}

function changeTicket(type, change) {
  const newCount = userData.tickets[type] + change;
  if (newCount >= 0) {
      userData.tickets[type] = newCount;
      document.getElementById(`${type}Count`).value = newCount;
      document.getElementById("totalPrice").textContent = calculateTotal();
  }
}

// Function to display add-on options
function showAddOnTicketOptions() {
  const addonContainer = document.getElementById("addonTickets");
  const addons = [
      { id: 'concert', name: 'Live Concert', price: 150, imageUrl:"pictures/liveconcert.jpg" },
      { id: 'exhibition', name: 'Art Exhibition', price: 200, imageUrl: "pictures/exhibition1.jpg" },
      { id: 'workshop', name: 'Photography Workshop', price: 100, imageUrl: "pictures/photography1.jpg" }
  ];

  addonContainer.innerHTML = '<h4>Add-on Events:</h4>';
  addons.forEach(addon => {
      addonContainer.innerHTML += `
          <div class="addon-ticket" id="${addon.id}">
              <img src="${addon.imageUrl}" alt="${addon.name}">
              <div class="addon-info">
                  <label>${addon.name} - Rs. ${addon.price}</label>
                  <div class="increment">
                      <button onclick="changeAddon('${addon.id}', -1)">-</button>
                      <input type="text" id="${addon.id}Count" value="0" readonly>
                      <button onclick="changeAddon('${addon.id}', 1)">+</button>
                  </div>
              </div>
          </div>
      `;
  });
}



// Function to add an add-on ticket
// function changeAddon(addonId, change, price) {
//   const newCount = userData.addons[addonId] + change;
//   if (newCount >= 0) {
//       userData.addons[addonId] = newCount;
//       document.getElementById(`${addonId}Count`).value = newCount;
//       document.getElementById("totalPrice").textContent = calculateTotal();
//   }
// }

// // Function to add an add-on ticket with validation
// function addAddon(addonId, price) {
//   const totalEntryTickets = userData.tickets.adult + userData.tickets.child + userData.tickets.foreigner;
//   const currentAddonCount = userData.addons[addonId] || 0;

//   if (currentAddonCount >= totalEntryTickets) {
//       alert(`You can only purchase up to ${totalEntryTickets} ${addonId} add-on tickets.`);
//       return;
//   }

//   // Initialize the add-on count if not already set
//   if (!userData.addons[addonId]) {
//       userData.addons[addonId] = 0;
//   }

//   // Increment the add-on count
//   userData.addons[addonId] += 1;
  
//   // Update the total price and count display
//   document.getElementById("totalPrice").textContent = calculateTotal();
//   document.getElementById(`${addonId}Count`).textContent = userData.addons[addonId];
// }

// // Function to remove an add-on ticket
// function removeAddon(addonId, price) {
//   if (userData.addons[addonId] > 0) {
//       userData.addons[addonId] -= 1;
//       document.getElementById("totalPrice").textContent = calculateTotal();
//       document.getElementById(`${addonId}Count`).textContent = userData.addons[addonId];
//   } else {
//       alert(`No ${addonId} add-on tickets to remove!`);
//   }
// }
function changeAddon(addonId, change) {
  const totalEntryTickets = userData.tickets.adult + userData.tickets.child + userData.tickets.foreigner;
  const addonCountElement = document.getElementById(`${addonId}Count`);
  let currentAddonCount = parseInt(addonCountElement.value);

  // Check if we can add or remove the add-on ticket
  if (change > 0 && currentAddonCount < totalEntryTickets) {
      currentAddonCount += change;
  } else if (change < 0 && currentAddonCount > 0) {
      currentAddonCount += change;
  } else if (change > 0 && currentAddonCount >= totalEntryTickets) {
      alert(`You can only purchase up to ${totalEntryTickets} ${addonId} add-on tickets.`);
      return;
  } else if (change < 0 && currentAddonCount <= 0) {
      alert(`No ${addonId} add-on tickets to remove!`);
      return;
  }

  // Update the add-on count in userData
  userData.addons[addonId] = currentAddonCount;
  
  // Update the displayed count and total price
  addonCountElement.value = currentAddonCount;
  document.getElementById("totalPrice").textContent = calculateTotal();
}

const addonPrices = {
  concert: 150,
  exhibition: 200,
  workshop: 100
};


// Function to calculate the total price including add-ons
function calculateTotal() {
  let total = userData.tickets.adult * 75 + userData.tickets.child * 20 + userData.tickets.foreigner * 500;
  const addonPrices = {
      concert: 150,
      exhibition: 200,
      workshop: 100
  };
  for (let addon in userData.addons) {
      total += addonPrices[addon] * userData.addons[addon];
  }
  return total;
}
// Function to remove an add-on ticket (if needed)
// function removeAddon(addonId, price) {
//   if (userData.addons.includes(addonId)) {
//       userData.addons = userData.addons.filter(id => id !== addonId);
//       document.getElementById("totalPrice").textContent = calculateTotal();
//   } else {
//       alert('Add-on not selected!');
//   }
// }

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
      <p><strong>Add-ons:</strong></p>
      <ul>
          ${Object.keys(userData.addons).map(addon => {
              if (userData.addons[addon] > 0) {
                  return `<li>${addon.charAt(0).toUpperCase() + addon.slice(1)}: ${userData.addons[addon]} x Rs. ${addonPrices[addon]}</li>`;
              }
          }).join('')}
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


// ticket templete

// function confirmBooking() {
//   // Collect all the data including ticket type and price for QR code generation
//   const bookingData = {
//       name: userData.name,
//       phone: userData.phone,
//       email: userData.email,
//       idNumber: userData.idNumber,
//       date: userData.date,
//       tickets: userData.tickets,
//       ticketPrice: calculateTotal()
//   };

//   // Prepare data to send to the PHP server to save it in the database (excluding ticket details)
//   const dataToSave = {
//       name: userData.name,
//       phone: userData.phone,
//       email: userData.email,
//       idNumber: userData.idNumber,
//       date: userData.date
//   };

//   // Send the booking data to the PHP server to save it in the database
//   fetch('submit.php', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(dataToSave)
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json();
//   })
//   .then(data => {
//       if (data.status === "success") {
//           const qrCodeData = JSON.stringify(bookingData);
//           const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=150x150`;

//           clearChat();
//           appendMessage("Thank you for your booking! Your ticket has been confirmed.", "bot");

//           // Update the ticket template with user data
//           document.getElementById('dayOfWeek').textContent = new Date(userData.date).toLocaleString('en-US', { weekday: 'long' }).toUpperCase();
//           document.getElementById('eventDate').textContent = new Date(userData.date).toLocaleString('en-US', { month: 'long' }).toUpperCase() + " " + new Date(userData.date).getDate() + "TH";
//           document.getElementById('eventYear').textContent = new Date(userData.date).getFullYear();
//           document.getElementById('eventName').textContent = "SOUR Prom"; // Static value; replace as needed
//           document.getElementById('artistName').textContent = "Olivia Rodrigo"; // Static value; replace as needed
//           document.getElementById('eventLocation').textContent = "East High School"; // Static value; replace as needed
//           document.getElementById('eventNameRight').textContent = "SOUR Prom"; // Static value; replace as needed

//           const qrCodeImage = document.getElementById('qrCodeImage');
//           qrCodeImage.src = qrCodeUrl;

//           // Ensure the QR code is loaded before proceeding
//           qrCodeImage.onload = () => {
//               // Clone the ticket template
//               const ticketTemplate = document.querySelector('.ticket.created-by-anniedotexe').cloneNode(true);

//               // Append the ticket template to the chatbox
//               document.getElementById('chatbox').appendChild(ticketTemplate);

//               // Add "Download Ticket" button
//               const downloadButton = document.createElement("button");
//               downloadButton.textContent = "Download Ticket";
//               downloadButton.classList.add("btn2");
//               downloadButton.onclick = function() {
//                   // Use html2canvas to convert the ticket to an image and trigger the download
//                   html2canvas(ticketTemplate, { useCORS: true }).then(canvas => {
//                       const image = canvas.toDataURL("image/png");
//                       const a = document.createElement('a');
//                       a.href = image;
//                       a.download = 'booking-ticket.png';
//                       document.body.appendChild(a);
//                       a.click();
//                       a.remove();
//                   }).catch(error => console.error('Error downloading ticket:', error));
//               };

//               // Append the download button to the chatbox
//               document.getElementById('chatbox').appendChild(downloadButton);

//               // Add "Start Again" button
//               const startAgainButton = document.createElement("button");
//               startAgainButton.textContent = "Start Again";
//               startAgainButton.classList.add("btn2");
//               startAgainButton.onclick = function() {
//                   startBooking(); // Restart the booking process
//               };

//               // Append the start again button to the chatbox
//               document.getElementById('chatbox').appendChild(startAgainButton);

//               // Scroll to the bottom of the chatbox
//               document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;

//               // GSAP animations for the ticket template and buttons
//               gsap.from(ticketTemplate, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out" });
//               gsap.from(downloadButton, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out", delay: 0.3 });
//               gsap.from(startAgainButton, { duration: 0.7, opacity: 0, y: -20, ease: "power1.out", delay: 0.6 });

//               // Ensure the buttons are visible after the animation
//               gsap.set([downloadButton, startAgainButton], { opacity: 1 });
//           };

//           // Error handling for QR code loading
//           qrCodeImage.onerror = () => {
//               appendMessage("Failed to load QR code. Please try again.", "bot");
//           };

//       } else {
//           clearChat();
//           appendMessage("There was an error saving your booking. Please try again.", "bot");
//       }
//   })
//   .catch(error => {
//       console.error("Error:", error);
//       clearChat();
//       appendMessage("An error occurred. Please check your internet connection and try again. Error details: " + error.message, "bot");
//   });
// }





// end ticket template


function confirmBooking() {
  // Provide immediate feedback to the user with a loader
  clearChat();
  appendMessage("Processing your booking, please wait...", "bot");

  // Collect all the data including ticket type and price for QR code generation
  const bookingData = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      idNumber: userData.idNumber,
      date: userData.date,
      tickets: userData.tickets, // Include ticket type and quantity
      addons: userData.addons,
      ticketPrice: calculateTotal() // Include total ticket price
  };

  // Prepare data to send to the PHP server to save it in the database and send email
  const dataToSave = {
      name: userData.name,
      phone: userData.phone,
      email: userData.email,
      idNumber: userData.idNumber,
      date: userData.date,
      bookingData: bookingData // Include booking data for email
  };

  // Show a loading spinner or message while processing
  showLoadingSpinner();

  // Send the booking data to the PHP server to save it in the database and send an email
  fetch('submit.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
  })
  .then(response => {
      if (!response.ok) {
          return response.text().then(text => {
              throw new Error(text);
          });
      }
      return response.json();
  })
  .then(data => {
      if (data.status === "success") {
          // Remove loading spinner after success
          removeLoadingSpinner();

          // Confirm booking success message
          appendMessage("Booking confirmed! Generating your QR code...", "bot");

          // Generate QR code with full booking data including ticket type and price asynchronously
          generateQRCode(bookingData);
      } else {
          // Remove loading spinner and show error message
          removeLoadingSpinner();
          clearChat();
          appendMessage(data.message, "bot");
      }
  })
  .catch(error => {
      // Remove loading spinner and handle errors
      removeLoadingSpinner();
      console.error("Error:", error);
      clearChat();
      appendMessage("An error occurred. Please check your internet connection and try again. Error details: " + error.message, "bot");
  });
}

// Function to show a loading spinner
function showLoadingSpinner() {
  const chatbox = document.getElementById("chatbox");
  const spinner = document.createElement("div");
  spinner.classList.add("loading-spinner"); // Ensure you have appropriate CSS for this class
  //spinner.textContent = "Loading...";
  spinner.id = "loadingSpinner";
  chatbox.appendChild(spinner);
}

// Function to remove the loading spinner
function removeLoadingSpinner() {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) {
      spinner.remove();
  }
}

// Function to generate and display QR code asynchronously
function generateQRCode(bookingData) {
  const qrCodeData = JSON.stringify(bookingData);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=150x150`;

  const chatbox = document.getElementById("chatbox");
  const qrCodeImg = document.createElement("img");
  qrCodeImg.id = "qrCodeImg";
  qrCodeImg.src = qrCodeUrl;
  qrCodeImg.alt = "QR Code";

  chatbox.appendChild(qrCodeImg);

  // Add "Download QR Code" button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download QR Code";
  downloadButton.classList.add("btn2");
  downloadButton.classList.add("btn3");
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
  startAgainButton.classList.add("btn2");
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
}

// Function to show the QR code and related buttons
function showQRCode(qrCodeUrl) {
  const chatbox = document.getElementById("chatbox");
  const qrCodeImg = document.createElement("img");
  qrCodeImg.id = "qrCodeImg";
  qrCodeImg.src = qrCodeUrl;
  qrCodeImg.alt = "QR Code";

  chatbox.appendChild(qrCodeImg);

  // Add "Download QR Code" button
  const downloadButton = document.createElement("button");
  downloadButton.textContent = "Download QR Code";
  downloadButton.classList.add("btn2");
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
  startAgainButton.classList.add("btn2");
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
}


function startOver() {
  startBooking(); // Restart the booking process
}

document.addEventListener("DOMContentLoaded", () => {
  startBooking(); // Start the chat when the page loads
});


document.getElementById('toggleChatbotLogo').addEventListener('click', function () {
  const chatbotContainer = document.getElementById('chatbotContainer');

  if (chatbotContainer.classList.contains('hidden')) {
      // Show the chatbot with animation
      chatbotContainer.classList.remove('hidden');
      gsap.fromTo(chatbotContainer, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.5, ease: "power1.out" });
  } else {
      // Hide the chatbot with animation
      gsap.to(chatbotContainer, 
          { scale: 0, opacity: 0, duration: 0.5, ease: "power1.in", onComplete: () => {
              chatbotContainer.classList.add('hidden');
          }});
  }
});

const aira = document.querySelector("#aira-text");

document.getElementById("toggleChatbotLogo").addEventListener("mouseover", () => {
  aira.style.display = "block";

  // Animate the entrance of the aira-text only from the bottom once
  gsap.fromTo(
    aira,
    {
      y: 20,    // Start 20 pixels down for a consistent effect
      opacity: 0 // Start with 0 opacity
    },
    {
      y: 0,     // End at the natural position
      opacity: 1, // End with full opacity
      duration: 0.5, // Animation duration
      ease: "power1.out" // Easing function for smooth effect
    }
  );
});

document.getElementById("toggleChatbotLogo").addEventListener("mouseleave", () => {
  // Animate the exit of the aira-text smoothly
  gsap.to(aira, {
    y: 20,    // Move down to indicate leaving the hover state
    opacity: 0, // Fade out
    duration: 0.5, // Animation duration
    ease: "power1.in", // Easing function for smooth effect
    onComplete: () => {
      aira.style.display = "none"; // Hide after animation completes
    }
  });
});


