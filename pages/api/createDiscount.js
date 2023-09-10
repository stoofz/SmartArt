import prisma from 'utils/prisma';
const { parseISO } = require('date-fns');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { product_id, discount, start_date, end_date, description } = req.body;

    try {

      const discountExists = await prisma.discount.findUnique({
        where: {
          id: parseInt(product_id),
        },
      });

      if (!discountExists) {
        // parseISO converts date to YYYY-MM-DDTHH:mm:ss.sssZ format for prisma datetime
        const addDiscount = await prisma.discount.create({
          data: {
            productId: parseInt(product_id),
            discount: parseInt(discount),
            startDate: parseISO(start_date),
            endDate: parseISO(end_date),
            description: description,
          },
        });
      
        res.status(201).json(addDiscount);
      }

      else {
        res.status(400).json({ error: 'Product already has a discount' });
        console.log("Product already has a discount");
      }

      await prisma.$disconnect();
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error' });
    }
  } else {
    // Not a post request
    res.status(405).end();
  }
}