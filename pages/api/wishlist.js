import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  // Add to Wishlist
  if (req.method === 'POST') {
    // Extract data from the request body
    const { customerId, productId } = req.body;

    try {
      // Create a new wishlist entry using Prisma
      await prisma.wishlist.create({
        data: {
          customerId: customerId,
          productId: productId,
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
}






