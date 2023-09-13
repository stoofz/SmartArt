import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import { useUser } from '@auth0/nextjs-auth0/client';
import { setSession } from 'utils/session';
import Sidebar from 'components/Admin/Sidebar';

import { useRouter } from 'next/router';
import { isAdmin } from '@/utils/session';


const Layout = ({ children }) => {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const isAdminPage = router.pathname.startsWith('/admin');


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {

    //setSession(user);

    return (
<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
  <div>
          <Navigation sessionId={setSession(user)} />
        </div>
        <div style={{flex: 1,  display: "flex", flexDirection: "row", backgroundColor: "#F5C9C6" }}>
          {isAdminPage} 
            <div>
            <Sidebar />
          </div>           
          <div style={{ width: "1000px"}}>
            {children}
          </div>
          </div>
          
        <Footer />
      </div >
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