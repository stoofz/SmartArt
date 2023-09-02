import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {

      const products = await prisma.product.findMany();

      res.status(200).json(products);
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