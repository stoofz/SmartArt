import React, { useEffect, useState } from 'react';

function DeleteForm({  onSuccess, apiEndpoint, apiListEndpoint, itemName }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(apiListEndpoint);
        if (response.ok) {
          setItems(await response.json());
        }
      } catch (error) {
        console.error('Error', error);
      }
    };
    getData();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const response = await fetch(`${apiEndpoint}${itemId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        onSuccess();
      } else {
        console.error('Failed', itemName);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div>
      <h1>{itemName}</h1>
      <div style={{ height: '600px', overflowY: 'auto' }}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
}

export default DeleteForm;
