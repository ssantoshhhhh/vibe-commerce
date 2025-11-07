const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, checkout } = require('../controllers/cartController');

router.route('/').get(getCart).post(addToCart);
router.route('/:id').delete(removeFromCart);
router.route('/checkout').post(checkout);

module.exports = router;
