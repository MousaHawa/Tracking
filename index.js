const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); // ✅ لازم يكون فوق

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ لازم يكون قبل listen
app.use(express.static(path.join(__dirname, 'public')));



// ✅ قاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ المسارات
app.use('/business', require('./routes/companyRoutes'));
app.use('/customers', require('./routes/customerRoutes'));
app.use('/packages', require('./routes/packageRoutes'));

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

