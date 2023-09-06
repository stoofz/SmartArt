import prisma from 'utils/prisma';
import formatDate from 'utils/formatDate';
import { Typography, Container } from '@mui/material';

const OrderPage = ({ order }) => {
console.log("ORDER", order)
  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="px-32 flex flex-col pt-32">
      <Typography variant="h4" gutterBottom>
        Order #{order.id}
      </Typography>
      <div className="flex items-center border-b pb-5 pt-5" style={{ borderColor: 'lightblue' }}>
        <div className="w-[109px] h-[134px]">
          <img src="https://via.placeholder.com/109x134" alt={`Order #${order.id}`} />
        </div>
        <div className="flex-grow" style={{ marginLeft: '20px' }}>
          <div className="flex justify-between">
            <Typography variant="h6">{`Order Date: ${formatDate(order.orderDate)}`}</Typography>
            <Typography variant="h6">{`Total: $${(order.totalPrice / 100).toFixed(2)}`}</Typography>
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
        </div>
      </div>
    </Container>
  );
};

export async function getServerSideProps(context) {

  const orderId = context.params.orderId;
  
  const userId = 3;

  try {
    // Fetch the order by ID
    const order = await prisma.Order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        orderItem: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      // Handle order is not found
      return {
        notFound: true,
      };
    }

    // Check if the user is authorized to view the order
    if (order.customerId !== userId) {
      // Handle unauthorized access
      return {
        redirect: {
          destination: '/forbidden',
          permanent: false,
        },
      };
    }

    const serializedOrder = JSON.parse(JSON.stringify(order));

    return { props: { order: serializedOrder } };
  } catch (error) {
    console.error('Error fetching the order', error);
    return {
      props: {
        order: null, 
      },
    };
  }
}

export default OrderPage;
