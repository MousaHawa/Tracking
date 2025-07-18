const mongoose = require('mongoose');

/**
 * Package Schema - Represents shipments/packages
 * @description Schema for tracking shipments between companies and customers
 */
const packageSchema = new mongoose.Schema({
  prod_id: { 
    type: String, 
    required: [true, 'Product ID is required'],
    trim: true
  },
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true
  },
  start_date: { 
    type: Number, 
    required: [true, 'Start date is required'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'Start date must be a valid timestamp'
    }
  },
  eta: { 
    type: Number, 
    required: [true, 'ETA is required'],
    validate: {
      validator: function(v) {
        return v > 0;
      },
      message: 'ETA must be a valid timestamp'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['packed', 'shipped', 'intransit', 'delivered'],
      message: 'Status must be one of: packed, shipped, intransit, delivered'
    },
    default: 'packed'
  },
  path: [
    {
      lat: {
        type: Number,
        required: true,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90']
      },
      lon: {
        type: Number,
        required: true,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180']
      }
    }
  ],
  buisness_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Business ID is required']
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, 'Customer ID is required']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
