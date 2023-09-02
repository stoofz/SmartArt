import Link from 'next/link';

const AdminDash = () => {
  return (
    <main>
      <h1>Admin Dashboard</h1>
      <div>
        <Link href="/admin/products">Products</Link>
      </div>
      <div>
        <Link href="/admin/orders">Orders</Link>
      </div>
    </main>
  );
};

export default AdminDash;