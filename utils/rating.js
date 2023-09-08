// function to calculate average rating
const averageRating = (reviews) => {
  const ratings = reviews.map((review) => {
    return review.rating;
  });

  const totalRating = ratings.reduce((result, rating) => {
    return result + rating;
  }, 0);
  return parseFloat((totalRating / ratings.length).toFixed(1));
};

export { averageRating };