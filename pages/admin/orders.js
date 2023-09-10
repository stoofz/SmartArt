import ViewOrders from 'components/Admin/ViewOrders';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';
import Sidebar from 'components/Admin/Sidebar';

const OrdersPage = () => {
  if (isAdmin()) {
    return (
      <>
        <Navigation />
        <div className="flex">
            <Sidebar />
          <main>
            <div>
              <ViewOrders />
            </div>
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

}
export default OrdersPage
