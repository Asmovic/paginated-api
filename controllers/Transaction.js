const Transaction = require('../models/Transaction'); // Adjust the path to your Transaction model

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const newTransaction = new Transaction(req.body);
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    let { page, limit, status, amount } = req.query;

    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    // Constructing filter object
    let filters = {};
    if (status) {
      filters.status = new RegExp(status, 'i'); // 'i' for case-insensitive
    }
    if (amount) {
      filters.amount = new RegExp(amount, 'i');
    }

    const transactions = await Transaction.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Transaction.countDocuments(filters);

    res.status(200).json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};