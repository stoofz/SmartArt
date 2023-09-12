import '@/styles/globals.css'
import '../styles/tailwind.css'

import { SearchState } from 'utils/search';
import { WishlistProvider } from 'utils/wishlistContext';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {

  return (
    <SearchState>
      <UserProvider>
        <WishlistProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </WishlistProvider> 
      </UserProvider>
    </SearchState>
  ) 
}
