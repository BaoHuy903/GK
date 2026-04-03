const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', userController.renderRegisterForm);
router.post('/register', userController.registerUser);
router.get('/login', userController.renderLoginForm);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser); // <-- MỚI THÊM

module.exports = router;