import { useState } from 'react';

// Allowed extensions for input file
const allowedExtensions = ['csv'];

function FileParser ({ setError, setFile }) {
  // This function will be called when the file input changes
  const handleFileChange = e => {
    setError('');

    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];

      // Check the file extensions, if it not included in the allowed extensions we show the error
      const fileExtension = inputFile?.type.split('/')[1];
      if (!allowedExtensions.includes(fileExtension)) {
        return setError('Please input a csv file');
      }

      // If input type is correct set the state console.log('inputFile', inputFile);
      setFile(inputFile);
    }
  };

  return (
    <>
      <label htmlFor='csvInput' style={{ display: 'block' }}>
        Enter CSV File
      </label>
      <input
        onChange={handleFileChange}
        id='csvInput'
        name='file'
        type='file'
      />
    </>
  );
}

export default FileParser;
