const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const investorHistoryRoutes = require('./routes/investorHistory.routes');
const projectsInvestHistoryRoutes = require('./routes/projectsInvestHistory.routes');
const user = require('./routes/user.routes')

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

app.use('/api/investor-history', investorHistoryRoutes);
app.use('/api/projects-invest-history', projectsInvestHistoryRoutes);
app.use('/api/user',user);



// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
