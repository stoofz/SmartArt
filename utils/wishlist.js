import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addToWishlist = async( userId, productId ) => {
  // console.log("userId", userId)
  // console.log("productId", productId)
  try {

    // Make an API request to add the product to the wishlist
    const response = await axios.post('/api/wishlist', {
      userId,
      productId,
    });
    // console.log("response", response)
    toast.success('Item added to wishlist successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Auto-close the message after 3 seconds
    });
    return { success: true };
    // setIsInWishlist(true);
    // Handle success, show a success message, etc.
    console.log('Item added to wishlist:', response.data);
  } catch (error) {
    // Handle errors, show an error message, etc.
    console.error('Error adding item to wishlist:', error);
  }
};


const deleteFromWishlist = async (userId, productId) => {

  try {
    // Create a payload with the userId and productId
    const payload = {
      userId,
      productId,
    };

    // Make an API request to delete the item from the wishlist
    const response = await axios.delete('/api/wishlist', { data: payload });
    console.log("responseA", response);
    if (response.status === 200) {
      return { success: true, data: response };
      // Update the wishlist state by filtering out the deleted item
      // const updatedWishlist = wishlist.filter((item) => item.productId !== productId);
      // setWishlistData(response.data);
      // setIsInWishlist(false);
    }
    return { success: false, error: 'Failed to delete item from wishlist' };
  } catch (error) {
    console.error('Error deleting item from wishlist:', error);
  }
};

export { addToWishlist, deleteFromWishlist };
