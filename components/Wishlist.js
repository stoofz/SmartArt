import React, { useEffect, useState } from 'react';

import { useSessionId } from '/utils/session';
import { deleteFromWishlist } from 'utils/wishlist';
import CircularProgress from '@mui/material/CircularProgress';

import { Typography, Container, Button, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Link from 'next/link';


const Wishlist = ({ serializedWishlistData: defaultWishlistData }) => {

  const [wishlistData, setWishlistData] = useState(defaultWishlistData);
  const [loading, setLoading] = useState(true);

  const userId = useSessionId();


  useEffect(() => {
    setWishlistData(defaultWishlistData);
    setLoading(false);
  }, [defaultWishlistData]);


  // Handle onClisk when deleting from wishlist
  const handleDeleteFromWishlist = async (userId, productId) => {
    const result = await deleteFromWishlist(userId, productId);
    console.log("result", result);
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

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px', // Adjust the margin as needed
  };

  const paperStyles = {
    padding: '60px',
    textAlign: 'center',
    maxWidth: '400px', // Adjust the width as needed
    margin: '0 auto',
    marginBottom: '30px', 
    marginTop: '60px'
  };

  if (loading) {
    return (
      <div style={{ position: 'relative', textAlign: 'center' }}>
        <CircularProgress style={circularProgressStyle} />
        {/* <Typography variant="h6" style={{ color: 'blue' }}>Loading...</Typography> */}
      </div>
    );

  }


  return (
    <Container className="px-32 flex flex-col pt-4">


      {wishlistData.length === 0 ? (
        <Container style={containerStyles}>
          <Paper elevation={3} style={paperStyles}>

            <Typography variant="h4">
              <FavoriteIcon style={{ fontSize: '3rem', color: "#5a716e", paddingRight: "10px" }} />
              Your wishlist is empty.
            </Typography>
          </Paper>
          <Link href={`/`}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#c1c9c9',
                color: 'black',
                fontSize: '1.2rem',
                marginTop: '1rem',
                alignSelf: 'center',
                // width: '30%',
              }}
            >
              Go to the main page
            </Button>
          </Link>
        </Container>
      ) : (
          <div style={{ paddingRight: "150px", paddingLeft: "150px" }}>
            <Typography variant="h4" gutterBottom style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <FavoriteIcon style={{ fontSize: '3rem', color: '#5a716e', paddingRight: '10px' }} />
              Your Wishlist
            </Typography>

            {wishlistData.map((item, index) => (
              <div
                key={index}
                className="cart-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '20px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#EEEEEE')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Link href={`/products/${item.product.id}`}>
                  <img className="w-[109px] h-[134px]" src={`/uploads/${item.product.image}`} alt={item.product.name} />
                </Link>
                <div className="cart-item-details" style={{ marginLeft: '20px', flex: '1' }}>
                  <Link href={`/products/${item.product.id}`}>
                    <Typography variant="h6">{item.product.name}</Typography>
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '50%',
                      paddingTop: '10px',
                    }}
                  >
                    <Typography variant="body2">Price: ${(item.product.price / 100).toFixed(2)}</Typography>
                    {/* Add any other details you want to display */}
                  </div>
                </div>

                <Button
                  onClick={() => handleDeleteFromWishlist(userId, item.product.id)}
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: '#465f5d',
                    marginRight:'50px',
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
  );
};

export default Wishlist;