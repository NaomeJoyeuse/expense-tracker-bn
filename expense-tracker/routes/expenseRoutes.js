const express = require("express");
const Expense = require("../models/expense");

const router = express.Router();

// ✅ Create a new expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const newExpense = new Expense({ title, amount, category });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// ✅ Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// ✅ Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
