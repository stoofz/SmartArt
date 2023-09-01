import prisma from "utils/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          email: req.body,
        },
        select: {
          id: true,
        },
      });
  
      await prisma.$disconnect();
      res.status(201).json(customer.id);
      return customer.id;
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error' });
    }
  }
}