// routes/expenseRoutes.js

const express = require('express');
const Expense = require('../models/Expense');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Middleware to authenticate JWT
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Add expense route
router.post('/add', authMiddleware, async (req, res) => {
    const { category, description, amount } = req.body;
    try {
        const expense = new Expense({
            user: req.user,
            category,
            description,
            amount,
        });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense' });
    }
});

// Get all expenses for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

module.exports = router;