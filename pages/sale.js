import Layout from '../components/Layout';

const SalesPage = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4 md:text-4xl lg:text-5xl px-8">No Sales Currently</h1>
        <p className="text-md mb-8 md:text-xl lg:text-2xl pb-16 md:pb-24 lg:pb-28 px-8">
          Check back later for amazing deals!
        </p>
      </div>
    </Layout>
  );
};

export default SalesPage;