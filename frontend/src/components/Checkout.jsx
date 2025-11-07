import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const Checkout = ({ cart, onCheckout }) => {
  const [customer, setCustomer] = useState({ 
    name: '', 
    email: '',
    phone: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const newErrors = {};
    if (!customer.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!customer.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customer.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!customer.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!customer.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await onCheckout(customer);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.18;
  const finalTotal = subtotal + tax;

  return (
    <div className="checkout-container">
      <div className="container">
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Complete your order</p>
        </div>
        <div className="checkout-layout">
          <div className="checkout-form-section">
            <div className="card">
              <h2>Customer Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="address">Delivery Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                <button 
                  type="submit" 
                  className="btn checkout-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Purchase'}
                </button>
              </form>
            </div>
            <Link to="/cart">
              <button className="btn btn-secondary back-btn">
                Back to Cart
              </button>
            </Link>
          </div>
          <div className="checkout-summary-section">
            <div className="card order-summary-card">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cart.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="order-item-info">
                      <span className="order-item-name">{item.name}</span>
                      <span className="order-item-qty">Qty: {item.qty}</span>
                    </div>
                    <span className="order-item-price">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="order-summary-divider"></div>
              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="order-total-row">
                  <span>GST (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="order-total-divider"></div>
                <div className="order-total-row final-total">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
