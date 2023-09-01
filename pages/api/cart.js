// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../utils/prisma";
import { addToCart, deteteFromCart } from 'utils/db';

// eslint-disable-next-line func-style
export default async function handler(req, res) {

  //ADD to CART
  if (req.method === "POST") {
    // Extract data from the request body
    const { userId, productId, quantity } = req.body;

    try {
      //add items to cart using fn from db.js
      await addToCart(userId, productId, quantity)
   
      // // Respond with a success message or status
       res.status(200).json({ message: 'Item added to the cart' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    } finally {
      await prisma.$disconnect(); // Disconnect from Prisma
    }


    //DELETE FROM CART
  } 

  // else 
  
  if (req.method === "DELETE") {
   // Extract data from the request body
    const { userId, productId } = req.body;
    try {
      
      await deteteFromCart (userId, productId)
     
      return res.status(200).json({ message: 'Item deleted from the cart' });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      return res.status(500).json({ error: 'An error occurred while deleting the item from the cart' });
    } finally {
      await prisma.$disconnect(); 
      
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

