const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get all cart items
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({}).populate('productId');
    const items = cartItems.map(item => ({
      _id: item._id,
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      qty: item.qty,
    }));
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty) {
    return res.status(400).json({ message: 'Please provide productId and qty' });
  }

  try {
    // Check if item already in cart
    let cartItem = await Cart.findOne({ productId });

    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
    } else {
      cartItem = new Cart({
        productId,
        qty,
      });
      await cartItem.save();
    }

    const cart = await Cart.find({}).populate('productId');
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    await Cart.findByIdAndDelete(id);
    const cart = await Cart.find({}).populate('productId');
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Checkout
// @route   POST /api/checkout
// @access  Public
const checkout = async (req, res) => {
  const { customer, cartItems } = req.body;

  if (!customer || !cartItems) {
    return res.status(400).json({ message: 'Please provide customer and cartItems' });
  }

  try {
    // Calculate total
    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.qty;
      }
    }

    // Clear cart
    await Cart.deleteMany({});

    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      customer,
    };

    res.json({
      message: 'Checkout successful',
      receipt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  checkout,
};
