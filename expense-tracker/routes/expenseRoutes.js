const express = require("express");
const Expense = require("../models/expense");

const router = express.Router();
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

router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense details" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

router.put("/:id", async (req, res) => {
    try {
      const { title, amount, category } = req.body;
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        { title, amount, category },
        { new: true, runValidators: true }
      );
      if (!updatedExpense) {
        return res.status(404).json({ error: "Expense not found" });
      }
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).json({ error: "Failed to update expense" });
    }
  });
module.exports = router;
