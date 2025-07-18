const express = require('express');
const router = express.Router();
const { createPackage, getPackagesByCompany, addLocationToPackage, searchLocation } = require('../controllers/packageController');

router.post('/', createPackage);
router.get('/:companyId', getPackagesByCompany);
router.put('/:packageId/path', addLocationToPackage);
router.get('/search/location', searchLocation);

module.exports = router;
