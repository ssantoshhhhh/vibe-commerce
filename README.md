# Vibe Commerce – Mock E-Commerce Cart

A complete MERN (MongoDB, Express.js, React, Node.js) e-commerce cart system that simulates essential shopping flow.

## Features

- Product listing with responsive grid
- Add/remove items from cart
- Calculate cart totals
- Mock checkout with receipt generation
- Data persistence in MongoDB Atlas
- Clean, responsive React UI

## Tech Stack

- **Frontend**: React.js with Axios & React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: CSS

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vibe-commerce-cart
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB Atlas**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update `.env` file with your MongoDB URI:
     ```
     MONGO_URI=mongodb+srv://your-username:your-password@cluster0.mongodb.net/vibe-commerce?retryWrites=true&w=majority
     ```

4. **Seed products (optional)**
   You can add products via POST to `/api/products` or directly in MongoDB Atlas.

5. **Run the application**
   ```bash
   npm start
   ```
   This will start both backend (port 5000) and frontend (port 3000) concurrently.

## API Endpoints

- `GET /api/products` - Fetch all products
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items and total
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Perform checkout

## User Flow

1. Browse products on home page
2. Add items to cart
3. View cart with totals
4. Proceed to checkout
5. Enter customer details
6. Complete purchase and view receipt

## Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .env
├── package.json
└── README.md