import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-1/6 bg-gray-200 p-4">
      <ul>
        <li>
          <Link href="/admin/products" className="text-black-500 hover:underline">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="text-black-500 hover:underline">
            Orders
          </Link>
        </li>
      </ul>
    </aside>
  );
};