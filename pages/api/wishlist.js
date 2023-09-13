import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  //Check if product is in wishlist
  if (req.method === 'GET') {
    const { productId, userId } = req.query;
    
    try {
      // Query the database to check if the product with productId exists in the user's wishlist
      const isInWishlist = await prisma.wishlist.findFirst({
        where: {
          customerId: Number(userId),
          productId: Number(productId),
        },
      });
      // console.log("isInWishlist ", isInWishlist)
      if (isInWishlist) {
        res.status(200).json({ isInWishlist: true });
      } else {
        res.status(200).json({ isInWishlist: false });
      }
    } catch (error) {
      console.error('Error checking if product is in wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 


  // Add to Wishlist
  if (req.method === 'POST') {
    // Extract data from the request body
    const { productId, userId } = req.body;
    // console.log("userId", userId, productId)
    try {
      //search for wishlist item before creating it
      const wishlistItemExists = await prisma.wishlist.findFirst({
        where: {
          
            customerId: userId,
            productId: productId, 
          
        },
        include: {
          product: true,
        },
      });
       
      if(wishlistItemExists) {
        return res.status(200).json({ message: 'Item exixts in the wishlist', wishlistItem: wishlistItemExists });
      }
      // Create a new wishlist entry using Prisma
      const createdWishlistItem = await prisma.wishlist.create({
        data: {
          customerId: Number(userId), 
          productId: Number(productId), 
        },
      });

      // Respond with a success message or status
      res.status(200).json({ message: 'Item added to the wishlist', wishlistItem: createdWishlistItem });
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
      res
        .status(500)
        .json({ error: 'An error occurred while adding the item to the wishlist' });
    } finally {
      await prisma.$disconnect();
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { userId, productId } = req.body;
      console.log("userId, productId SERVER", userId, productId )
      // Call the deleteFromWishlist function with customerId and productId
      const recordToDelete = await prisma.wishlist.findFirst({
        where: {
          customerId: Number(userId),
          productId: Number(productId),
        },
        select: {
          id: true
        }
      });

    
   
      console.log("recordToDelete", recordToDelete )
      if (recordToDelete) {
        await prisma.wishlist.delete({
          where: {
            id: recordToDelete.id,
          },
        });
        const result = await prisma.wishlist.findMany({
          where: {
            customerId: Number(userId),
          },
          include: {
            product: true,
            // Add any other fields you want to include from the related models.
          },
        });
        // Respond with a success message or status
        res.status(200).json(result);
      }

      
    } catch (error) {
      // Handle errors, e.g., item not found
      console.error('Error deleting item from wishlist:', error);
      res.status(500).json({ error: 'An error occurred while deleting the item from the wishlist' });
    } finally {
      await prisma.$disconnect();
    }
  }
  
}






