import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ReceiptModal from './components/ReceiptModal';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setCart(data.items);
      setCartCount(data.items.reduce((sum, item) => sum + item.qty, 0));
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, qty) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, qty }),
      });
      if (response.ok) {
        toast.success('Item added to cart!');
        fetchCart();
      } else {
        toast.error('Failed to add item to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding item to cart.');
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      toast.success('Item removed from cart!');
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Error removing item from cart.');
    }
  };

  const updateCartQuantity = async (id, qty) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qty }),
      });
      if (response.ok) {
        toast.success('Quantity updated!');
        fetchCart();
      } else {
        toast.error('Failed to update quantity.');
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      toast.error('Error updating quantity.');
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      const cartItems = cart.map(item => ({
        productId: item.productId,
        qty: item.qty,
      }));

      const response = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerData,
          cartItems,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReceipt(data.receipt);
        setShowReceipt(true);
        setCart([]);
        setCartCount(0);
        toast.success('Order placed successfully!');
        navigate('/products');
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('An error occurred during checkout. Please try again.');
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setReceipt(null);
  };

  return (
    <div className="App">
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} />} />
        <Route path="/checkout" element={<Checkout cart={cart} onCheckout={handleCheckout} />} />
      </Routes>
      {showReceipt && <ReceiptModal receipt={receipt} onClose={closeReceipt} />}
      <ToastContainer />
    </div>
  );
}

export default App;
