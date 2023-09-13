import { useState, useEffect } from 'react';
import formatPrice from 'utils/formatPrice';

function ViewOrder({ order }) {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch('/api/listOrder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId: order.id }),
        });
        if (response.ok) {
          const orderData = await response.json();
          setOrderDetails(orderData);
        } else {
          console.error('Error fetching order details');
        }
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchOrderDetails();
  }, [order.id]);

  return (
    <>
      <h2>Order Details</h2>
      {orderDetails ? (
      <>
        <p>Order ID: {orderDetails.id}</p>
        <p>Total Price: {orderDetails.totalPrice}</p>
        <p>Order Date: {orderDetails.orderDate}</p>
        <p>Customer ID: {orderDetails.customerId}</p>
        <p>Name: {orderDetails.customer.firstName} {orderDetails.customer.lastName}</p>
        <p>Email: {orderDetails.customer.email}</p>
        {orderDetails.customer.address.map((address) => (
            <div key={address.id}>
            <p>Street: {address.street}</p>
            <p>City: {address.city}</p>
            <p>Province: {address.province}</p>
            <p>Country: {address.country}</p>
            <p>Postal Code: {address.postal}</p>
            <p>Phone: {address.phone}</p>
            </div>
            ))}
          <p>Items:</p>
          <div style={{ height: '400px', overflowY: 'auto' }}>
            <ul>
              {orderDetails.orderItem.map((item) => (
                <li key={item.id}>
                  {item.product.name} - {item.qty} x {'$' + (formatPrice(item.price))} = {'$' + (formatPrice(item.qty * item.price))}
                </li>
              ))}
            </ul>
          </div>
      </>
      ) : (
        <p>Loading order details...</p>
      )}
    </>

  );
}

export default ViewOrder;