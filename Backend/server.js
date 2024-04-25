require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoute");
app.use(express.json());

// Connect to MongoDB

// Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});