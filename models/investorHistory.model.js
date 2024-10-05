// models/investorHistory.model.js
const mongoose = require('mongoose');

const InvestorHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isSell: {
        type: Boolean,
        required: true // true = sell, false = buy
    }
},{timestamps: true });

module.exports = mongoose.model('InvestorHistory', InvestorHistorySchema);
