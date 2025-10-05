const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Allow frontend requests
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Email Sending Function


    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "parkhymansi@gmail.com", // Your email
            pass: "bolk jmpm kwtv esvu"  // Use an App Password instead of real password
        }
    });

    app.post("/send-email", async (req, res) => {
        const { to, subject, text } = req.body;
    
        console.log(`Sending email to: ${to}`); // Debugging
    
        let mailOptions = {
            from: "your-email@gmail.com",
            to,
            subject,
            text
        };
    
        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent successfully!");
            res.json({ success: true, message: "Email sent successfully" });
        } catch (error) {
            console.error("Error sending email:", error);
            res.status(500).json({ success: false, message: "Failed to send email" });
        }
    });
    
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
