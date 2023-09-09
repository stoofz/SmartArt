import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleAddToWishlist = async (productId, customerId) => {
  try {
    // Make an API request to add the product to the wishlist
    const response = await axios.post('/api/wishlist', {
      customerId,
      productId,
    });
    toast.success('Item added to wishlist', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the message after 3 seconds
    });
    // Handle success, show a success message, etc.
    console.log('Item added to wishlist:', response.data);
  } catch (error) {
    // Handle errors, show an error message, etc.
    console.error('Error adding item to wishlist:', error);
  }
};

export { handleAddToWishlist };
