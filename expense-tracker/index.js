require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require("./routes/expenseRoutes");
const path = require("path"); // Import path module

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve the index.html at the root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve static files like CSS and JS from the 'public' folder
app.use(express.static("public"));

// Expense routes
app.use("/api/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
