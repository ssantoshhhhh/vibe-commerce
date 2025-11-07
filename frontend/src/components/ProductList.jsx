import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ addToCart, loading }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchProducts = async () => {
    try {
      const url = searchTerm
        ? `/api/products?search=${encodeURIComponent(searchTerm)}`
        : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setLoadingProducts(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoadingProducts(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (loading) return; // Prevent multiple clicks
    try {
      await addToCart(productId, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loadingProducts) {
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
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
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
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    product.name.charAt(0)
                  )}
                </div>
                <div className="product-card-content">
                  <h3>{product.name}</h3>
                  <div className="product-card-price">₹{product.price}</div>
                  <button
                    className="btn"
                    onClick={() => handleAddToCart(product._id)}
                    data-product-id={product._id}
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add to Cart'}
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
