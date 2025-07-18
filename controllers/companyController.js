const Company = require('../models/company');
const yup = require('yup');

/**
 * Validation schema for company creation
 */
const createCompanySchema = yup.object({
  name: yup.string().required('Company name is required').min(2, 'Company name must be at least 2 characters').max(100, 'Company name cannot exceed 100 characters'),
  site_url: yup.string().required('Website URL is required').url('Please provide a valid website URL')
});

/**
 * Create a new company
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Created company with status 201 or error with status 400
 */
exports.createCompany = async (req, res) => {
  try {
    // Validate input
    const validatedData = await createCompanySchema.validate(req.body);
    
    const company = await Company.create(validatedData);
    res.status(201).json(company);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get all companies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} Array of companies or error with status 500
 */
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
