const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  prod_id: { type: String, required: true },
  name: { type: String, required: true },
  start_date: { type: Number, required: true },
  eta: { type: Number, required: true },
  status: {
    type: String,
    enum: ['packed', 'shipped', 'intransit', 'delivered'],
    default: 'packed'
  },
  path: [
    {
      lat: Number,
      lon: Number
    }
  ],
  buisness_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
});

module.exports = mongoose.model('Package', packageSchema);
