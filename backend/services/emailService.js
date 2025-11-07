const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail', // You can change this to your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmationEmail = async (customer, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Order Confirmation - Vibe Commerce',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Order Confirmation</h1>
          <p>Dear ${customer.name},</p>
          <p>Thank you for your order! Here are your order details:</p>

          <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Information</h3>
            <p><strong>Order ID:</strong> ${orderDetails._id?.slice(-8) || 'ORDER123'}</p>
            <p><strong>Date:</strong> ${new Date(orderDetails.timestamp).toLocaleString('en-IN')}</p>
            <p><strong>Total Amount:</strong> ₹${orderDetails.total}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${customer.name}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            ${customer.phone ? `<p><strong>Phone:</strong> ${customer.phone}</p>` : ''}
            ${customer.address ? `<p><strong>Address:</strong> ${customer.address}</p>` : ''}
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3>Order Items</h3>
            ${orderDetails.items.map(item => `
              <div style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.qty} | Price: ₹${item.price} | Subtotal: ₹${item.price * item.qty}</p>
              </div>
            `).join('')}
          </div>

          <p style="text-align: center; margin-top: 30px;">
            Thank you for shopping with Vibe Commerce!
          </p>
          <p style="text-align: center; color: #666; font-size: 12px;">
            This is an automated email. Please do not reply.
          </p>
        </div>
      `,
      text: `
Order Confirmation - Vibe Commerce

Dear ${customer.name},

Thank you for your order! Here are your order details:

Order Information:
Order ID: ${orderDetails._id?.slice(-8) || 'ORDER123'}
Date: ${new Date(orderDetails.timestamp).toLocaleString('en-IN')}
Total Amount: ₹${orderDetails.total}

Customer Details:
Name: ${customer.name}
Email: ${customer.email}
${customer.phone ? `Phone: ${customer.phone}` : ''}
${customer.address ? `Address: ${customer.address}` : ''}

Order Items:
${orderDetails.items.map(item => `${item.name} - Quantity: ${item.qty}, Price: ₹${item.price}, Subtotal: ₹${item.price * item.qty}`).join('\n')}

Thank you for shopping with Vibe Commerce!

This is an automated email. Please do not reply.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendOrderConfirmationEmail
};
