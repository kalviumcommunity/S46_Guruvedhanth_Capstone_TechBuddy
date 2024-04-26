require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors =require("cors")
const qaRoutes =require("./routes/q-a")

const userRoutes = require("./routes/ userRoute");
app.use(express.json());
app.use(cors());


// Passport
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Instantiate MongoStore with session


app.use(express.static(__dirname + '/public'));

app.use(
  session({
    secret: process.env.SECERET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(passport.initialize());
app.use(passport.session()); 



// Routes
app.use("/api/users", userRoutes);
app.use("/api/qa",qaRoutes)

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server is running on port ${3000}`);
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});
