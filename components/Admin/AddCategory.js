import { Formik, Form, Field } from 'formik';

const AddCategoryForm = ({ onSuccess } ) => {

  return (
    <div>
  
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
    
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <Field type="text" name="name" className="block w-full p-2 border border-gray-300 rounded" disabled={isSubmitting} />
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

export default AddCategoryForm;