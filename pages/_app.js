import '@/styles/globals.css'
import '../styles/tailwind.css'

import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return(
    <UserProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </UserProvider>
  ) 
}
