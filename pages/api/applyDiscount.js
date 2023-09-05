import { applyDiscount } from "utils/db";

export default async (req, res) => {
  if (req.method === 'POST') {

    const { productId, productPrice } = req.body;

    try {
      const discountedPrice = await applyDiscount(productId, productPrice);
      res.status(200).json({ discountedPrice });

    } catch (error) {
      res.status(500).json({ error: 'Error' });
    }
  } else {
    // Not a post request
    res.status(405).end();
  }
};