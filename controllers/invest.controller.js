const investService = require('../services/invest.service');

/** Create Investment Controller */
const createInvestment = async (req, res) => {
  try {
    const newInvestment = await investService.createInvestment(req.body);
    res.status(201).json({ message: 'Investment created successfully', newInvestment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Get All Investments with Filters, Date Range, and Pagination */
const getAllInvestments = async (req, res) => {
  try {
    const { user_id, project_id, fromDate, toDate, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
    
    const filters = {};
    if (user_id) filters.user_id = user_id;
    if (project_id) filters.project_id = project_id;
    
    const sort = { [sortBy]: order === 'desc' ? -1 : 1 };

    const investments = await investService.getAllInvestments(filters, fromDate, toDate, parseInt(page), parseInt(limit), sort);
    
    res.status(200).json(investments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Get Investment by ID Controller */
const getInvestmentById = async (req, res) => {
  try {
    const investment = await investService.getInvestmentById(req.params.id);
    if (!investment) return res.status(404).json({ error: 'Investment not found' });
    res.status(200).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/** Delete Investment by ID Controller */
const deleteInvestment = async (req, res) => {
  try {
    const deletedInvestment = await investService.deleteInvestment(req.params.id);
    if (!deletedInvestment) return res.status(404).json({ error: 'Investment not found' });
    res.status(200).json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createInvestment,
  getAllInvestments,
  getInvestmentById,
  deleteInvestment
};
