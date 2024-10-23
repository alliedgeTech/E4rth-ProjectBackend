const mongoose = require('mongoose');

const investSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  tokens: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  volume: { type: Number, required: true },
  marketCap: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Invest', investSchema);
