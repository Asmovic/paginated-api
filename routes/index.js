const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getAllTransactions,
} = require('../controllers/Transaction'); // Adjust the path as necessary
const { createUser, getAllUsers } = require('../controllers/User'); // Adjust the path as necessary

// Route to create a new transaction
router.post('/transactions', createTransaction);

// Route to retrieve all transactions
router.get('/transactions', getAllTransactions);

// Route to create a new user
router.post('/users', createUser);

// Route to retrieve all users
router.get('/users', getAllUsers);

module.exports = router;
