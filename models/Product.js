const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: { type: String, default: 'default.jpg' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);