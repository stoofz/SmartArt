import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleAddToWishlist = async ({ userId, productId }) => {
  // console.log("userId", userId)
  // console.log("productId", productId)
  try {

    // Make an API request to add the product to the wishlist
    const response = await axios.post('/api/wishlist', {
      userId,
      productId,
    });
    console.log("response", response)
    toast.success('Item added to wishlist successfully', {
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
