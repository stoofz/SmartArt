import prisma from "/utils/prisma";


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); 
  }

  try {
    const { customerId, totalPrice, stripeChargeId, orderItems } = req.body;
    console.log(" customerId, totalPrice, stripeChargeId, orderItems", customerId)
    // Create a new Payment record
    const payment = await prisma.payment.create({
      data: {
        customerId,
        date: new Date(),
        totalPrice,
        stripeChargeId,
      },
    });

    // Create a new Order record linked to the Payment
    const order = await prisma.order.create({
      data: {
        customerId,
        orderDate: new Date(),
        totalPrice,
        payment: {
          connect: {
            id: payment.id,
          },
        },
        orderItem: {
          createMany: {
            data: orderItems.map((item) => ({
              productId: item.productId,
              qty: item.qty,
              price: item.price,
            })),
          },
        },
      },
    });

    res.status(201).json({ order, payment });
  } catch (error) {
    console.error('Error creating order and payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}