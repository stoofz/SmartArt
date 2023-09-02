import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {

    const orderId = req.body.orderId;

    try {


      const orderDetails = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          payment: true,
          customer: {
            include: {
              address: true
            }
          },
          orderItem: {
            include: {
              product: true
            }
          }
        }
      });

      console.log(orderDetails)
      res.status(200).json(orderDetails);
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



