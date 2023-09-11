import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import { useSessionId } from 'utils/session';
import checkout from '../pages/api/checkout';

import { Button } from "@mui/material";
import { Typography, Container } from '@mui/material';




const Cart = ({ productDetails: defaultProducts, subtotal }) => {

  const [productDetails, setProductDetails] = useState(defaultProducts);
  const [total, setTotal] = useState(subtotal);

  const userId = useSessionId();

  const lineItems = productDetails.map((item) => {
    return {
      quantity: item.qty,
      price_data: {
        currency: "CAD",
        product_data: {
          name: item.name,
          description: item.description || undefined,
          images: item.image ? [item.image] : [],
        },
        // original_unit_amount: item.originalPrice,
        unit_amount: parseInt(item.price),
      }
    };
  });

  const getCartIdForUser = async (userId) => {
    try {
      const response = await axios.get(`/api/getCartId/?userId=${userId}`);

      if (response.status === 200) {
        return response.data.cartId;
      } else {
        //  the request was not successful
        console.error('Error getting cartId:', response.statusText);
        return null;
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error getting cartId:', error);
      return null;
    }
  };


  const handleCheckout = async () => {
    try {

      // Use the userId to get the cartId
      const cartId = await getCartIdForUser(userId);
      // Call the checkout function with cartId
      const session = await checkout({
        cartId, // Pass the cartId as an argument to checkout
        lineItems, // Your lineItems data
      });
      // Redirect to Stripe checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };


  // Function to delete an item from the cart 
  const calculateTotalPrice = (products) => products.reduce((acc, item) => {
    acc += item.qty * item.price;
    return acc;
  }, 0);

  const deleteFromCart = async (productId) => {
    try {
      const payload = {
        userId,
        productId,
      };
      // only extract through data
      const response = await axios.delete('/api/cart', { data: payload });
      if (response.status === 200) {
        //  update the cart items state, new product details
        const newProductDetails = productDetails.reduce((list, item) => {
          if (item.productId !== productId) {
            list.push(item);
            return list;
          }
          if (item.qty === 1) {
            return list;
          }
          item.qty--;
          list.push(item);
          return list;
        }, []);
        const totalPrice = calculateTotalPrice(newProductDetails);
        setProductDetails(newProductDetails);
        setTotal(totalPrice);
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };


  const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      const payload = {
        userId,
        productId,
        quantity: newQuantity,
      };
      const response = await axios.put('/api/cart', payload); // Make a PUT request
      if (response.status === 200) {
        const newProductDetails = productDetails.map((item) => {
          if (item.productId === productId) {
            // Update the quantity for the matching product
            return {
              ...item,
              qty: newQuantity,
            };
          }
          return item;
        });
        const totalPrice = calculateTotalPrice(newProductDetails);
        setProductDetails(newProductDetails);
        setTotal(totalPrice);
      }
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
    }
  };


  //to display on top of cart
  // const getTotalItems = (items) =>
  //   items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <>
     


      <Container className="px-32 flex flex-col pt-4">
        <Typography variant="h4" gutterBottom>
          Your Shopping Cart
        </Typography>
        {productDetails.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <div style={{ width: '80%' }}>
            {productDetails.map((item, index) => (
              // <div className="cart-item" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>

              <div key={index} className={`${true ? "flex" : ""} items-center border-b pb-5 pt-5`}
                style={{ borderColor: 'lightblue' }}>

                <img className="w-[109px] h-[134px]" src={`uploads/${item.image}`} />


                <div className="cart-item-details flex-grow" style={{ marginLeft: '20px' }}>
                  <Typography variant="h6" className="flex-grow-0 flex-shrink-0">{item.name}</Typography>

                  <div className="flex justify-between w-1/2 pt-5">

                    <Typography variant="body2">
                      {item.price !== item.originalPrice ? (
                        <span>
                          <span style={{ textDecoration: 'line-through', color: 'red' }}> ${(item.originalPrice / 100).toFixed(2)} </span> {' '} ${(item.price / 100).toFixed(2)}
                        </span>) : (`$${(item.price / 100).toFixed(2)}`)}
                    </Typography>

                    <Typography variant="body2">Total: ${(item.qty * item.price / 100).toFixed(2)}</Typography>
                  </div>


                  <div className="flex justify-between w-1/2 pt-5 ">
                    <Button
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
                      onClick={() => deleteFromCart(item.productId)}
                    >
                      -
                    </Button>
                    <p>{item.qty}</p>
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        backgroundColor: 'lightgreen',
                        color: 'white',
                        transition: 'background-color 0.3s',
                        '&:hover': {
                          backgroundColor: 'darkgray',
                        },
                      }}
                      onClick={() => updateCartItemQuantity(item.productId, item.qty + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        <div className="cart-total">
          <Typography variant="h6">Total: ${(total / 100).toFixed(2)}</Typography>
        </div>

        <div className="inline-block pb-20 flex justify-between">
          <Button size="small"
            variant="contained"
            style={{
              backgroundColor: 'lightblue',
              color: 'white',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'blue',
              },
            }}
            type="submit" onClick={handleCheckout}>Checkout
          </Button>
          {/* <Link href={`/products/`}>
            <Button size="small"
              variant="contained"
              style={{
                backgroundColor: 'lightblue', color: 'white', transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: 'blue',
                },
              }}
            >
              Continue shopping
            </Button>
          </Link> */}
        </div>

      </Container>
      
    </>
  );
};

export default Cart;