const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  site_url: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema);
