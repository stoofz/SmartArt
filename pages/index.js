import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

import { setSession, clearSession } from 'utils/session';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import Footer from '../components/Footer';
import Products from '../components/Products';
import Navigation from '../components/Navigation';

export default function Index() {
  const { user, error, isLoading } = useUser();

  const [searchResults, setSearchResults] = useState([]);

  // Retrieve search results from child component (Navigation)
  const searchData = (results) => {
    setSearchResults(results);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
      <>
        <Navigation sessionId={ setSession(user) } searchData={searchData} />
        <main>
          <Products searchResults={searchResults} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation searchData={searchData} />
      <main>
        <Products searchResults={searchResults} />
      </main>
      <Footer />
    </>
  );
}