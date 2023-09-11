
import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  const { userId } = req.query;
  console.log("userId", userId)
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(userId) },
      include: {
        address: true, // Include the associated addresses
        order: true,   // Include the associated orders
        payment: true, // Include the associated payments
        cart: true,    // Include the associated cart items
        wishlist: true // Include the associated wishlist items
      },
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}