const express = require('express');
const router = express.Router();
const { createPackage, getPackagesByCompany, addLocationToPackage } = require('../controllers/packageController');

router.post('/', createPackage);
router.get('/:companyId', getPackagesByCompany);
router.put('/:packageId/path', addLocationToPackage);

module.exports = router;
