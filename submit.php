<?php
// Enable error reporting for debugging (you can disable this in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON input
    $data = json_decode(file_get_contents("php://input"), true);
    $name = trim($data["name"]);
    $phone = trim($data["phone"]);
    $email = trim($data["email"]); // New field for email
    $idNumber = trim($data["idNumber"]);
    $date = trim($data["date"]);

    // Validate input
    if (!empty($name) && preg_match('/^[a-zA-Z\s]+$/', $name) &&
        preg_match('/^[0-9]{10}$/', $phone) && 
        filter_var($email, FILTER_VALIDATE_EMAIL) && // Validate email
        !empty($idNumber) && !empty($date)) {
        
        // Database connection
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "chatbotmk4";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
            exit;
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO users (name, phone, email, id_number, visiting_date) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $name, $phone, $email, $idNumber, $date);

        // Execute statement
        if ($stmt->execute()) {
            // If booking is saved successfully, generate the QR code data
            $bookingData = [
                "name" => $name,
                "phone" => $phone,
                "email" => $email,
                "idNumber" => $idNumber,
                "date" => $date
            ];

            // Convert booking data to JSON
            $qrCodeData = json_encode($bookingData);
            // Generate QR code URL
            $qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' . urlencode($qrCodeData) . '&size=150x150';

            // Send email with the QR code
            $subject = "Your Booking Confirmation";
            $message = "<h1>Thank you for your booking, $name!</h1>";
            $message .= "<p>Here is your QR code:</p>";
            $message .= "<img src='$qrCodeUrl' alt='QR Code'><br>";
            $message .= "<p>Date of Visit: $date</p>";
            $message .= "<p>Phone: $phone</p>";

            // Set content-type for sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= 'From: webwizards80@gmail.com' . "\r\n"; // Use a valid From address

            // Attempt to send the email
            if (mail($email, $subject, $message, $headers)) {
                echo json_encode(["status" => "success", "message" => "Your booking has been saved and the QR code has been sent to your email."]);
            } else {
                // Log the error
                error_log("Mail function failed. Check your mail server settings.");
                echo json_encode(["status" => "error", "message" => "Booking saved, but failed to send the QR code email."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        // Close statement and connection
        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
