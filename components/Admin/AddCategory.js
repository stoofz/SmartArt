import { Formik, Form, Field } from 'formik';

const AddCategoryForm = ({ onSuccess } ) => {

  return (
    <div>
      <h1>Add Category</h1>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await fetch('/api/addCategory', {
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
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" disabled={isSubmitting} />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Add Category
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCategoryForm;