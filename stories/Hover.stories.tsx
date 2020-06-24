import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

const useStyles = makeStyles(theme => ({
  hoveredRow: {
    '&:hover': {
      background: theme.palette.grey[200],
    },
  },
}));

export default {
  title: 'Hover',
};

const personData = createPersonData(5);
const dessertData = createDessertData();

export const RowPropsClassname = () => {
  const classes = useStyles();
  return (
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
      rowProps={{
        className: classes.hoveredRow,
      }}
      includeHeaders={true}
      style={{ backgroundColor: 'white' }}
    />
  );
};
RowPropsClassname.story = {
  name: 'row (rowProps class)',
};

export const RowIsCellHovered = () => (
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
    isCellHovered={({ rowData, hoveredRowData }) =>
      rowData?.id === hoveredRowData.id
    }
    includeHeaders={true}
    style={{ backgroundColor: 'white' }}
  />
);
RowIsCellHovered.story = {
  name: 'row (isCellHovered)',
};

export const ColumnIsCellHovered = () => (
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
    isCellHovered={({ column, hoveredColumn }) =>
      column.name === hoveredColumn.name
    }
    includeHeaders={true}
    style={{ backgroundColor: 'white' }}
  />
);
ColumnIsCellHovered.story = {
  name: 'column (isCellHovered)',
};

export const RowAndColumnIsCellHovered = () => (
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
    isCellHovered={({ column, rowData, hoveredColumn, hoveredRowData }) =>
      rowData?.id === hoveredRowData.id || column.name === hoveredColumn.name
    }
    includeHeaders={true}
    style={{ backgroundColor: 'white' }}
  />
);
RowAndColumnIsCellHovered.story = {
  name: 'row and column (isCellHovered)',
};
