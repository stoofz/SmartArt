/* eslint-disable func-style */
import prisma from 'utils/prisma';
import formatDate from 'utils/formatDate';

const ProductDetailsPage = ({ product, reviews }) => {

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </main>
      <h1>Reviews</h1>
      <ul>
        {/* <h1>Reviews</h1>
      <p>Name</p>
      <p>Date</p>
      <p>{reviews.rating}</p>
      <p>{reviews.comment}</p> */}
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.customer.firstName} {review.customer.lastName}</p>
            <p>{review.date}</p>
            <p>{review.rating}</p>
            <p>{review.comment}</p>
          </li>
          ))}
      </ul>
    </>
  );
};

export async function getServerSideProps(context) {

  const productId = context.params.productId;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });

  const serializedProduct = JSON.parse(JSON.stringify(product));

  const reviews = await prisma.feedback.findMany({
    where: { productId: parseInt(productId) },
    include: { customer: true }
  });

  console.log("Reviews:", reviews)

  const serializedReviews = JSON.parse(JSON.stringify(reviews));

  console.log("serializedReviews:", serializedReviews.rating)

  return { props: { product: serializedProduct, reviews: serializedReviews } };
}

export default ProductDetailsPage;
