import Subnav from './UserSubNav';

import { useRouter } from 'next/router';


const UserLayout = ({ children }) => {

  const router = useRouter();
  const isUserProfilePage = router.pathname.startsWith('/profile');
  const isOrdersPage = router.pathname.startsWith('/orders');
  const isReviewsPage = router.pathname === '/reviews';
  const isCartPage = router.pathname === '/cart';
  const isWishlistPage = router.pathname === '/wishlist';

  
    return (
     <>
      
        {/* Render subnav only on the user profile page */}

        <div style={{ flex: 1, display: "flex", flexDirection: "row", backgroundColor: "#fae4e2" }}>
          {isUserProfilePage || isOrdersPage || isReviewsPage || isCartPage || isWishlistPage ? (
            <div>
              <Subnav />
            </div>
          ) : null}
          <div
           style={{
            borderRadius: '16px',
            width: '80%',
            backgroundColor: 'white',
            marginTop: '15px',
            // marginLeft: '15px',
            marginBottom: '15px'
          }}
          >
            {children}
          </div>
        </div>
      </>
    );
};

export default UserLayout;