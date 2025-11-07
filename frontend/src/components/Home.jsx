import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="container">
        <div className="hero-section">
          <h1>Welcome to Vibe Commerce</h1>
          <p>A complete MERN (MongoDB, Express.js, React, Node.js) e-commerce cart system that simulates essential shopping flow.</p>
        </div>
        <div className="features-section">
          <h2>Features</h2>
          <ul>
            <li>Product listing with responsive grid</li>
            <li>Add/remove items from cart</li>
            <li>Calculate cart totals</li>
            <li>Mock checkout with receipt generation</li>
            <li>Data persistence in MongoDB Atlas</li>
            <li>Clean, responsive React UI</li>
            <li>Toastify Alerts</li>
          </ul>
        </div>
        <div className="tech-stack-section">
          <h2>Tech Stack</h2>
          <ul>
            <li><strong>Frontend:</strong> React.js with Axios & React Router</li>
            <li><strong>Backend:</strong> Node.js + Express.js</li>
            <li><strong>Database:</strong> MongoDB Atlas (Cloud)</li>
            <li><strong>Styling:</strong> CSS</li>
          </ul>
        </div>
        <div className="cta-section">
          <Link to="/products" className="btn btn-primary">
            Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
