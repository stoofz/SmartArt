import { Stripe } from 'stripe';
import prisma from "../../utils/prisma";
const stripe = Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { session_id, userId } = req.query;
// console.log("userId",userId)
    try {
      // Retrieve payment-related information from Stripe using the session_id
      const session = await stripe.checkout.sessions.retrieve(session_id.toString());
      //  console.log("LINE session.metadata", session.metadata);
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
      const fetchCartItems = async (cartId) => {
        try {
          const cartItems = await prisma.cartItem.findMany({
            where: {
              cartId: cartId,
            },
            include: {
              product: true, // Include product details in the response
            },
          });

          return cartItems;
        } catch (error) {
          console.error('Error fetching cart items:', error);
          throw error;
        } finally {
          await prisma.$disconnect();
        }
      };

      const cartItems = await fetchCartItems(cartId);
      // console.log("cartItems", cartItems)



      const createOrderAndDetails = async (cartItems, userId, totalPriceFromSession, stripeChargeId) => {
       
        try {

            // Create the payment associated with the order
          const payment = await prisma.payment.create({
            data: {
              customer: {
                connect: {
                  id: parseInt(userId),
                }
              },
              date: new Date(),
              totalPrice: totalPriceFromSession,
              stripeChargeId: stripeChargeId,
              // orders: {
              //   connect: { id: createdOrder.id },
              // },
            },
          });

          // Create the order
          const createdOrder = await prisma.order.create({
            data: {
              customer:{
                connect:{
                  id: parseInt(userId),
                } 
              } ,
              
              payment: {
                connect: {
                  id: parseInt(payment.id),
                }
              },
              orderDate: new Date(),
              totalPrice: totalPriceFromSession,
              orderStatus: "Completed",
            },
          });

       
          // Create order details for each cart item
          const orderDetails = await Promise.all(
            cartItems.map(async (cartItem) => {
              const createdOrderItem = await prisma.orderItem.create({
                data: {
                  orderId: createdOrder.id,
                  productId: cartItem.productId,
                  qty: cartItem.qty,
                  price: cartItem.product.price,
                },
              });

              return createdOrderItem;
            })
          );

        

          return {
             order: createdOrder,
             orderDetails: orderDetails,
             payment: payment 
            };
        } catch (error) {
          console.error('Error creating order, order details, and payment:', error);
          throw error;
        } finally {
          await prisma.$disconnect(); 
        }
      };

      const { order, orderDetails, payment } = await createOrderAndDetails(cartItems, userId, orderDetailsSession.totalPrice, stripeChargeId);
      // console.log("LINE orderDetailsSession.totalPrice", orderDetailsSession.totalPrice);
      console.log(" payment", payment)

      res.status(200).json(orderDetailsSession);
    } catch (error) {
      console.error('Error fetching or saving order details', error);
      res.status(500).json({ error: 'An error occurred while processing the data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}






// // Fetch cart items based on cartId
// const cartItems = await fetchCartItems(cartId);

// // Create order and order details
// const { order, orderDetails } = await createOrderAndDetails(cartItems, customerId);

// // Respond with the created order and order details
// res.status(201).json({
//   message: 'Order created successfully',
//   order: order,
//   orderDetails: orderDetails,
// });








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