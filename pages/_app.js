import '@/styles/globals.css'
import '../styles/tailwind.css'

import { SearchState } from 'utils/search';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {

  return (
    <SearchState>
      <UserProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </UserProvider>
    </SearchState>
  ) 
}
