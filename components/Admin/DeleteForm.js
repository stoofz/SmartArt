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
  
<div style={{ height: 'auto', maxHeight:'36em', overflowY: 'auto', padding: '1.25em' }}>
  <table className="w-full">
    <thead>
      <tr className="bg-gray-300">
      </tr>
    </thead>
    <tbody>
      {items.map((item, index) => (
        <tr
          key={item.id}
          className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
        >
          <td className="border p-2">{item.name}</td>
          <td className="border p-2 text-center">
            <button
              onClick={() => deleteItem(item.id)} variant="contained" style={{
                backgroundColor: '#fae4e2',
                padding: '10px',
                borderRadius: '5px',
                color: '#32434E',
              }}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default DeleteForm;
