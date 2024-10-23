const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const Projectlist = require("./routes/ProjectList.routes");
const invest =require("./routes/invest.routes")
const user = require("./routes/user.routes");
const transactions = require("./routes/transaction.routes")
const app = express();

// Connect to the database
connectDB();

// Enable CORS with default options
app.use(cors());

// Middleware
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("E4Rth-Backend is running");
});


app.use("/api/Projectslist", Projectlist);
app.use("/api/user", user);
app.use("/inverst",invest);
app.use("/transactions",transactions);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
