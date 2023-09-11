import prisma from 'utils/prisma'; // Import your Prisma instance here


export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const watercolorPs = await prisma.category.findMany({
        where: {
          name: "Watercolor Paintings"
        },
        include: {
          products: {
            include: {
              //include feedback rating for each product
              feedback: {
                select: {
                  rating: true,
                },
              },
            },
          }
        },
      });
      console.log(watercolorPs);
      res.status(200).json(watercolorPs);

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