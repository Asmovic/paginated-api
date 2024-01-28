const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'failed'], // Example statuses, modify as needed
    },
    reference: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Enable timestamps

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
