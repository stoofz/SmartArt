import { useEffect, useState } from 'react';

function DelProductForm() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('/api/listProducts');
        if (response.ok) {
          setProducts(await response.json());
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/delProduct?productId=${productId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      } else {

        console.error('Failed');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DelProductForm;