import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  //Check if product is in wishlist
  if (req.method === 'GET') {
    const {  userId } = req.query;
    // console.log("productId, userId ", productId, userId)
    try {
      const userWishlist = await prisma.wishlist.findMany({
        where: {
          customerId: userId, // Assuming customerId is the field in your Wishlist model that represents the user's ID.
        },
        // Include the related Product data
        include: {
          product: true,
        },
      });
console.log('USERWISHLIST', userWishlist)
      return userWishlist;
    } catch (error) {
      console.error('Error checking if product is in wishlist:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } 
}