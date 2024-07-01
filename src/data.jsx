import React, { useState } from "react";

const GetData = () => {
  const [data, setData] = useState({
    obekt: '',
    materials: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/data', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from the server:", result);
      
      alert('Data inserted successfully');
      setData({ obekt: '', materials: '' });
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="obekt">Obekt</label>
      <input 
        type="text" 
        id="obekt" 
        value={data.obekt} 
        onChange={e => setData({ ...data, obekt: e.target.value })} 
      />
      
      <label htmlFor="materials">Materials</label>
      <input 
        type="text" 
        id="materials" 
        value={data.materials} 
        onChange={e => setData({ ...data, materials: e.target.value })} 
      />
      
      <button type="submit">Submit</button>
    </form>
  )
}

export default GetData;
