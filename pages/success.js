import axios from 'axios';
// import prisma from 'utils/prisma';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Stripe } from 'stripe';

import { CircularProgress, Card } from "@mui/material";
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// import { useSearchParams } from 'next/navigation';


const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  // console.log("LINE session_id:", router.query);
  const [orderDetails, setOrderDetails] = useState(null);

  // const lineItems = JSON.parse(localStorage.getItem('lineItems'));
  // const handleSuccessfulPayment = async (customerId, totalPrice, stripeChargeId) => {
  //   try {
  //     const response = await axios.post('/api/createOrder', {
  //       customerId,
  //       totalPrice,
  //       stripeChargeId,
  //     });

  //     if (response.status === 201) {
  //       // Handle success, e.g., show a success message
  //       console.log('Order and payment created:', response.data);
  //     } else {
  //       // Handle server error
  //       console.error('Server error:', response.statusText);
  //     }
  //   } catch (error) {
  //     // Handle network or other errors
  //     console.error('Error:', error);
  //   }
  // };



  useEffect(() => {
    if (session_id) {
      // Fetch order details based on the session ID
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`/api/success?session_id=${session_id}`);
          if (response.status === 200) {
            setOrderDetails(response.data);
            console.log("response.data", response.data)
          }
        } catch (error) {
          console.error('Error fetching order details', error);
        }
      };

      fetchOrderDetails();
      
    }
  }, [session_id]);

  if (!orderDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Check if payment was successful
  const paymentSuccessful = orderDetails.paymentStatus === 'paid';

  return (
    <div className="container mx-auto mt-8">
      {paymentSuccessful ? (
        <>
          <h1 className="text-3xl text-green-500 mb-4">Payment Successful! Thank you for your order!</h1>

          <Card className="p-4 border border-gray-300 rounded shadow-md">
            <p className="mb-4">
              Your Order # <strong>{orderDetails.orderNumber}</strong>
            </p>
            <p>
              Total Price: <strong>{orderDetails.totalPrice} CAD</strong>
            </p>
            <p>
              Customer Name: <strong>{orderDetails.customerName}</strong>
            </p>
            <p>
              Customer Email: <strong>{orderDetails.customerEmail}</strong>
            </p>
            <p>
              Payment Method: <strong>{orderDetails.paymentMethod}</strong>
            </p>
            <p>
              Payment Status: <strong>{orderDetails.paymentStatus}</strong>
            </p>
          </Card>
        </>
      ) : (
        <div className="text-red-500 text-2xl">
          Payment Unsuccessful. Please try again later.
        </div>
      )}
    </div>
  );
};

export default Success;

// const Success = () => {

//   const router = useRouter();
//   const { session_id } = router.query;
//   console.log("STATUS", session_id)
//   // const searchParams = useSearchParams();
//   // const params = searchParams.get('session_id');
 

//   return (
//     <>
//       {/* {status && status === 'success' && (
//         <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
//           Payment Successful
//         </div>
//       )}
//       {status && status === 'cancel' && (
//         <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
//           Payment Unsuccessful
//         </div>
//       )} */}
//       <h1>Thank you for your order #{params}!</h1>
//     </>
//   )
// }

// //not working as expected
// const orderSuccess = async () => {

//   const searchParams = useSearchParams();
//   const params = searchParams.get('session_id');

//   try {
//     const payload = {
//       params
//     };
//     // only extract through data
//     const response = await axios.get('/api/success', { data: payload });

//     if (response.status === 200) {
//       return response;
//     }
//   } catch (error) {
//     console.error('Error fetching order details', error);
//   }
// };

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


// export default Success;
