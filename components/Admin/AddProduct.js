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
      <h1>Add Product</h1>
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
            <div>
              <Field as="select" name="category_id">
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" />
            </div>

            <div>
              <label htmlFor="artist">Artist:</label>
              <Field type="text" name="artist" />
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <Field type="text" name="country" />
            </div>

            <div>
              <label htmlFor="price">Price:</label>
              <Field type="text" name="price" />
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <Field type="text" name="description" />
            </div>

            <div>
              <label htmlFor="stock">Stock:</label>
              <Field type="text" name="stock" />
            </div>

            <div>
              <label htmlFor="dimensions">Dimensions:</label>
              <Field type="text" name="dimensions" />
            </div>

            <div>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(event) => setFieldValue('image', event.currentTarget.files[0])
                }
              />
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

export default AddProductForm;