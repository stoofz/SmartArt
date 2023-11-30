import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { query } = req.body;

    try {
      let products;

      if (query && query.trim() !== '') {
        // If query is provided, filter by category
        products = await prisma.category.findMany({
          where: {
            name: {
              mode: 'insensitive',
              contains: query,
            },
          },
          include: {
            products: {
              include: {
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
            },
          },
        });
      } else {
        // If query is null or empty, return all products
        products = await prisma.category.findMany({
          include: {
            products: {
              include: {
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
            },
          },
        });
      }
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