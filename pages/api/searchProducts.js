import prisma from 'utils/prisma';



export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;
  
    try {
      const products = await prisma.product.findMany({
        where: {
          name: {
            mode: 'insensitive',
            contains: query,
          },
        },
        include: {
          // Include feedback rating for each product
          feedback: {
            select: {
              rating: true,
            },
          },
          discount: {
            select: {
              discount: true,
              startDate: true,
              endDate: true,
            },
          },
        },
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error' });
    }
  } else {
    // Not a post request
    res.status(405).end();
  }
}
