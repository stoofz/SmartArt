import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a context
const WishlistContext = createContext();

// Custom hook to access the context
export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  // State to hold the list of products in the wishlist
  const [wishlist, setWishlist] = useState([]);

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
      
      // Handle success and update the local wishlist state
      setWishlist([...wishlist, { userId, productId, ...response.data }]);
      // return { success: true };
      return { success: true };
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
        setWishlist(wishlist.filter((item) => item.productId !== productId));
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

  // // Function to check if a product is in the wishlist
  // const isInWishlist = (productId) => {
  //   return wishlist.includes(productId);
  // };

  // // Use useEffect to persist the wishlist in localStorage, so it's not lost on page refresh
  // useEffect(() => {
  //   const storedWishlist = localStorage.getItem('wishlist');
  //   if (storedWishlist) {
  //     setWishlist(JSON.parse(storedWishlist));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('wishlist', JSON.stringify(wishlist));
  // }, [wishlist]);
  // Value to provide in the context
  const contextValue = {
    wishlist,
    addToWishlist,
    deleteFromWishlist,
    checkIfProductIsInWishlist
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}