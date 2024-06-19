import React, { useState } from 'react';
import Papa from 'papaparse';
import { CSVLink } from 'react-csv';
import {
  Button
} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Index = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setHeaders(Object.keys(result.data[0]));
        setData(result.data);
      },
    });
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRemoveRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleCellChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CSV Upload, Edit, and Download</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />
      {data.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <input
                        type="text"
                        value={row[header] || ''}
                        onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                        className="w-full border p-1"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="outline" onClick={() => handleRemoveRow(rowIndex)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" onClick={handleAddRow} className="mt-4">
            Add Row
          </Button>
          <CSVLink data={data} headers={headers} filename="edited_data.csv" className="mt-4 inline-block">
            <Button variant="outline">Download CSV</Button>
          </CSVLink>
        </>
      )}
    </div>
  );
};

export default Index;