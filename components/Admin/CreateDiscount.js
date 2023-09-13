import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';

const CreateDiscountForm = ({ onSuccess } ) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch('/api/listProducts');
        if (response.ok) {
          setProducts(await response.json());
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ product_id: '', discount: '', start_date: '', end_date: '', description: ''}}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch('/api/createDiscount', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            if (response.ok) {
              onSuccess();
            } else {
              alert('Error');
            }
          } catch (error) {
            console.error('Error', error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
      <div className="mb-4">
        <label htmlFor="product_id" className="block text-gray-700">Product:</label>
        <Field as="select" name="product_id" className="block w-full p-2 border border-gray-300 rounded">
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </Field>
      </div>

      <div className="mb-4">
        <label htmlFor="discount" className="block text-gray-700">Percentage Off:</label>
        <Field type="number" name="discount" className="block w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="mb-4">
        <label htmlFor="start_date" className="block text-gray-700">Start Date:</label>
        <Field type="date" name="start_date" className="block w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="mb-4">
        <label htmlFor="end_date" className="block text-gray-700">End Date:</label>
        <Field type="date" name="end_date" className="block w-full p-2 border border-gray-300 rounded" />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">Description:</label>
        <Field type="text" name="description" className="block w-full p-2 border border-gray-300 rounded" />
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}
        style={{
          backgroundColor: '#fae4e2',
          padding: '10px',
          borderRadius: '5px',
          color: '#32434E',
        }}
        >
          Submit
        </button>
      </div>



          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateDiscountForm;