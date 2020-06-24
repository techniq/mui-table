import React from 'react';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

export default {
  title: 'Basic',
  // component: MuiTable,
};

const personData = createPersonData(5);
const dessertData = createDessertData();

export const Simple = () => (
  <MuiTable
    data={personData}
    columns={[{ name: 'firstName' }, { name: 'lastName' }]}
    style={{ backgroundColor: 'white' }}
  />
);

export const FixedWidth = () => (
  <MuiTable
    data={personData}
    columns={[{ name: 'firstName' }, { name: 'lastName' }]}
    style={{ width: 300, backgroundColor: 'white' }}
  />
);

export const RowHeight = () => (
  <MuiTable
    data={dessertData}
    columns={[
      {
        name: 'name',
        header: 'Dessert (100g serving)',
        cellProps: { style: { paddingRight: 0 } },
      },
      {
        name: 'calories',
        header: 'Calories',
        cellProps: { align: 'right' },
      },
      {
        name: 'fat',
        header: 'Fat (g)',
        cellProps: { align: 'right' },
      },
      {
        name: 'carbs',
        header: 'Carbs (g)',
        cellProps: { align: 'right' },
      },
      {
        name: 'protein',
        header: 'Protein (g)',
        cellProps: { align: 'right' },
      },
    ]}
    includeHeaders={true}
    cellProps={{
      style: { paddingTop: 4, paddingBottom: 4, lineHeight: 'normal' },
    }}
    style={{ backgroundColor: 'white' }}
  />
);

export const DefaultCellProps = () => (
  <MuiTable
    data={dessertData}
    columns={[
      {
        name: 'name',
        header: 'Dessert (100g serving)',
        cellProps: { style: { paddingRight: 0 } },
      },
      {
        name: 'calories',
        header: 'Calories',
        cellProps: { align: 'right' },
      },
      { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
      { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
      {
        name: 'protein',
        header: 'Protein (g)',
        cellProps: { align: 'right' },
      },
    ]}
    includeHeaders={true}
    cellProps={{ padding: 'none' }}
    style={{ backgroundColor: 'white' }}
  />
);

export const CellPropsAsFunction = () => (
  <MuiTable
    data={dessertData}
    columns={[
      {
        name: 'name',
        header: 'Dessert (100g serving)',
        cellProps: { style: { paddingRight: 0 } },
      },
      {
        name: 'calories',
        header: 'Calories',
        cellProps: { align: 'right' },
      },
      { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
      { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
      {
        name: 'protein',
        header: 'Protein (g)',
        cellProps: { align: 'right' },
      },
    ]}
    includeHeaders={true}
    cellProps={({ column, rowData }) =>
      column.name === 'fat' && rowData && rowData[column.name] > 10
        ? { style: { backgroundColor: 'rgba(255,0,0,.5)', color: 'white' } }
        : {}
    }
    style={{ backgroundColor: 'white' }}
  />
);

export const TextOverflow = () => (
  <MuiTable
    data={personData}
    columns={[
      {
        name: 'fullName',
        header: 'Name',
        cell: d => `${d.firstName} ${d.lastName}`,
      },
      {
        name: 'jobTitle',
        header: 'Job Title',
        cellProps: { style: { width: 100 } },
      },
      {
        name: 'jobArea',
        header: 'Job Area',
        cellProps: { style: { width: 100 } },
      },
    ]}
    includeHeaders={true}
    cellProps={{
      style: {
        paddingRight: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    }}
    style={{
      width: 400,
      tableLayout: 'fixed',
      backgroundColor: 'white',
    }}
  />
);

export const ClickableHeadersAndCells = () => (
  <MuiTable
    data={personData}
    columns={[
      { name: 'firstName', header: 'First Name' },
      {
        name: 'lastName',
        header: 'Last Name (disabled)',
        onHeaderClick: false,
      },
      {
        name: 'jobTitle',
        header: 'Job Title (custom)',
        onHeaderClick: () => {
          alert('Job Title header clicked');
        },
      },
    ]}
    includeHeaders={true}
    onHeaderClick={({ column }) => alert(`Clicked '${column.name}' header`)}
    onCellClick={({ column, rowData }) =>
      alert(
        `Clicked cell in column '${column.name}' containing '${
          rowData[column.name]
        }'`
      )
    }
    style={{ backgroundColor: 'white' }}
  />
);
