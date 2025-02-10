const model = require("./models/userModel")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));


const User = model;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Reciever : ", req.body);
  if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("Receiver : ", req.body);
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  console.log(token);

  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
