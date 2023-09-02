import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const addCategory = await prisma.category.create({
        data: {
          name: name,
        },
      });

      res.status(201).json(addCategory);
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