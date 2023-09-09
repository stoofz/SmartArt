import Link from 'next/link';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';

const AdminDash = () => {

  if (isAdmin()) {

    return (
      <>
        <Navigation />
        <main>
          <h1>Admin Dashboard</h1>
          <div>
            <Link href="/admin/products">Products</Link>
          </div>
          <div>
            <Link href="/admin/orders">Orders</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  else
  {
    return (
       <DeniedAccess />
    );
  }

};

export default AdminDash;