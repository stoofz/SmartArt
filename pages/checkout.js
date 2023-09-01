/* eslint-disable camelcase */
/* eslint-disable func-style */
import { Stripe } from 'stripe';
import { redirect } from 'next/navigation';

export default async function checkout({ lineItems }) {
// in the frontend, key has to be accessed via .env prefixed by NEXT_PUBLIC
  const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: window.location.origin,
    });
    console.log(session);
    return session;
    // Respond with a success message or status
  } catch (error) {
    console.error('Error reaching checkout', error);
  }
}
