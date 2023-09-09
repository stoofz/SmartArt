import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleAddToCart = async (productId, userId) => {
  
  const quantity = 1;

  try {
    const response = await axios.post('/api/cart', {
      userId,
      productId,
      quantity,
    });

    toast.success('Item added to cart successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the message after 3 seconds
    });
   
    console.log('Item added to cart:', response.data);
  } catch (error) {
    console.error('Error adding item to cart:', error);
    //  Show an error message to the user????

  }
};

export { handleAddToCart };