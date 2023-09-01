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

const Cart = ({ cartItems, productDetails: defaultProducts, subtotal, lineItems }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(defaultProducts);
  // Function to delete an item from the cart 

  const deleteFromCart = async (productId) => {
    const userId = 3;

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
              <p>Price: ${item.price}</p>
              <p>Total: ${(item.qty * item.price / 100).toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <Button
                size="small"
                variant="contained"
                style={{
                  backgroundColor: 'lightgray', // Initial background color (gray)
                  color: 'white',
                  transition: 'background-color 0.3s', // Add a smooth transition on hover
                  '&:hover': {
                    backgroundColor: 'darkgray', // Background color on hover (darker gray)
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
                  backgroundColor: 'lightgray', // Initial background color (gray)
                  color: 'white',
                  transition: 'background-color 0.3s', // Add a smooth transition on hover
                  '&:hover': {
                    backgroundColor: 'darkgray', // Background color on hover (darker gray)
                  },
                }}
              // onClick={() => addToCart(item)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      ))}
      <h2>Total: ${subtotal}</h2>
      <button type="submit" onClick={(() => {
        const session = checkout({
          lineItems
          // use window.location to redirect to session.url, which is stripe checkout
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

    for (const product of productDetails) {
      lineItems.push({
        quantity: product.qty,
        price_data: {
          currency: "CAD",
          product_data: {
            name: product.name,
            description: product.description || undefined,
            images: product.image ? [product.image] : [],
          },
          unit_amount: product.price,
        }
      });
    }
    const serializedLineItems = JSON.parse(JSON.stringify(lineItems));


    return { props: { cartItems: serializedCartItems, productDetails, subtotal, lineItems: serializedLineItems } };

  } catch (error) {
    console.error('Error fetching cart items:', error);
    return { props: { cartItems: [] } };
  }
}


export default Cart;
