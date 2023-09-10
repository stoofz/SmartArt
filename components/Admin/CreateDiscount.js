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
      <h1>Create Discount</h1>
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
            <div>
              <Field as="select" name="product_id">
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="discount">Percentage Off: </label>
              <Field type="int" name="discount" />
            </div>

            <div>
              <label htmlFor="start_date">Start Date: </label>
              <Field type="date" name="start_date" />
            </div>

            <div>
              <label htmlFor="end_date">End Date: </label>
              <Field type="date" name="end_date" />
            </div>

            <div>
              <label htmlFor="description">Description: </label>
              <Field type="text" name="description" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
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