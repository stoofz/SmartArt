import axios from 'axios';


const handleAddToCart = async (productId, userId) => {
  
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

export { handleAddToCart };