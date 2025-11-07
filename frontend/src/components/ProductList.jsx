import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading">
          <div className="loader"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="container">
        <div className="page-header">
          <h1>Products</h1>
          <p>Browse our collection</p>
        </div>
        {products.length === 0 ? (
          <div className="empty-state">
            <h2>No Products Available</h2>
            <p>We're currently updating our inventory. Please check back soon.</p>
          </div>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-card-image">
                  {product.name.charAt(0)}
                </div>
                <div className="product-card-content">
                  <h3>{product.name}</h3>
                  <div className="product-card-price">₹{product.price}</div>
                  <button
                    className="btn"
                    onClick={() => handleAddToCart(product._id)}
                    data-product-id={product._id}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
