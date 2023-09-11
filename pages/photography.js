import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect } from 'react';

import { setSession, clearSession } from 'utils/session';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Footer from '../components/Footer';
import Photography from '../components/Photography';
import Navigation from '../components/Navigation';

export default function PhotographyPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    // setSession(user);

    return (
      <>
        <Navigation sessionId={setSession(user)} />
        <main>
          <Photography />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main>
        <Photography />
      </main>
      <Footer />
    </>
  );
}