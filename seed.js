const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product'); // Link tới model Product của bạn
const Category = require('./models/Category'); // Link tới model Category của bạn

// Kết nối database
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Đang kết nối Database để bơm dữ liệu...'))
    .catch(err => console.log(err));

const seedProducts = async () => {
    try {
        // 1. Tạo thử một danh mục mặc định (vì sản phẩm của bạn có liên kết tới Category)
        let defaultCat = await Category.findOne({ name: 'Quần Áo Mới' });
        if (!defaultCat) {
            defaultCat = await Category.create({ name: 'Quần Áo Mới', description: 'Hàng mới về' });
        }

        // 2. Danh sách các sản phẩm giả (có kèm ảnh từ Unsplash cho đẹp)
        const fakeData = [
            { name: 'Áo thun trắng Basic', price: 15, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', category: defaultCat._id },
            { name: 'Quần Jeans nữ rách gối', price: 25, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80', category: defaultCat._id },
            { name: 'Áo khoác Hoodie Unisex', price: 30, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80', category: defaultCat._id },
            { name: 'Váy hoa nhí dạo phố', price: 22, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80', category: defaultCat._id },
            { name: 'Áo sơ mi lụa công sở', price: 28, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80', category: defaultCat._id },
            { name: 'Quần short thể thao nam', price: 12, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80', category: defaultCat._id }
        ];

        // 3. Đẩy tất cả vào Database
        await Product.insertMany(fakeData);
        console.log('✅ Đã bơm thành công 6 sản phẩm giả vào Cửa hàng!');
        
        // Tắt kết nối
        mongoose.connection.close();
    } catch (err) {
        console.log('❌ Có lỗi xảy ra:', err);
        mongoose.connection.close();
    }
};

seedProducts();