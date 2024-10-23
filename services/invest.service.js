const Invest = require('../models/invest.model');

/** Create Investment Service */
const createInvestment = async (investmentData) => {
  const investment = new Invest(investmentData);
  return await investment.save();
};

/** Get All Investments with Filters, Pagination, and Date Range */
const getAllInvestments = async (filters = {}, fromDate, toDate, page = 1, limit = 10, sort = {}) => {
  const query = {};

  // Add filters for specific fields like user_id or project_id
  if (filters.user_id) query.user_id = filters.user_id;
  if (filters.project_id) query.project_id = filters.project_id;

  // Date range filtering
  if (fromDate || toDate) {
    query.createdAt = {};
    if (fromDate) query.createdAt.$gte = new Date(fromDate);
    if (toDate) query.createdAt.$lte = new Date(toDate);
  }

  // Pagination
  const skip = (page - 1) * limit;

  // Fetch investments based on query, pagination, and sorting
  return await Invest.find(query)
    .populate('user_id project_id')  // Populate user and project details
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

/** Get Investment by ID Service */
const getInvestmentById = async (investmentId) => {
  return await Invest.findById(investmentId).populate('user_id project_id');
};

/** Delete Investment by ID Service */
const deleteInvestment = async (investmentId) => {
  return await Invest.findByIdAndDelete(investmentId);
};

module.exports = {
  createInvestment,
  getAllInvestments,
  getInvestmentById,
  deleteInvestment
};
