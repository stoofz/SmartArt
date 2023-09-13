import Link from 'next/link';

import prisma from 'utils/prisma';
import formatDate from 'utils/formatDate';
import formatPriceAlt from 'utils/formatPriceAlt';
import Layout from '../../components/Layout';

import { Typography, Container } from '@mui/material';
import Button from '@mui/material/Button';

const OrdersHistoryList = ({ userOrders }) => {
  
  return (
    <Layout>
    <Container className="px-32 flex flex-col pt-4">
      <div className=" flex justify-between">
        <Typography variant="h4" gutterBottom>
          Your Order History
        </Typography>
      </div>
   
      {userOrders.length === 0 ? (
        <Typography variant="body1">You have no order history.</Typography>
      ) : (
            <div >
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center border-b pb-5 pt-5"
                  style={{ borderColor: 'lightblue', paddingLeft: "100px", paddingRight: "100px" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#EEEEEE')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
    
                  <div className="flex-grow" style={{ marginLeft: '20px' }}>
                    <div className="flex justify-between">
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>{`Order #${order.id}`}</Typography>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>Total: ${formatPriceAlt(order.totalPrice)}</Typography>
                    </div>
                    <div className="flex justify-between w-1/2 pt-5">
                      <Typography variant="body2">{`Order Date: ${formatDate(order.orderDate)}`}</Typography>
                      {/* Add more order-related information here */}
                    </div>
                    <Typography variant="body2">{`Order Status: ${order.orderStatus}`}</Typography>
                    <div>
                      <h4 style={{ fontWeight: 'bold' }}>Order Items:</h4>
                      <ul>
                        {order.orderItem.map((item, index) => (
                          <li key={index} className="flex items-center space-x-4">
                            {/* You can add an image here if needed */}
                            <span>{`${item.qty}x ${item.product.name} - $${(item.price / 100).toFixed(2)}`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href={`/orders/${order.id}`}>
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: '#d6dbdb', // Background color
                          color: '#304659', // Text color
                          transition: 'background-color 0.3s',
                          marginTop: '1rem',
                          '&:hover': {
                            backgroundColor: '#32434e', // Hover background color
                            width: '200px',
                            color: 'white', // Hover text color
                          },
                        }}
                      >
                       VIEW DETEILS
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
      )}
    </Container>
    </Layout>
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