import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import Sidebar from 'components/Admin/Sidebar';


const AdminDash = () => {

  if (isAdmin()) {

    return (
      <>
        <Navigation />
          <div className="flex">
            <Sidebar />
            <main className="w-3/4 p-4">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </main>
          </div>
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