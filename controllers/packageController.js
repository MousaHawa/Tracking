const Package = require('../models/Package');

exports.createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json(newPackage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPackagesByCompany = async (req, res) => {
  try {
    const packages = await Package.find({ buisness_id: req.params.companyId });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addLocationToPackage = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const package = await Package.findById(req.params.packageId);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    // نتاكد إن النقطة مش مكررة
    const alreadyExists = package.path.some(p => p.lat === lat && p.lon === lon);
    if (alreadyExists) {
      return res.status(400).json({ error: 'Location already exists in path' });
    }

    // نضيفها
    package.path.push({ lat, lon });
    await package.save();

    res.status(200).json(package);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
