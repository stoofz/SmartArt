import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  

  // Add to Wishlist
  if (req.method === 'POST') {
    // Extract data from the request body
    const { userId, productId } = req.body;
    console.log("userId", userId, productId)
    try {
      // Create a new wishlist entry using Prisma
      await prisma.wishlist.create({
        data: {
          customerId: Number(productId), 
          productId: Number(userId), 
        },
      });

      // Respond with a success message or status
      res.status(200).json({ message: 'Item added to the wishlist' });
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

      // const recordToDelete = await prisma.wishlist.findFirst({
      //   where: {
      //     customerId: 6,
      //   }
      // });
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






