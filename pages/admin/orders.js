import ViewOrders from 'components/Admin/ViewOrders';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import Layout from 'components/Admin/Layout';
import Container from '@mui/material/Container';

const OrdersPage = () => {
  if (isAdmin()) {
    return (
        <Layout>
          <>
            <Container maxWidth="sm" style={{ color: "#000000", minHeight: "560px", marginTop: '2em' }}>
              <ViewOrders />
            </Container>
          </>   
        </Layout>
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
