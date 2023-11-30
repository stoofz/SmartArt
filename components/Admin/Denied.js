import { useRouter } from 'next/router';
import Link from 'next/link';

const DeniedAccess = () => {
  const router = useRouter();

  const handleReturnHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">Sorry, you do not have access to this page.</p>
      <button
        onClick={handleReturnHome}
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark focus:outline-none"
      >
        Return to Main Page
      </button>
    </div>
  );
};

export default DeniedAccess;