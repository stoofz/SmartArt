/* eslint-disable camelcase */
/* eslint-disable func-style */
/* eslint-disable semi */
import axios from 'axios';
import Link from 'next/link';
import prisma from 'utils/prisma';
import { Button, Drawer, IconButton, Badge } from "@mui/material";
import { AddShoppingCart } from "@mui/material";
import React, { useState } from 'react';
import checkout from './checkout';
import { ContactsOutlined } from '@mui/icons-material';

const Cart = ({ productDetails: defaultProducts, subtotal }) => {
  const [cartOpen, setCartOpen] = useState(false);
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
 
  
  const deleteFromCart = async (productId) => {

    try {
      const payload = {
        userId,
        productId,
      };
      // only extract through data
      const response = await axios.delete('/api/cart', { data: payload });

      if (response.status === 200) {
        // Item deleted successfully, update the cart items state
        setProductDetails((prevProductDetails) =>
          prevProductDetails.reduce((list, item) => {
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

        );

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
        const newProduct = productDetails.map((item) => {

          if (item.productId === productId) {
            // Update the quantity for the matching product
            return {
              ...item,
              qty: newQuantity,
            };
          }
          return item;
        })

        const totalPrice = newProduct.reduce((acc, item) => {
          
          acc += (item.qty * item.price);
          return acc;
        }, 0)
       
        setProductDetails(newProduct)
     
       setTotal(totalPrice)
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
    //  <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>

    <div className="font-sans w-96 p-5">

      <h2>Your Cart</h2>
      {productDetails.map((item, index) => (
        <div key={index} className="flex justify-between font-sans border-b border-lightblue pb-5">
          <div>
            <h3>{item.name}</h3>
            <div className="flex justify-between">
              <p>Price: ${(item.price / 100).toFixed(2)}</p>
              <p>Total: ${(item.qty * item.price / 100).toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
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
                // disableElevation
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
      <h2>Total: ${(total / 100).toFixed(2)}</h2>
      <button type="submit" onClick={(() => {
        const session = checkout({
          lineItems
          
          // w.location to redirect to session.url, which is stripe checkout
        }).then(session => window.location.assign(session.url));
      })}>Checkout</button>

    </div>


    // </Drawer>
    //   </div>
    // </>
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
