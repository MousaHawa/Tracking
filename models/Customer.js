const mongoose = require('mongoose');

/**
 * Customer Schema - Represents end customers
 * @description Schema for end customers who receive shipments
 */
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Customer name must be at least 2 characters long'],
    maxlength: [100, 'Customer name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street is required'],
      trim: true
    },
    number: {
      type: Number,
      required: [true, 'Street number is required'],
      min: [1, 'Street number must be positive']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    lon: {
      type: Number,
      required: false
    },
    lat: {
      type: Number,
      required: false
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
