import Papa from 'papaparse';

const convertToCSV = (data) => {
  const csv = Papa.unparse(data);
  return csv;
};

const downloadCSV = (data, fileName) => {
  const csv = convertToCSV(data);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    // Other browsers
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }
};

export default downloadCSV;