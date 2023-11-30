import { useUser } from '@auth0/nextjs-auth0/client';

import { setSession, clearSession } from 'utils/session';

import Footer from '../components/Footer';
import Products from '../components/Products';
import Navigation from '../components/Navigation';

import MyCarousel from '@/components/MyCarousel';
import { StyledEngineProvider } from '@mui/material/styles';

import { css } from '@emotion/react';
import { MoonLoader } from 'react-spinners';


export default function Index() {
  const { user, error, isLoading } = useUser();


  //LOADER STYLE
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col ">
        <MoonLoader color={'#1E2E2D'} loading={isLoading} css={override} size={50} />
        <div>Loading...</div>
      </div>
    );
  }
  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
      <>
        <Navigation sessionId={ setSession(user) }/>
        <main>
          <StyledEngineProvider injectFirst>
            <MyCarousel />
          </StyledEngineProvider>
       
          <Products />
        </main>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      <Navigation  />
      <main>
      <StyledEngineProvider injectFirst>
            <MyCarousel />
          </StyledEngineProvider>

        <Products />
      </main>
      <Footer />
    </>
  );
}