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
- **Order confirmation emails sent to customers**

## Screenshots

### Landing Page
![Landing Page](screenshots/landing_page.png)

### Products Page
![Products Page](screenshots/products_page.png)

### Cart Page
![Cart Page](screenshots/cart_page.png)

### Checkout Page
![Checkout Page](screenshots/checkout_page.png)

### Order Confirmation
![Order Confirmation](screenshots/order_conformation.png)

## Tech Stack

- **Frontend**: React.js with Axios, React Router, React Toastify
- **Backend**: Node.js + Express.js, NodeMailer
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

### Email Integration (Latest Update)
- **Order Confirmation Emails**: Automated emails sent to customers after successful checkout
- **Email Service**: NodeMailer integration with Gmail SMTP
- **Email Templates**: Professional HTML and plain text email templates
- **Error Handling**: Email failures don't affect checkout process
- **Configuration**: Environment variables for email credentials

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

4. **Configure Email Service**
   - For Gmail: Generate an App Password (not your regular password)
   - Update `.env` file with email credentials:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-gmail-app-password
     ```
   - For other email providers, update the service in `backend/services/emailService.js`

5. **Seed products (optional)**
   You can add products via POST to `/api/products` or directly in MongoDB Atlas.

6. **Run the application**
   ```bash
   npm start
   ```
   This will start both backend (port 5000) and frontend (port 3000) concurrently.

## API Endpoints

- `GET /api/products` - Fetch all products
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items and total
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Perform checkout (sends confirmation email)

## User Flow

1. Browse products on home page
2. Add items to cart (with loading feedback)
3. View cart with totals and GST calculation
4. Proceed to checkout
5. Enter customer details
6. Complete purchase and automatically redirect to products page
7. Receive toast notifications for success/error states
8. **Receive order confirmation email with full order details**

## Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── services/
│   │   └── emailService.js
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
- `nodemailer`: ^6.9.7 (for email functionality)

## Email Configuration

The application uses NodeMailer to send order confirmation emails. Currently configured for Gmail:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**: Go to Google Account settings → Security → 2-Step Verification → App passwords
3. **Use App Password**: Don't use your regular Gmail password, use the generated app password
4. **Update .env**: Set EMAIL_USER and EMAIL_PASS with your Gmail address and app password

For other email providers, modify the transporter configuration in `backend/services/emailService.js`.

## Development Notes

- Loading states prevent race conditions and multiple API calls
- Toast notifications provide immediate user feedback
- Automatic redirection after checkout improves user experience
- Email sending is asynchronous and doesn't block checkout completion
- MongoDB data directory is gitignored to prevent committing database files
- Email failures are logged but don't affect the checkout process
