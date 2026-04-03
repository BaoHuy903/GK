const User = require('../models/users');

exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
};

exports.registerUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/users/login');
    } catch (err) {
        res.status(400).send("Lỗi đăng ký: " + err.message);
    }
};

exports.renderLoginForm = (req, res) => {
    res.render('users/login');
};

// CẬP NHẬT: Lưu cookie khi đăng nhập đúng
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        
        if (user) {
            // Thiết lập cookie tên là 'username', lưu trong 24 giờ (86400000 ms)
            res.cookie('username', user.username, { maxAge: 86400000, httpOnly: true });
            res.redirect('/products');
        } else {
            res.status(401).send("Sai email hoặc mật khẩu");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// MỚI THÊM: Xử lý Đăng xuất
exports.logoutUser = (req, res) => {
    res.clearCookie('username'); // Xóa cookie
    res.redirect('/products');
};