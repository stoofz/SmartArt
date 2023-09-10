import { useState, useEffect } from 'react';
import ViewOrder from 'components/Admin/ViewOrder';
import { Modal, Box, Typography } from '@mui/material';

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


  return (
    <div>
      <h1>Orders</h1>
      <div style={{ height: '400px', overflowY: 'auto' }}>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.id} - {' '}
              <button onClick={() => handleOrderViewOpen(order)}>View</button>
            </li>
          ))}
        </ul>
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