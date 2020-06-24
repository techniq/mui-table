import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import MuiTable, { MuiTableProps } from '../src';
import { createPersonData, createDessertData } from './data';

const personData = createPersonData(13);
const dessertData = createDessertData();

export default {
  title: 'Pagination',
  // component: MuiTable,
};

export const Basic = () => (
  <PaginatedTable
    data={personData}
    columns={[
      {
        name: 'fullName',
        header: 'Name',
        cell: d => `${d.firstName} ${d.lastName}`,
      },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ]}
    includeHeaders={true}
    containerProps={{ style: { backgroundColor: 'white' } }}
  />
);

export const AddPlaceholderRows = () => (
  <PaginatedTable
    data={personData}
    columns={[
      {
        name: 'fullName',
        header: 'Name',
        cell: d => `${d.firstName} ${d.lastName}`,
      },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ]}
    addPlaceholderRows
    includeHeaders={true}
    containerProps={{ style: { backgroundColor: 'white' } }}
  />
);

export const AddPlaceholderRowsWithCellStyles = () => (
  <PaginatedTable
    data={personData}
    columns={[
      {
        name: 'fullName',
        header: 'Name',
        cell: d => `${d.firstName} ${d.lastName}`,
      },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ]}
    addPlaceholderRows
    includeHeaders
    cellProps={{
      style: {
        padding: 4,
      },
    }}
    containerProps={{ style: { backgroundColor: 'white' } }}
  />
);

export const AddPlaceholderRowsWithEmptyData = () => (
  <PaginatedTable
    data={null}
    columns={[{ name: 'firstName' }, { name: 'lastName' }]}
    addPlaceholderRows
    includeHeaders
    containerProps={{ style: { backgroundColor: 'white' } }}
  />
);

export const Overflow = () => (
  <PaginatedTable
    data={personData}
    columns={[
      {
        name: 'fullName',
        header: 'Name',
        cell: d => `${d.firstName} ${d.lastName}`,
      },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ]}
    includeHeaders={true}
    style={{ minWidth: '150vw' }}
    tableWrapperProps={{ style: { overflowX: 'auto' } }}
    containerProps={{ style: { backgroundColor: 'white' } }}
  />
);

function PaginatedTable(props: MuiTableProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const { data, ...tableProps } = props;

  const start = perPage * (page - 1);
  const pageData = data && data.slice(start, start + perPage);

  return (
    <MuiTable
      data={pageData}
      pagination={{
        count: data ? data.length : 0,
        rowsPerPage: perPage,
        page: page - 1, // material-ui's <TablePagination /> is 0-based
        // rowsPerPageOptions: [5, 10, 25, 100, 1000],
        onChangePage: (e, page) => setPage(page + 1),
        onChangeRowsPerPage: e => setPerPage(+e.target.value),
      }}
      {...tableProps}
    />
  );
}
