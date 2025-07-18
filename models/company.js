const mongoose = require('mongoose');

/**
 * Company Schema - Represents shipping companies/businesses
 * @description Schema for shipping companies that initiate shipments
 */
const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long'],
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  site_url: {
    type: String,
    required: [true, 'Website URL is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid website URL starting with http:// or https://'
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
