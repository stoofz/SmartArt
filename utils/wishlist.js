//Functions used in pages/wishlist, pages/products/productId,
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const addToWishlist = async( userId, productId ) => {
 
  try {
    // Make an API request to add the product to the wishlist
    const response = await axios.post('/api/wishlist', {
      userId,
      productId,
    });

    toast.success('Item added to wishlist successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Auto-close the message after 3 seconds
    });
    return { success: true };
   
  } catch (error) {
    // Handle errors, show an error message ..
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
      toast.success('Item removed from wishlist', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      return { success: true, data: response }; 
    }
    return { success: false, error: 'Failed to delete item from wishlist' };
  } catch (error) {
    console.error('Error deleting item from wishlist:', error);
  }
};


const checkIfProductIsInWishlist = async (userId, productId) => {
  try {
    // Make an API request to check if the product is in the wishlist
    const response = await axios.get(`/api/wishlist?userId=${userId}&productId=${productId}`);
    const isInWishlist = response.data.isInWishlist;

    return isInWishlist;

  } catch (error) {
    console.error('Error checking if product is in wishlist:', error);
  }
};
// Function to add or remove the product from the wishlist
const toggleWishlist = async (userId, productId, isInWishlist, setIsInWishlist) => {
  try {
    if (isInWishlist) {
      // If the product is in the wishlist, remove it
      const result = await deleteFromWishlist(userId, productId);
      if (result.success) {
        setIsInWishlist(false);

      } else {
        console.error('Error removing item from wishlist:', result.error);
      }
    } else {
      // If the product is not in the wishlist, add it
      const result = await addToWishlist(userId, productId);
      if (result.success) {
        setIsInWishlist(true);

      }
    }
  } catch (error) {
    console.error('Error toggling item in the wishlist:', error);
  }
};

export { addToWishlist, deleteFromWishlist, checkIfProductIsInWishlist, toggleWishlist };
