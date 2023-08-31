/* eslint-disable camelcase */
/* eslint-disable func-style */
import { Stripe } from 'stripe';
const stripe = Stripe('sk_test_51NbCSCH35BfCvqiXv8R8Jnt564uRewU56aVEvT6uwECmnA65dt1mGejJvW9jupFfyi3kkXt29LA85l6hi3DeHKhF00Eesma9ce');
import { redirect } from 'next/navigation';

export default async function checkout({ lineItems }) {

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
