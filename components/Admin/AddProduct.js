import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';

const AddProductForm = ({ onSuccess } ) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/listCategories');
        if (response.ok) {
          setCategories(await response.json());
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ category_id: '', name: '', price: '', description: '', stock: '', artist:'', country:'', dimensions:'', image: null,  }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const formData = new FormData();
            formData.append('category_id', values.category_id);
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('stock', values.stock);
            formData.append('image', values.image);
            formData.append('artist', values.artist);
            formData.append('country', values.country);
            formData.append('dimensions', values.dimensions);

            const response = await fetch('/api/addProduct', {
              method: 'POST',
              body: formData,
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
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="category_id" className="block text-gray-700">Category:</label>
              <Field as="select" name="category_id" className="block w-full p-2 border border-gray-300 rounded">
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <Field type="text" name="name" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="artist" className="block text-gray-700">Artist:</label>
              <Field type="text" name="artist" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block text-gray-700">Country:</label>
              <Field type="text" name="country" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700">Price:</label>
              <Field type="text" name="price" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description:</label>
              <Field type="text" name="description" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="stock" className="block text-gray-700">Stock:</label>
              <Field type="text" name="stock" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="dimensions" className="block text-gray-700">Dimensions:</label>
              <Field type="text" name="dimensions" className="block w-full p-2 border border-gray-300 rounded" />
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700">Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])}
                className="block w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
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

export default AddProductForm;