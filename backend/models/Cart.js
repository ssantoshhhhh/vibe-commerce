const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Cart', cartSchema);
