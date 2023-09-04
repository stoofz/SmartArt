import axios from 'axios';
// import prisma from 'utils/prisma';
import { useRouter } from 'next/router';
import { Stripe } from 'stripe';
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import { useSearchParams } from 'next/navigation';

const Success = () => {

  const router = useRouter();
  const { status } = router.query;
  const searchParams = useSearchParams();
  const params = searchParams.get('session_id');

  return (
    <>
      {status && status === 'success' && (
        <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
          Payment Successful
        </div>
      )}
      {status && status === 'cancel' && (
        <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
          Payment Unsuccessful
        </div>
      )}
      <h1>Thank you for your order #{params}!</h1>
    </>
  )
}

//not working as expected
const orderSuccess = async () => {

  const searchParams = useSearchParams();
  const params = searchParams.get('session_id');

  try {
    const payload = {
      params
    };
    // only extract through data
    const response = await axios.get('/api/success', { data: payload });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.error('Error fetching order details', error);
  }
};

// export async function getServerSideProps() {

//   let props = {}

//   try {

//     const searchParams = useSearchParams();
//     const params = searchParams.get('session_id');
//     const orderItems = async () => {
//       await stripe.checkout.sessions.retrieve(
//         params,
//         {
//           expand: ['line_items']
//         });
//     }
//     props = { orderItems };

//   } catch (error) {
//     console.error('Error fetching order details', error);
//     //     // return { props: { cartItems: [] } };
//   }
//   return props;
// }


export default Success;
