import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  

  // Add to Wishlist
  if (req.method === 'POST') {
    // Extract data from the request body
    const { customerId, productId } = req.body;
    console.log("userId", customerId)
    try {
      // Create a new wishlist entry using Prisma
      await prisma.wishlist.create({
        data: {
          customerId: parseInt(customerId), // Set the customerId directly
          productId: parseInt(productId), // Set the productId directly
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
      const { customerId, productId } = req.body;

      // Call the deleteFromWishlist function with customerId and productId
      const result = await prisma.wishlist.delete({
        where: {
          customerId: parseInt(customerId),
          productId: parseInt(productId),
        },
      });

      // Respond with a success message or status
      res.status(200).json(result);
    } catch (error) {
      // Handle errors, e.g., item not found
      console.error('Error deleting item from wishlist:', error);
      res.status(500).json({ error: 'An error occurred while deleting the item from the wishlist' });
    } finally {
      await prisma.$disconnect();
    }
  }
  
}






