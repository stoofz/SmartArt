import Link from 'next/link';
import prisma from '../../utils/prisma';
import axios from 'axios';

const ProductsPage = ({ products }) => {
  const handleAddToCart = async (productId) => {
    const userId = 3; // Replace with the actual user's ID
    const quantity = 1; // You can adjust the quantity as needed

    try {
      const response = await axios.post('/api/cart', {
        userId,
        productId,
        quantity,
      });
      // Optionally, you can show a success message or update the UI to reflect the cart changes.
      console.log('Item added to cart:', response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Handle the error, show an error message to the user.
      // setError('An error occurred while adding the item to the cart.');
    }
  };


  return (
    <main>
      <h3>Products</h3>
      {products.map(product => (
        <div key={product.id}>
          <Link href={`/products/${product.id}`}>
              <h4>{product.name}</h4>
          </Link>
          <p>{product.price}</p>
          <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
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