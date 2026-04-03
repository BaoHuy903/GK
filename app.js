const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

// Middleware truyền thông tin đăng nhập vào tất cả các trang EJS (để hiện tên Navbar)
app.use((req, res, next) => {
    res.locals.currentUser = req.cookies.username || null; 
    next();
});

// ==========================================
// MỚI THÊM: MIDDLEWARE BẢO VỆ TRANG WEB
// ==========================================
const requireLogin = (req, res, next) => {
    // Nếu không tìm thấy cookie username (tức là chưa đăng nhập)
    if (!req.cookies.username) {
        return res.redirect('/users/login'); // Bắt buộc quay xe về trang đăng nhập
    }
    // Nếu đã đăng nhập rồi thì cho phép đi tiếp vào trang sản phẩm
    next();
};

// Áp dụng lớp bảo vệ "requireLogin" cho TOÀN BỘ các đường dẫn bắt đầu bằng /products
app.use('/products', requireLogin, productRoutes);

// Đường dẫn của user (đăng ký, đăng nhập) thì không bị chặn
app.use('/users', userRoutes);

// Cập nhật lại đường dẫn gốc (khi vừa gõ localhost:3000)
app.get('/', (req, res) => {
    if (req.cookies.username) {
        res.redirect('/products'); // Nếu đã đăng nhập thì vô thẳng cửa hàng
    } else {
        res.redirect('/users/login'); // Nếu chưa thì vô màn hình đăng nhập trước
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});