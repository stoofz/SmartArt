import prisma from 'utils/prisma';
import formatDate from 'utils/formatDate';
import Link from 'next/link';
import { Typography, Container } from '@mui/material';
import Button from '@mui/material/Button';

const OrdersHistoryList = ({ userOrders }) => {

  return (
    <Container className="px-32 flex flex-col pt-32">
      <div className=" flex justify-between">
        <Typography variant="h4" gutterBottom>
          Your Order History
        </Typography>
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
    
      {userOrders.length === 0 ? (
        <Typography variant="body1">You have no order history.</Typography>
      ) : (
        <div style={{ width: '80%' }}>
          {userOrders.map((order) => (

            <div
              key={order.id}
              className="flex items-center border-b pb-5 pt-5"
              style={{ borderColor: 'lightblue' }}
            >
              <div className="w-[109px] h-[134px]">
                <img src="https://via.placeholder.com/109x134" alt={`Order #${order.id}`} />
              </div>
              <div className="flex-grow" style={{ marginLeft: '20px' }}>
                
                <div className="flex justify-between">
                  <Typography variant="h6">{`Order #${order.id}`}</Typography>
                  <Typography variant="h6">Total: ${(order.totalPrice / 100).toFixed(2)}</Typography>
                </div>
                <div className="flex justify-between w-1/2 pt-5">
                  <Typography variant="body2">{`Order Date:  ${formatDate(order.orderDate)} `}</Typography>
                 

                </div>
                <Typography variant="body2">{`Order Status: ${order.orderStatus}`}</Typography>
                <div>
                  <h4>Order Items:</h4>

                  <ul>
                    {order.orderItem.map((item, index) => (

                      <li key={index}>
                        {`${item.qty}x ${item.product.name} - $${(item.price / 100).toFixed(2)}`}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/orders/${order.id}`}>
                  <h4>View Details</h4>
                </Link>
              </div>
             
            </div>
            
            
          ))}
        </div>
      )}
    </Container>
  );

};

export async function getServerSideProps( { req } ) {

  const sessionId = req.cookies.sessionId || null;
  const userId = parseInt(sessionId);
 // console.log("req.cookies", sessionId)
  // const userId = 3;

  try {
    // Fetch user-specific orders from Prisma
    const userOrders = await prisma.order.findMany({
      where: {
        customerId: userId,
      },
      orderBy: {
        orderDate: 'desc',
      },
      include: {
        orderItem: {
          include: {
            product: true, // Include the related product
          },
        },
      },
    });

    const serializedOrders = JSON.parse(JSON.stringify(userOrders));

    return { props: { userOrders: serializedOrders } };




  } catch (error) {
    console.error('Error fetching user orders', error);
    return {
      props: {
        userOrders: [],
      },
    };
  }
}
export default OrdersHistoryList;