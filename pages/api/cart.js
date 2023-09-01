// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../utils/prisma";
import { addToCartApi, deteteFromCartApi, updateCartApi } from 'utils/db';

// eslint-disable-next-line func-style
export default async function handler(req, res) {

  //ADD to CART
  if (req.method === "POST") {
    // Extract data from the request body
    const { userId, productId, quantity } = req.body;

    try {
      //add items to cart using fn from db.js
      await addToCartApi(userId, productId, quantity)
   
      // // Respond with a success message or status
       res.status(200).json({ message: 'Item added to the cart' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    } finally {
      await prisma.$disconnect(); // Disconnect from Prisma
    }



  } 

  // else 
  //DELETE FROM CART
  if (req.method === "DELETE") {
   // Extract data from the request body
    const { userId, productId } = req.body;
    try {
      
      await deteteFromCartApi (userId, productId)
     
      return res.status(200).json({ message: 'Item deleted from the cart' });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the item from the cart' });
    } finally {
      await prisma.$disconnect(); 
      
    }
  }


  if (req.method === "PUT") {
    // Extract data from the request body
    const { userId, productId, quantity } = req.body;

    try {

      await updateCartApi(userId, productId, quantity)
      // // Check if the user has an active cart
      // const userCart = await prisma.cart.findFirst({
      //   where: {
      //     customerId: userId,
      //   },
      // });

      // if (userCart) {
      //   const cartId = userCart.id;

      //   // Check if the item is in the user's cart
      //   const existingCartItem = await prisma.cartItem.findFirst({
      //     where: {
      //       cartId: cartId,
      //       productId: productId,
      //     },
      //   });

      //   if (existingCartItem) {
      //     // If the item exists, update the quantity
      //     await prisma.cartItem.update({
      //       where: {
      //         id: existingCartItem.id,
      //       },
      //       data: {
      //         qty: quantity,
      //       },
      //     });

      //     // Respond with a success message or status
          res.status(200).json({ message: 'Item quantity updated in the cart' });
      //   } else {
      //     // If the item doesn't exist in the cart, respond with an error
      //     res.status(404).json({ error: 'Item not found in the cart' });
      //   }
      // } else {
      //   // If the user doesn't have an active cart, respond with an error
        // res.status(404).json({ error: 'User does not have an active cart' });
      // }
    } catch (error) {
      console.error('Error updating item quantity in cart:', error);
      res.status(500).json({ error: 'An error occurred while updating the item quantity in the cart' });
    } finally {
      await prisma.$disconnect(); // Disconnect from Prisma
    }
  } 
  
  // else {
  //   return res.status(405).end(); // Method Not Allowed
  // }

}

//   }

//   if (req.method === "DELETE") {
//     //Delete a single item from my cart
//   }

//   if (req.method === "PUT") {
//     //Update a single item from my cart
//   }

//   prisma.disconnect
// }

