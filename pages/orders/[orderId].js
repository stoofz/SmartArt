import prisma from 'utils/prisma';

const OrderPage = ({ order }) => {

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      
    </main>
  );
};

export async function getServerSideProps(context) {

  const orderId = context.params.orderId;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) }
  });

  const serializedProduct = JSON.parse(JSON.stringify(product));

  return { props: { product: serializedProduct } };
}

export default OrderPage;
