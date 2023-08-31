import Link from 'next/link';
import prisma from 'utils/prisma';
import { Button, Drawer, IconButton, Badge } from "@mui/material";
import { AddShoppingCart } from "@mui/material";
import React, { useState } from 'react';

const Cart = ({  cartItems, productDetails, subtotal  }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const getTotalItems = (items) =>
    items.reduce((acc, item) => acc + item.amount, 0);

    
  // console.log("LINE 5", productDetails)
  // console.log("LINE 6", cartItems.id)
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
                // onClick={() => removeFromCart(item.id)}
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

</div>
     
    // </Drawer>
    //   </div>
    // </>
  )}

export async function getServerSideProps({ req }) {
  // Get the user ID from your authentication system.
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

        console.log("LINE 75", totalPerProduct)
        productDetails.push({
          name: product.name,
          price: price,
          description: product.description,
          qty: cartItem.qty,
          totalPerProduct: totalPerProduct,
        });
      }
    }

    // Calculate subtotal
    const subtotal = productDetails.reduce((acc, item) => acc + item.totalPerProduct, 0);
   
  
   
    console.log("LINE 80", productDetails)
    console.log("LINE 90", subtotal)


    return { props: { cartItems: serializedCartItems, productDetails, subtotal } };

  } catch (error) {
    console.error('Error fetching cart items:', error);
    return { props: { cartItems: [] } }; 
  }
}


export default Cart;
