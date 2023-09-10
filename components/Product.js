import React, { useState, useEffect } from 'react';

function SingleProduct({ userId, product }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Fetch and set the initial wishlist status for this product
    checkIfProductIsInWishlist(userId, product.id).then((isInWishlist) => {
      setIsInWishlist(isInWishlist);
    });
  }, [userId, product.id]);

  const handleToggleWishlist = () => {
    toggleWishlist(userId, product.id, isInWishlist, setIsInWishlist);
  };

  return (
    <div>
      {/* Display product information */}
      {/* Display the heart icon with isInWishlist state */}
      <FavoriteIcon
        style={{
          margin: '20px',
          color: isInWishlist ? 'red' : 'gray',
        }}
        onClick={handleToggleWishlist}
      />
    </div>
  );
}

export default SingleProduct;