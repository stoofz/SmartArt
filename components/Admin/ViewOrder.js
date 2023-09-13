import { useState, useEffect } from 'react';
import formatPrice from 'utils/formatPrice';


function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}


function formatPriceAlt(price) {
  const numFor = Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return numFor.format(price);
}

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
      {orderDetails ? (
      <>
      <div style={{ height: 'auto', maxHeight:'36em', overflowY: 'auto', padding:'1.25em' }}>
      <table className="table table-bordered mt-4">
            <tbody>
              
            <tr>
              <th>Order:</th>
              <td>#{orderDetails.id}</td>
              </tr>
              
  
            <tr>
              <th>Date:</th>
              <td>{formatDate(orderDetails.orderDate)}</td>
              </tr>
              
            <tr>
              <th>Name:</th>
              <td>{orderDetails.customer.firstName} {orderDetails.customer.lastName}</td>
              </tr>
              
            <tr>
              <th>Email:</th>
              <td>{orderDetails.customer.email}</td>
            </tr>
              
            {orderDetails.customer.address.map((address) => (
                <>
                <tr key={address.id}>
                  <th>Street:</th>
                  <td>{address.street}</td>
                </tr>
                <tr key={address.id}>
                  <th>City:</th>
                  <td>{address.city}</td>
                </tr>
                <tr key={address.id}>
                  <th>Province:</th>
                  <td>{address.province}</td>
                </tr>
                <tr key={address.id}>
                  <th>Country:</th>
                  <td>{address.country}</td>
                </tr>
                <tr key={address.id}>
                  <th>Postal:</th>
                  <td>{address.postal}</td>
                </tr>
                <tr key={address.id}>
                  <th>Phone:</th>
                  <td>{address.phone}</td>
                </tr>
              </>
            ))}
          </tbody>
          </table>
          
          <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.orderItem.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200`}
                style={{ padding: '10px' }}
              >
                <td style={{ padding: '10px' }}>{item.product.name}</td>
                <td style={{ padding: '10px' }}>${formatPrice(item.price)}</td>
                <td style={{ padding: '10px' }}>{item.qty}</td>
                <td style={{ padding: '10px' }}>${formatPrice(item.qty * item.price)}</td>
              </tr>
            ))}
          </tbody>
            </table>
            
        <tr>
          <th>Total:</th>
          <td>${formatPriceAlt(orderDetails.totalPrice)}</td>
        </tr>
          
            
    </div>
      </>
      ) : (
        <p>Loading order details...</p>
      )}
    </>

  );
}

export default ViewOrder;