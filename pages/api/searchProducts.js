import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      const productResults = await prisma.product.findMany({
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
        },
      });

      // Return the search results as JSON
      res.status(200).json(productResults);
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
