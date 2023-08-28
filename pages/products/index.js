import Link from 'next/link';
import prisma from 'utils/prisma';

const ProductsPage = ({ products }) => {
  return (
    <main>
      <h3>Products</h3>
      {products.map(product => (
        <div key={product.id}>
          <Link href={`/products/${product.id}`}>
              <h4>{product.name}</h4>
          </Link>
          <p>{product.price}</p>
        </div>
      ))}
    </main>
  );
};

export async function getServerSideProps() {

  const products = await prisma.Product.findMany()

  const serializedProduct = JSON.parse(JSON.stringify(products));
  
  return { props: { products: serializedProduct } };
}

export default ProductsPage;