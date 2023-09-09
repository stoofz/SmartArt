import prisma from './prisma'; // Import your Prisma instance here

const getReviews = async (productId) => {
  const reviews = await prisma.feedback.findMany({
    where: { productId: parseInt(productId) },
    include: { customer: true }
  });

  const extractedReviews = reviews.map((review) => {
    const { date, rating, comment } = review;
    const { firstName, lastName } = review.customer;

    return {
      date,
      rating,
      comment,
      firstName,
      lastName,
    };
  });

  return extractedReviews;
}

export { getReviews };