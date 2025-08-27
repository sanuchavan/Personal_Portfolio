const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// POST route for form
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "",  // 🔹 replace with your Gmail
        pass: ""     // 🔹 use Gmail App Password (not normal password)
      }
    });

    await transporter.sendMail({
      from: email,
      to: "sanikachavan2034@gmail.com", // 🔹 Your email to receive messages
      subject: `📩 New message from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b><br>${message}</p>`
    });

    res.json({ success: true, message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "❌ Failed to send message." });
  }
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
