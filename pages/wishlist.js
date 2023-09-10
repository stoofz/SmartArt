import React, { useEffect, useState } from 'react';
import prisma from 'utils/prisma';
import axios from 'axios';

import { useSessionId } from '/utils/session';
import { deleteFromWishlist } from 'utils/wishlist';
import CircularProgress from '@mui/material/CircularProgress';

import { Typography, Container, DeleteIcon, Button } from '@mui/material';
import Link from 'next/link';


const WishlistPage = ({ serializedWishlistData: defaultWishlistData }) => {
 
  const [wishlistData, setWishlistData] = useState( defaultWishlistData );
  const [loading, setLoading] = useState(true);

  const userId = useSessionId();


  useEffect(() => {
    setWishlistData(defaultWishlistData);
    setLoading(false);
  }, [defaultWishlistData]);


 // Handle onClisk when deleting from wishlist
  const handleDeleteFromWishlist = async (userId, productId ) => {
    const result = await deleteFromWishlist(userId, productId);
    console.log("result", result)
    if (result.success) {
     
      setWishlistData(result.data.data); // Update wishlistData here
    } else {
      console.error('Error deleting item from wishlist:', result.error);
    }
  };
  
 
  // Define the styles for the CircularProgress component
  const circularProgressStyle = {
    position: 'absolute', // Adjust positioning as needed
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center it horizontally and vertically
    color: 'secondary', 
  };

  if (loading) {
    return (
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <CircularProgress style={circularProgressStyle} />
        {/* <Typography variant="h6" style={{ color: 'blue' }}>Loading...</Typography> */}
      </div>
    )
    
  }


  return (
    <Container className="px-32 flex flex-col pt-32">
      <Typography variant="h4" gutterBottom>
        Your Wishlist
      </Typography>

      {wishlistData.length === 0 ? (
        <Typography variant="body1">Your wishlist is empty.</Typography>
      ) : (
          <div style={{ width: '80%' }}> 
        
          {wishlistData.map((item, index) => (
            <div key={index} className={`${true ? "flex" : ""} items-center border-b pb-5 pt-5`}
              style={{ borderColor: 'lightblue' }}>
           
              <img
                className="w-[109px] h-[134px]"
                src={`/uploads/${item.product.image}`}
                alt={item.product.name}
              />
              <div className="cart-item-details flex-grow" style={{ marginLeft: '20px' }}>
                <Typography variant="h6" className="flex-grow-0 flex-shrink-0">
                  {item.product.name}
                </Typography>
                <div className="flex justify-between w-1/2 pt-5">
                  <Typography variant="body2">Price: ${(item.product.price / 100).toFixed(2)}</Typography>
                  {/* Add any other details you want to display */}

                </div>  
              </div>
              <Button
                onClick={() => handleDeleteFromWishlist(userId, item.product.id)}
                size="small"
                variant="contained"
                style={{
                  backgroundColor: 'lightpink',
                  color: 'white',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'darkgray',
                  },
                }}  
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
    )
};


export async function getServerSideProps({ req, params }) {
  const sessionId = req.cookies.sessionId || null;
  const userId = parseInt(sessionId);
 
  const wishlistData = await prisma.wishlist.findMany({
    where: {
      customerId: userId,
    },
    include: {
      product: true,
    },
  });
  try {
    const serializedWishlistData = JSON.parse(JSON.stringify(wishlistData));

    return {
      props: {
        serializedWishlistData
      },
    };
  } catch (error) {
    console.error("Error serializing wishlistData:", error);
    return {
      props: {
        serializedWishlistData: [],
      },
    };
  }
}

export default WishlistPage;