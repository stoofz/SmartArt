import { Stripe } from 'stripe';

import { createOrderAndDetails, fetchCartItems } from 'utils/db';

const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { session_id, userId } = req.query;
// console.log("userId",userId)
    try {
      // Retrieve payment-related information from Stripe using the session_id
      const session = await stripe.checkout.sessions.retrieve(session_id.toString());
     
      const stripeChargeId = session.payment_intent;
      // extract the cartId from the session metadata//Convert string to integer
      const cartId = parseInt(session.metadata.cartId, 10);
      
      // Customize the order details response with Stripe data
      const orderDetailsSession = {
        orderNumber: session.id, // Replace with actual order number
        totalPrice: session.amount_total / 100, // Convert to the appropriate currency
        customerName: session.customer_details.name || '', // Customer's name
        customerEmail: session.customer_details.email || '', // Customer's email
        billingAddress: {
          city: session.customer_details.address.city || '',
          country: session.customer_details.address.country || '',
          postalCode: session.customer_details.address.postal_code || '',
          state: session.customer_details.address.state || '',
        },
        paymentMethod: session.payment_method_types[0] || '', // Payment method used (e.g., card)
        paymentStatus: session.payment_status || '', // Payment status (e.g., paid)
      };


      // Function to fetch cart items based on cartId
      const cartItems = await fetchCartItems(cartId);
      // console.log("cartItems", cartItems)

      const { order, orderDetails, payment } = await createOrderAndDetails(cartItems, userId, orderDetailsSession.totalPrice, stripeChargeId);
      // Create an object that contains both orderDetailsSession and order
      const responseData = {
        orderDetailsSession: orderDetailsSession,
        order: order,
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching or saving order details', error);
      res.status(500).json({ error: 'An error occurred while processing the data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

