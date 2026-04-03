const Product = require('../models/Product');
const Category = require('../models/Category');

// Hiển thị tất cả sản phẩm VÀ Xử lý tìm kiếm
exports.getAllProducts = async (req, res) => {
    try {
        let query = {};
        
        if (req.query.search) {
            query.name = { $regex: req.query.search, $options: 'i' }; 
        }

        // CHÚ Ý DÒNG NÀY: Phải là find(query) chứ không được để trống find()
        const products = await Product.find(query).populate('category');
        
        res.render('products/index', { 
            products: products,
            searchQuery: req.query.search || '',
            currentUser: req.cookies ? req.cookies.username : null // Tránh lỗi mất tên đăng nhập trên navbar
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Form tạo mới
exports.renderNewForm = async (req, res) => {
    const categories = await Category.find(); // Lấy danh mục để chọn
    res.render('products/new', { categories, currentUser: req.cookies ? req.cookies.username : null });
};
// Xử lý tạo mới
exports.createProduct = async (req, res) => {
    try {
        await Product.create(req.body);
        res.redirect('/products');
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Hiển thị chi tiết
exports.getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        res.render('products/detail', { product });
    } catch (err) {
        res.status(404).send('Không tìm thấy sản phẩm');
    }
};

// Form chỉnh sửa
exports.renderEditForm = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const categories = await Category.find();
        res.render('products/edit', { product, categories });
    } catch (err) {
        res.status(404).send('Không tìm thấy sản phẩm');
    }
};

// Xử lý cập nhật
exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/products/${req.params.id}`);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Xử lý xóa
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        res.status(400).send(err.message);
    }
};