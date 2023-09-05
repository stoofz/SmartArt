import { Stripe } from 'stripe';
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { session_id } = req.query;

    try {
      // Retrieve payment-related information from Stripe using the session_id
      const session = await stripe.checkout.sessions.retrieve(session_id.toString());
      // console.log("LINE session.metadata", session.metadata);

      // Customize the order details response with Stripe data
      const orderDetails = {
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

      // console.log("LINE session", orderDetails);

      res.status(200).json(orderDetails);
    } catch (error) {
      console.error('Error fetching or saving order details', error);
      res.status(500).json({ error: 'An error occurred while processing the data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// export default async function handler(req, res) {

//   console.log(req.body)
//   //GET lineItems ---not working as expected
//   if (req.method === "GET") {
//     try {
//       await stripe.checkout.sessions.retrieve(
//         params,
//         {
//           expand: ['line_items']
//         });
//       res.status(200).json({ message: 'Checkout Session Returned' });
//     }
//     catch (error) {
//       console.error('Error retrieving session', error);
//       res.status(500).json({ error: 'An error occurred while completing your order' });
//     }
//   }
// }