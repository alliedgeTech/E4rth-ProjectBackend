// models/projectsInvestHistory.model.js
const mongoose = require('mongoose');

const ProjectsInvestHistorySchema = new mongoose.Schema({
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
    token: {
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
    },
    quantityToken: {
        type: Number,
        required: true
    },
},{timestamps: true });

module.exports = mongoose.model('ProjectsInvestHistory', ProjectsInvestHistorySchema);
