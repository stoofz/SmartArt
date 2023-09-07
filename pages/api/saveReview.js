import prisma from 'utils/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
  

    try {
      const { date, rating, comment, customerId,
        productId } = req.body;

      // Save the review to the database
      const savedReview = await prisma.feedback.create({
        data: {
          date,
          rating,
          comment,
          customerId,
          productId
        },
      });

      prisma.$disconnect();

      res.status(201).json(savedReview);
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle other HTTP methods if needed
    res.status(405).json({ error: 'Method not allowed' });
  }
}