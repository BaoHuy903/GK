const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ Đã kết nối MongoDB thành công!');
    } catch (err) {
        console.error('❌ Lỗi kết nối MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;