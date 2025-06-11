const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const axios = require("axios"); 
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ["admin", "manager", "donor"], required: true },
  bloodType: { type: String, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], required: true },
  location: { type: String, required: true }, 
  phone: { type: String, required: true }, 
});

const User = mongoose.model("User", userSchema);


app.post("/signup", async (req, res) => {
  const { email, password, role, bloodType, location, phone } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "®️ Already Registered... ®️" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, role, bloodType, location, phone });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "❌ User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }

    res.json({ message: "✅ Login Successful", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error" });
  }
});


const sendWhatsAppMessage = async (phone, message) => {
  try {
    const response = await axios.post(
      `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`,
      {
        token: process.env.ULTRAMSG_TOKEN,
        to: phone,
        body: message,
      }
    );

    if (response.data.status === "sent") {
      console.log(`✅ Message sent to ${phone}:`, response.data);
    } else {
      console.log(`❌ Failed to send message to ${phone}`);
    }
  } catch (error) {
    console.error("❌ Error sending WhatsApp message:", error.response ? error.response.data : error.message);
  }
};


app.post("/request-blood", async (req, res) => {
  const { bloodGroup, unitsRequested, location } = req.body;

  try {
    
    const donors = await User.find({ bloodType: bloodGroup, role: "donor" });

    if (!donors || donors.length === 0) {
      return res.status(404).json({ message: "❌ No donors found for this blood group" });
    }

    // Loop through each donor and send WhatsApp message
    for (const donor of donors) {
      const message = `🚨 Urgent Blood Request! 🚨\n\nWe need ${unitsRequested} units of ${bloodGroup} blood at ${location}.\n\nIf you can donate, please contact us immediately. Every drop counts! ❤️`;
      await sendWhatsAppMessage(donor.phone, message);
    }

    res.status(200).json({ message: "✅ Blood request sent successfully to donors." });
  } catch (error) {
    console.error("❌ Error processing blood request:", error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
