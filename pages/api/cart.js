// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract data from the request body
    const { userId, productId, quantity } = req.body;
    
    try {
      // Check if the user has an active cart
      const userCart = await prisma.cart.findFirst({
        where: {
          customerId: userId,
         
        },
      });
      
      if (!userCart) {
        // If the user doesn't have an active cart, create one
        const newCart = await prisma.cart.create({
          data: {
            customerId: userId,
            
          },
        });

        // Use the newly created cart's ID as cartId
        const cartId = newCart.id;

        // Create a cart item using cartId
        await prisma.cartItem.create({
          data: {
            cartId: cartId,
            productId: productId,
            qty: quantity,
          },
        });
        
      } else {
        // If the user has an active cart, use its ID as cartId
        const cartId = userCart.id;
        
        // Check if the item is already in the cart
        const existingCartItem = await prisma.cartItem.findFirst({
          where: {
            cartId: cartId,
            productId: productId,
          },
        });
       
        if (existingCartItem) {
          // If the item exists, update the quantity
          await prisma.cartItem.update({
            where: {
              id: existingCartItem.id,
            },
            data: {
              qty: existingCartItem.qty + quantity,
            },
          });
        } else {
          // If the item doesn't exist, create a new cart item
          await prisma.cartItem.create({
            data: {
              cartId: cartId,
              productId: productId,
              qty: quantity,
            },
          });
        }
      }

      // Respond with a success message or status
      res.status(200).json({ message: 'Item added to the cart' });
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    } finally {
      await prisma.$disconnect(); // Disconnect from Prisma
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
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
