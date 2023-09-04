import { Stripe } from 'stripe';
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  console.log(req.body)
  //GET lineItems ---not working as expected
  if (req.method === "GET") {
    try {
      await stripe.checkout.sessions.retrieve(
        params,
        {
          expand: ['line_items']
        });
      res.status(200).json({ message: 'Checkout Session Returned' });
    }
    catch (error) {
      console.error('Error retrieving session', error);
      res.status(500).json({ error: 'An error occurred while completing your order' });
    }
  }
}