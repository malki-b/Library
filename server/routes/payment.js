const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypalController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create', verifyToken, paypalController.createPayment);
router.post('/capture/:orderId', verifyToken, paypalController.capturePayment);

module.exports = router;
