import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, removeFromCart, updateCartQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.18; // 18% GST
  const finalTotal = subtotal + tax;

  return (
    <div className="cart-container">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          <p>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
        {cart.length === 0 ? (
          <div className="empty-state">
            <h2>Your cart is empty</h2>
            <p>Start adding items to your cart.</p>
            <Link to="/">
              <button className="btn">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item-card">
                  <div className="cart-item-image">
                    {item.name.charAt(0)}
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <div className="cart-item-info">
                      <div className="info-row">
                        <span className="info-label">Price</span>
                        <span className="info-value">₹{item.price}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Quantity</span>
                        <div className="quantity-controls">
                          <button
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item._id, item.qty - 1)}
                            disabled={item.qty <= 1}
                          >
                            -
                          </button>
                          <span className="qty-value">{item.qty}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item._id, item.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="info-row total-row">
                        <span className="info-label">Subtotal</span>
                        <span className="info-value">₹{item.price * item.qty}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="total-amount">₹{finalTotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout">
                  <button className="btn checkout-btn">
                    Proceed to Checkout
                  </button>
                </Link>
                <Link to="/">
                  <button className="btn btn-secondary continue-btn">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
