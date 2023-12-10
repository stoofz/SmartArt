import ViewOrders from 'components/Admin/ViewOrders';
import { isAdmin } from 'utils/session';
import DeniedAccess from 'components/Admin/Denied';
import AdminLayout from 'components/Admin/AdminLayout';
import Container from '@mui/material/Container';

const OrdersPage = () => {
  if (isAdmin()) {
    return (
      <AdminLayout>
        <Container maxWidth="sm" style={{ color: "#000000", minHeight: "560px", marginTop: '2em' }}>
          <ViewOrders />
        </Container>
      </AdminLayout>
    );
  }
  else {
    return (
      <DeniedAccess />
    );
  }
};
export default OrdersPage;
