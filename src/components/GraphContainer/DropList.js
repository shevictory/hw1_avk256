import React from 'react';
// import CONSTANTS from '../../constants';

// const { GRAPH_PARAMS: data } = CONSTANTS;

function DropList ({ name, optionsList, value, setValue }) {
  //   value: props.data[0],
  //   columns: props.data,
  // };

  const handleChange = event => {
    setValue(event.target.value);
  };

  // const handleSubmit = event => {
  //   // if (name === 'X-Axis type') {
  //     // data.xName = this.state.value;
  //   //   setXName(this.state.value);
  //   // }
  //   setValue(value);
  //   event.preventDefault();
  // };

  return (
    // <form onSubmit={handleSubmit}>
    <label>
      <p>{name}:</p>
      <select onChange={handleChange} value={value}>
        {optionsList.map(column => (
          <option key={column}>{column}</option>
        ))}
      </select>
    </label>
    // {/* <button type='submit'>Submit</button> */}
    // </form>
  );
}
export default DropList;
