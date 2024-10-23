const Transaction = require("../models/transaction.model");
const createTransaction = async (transactionData) => {
  const transaction = new Transaction(transactionData);
  return await transaction.save();
};

const getAllTransactions = async (
  filters = {},
  fromDate,
  toDate,
  page = 1,
  limit = 10,
  sort = {}
) => {
  const query = {};

  // Add filters for specific fields like user_id or project_id
  if (filters.user_id) query.user_id = filters.user_id;
  if (filters.project_id) query.project_id = filters.project_id;
  if (filters.status) query.status = filters.status;

  if (fromDate || toDate) {
    query.createdAt = {};
    if (fromDate) query.createdAt.$gte = new Date(fromDate);
    if (toDate) query.createdAt.$lte = new Date(toDate);
  }
  const skip = (page - 1) * limit;
  return await Transaction.find(query)
    .populate("user_id project_id")
    .sort(sort)
    .skip(skip)
    .limit(limit);
};
const getTransactionById = async (transactionId) => {
  return await Transaction.findById(transactionId).populate(
    "user_id project_id"
  );
};

const updateTransactionStatus = async (transactionId, status) => {
  return await Transaction.findByIdAndUpdate(
    transactionId,
    { status },
    { new: true }
  );
};
const deleteTransaction = async (transactionId) => {
  return await Transaction.findByIdAndDelete(transactionId);
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
};
