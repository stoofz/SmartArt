import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {

      const discount = await prisma.discount.findMany({
        include: {
          product: {
            select: { 
              name: true
            }
          }
        }
      });

      // Flatten name from discount.product.name to discount.name to plug into DelForm component
      const flattenDiscount = discount.map((data) => {
        const { product, ...content } = data;
        return {
          ...content,
          name: product.name,
        }
      });

      res.status(200).json(flattenDiscount);

      await prisma.$disconnect();
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error' });
    }
  } else {
    // Not a get request
    res.status(405).end();
  }
};