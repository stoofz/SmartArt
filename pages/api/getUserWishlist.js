import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  //Check if product is in wishlist
  if (req.method === 'GET') {
    const {  userId } = req.query;

    try {
      const userWishlist = await prisma.wishlist.findMany({
        where: {
          customerId: Number(userId),
        },
        // Include the related Product data
        include: {
          product: true,
        },
      });
    
      res.status(200).json( userWishlist );
    
    } catch (error) {
      console.error('Error checking if product is in wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
}