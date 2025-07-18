const Package = require('../models/Package');
const Company = require('../models/company');
const Customer = require('../models/Customer');
const yup = require('yup');
const axios = require('axios');

/**
 * Validation schema for package creation
 */
const createPackageSchema = yup.object({
  prod_id: yup.string().required('Product ID is required'),
  name: yup.string().required('Product name is required'),
  start_date: yup.number().required('Start date is required').positive('Start date must be positive'),
  eta: yup.number().required('ETA is required').positive('ETA must be positive'),
  status: yup.string().oneOf(['packed', 'shipped', 'intransit', 'delivered'], 'Invalid status'),
  buisness_id: yup.string().required('Business ID is required'),
  customer_id: yup.string().required('Customer ID is required')
});

/**
 * Validation schema for location addition
 */
const addLocationSchema = yup.object({
  lat: yup.number().required('Latitude is required').min(-90).max(90),
  lon: yup.number().required('Longitude is required').min(-180).max(180)
});

/**
 * Create a new package
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Created package with status 201 or error with status 400
 */
exports.createPackage = async (req, res) => {
  try {
    // Validate input
    const validatedData = await createPackageSchema.validate(req.body);
    
    // Check if company exists
    const company = await Company.findById(validatedData.buisness_id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    
    // Check if customer exists
    const customer = await Customer.findById(validatedData.customer_id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    const newPackage = await Package.create(validatedData);
    res.status(201).json(newPackage);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get packages by company ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} Array of packages or error with status 500
 */
exports.getPackagesByCompany = async (req, res) => {
  try {
    const packages = await Package.find({ buisness_id: req.params.companyId })
      .populate('customer_id', 'name email address')
      .populate('buisness_id', 'name')
      .sort({ start_date: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Add location to package path
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Updated package or error
 */
exports.addLocationToPackage = async (req, res) => {
  try {
    // Validate input
    const validatedData = await addLocationSchema.validate(req.body);

    const package = await Package.findById(req.params.packageId);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // Check if location already exists in path
    const alreadyExists = package.path.some(p => 
      Math.abs(p.lat - validatedData.lat) < 0.0001 && 
      Math.abs(p.lon - validatedData.lon) < 0.0001
    );
    
    if (alreadyExists) {
      return res.status(400).json({ error: 'Location already exists in path' });
    }

    // Add new location to path
    package.path.push({ lat: validatedData.lat, lon: validatedData.lon });
    await package.save();

    res.status(200).json(package);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Search location using LocationIQ API
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} Location coordinates or error
 */
exports.searchLocation = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Use LocationIQ API to search for location
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'LocationIQ API key not configured' });
    }

    const response = await axios.get(`https://us1.locationiq.com/v1/search`, {
      params: {
        key: apiKey,
        q: query,
        format: 'json',
        limit: 1
      }
    });

    if (response.data && response.data.length > 0) {
      const location = response.data[0];
      res.json({
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
        display_name: location.display_name
      });
    } else {
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(500).json({ error: 'Error searching location' });
  }
};
