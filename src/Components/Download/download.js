import React from 'react';
import downloadCSV from './csv';
import { useDispatch, useSelector } from 'react-redux';

const MyComponent = () => {
//   const dataToDownload = [
//     { name: 'John', age: 25, city: 'New York' },
//     { name: 'Alice', age: 30, city: 'San Francisco' },
//     // ... more data
//   ];
 let dispatch = useDispatch();
  const dataToDownload = useSelector((state)=>state.listdata.listitems);

  const handleDownloadCSV = () => {
    downloadCSV(dataToDownload, 'myData.csv');
  };

  return (
    <div>
      {/* Your component content */}
      <button onClick={handleDownloadCSV}>Download CSV</button>
    </div>
  );
};

export default MyComponent;
