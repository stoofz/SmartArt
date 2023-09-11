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
      <>
        <Navigation sessionId={setSession(user)} />
        {/* Render subnav only on the user profile page */}
        {isUserProfilePage || isOrdersPage || isReviewsPage || isCartPage || isWishlistPage ? <Subnav /> : null}
        {children}
        <Footer />
      </>
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