import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { useUser } from '@auth0/nextjs-auth0/client';
import { setSession, clearSession } from 'utils/session';


const Layout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div  >
          <Navigation sessionId={setSession(user)} />
        </div>
      
        {children}
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