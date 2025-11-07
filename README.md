# Vibe Commerce – Mock E-Commerce Cart

A complete MERN (MongoDB, Express.js, React, Node.js) e-commerce cart system that simulates essential shopping flow with enhanced UI responsiveness and user experience.

## Features

- Product listing with responsive grid
- Add/remove items from cart with loading states
- Calculate cart totals with GST
- Mock checkout with receipt generation
- Data persistence in MongoDB Atlas
- Clean, responsive React UI with toast notifications
- Loading states to prevent multiple clicks and improve UX
- Automatic redirection to products page after checkout
- Toast alerts for success/error feedback

## Tech Stack

- **Frontend**: React.js with Axios, React Router, React Toastify
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Styling**: CSS

## Recent Updates

### UI/UX Improvements (Latest Commit)
- **Loading States**: Added loading indicators to prevent multiple rapid clicks on buttons
- **Button Responsiveness**: Buttons are disabled during operations with loading text ("Adding...", "Removing...", "Processing...")
- **User Feedback**: Immediate visual feedback for all cart operations
- **Toast Notifications**: Success/error alerts using React Toastify
- **Checkout Flow**: Automatic redirection to products page after successful checkout
- **Git Configuration**: Added backend/data/ to .gitignore to avoid committing MongoDB data files

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
2. Add items to cart (with loading feedback)
3. View cart with totals and GST calculation
4. Proceed to checkout
5. Enter customer details
6. Complete purchase and automatically redirect to products page
7. Receive toast notifications for success/error states

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
```

## Dependencies

### Frontend
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-router-dom`: ^6.14.2
- `axios`: ^1.4.0
- `react-toastify`: ^10.0.4 (for toast notifications)

### Backend
- `express`: ^4.18.2
- `mongoose`: ^7.5.3
- `cors`: ^2.8.5
- `dotenv`: ^16.3.1

## Development Notes

- Loading states prevent race conditions and multiple API calls
- Toast notifications provide immediate user feedback
- Automatic redirection after checkout improves user experience
- MongoDB data directory is gitignored to prevent committing database files
