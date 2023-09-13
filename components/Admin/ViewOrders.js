import { useState, useEffect } from 'react';
import ViewOrder from 'components/Admin/ViewOrder';
import { Modal, Box, Typography, Button } from '@mui/material';
import formatPrice from '@/utils/formatPrice';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectOrder, setSelectOrder] = useState(null);
  const [orderViewOpen, setOrderViewOpen] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch('/api/listOrders');
        if (response.ok) {
          setOrders(await response.json());
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getOrders();
  }, []);

  const handleOrderViewOpen = (order) => {
    setSelectOrder(order);
    setOrderViewOpen(true);
  };

  const handleOrderViewClose = () => {
    setSelectOrder(null);
    setOrderViewOpen(false);
  };

  const theme = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: '#fff',
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
    <div style={{ height: '520px', overflowY: 'auto' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-gray-200`}
            >
              <td className="border p-2">
                #{order.id} {order.customer.firstName} {order.customer.lastName}
              </td>
              <td className="border p-2">{formatDate(order.orderDate)}</td>
              <td className="border p-2">  {order.orderStatus ? (
                  <span style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px' }}>{order.orderStatus}</span>
                ) : (
                  <span style={{ backgroundColor: 'lightyellow', padding: '10px', borderRadius: '5px' }}>In Process</span>
                )}</td>
              <td className="border p-2">${order.totalPrice}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleOrderViewOpen(order)} variant="contained" style={{
                    backgroundColor: '#fae4e2',
                    '&:hover': {
                      backgroundColor: '#32434e',
                      color: 'white',
                    },
                    width: '60px',
                    padding: '10px',
                    borderRadius: '5px',
                    color: '#32434E',
                  }}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 
        
  <Modal open={orderViewOpen} onClose={handleOrderViewClose}>
        <Box sx={theme}>
          <Typography id="viewOrder">
            {selectOrder && <ViewOrder order={selectOrder} />}
          </Typography>
      </Box>
      </Modal>

</div>
    
    
  
  
  
  );
};

export default ViewOrders;