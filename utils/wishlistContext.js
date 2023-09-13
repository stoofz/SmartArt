import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSessionId } from '/utils/session';
// Create a context
const WishlistContext = createContext();

// Custom hook to access the context
export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const userId = useSessionId();
  // State to hold the list of products in the wishlist
  const [wishlist, setWishlist] = useState(null);
 

  // Function to add a product to the wishlist
  const addToWishlist = async (userId, productId) => {

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
      if (response.status === 200) {
      // Handle success and update the local wishlist state
      setWishlist((prevWishlist) => [...prevWishlist, { userId, productId, ...response.data.wishlistItem }]);
      // return { success: true };
      return { success: true };
      }
    } catch (error) {
      // Handle errors, show an error message ..
      console.error('Error adding item to wishlist:', error);
    }
  };


  // Function to remove a product from the wishlist
  const deleteFromWishlist = async (userId, productId) => {

    try {
      // Create a payload with the userId and productId
      const payload = {
        userId,
        productId,
      };
      // Make an API request to delete the item from the wishlist
      const response = await axios.delete('/api/wishlist', { data: payload });
      // console.log("responseA", response);
      if (response.status === 200) {
        // Handle success and update the local wishlist state
        setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId !== productId));
        toast.success('Item removed from wishlist', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        return { success: true, data: response }; 
      } else {
        console.error('Failed to delete item from wishlist');
      }

      // return { success: false, error: 'Failed to delete item from wishlist' };
    } catch (error) {
      console.error('Error deleting item from wishlist:', error);
    }
  };



  // // Function to check if a product is in the wishlist
  const isInWishlist = ( productId) => {
    console.log("userId, productId",  productId )
    return wishlist && wishlist.some((item) => item.productId === productId);
  };


  const getWishlist = async (userId) => {
    const response = await axios.get(`/api/getUserWishlist?userId=${userId}`);
  
    if (response.status === 200) {
      setWishlist(response.data);
    }
  }
  // Use useEffect to persist the wishlist in localStorage, so it's not lost on page refresh
  useEffect(() => {
    if(userId) {
      
      getWishlist(userId)
    }
    
  }, [userId]);

  
  // Value to provide in the context
  const contextValue = {
    wishlist,
    isInWishlist,
    addToWishlist,
    deleteFromWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}