// src/routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');
const authController = require('../controllers/authController'); 
const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.get('/info', saleController.getSaleInfo);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/buy', authMiddleware, saleController.buyProduct);

router.get('/history', authMiddleware, saleController.getOrderHistory);

module.exports = router;