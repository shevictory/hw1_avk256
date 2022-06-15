import React from 'react';

function DropList ({ name, optionsList, value, setValue }) {
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <label>
      <p>{name}:</p>
      <select onChange={handleChange} value={value}>
        {optionsList.map(column => (
          <option key={column}>{column}</option>
        ))}
      </select>
    </label>
  );
}
export default DropList;
