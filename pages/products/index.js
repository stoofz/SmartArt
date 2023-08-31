/* eslint-disable func-style */
// import Link from 'next/link';
import prisma from '../../utils/prisma';
import axios from 'axios';
import Link from 'next/link';

export default function ProductsPage({ products }) {
  const handleAddToCart = async (productId) => {
    const userId = 3; // Replace with the actual user's ID
    const quantity = 1;

    try {
      const response = await axios.post('/api/cart', {
        userId,
        productId,
        quantity,
      });
      // Show a success message ????.
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      //  Show an error message to the user????

    }
  };
  const productItems = () => (products.map((product) =>
    <div key={product.id}>
      <Link href={`/products/${product.id}`}>
        <h4>{product.name}</h4>
      </Link>
      <p>{product.price}</p>
      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
    </div>
  ));
  return (
    <main>
      {productItems()}
    </main>
  );
}

export async function getServerSideProps() {

  const products = await prisma.Product.findMany()

  const serializedProduct = JSON.parse(JSON.stringify(products));

  return { props: { products: serializedProduct } };
}

// export default ProductsPage;