import React, { useState } from 'react';
import ReactTable from 'react-table-v6';
import Select from 'react-select';

const TableComponent = () => {
  const [data, setData] = useState(makeData());
  const [filtered, setFiltered] = useState([]);
  const [select2, setSelect2] = useState(undefined);

  const onFilteredChangeCustom = (value, accessor) => {
    let updatedFiltered = [...filtered];
    let insertNewFilter = true;

    if (updatedFiltered.length) {
      updatedFiltered.forEach((filter, i) => {
        if (filter["id"] === accessor) {
          if (value === "" || !value.length) {
            updatedFiltered.splice(i, 1);
          } else {
            filter["value"] = value;
          }
          insertNewFilter = false;
        }
      });
    }

    if (insertNewFilter) {
      updatedFiltered.push({ id: accessor, value: value });
    }

    setFiltered(updatedFiltered);
  };

  return (
    <div>
      <pre>{JSON.stringify(filtered)}</pre>
      <br />
      <br />
      Extern Select2 :{' '}
      <Select
        style={{ width: '50%', marginBottom: '20px' }}
        onChange={(entry) => {
          setSelect2(entry);
          onFilteredChangeCustom(
            entry.map((o) => {
              return o.value;
            }),
            'firstName'
          );
        }}
        value={select2}
        isMulti={true}
        options={data.map((o, i) => {
          return { id: i, value: o.firstName, label: o.firstName };
        })}
      />
      <ReactTable
        data={data}
        filterable
        filtered={filtered}
        onFilteredChange={(filtered, column, value) => {
          onFilteredChangeCustom(value, column.id || column.accessor);
        }}
        defaultFilterMethod={(filter, row, column) => {
          const id = filter.pivotId || filter.id;
          if (typeof filter.value === 'object') {
            return row[id] !== undefined
              ? filter.value.indexOf(row[id]) > -1
              : true;
          } else {
            return row[id] !== undefined
              ? String(row[id]).indexOf(filter.value) > -1
              : true;
          }
        }}
        columns={[
          {
            Header: 'Name',
            columns: [
              {
                Header: 'First Name',
                accessor: 'firstName',
              },
              {
                Header: 'Last Name',
                id: 'lastName',
                accessor: (d) => d.lastName,
              },
            ],
          },
          {
            Header: 'Info',
            columns: [
              {
                Header: 'Age',
                accessor: 'age',
              },
              {
                Header: 'Over 21',
                accessor: 'age',
                id: 'over',
                Cell: ({ value }) => (value >= 21 ? 'Yes' : 'No'),
              },
            ],
          },
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
};

export default TableComponent;

function makeData() {
  // Dummy data generation function
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      firstName: 'First Name ' + i,
      lastName: 'Last Name ' + i,
      age: Math.floor(Math.random() * 50) + 20,
    });
  }
  return data;
}
