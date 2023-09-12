import { useUser } from '@auth0/nextjs-auth0/client';

import { setSession, clearSession } from 'utils/session';

import Footer from '../../components/Footer';
import Products from '../../components/Products';
import Navigation from '../../components/Navigation';

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
      <>
        <Navigation sessionId={setSession(user)} />
        <main>
          <Products />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main>
        <Products />
      </main>
      <Footer />
    </>
  );
}