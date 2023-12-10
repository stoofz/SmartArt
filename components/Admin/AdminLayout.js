import Sidebar from 'components/Admin/Sidebar';
import { useRouter } from 'next/router';
import { isAdmin } from '@/utils/session';
import { useSearchState } from '@/utils/search';

import Products from 'components/Products';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');
  const { searchResults, setSearchResults } = useSearchState();
  return (
    <>
      {searchResults.length !== 0 ? (
        <Products />
      ) : (
        <div style={{ flex: 1, display: "flex", flexDirection: "row", backgroundColor: "#eaeded" }}>
          {isAdminPage}
          <Sidebar />
          <div style={{ width: "1000px" }}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayout;