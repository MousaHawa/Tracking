const Customer = require('../models/Customer');
const yup = require('yup');

/**
 * Validation schema for customer creation
 */
const createCustomerSchema = yup.object({
  name: yup.string().required('Customer name is required').min(2, 'Customer name must be at least 2 characters').max(100, 'Customer name cannot exceed 100 characters'),
  email: yup.string().required('Email is required').email('Please provide a valid email address'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    number: yup.number().required('Street number is required').positive('Street number must be positive'),
    city: yup.string().required('City is required')
  })
});

/**
 * Create a new customer
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Created customer with status 201 or error with status 400
 */
exports.createCustomer = async (req, res) => {
  try {
    // Validate input
    const validatedData = await createCustomerSchema.validate(req.body);
    
    const customer = await Customer.create(validatedData);
    res.status(201).json(customer);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get all customers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} Array of customers or error with status 500
 */
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
