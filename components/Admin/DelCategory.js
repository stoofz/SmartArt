import { useEffect, useState } from 'react';

function DelCategoryForm() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/listCategories');
        if (response.ok) {
          setCategory(await response.json());

        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getCategories();
  }, []);

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/delCategory?CategoryId=${categoryId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setCategory((prevCategorys) => prevCategorys.filter((category) => category.id !== categoryId));
      } else {

        console.error('Failed');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            {category.name} - <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DelCategoryForm;