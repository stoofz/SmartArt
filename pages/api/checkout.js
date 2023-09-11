/* eslint-disable camelcase */
/* eslint-disable func-style */
import { Stripe } from 'stripe';

export default async function checkout({ lineItems, cartId }) {
  // in the frontend, key has to be accessed via .env prefixed by NEXT_PUBLIC
  const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: window.location.origin,
      metadata: {
        cartId: cartId,
      }

    })
    console.log('cartId:', cartId);
    // Call the onSuccess callback if provided
   

    return session;
  } catch (error) {
    console.error('Error reaching checkout', error);
  }
  console.log(session);
}