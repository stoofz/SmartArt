/* eslint-disable camelcase */
/* eslint-disable func-style */
/* eslint-disable semi */
import axios from 'axios';
import Link from 'next/link';
import prisma from 'utils/prisma';
import { Button, Drawer, IconButton, Badge } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { useState } from 'react';
import checkout from './api/checkout';

import { Typography, Container } from '@mui/material';

const Cart = ({ productDetails: defaultProducts, subtotal }) => {

  const [productDetails, setProductDetails] = useState(defaultProducts);
  const [total, setTotal] = useState(subtotal);

  const userId = 3;

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
        unit_amount: item.price,
      }
    }
  })


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

        }, [])

        const totalPrice = calculateTotalPrice(newProductDetails)

        setProductDetails(newProductDetails);

        setTotal(totalPrice)
        // localStorage.setItem('lineItems', JSON.stringify(lineItems));
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
        })

        const totalPrice = calculateTotalPrice(newProductDetails)

        setProductDetails(newProductDetails)

        setTotal(totalPrice)

        // localStorage.setItem('lineItems', JSON.stringify(lineItems));
      }
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
    }
  };


  //to display on top of cart
  // const getTotalItems = (items) =>
  //   items.reduce((acc, item) => acc + item.amount, 0);

  return (
    // <>
    //   <IconButton className="fixed z-50 top-20 right-20" onClick={() => setCartOpen(true)}>
    //     <Badge badgeContent={getTotalItems(cartItems)} color="error">
    //       <AddShoppingCart />
    //     </Badge>
    //   </IconButton>
    //   <div className="m-40">
   
    <Container className="px-32 flex flex-col pt-32">
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

              <img className="w-[109px] h-[134px] " src="https://via.placeholder.com/109x134" />
              <div className="cart-item-details flex-grow" style={{ marginLeft: '20px' }}>
                <Typography variant="h6" className="flex-grow-0 flex-shrink-0">{item.name}</Typography>

                <div className="flex justify-between w-1/2 pt-5">
                  <Typography variant="body2">Price: ${(item.price / 100).toFixed(2)}</Typography>
                  <Typography variant="body2">Total: ${(item.qty * item.price / 100).toFixed(2)}</Typography>
                </div>


                <div className="flex justify-between w-1/2 pt-5 ">
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      backgroundColor: 'lightgray',
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
                      backgroundColor: 'lightgray',
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
      <div className="inline-block pb-20">
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
          type="submit" onClick={(() => {
            const session = checkout({
              lineItems
            }).then(session => window.location.assign(session.url))
          })}>Checkout
        </Button>
      </div>
    </Container>
  )
}

export async function getServerSideProps({ req }) {
  // Get the user ID from auth.
  // const userId = req.user.id; 
  const userId = 3;

  try {
    // Query the database to find the user's cart.
    const userCart = await prisma.cart.findFirst({
      where: {
        customerId: userId,
      },
      include: {
        cartItems: true, // This includes the associated cartItems.
      },
    });

    const cartItems = userCart ? userCart.cartItems : [];
    const serializedCartItems = JSON.parse(JSON.stringify(cartItems));
    const productDetails = [];
    const lineItems = [];

    for (const cartItem of serializedCartItems) {
      const product = await prisma.product.findUnique({
        where: {
          id: parseInt(cartItem.productId),
        },
      });

      if (product) {
        // Convert price to a plain number
        const price = Number(product.price);

        const totalPerProduct = price * cartItem.qty;

        productDetails.push({
          productId: product.id,
          name: product.name,
          price: price,
          description: product.description,
          qty: cartItem.qty,
          image: product.image,
          totalPerProduct: totalPerProduct,
        });
      }
    }

    // Calculate subtotal
    const subtotal = productDetails.reduce((acc, item) => acc + item.totalPerProduct, 0);

    return { props: { productDetails, subtotal } };

  } catch (error) {
    console.error('Error fetching cart items:', error);
    return { props: { cartItems: [] } };
  }
}


export default Cart;
