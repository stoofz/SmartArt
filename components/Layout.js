import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { useUser } from '@auth0/nextjs-auth0/client';
import { setSession, clearSession } from 'utils/session';
import { useRouter } from 'next/router';
import Subnav from './User/UserSubNav';

const Layout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  const router = useRouter();
  const isUserProfilePage = router.pathname.startsWith('/profile');
  const isOrdersPage = router.pathname.startsWith('/orders');
  const isReviewsPage = router.pathname === '/reviews';
  const isCartPage = router.pathname === '/cart';
  const isWishlistPage = router.pathname === '/wishlist';
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div>
          <Navigation sessionId={setSession(user)} />
        </div>
        {/* Render subnav only on the user profile page */}
        <div style={{ flex: 1, display: "flex", flexDirection: "row", backgroundColor: "#F5C9C6" }}>
          {isUserProfilePage || isOrdersPage || isReviewsPage || isCartPage || isWishlistPage ? (
            <div>
              <Subnav />
            </div>
          ) : null}
          <div style={{
            borderRadius: '16px',
            width: '76%',
            backgroundColor: 'white',
            marginTop: '38px',
            marginLeft: '40px',
            marginBottom: '40px'
          }}>
            {children}
          </div>
        </div>
       
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );

};

export default Layout;