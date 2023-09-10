import ViewOrders from 'components/Admin/ViewOrders';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Navigation from 'components/Admin/Navigation';
import Footer from 'components/Admin/Footer';

const OrdersPage = () => {
  if (isAdmin()) {
    return (
      <>
        <Navigation />
          <main>
            <div>
              <ViewOrders />
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

  
}
export default OrdersPage
