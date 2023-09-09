import { useSessionId } from '/utils/session';

const WishlistPage = () => {
  const userId = useSessionId();
  return <div>Wishlist</div>;
};

export default WishlistPage;