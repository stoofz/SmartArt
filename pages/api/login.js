import prisma from "utils/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let adminAccount = false;

    try {
      const customer = await prisma.customer.findUnique({
        where: {
          email: req.body,
        },
        select: {
          id: true,
        },
      });

      if (customer) {
        const admin = await prisma.admin.findUnique({
          where: {
            email: req.body,
          },
        });
    
        if (admin) {
          adminAccount = true;
        }
      }
    
      await prisma.$disconnect();
      res.status(201).json({ customerId: customer.id, adminAccount });
     // return customer.id;
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error' });
    }
  }
}