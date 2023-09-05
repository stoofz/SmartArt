import prisma from "/utils/prisma";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // const userId = req.query.userId; 
    const userId = 3;
    // Use getCartIdForUser to retrieve the cart ID
    const userCart = await prisma.cart.findFirst({
      where: {
        customerId: parseInt(userId, 10),
      },
    });

    // console.log(" userCart", userCart)
    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    return res.status(200).json({ cartId: userCart.id });
  } catch (error) {
    console.error('Error handling cart request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
