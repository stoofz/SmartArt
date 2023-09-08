import axios from 'axios';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSessionId } from '/utils/session';
import Button from '@mui/material/Button';
import { CircularProgress, Card } from "@mui/material";


const Success = () => {
  const router = useRouter();
  const { session_id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);

  const userId = useSessionId();
  // const userId = 3; 



  useEffect(() => {
    if (session_id) {
      // Fetch order details based on the session ID
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`/api/success?session_id=${session_id}&userId=${userId}`);
          if (response.status === 200) {
            setOrderDetails(response.data);
            
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
  console.log("orderDetails.order.id", orderDetails.order.id)
  // Check if payment was successful
  const paymentSuccessful = orderDetails.orderDetailsSession.paymentStatus === 'paid';

  return (
    <div className="container mx-auto mt-8 " style={{width:"700px"}}>
      {paymentSuccessful ? (
        <>
          <h1 className="text-3xl text-green-500 mb-4">Payment Successful! Thank you for your order!</h1>

          <Card className="p-4 border border-gray-300 rounded shadow-md">
            <p className="mb-4">
              Your Order # <strong>{orderDetails.orderDetailsSession.orderNumber}</strong>
            </p>
            <p>
              Total Price: <strong>{orderDetails.orderDetailsSession.totalPrice} CAD</strong>
            </p>
            <p>
              Customer Name: <strong>{orderDetails.orderDetailsSession.customerName}</strong>
            </p>
            <p>
              Customer Email: <strong>{orderDetails.orderDetailsSession.customerEmail}</strong>
            </p>
            <p>
              Payment Method: <strong>{orderDetails.orderDetailsSession.paymentMethod}</strong>
            </p>
            <p>
              Payment Status: <strong>{orderDetails.orderDetailsSession.paymentStatus}</strong>
            </p>

            <div className="mt-4 flex justify-between">

              <Link href={`/orders/${orderDetails.order.id}`}>
                <Button size="small"
                  variant="contained"
                  style={{
                    backgroundColor: 'lightblue', color: 'white', transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'blue',
                    },
                  }}
                >
                  View Order
                </Button>
              </Link>
              <Link href={`/products/`}>
                <Button size="small"
                  variant="contained"
                  style={{
                    backgroundColor: 'lightblue', color: 'white', transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: 'blue',
                    },
                  }}
                >
                  Continue shopping
                </Button>
              </Link>


              
            </div>
          </Card>
        </>
      ) : (
        <>
        <div className="text-red-500 text-2xl">
          Payment Unsuccessful. Please try again later.
        </div>
        
          <div className="mt-4">
              <button
                onClick={() => {
                
                  router.push('/cart');  // Redirect to cart page
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Retry Payment
              </button>
              </div>
          </>

      )}
    </div>
  );
};

export default Success;
