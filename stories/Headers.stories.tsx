import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { blue, orange, purple } from '@material-ui/core/colors';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

const useStyles = makeStyles(theme => ({
  stickyHeader: {
    position: 'sticky',
    top: 0,
  },
  stickyColumn: {
    position: 'sticky',
    left: 0,
  },
}));

const personData = createPersonData(5);
const personData100 = createPersonData(100);
const dessertData = createDessertData();

export default {
  title: 'Headers',
  // component: MuiTable,
};

export const IncludeHeaders = () => (
  <MuiTable
    data={personData}
    columns={[{ name: 'firstName' }, { name: 'lastName' }]}
    includeHeaders={true}
    style={{ backgroundColor: 'white' }}
  />
);

export const CustomHeaders = () => (
  <MuiTable
    data={personData}
    columns={[
      { name: 'firstName', header: 'First Name' },
      { name: 'lastName', header: 'Last Name' },
    ]}
    includeHeaders={true}
    style={{ backgroundColor: 'white' }}
  />
);

export const GroupedHeaders = () => (
  <MuiTable
    data={personData}
    columns={[
      {
        name: 'Name',
        headerCellProps: {
          style: {
            textAlign: 'center',
            border: 0,
            background: blue[500],
          },
        },
        columns: [
          {
            name: 'firstName',
            header: 'First Name',
            headerCellProps: {
              style: {
                background: blue[400],
              },
            },
          },
          {
            name: 'lastName',
            header: 'Last Name',
            headerCellProps: {
              style: {
                background: blue[400],
              },
            },
          },
        ],
      },
      {
        name: 'age',
        header: 'Age',
        headerCellProps: {
          style: {
            background: orange[500],
          },
        },
      },
      {
        name: 'Job',
        headerCellProps: {
          style: { textAlign: 'center', border: 0, background: purple[500] },
        },
        columns: [
          {
            name: 'jobTitle',
            header: 'Title',
            headerCellProps: {
              style: {
                background: purple[400],
              },
            },
          },
          {
            name: 'jobArea',
            header: 'Area',
            headerCellProps: {
              style: {
                background: purple[400],
              },
            },
          },
        ],
      },
    ]}
    includeHeaders={true}
    headerRowProps={{ style: { height: 24 } }}
    headerCellProps={{ style: { border: 0, background: '#eee' } }}
    cellProps={{ style: { padding: '4px 24px', lineHeight: 'normal' } }}
    style={{ backgroundColor: 'white' }}
  />
);

export const CompositeCells = () => (
  <MuiTable
    data={personData100}
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
    style={{ backgroundColor: 'white' }}
  />
);

export const StickyHeaderRow = () => {
  const classes = useStyles();
  return (
    <MuiTable
      data={personData100}
      columns={[
        { name: 'firstName', header: 'First Name' },
        { name: 'lastName', header: 'Last Name' },
        { name: 'jobTitle', header: 'Job Title' },
        { name: 'jobArea', header: 'Job Area' },
      ]}
      includeHeaders={true}
      headerCellProps={{
        className: classes.stickyHeader,
        style: { background: '#eee' },
      }}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export const StickyHeaderColumn = () => {
  const classes = useStyles();
  return (
    <MuiTable
      data={personData100}
      columns={[
        {
          name: 'fullName',
          header: 'Name',
          cell: d => `${d.firstName} ${d.lastName}`,
          cellProps: { style: { width: 200 } },
        },
        {
          name: 'jobTitle',
          header: 'Job Title',
          cellProps: { style: { width: 400 } },
        },
        {
          name: 'jobArea',
          header: 'Job Area',
          cellProps: { style: { width: 400 } },
        },
        {
          name: 'jobType',
          header: 'Job Type',
          cellProps: { style: { width: 400 } },
        },
      ]}
      includeHeaders={true}
      cellProps={({ column }) => {
        if (column.name === 'fullName') {
          return {
            className: classes.stickyColumn,
            style: { background: '#eee' },
          };
        }
      }}
      style={{ tableLayout: 'fixed', backgroundColor: 'white' }}
    />
  );
};

export const StickyHeaderRowAndColumn = () => {
  const classes = useStyles();
  return (
    <MuiTable
      data={personData100}
      columns={[
        {
          name: 'fullName',
          header: 'Name',
          cell: d => `${d.firstName} ${d.lastName}`,
          cellProps: { style: { width: 200 } },
        },
        {
          name: 'jobTitle',
          header: 'Job Title',
          cellProps: { style: { width: 400 } },
        },
        {
          name: 'jobArea',
          header: 'Job Area',
          cellProps: { style: { width: 400 } },
        },
        {
          name: 'jobType',
          header: 'Job Type',
          cellProps: { style: { width: 400 } },
        },
      ]}
      includeHeaders={true}
      headerCellProps={({ column }) => {
        return {
          className: `${classes.stickyHeader} ${classes.stickyColumn}`,
          style: {
            background: '#eee',
            zIndex: column.name === 'fullName' ? 1 : undefined, // corner
          },
        };
      }}
      cellProps={({ column }) => {
        if (column.name === 'fullName') {
          return {
            className: classes.stickyColumn,
            style: { background: '#eee' },
          };
        }
      }}
      style={{ tableLayout: 'fixed', backgroundColor: 'white' }}
    />
  );
};
