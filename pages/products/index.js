/* eslint-disable func-style */
// import Link from 'next/link';
import prisma from '../../utils/prisma';
import axios from 'axios';
import Link from 'next/link';
import { useSessionId } from 'utils/session';
import { averageRating } from 'utils/rating';

import { handleAddToCart } from 'utils/cart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Rating from '@mui/material/Rating';

export default function ProductsPage({ products }) {

  const userId = useSessionId();


  const productItems = () => (products.map((product) =>
    <div key={product.id}>
      <Link href={`/products/${product.id}`}>
        <h4>{product.name}</h4>
      </Link>
      <p>${(product.price / 100).toFixed(2)}</p>

      <AddShoppingCartIcon onClick={() => handleAddToCart(product.id, userId)} />
      <Rating name="read-only" value={5} readOnly precision={0.5} />
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
  // const reviews = await getReviews(productId);

  const serializedProduct = JSON.parse(JSON.stringify(products));

  return { props: { products: serializedProduct } };
}

// export default ProductsPage;