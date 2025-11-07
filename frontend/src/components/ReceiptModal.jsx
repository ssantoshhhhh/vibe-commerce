import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceiptModal.css';

const ReceiptModal = ({ receipt, onClose }) => {
  const navigate = useNavigate();

  if (!receipt) return null;

  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header">
          <h2>Order Confirmed</h2>
          <p>Thank you for your purchase</p>
        </div>
        <div className="receipt-card">
          <div className="receipt-title">
            <h3>Order Receipt</h3>
            <span className="receipt-id">#{receipt._id?.slice(-8) || 'ORDER123'}</span>
          </div>
          <div className="receipt-section">
            <h4>Customer Details</h4>
            <div className="receipt-details">
              <div className="receipt-detail-row">
                <span className="detail-label">Name</span>
                <span className="detail-value">{receipt.customer.name}</span>
              </div>
              <div className="receipt-detail-row">
                <span className="detail-label">Email</span>
                <span className="detail-value">{receipt.customer.email}</span>
              </div>
              {receipt.customer.phone && (
                <div className="receipt-detail-row">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{receipt.customer.phone}</span>
                </div>
              )}
              {receipt.customer.address && (
                <div className="receipt-detail-row">
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{receipt.customer.address}</span>
                </div>
              )}
            </div>
          </div>
          <div className="receipt-section">
            <h4>Order Information</h4>
            <div className="receipt-details">
              <div className="receipt-detail-row">
                <span className="detail-label">Date</span>
                <span className="detail-value">
                  {new Date(receipt.timestamp).toLocaleString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="receipt-divider"></div>
              <div className="receipt-detail-row total-row">
                <span className="detail-label">Total Amount</span>
                <span className="detail-value total-amount">₹{receipt.total}</span>
              </div>
            </div>
          </div>
          <div className="receipt-footer">
            <p>We'll send you an email confirmation shortly.</p>
          </div>
        </div>
        <div className="modal-actions">
          <button className="btn close-btn" onClick={onClose}>
            Close
          </button>
          <button className="btn continue-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
