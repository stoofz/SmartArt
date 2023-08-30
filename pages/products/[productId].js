/* eslint-disable func-style */
import prisma from 'utils/prisma';

const ProductDetailsPage = ({ product }) => {

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </main>
  );
};

export async function getServerSideProps(context) {

  const productId = context.params.productId;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });

  const serializedProduct = JSON.parse(JSON.stringify(product));

  return { props: { product: serializedProduct } };
}

export default ProductDetailsPage;
