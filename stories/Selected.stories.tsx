import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

export default {
  title: 'Selected',
};

const dessertData = createDessertData();

export const Basic = () => {
  const [selected, setSelected] = useState<number[]>([]);
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
      isCellSelected={({ rowData }) =>
        selected.some(id => rowData && rowData.id === id)
      }
      onCellClick={({ rowData }) => {
        setSelected(prevState => {
          if (prevState.some(id => rowData.id === id)) {
            // Remove item
            return prevState.filter(id => id !== rowData.id);
          } else {
            // Add item
            return [...prevState, rowData.id];
          }
        });
      }}
      includeHeaders={true}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export const WithHover = () => {
  const [selected, setSelected] = useState<number[]>([]);
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
      isCellHovered={({ rowData, hoveredRowData }) =>
        rowData?.id === hoveredRowData.id
      }
      isCellSelected={({ rowData }) =>
        selected.some(id => rowData && rowData.id === id)
      }
      onCellClick={({ rowData }) => {
        setSelected(prevState => {
          if (prevState.some(id => rowData.id === id)) {
            // Remove item
            return prevState.filter(id => id !== rowData.id);
          } else {
            // Add item
            return [...prevState, rowData.id];
          }
        });
      }}
      includeHeaders={true}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export const WithHoverAndCheckbox = () => {
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <MuiTable
      data={dessertData}
      columns={[
        {
          name: 'checkbox',
          header: (
            <Checkbox
              checked={selected.length > 0}
              onChange={e =>
                setSelected(prevState => {
                  if (prevState.length === dessertData.length) {
                    // Deselect All
                    return [];
                  } else {
                    // Select All
                    return dessertData.map(d => d.id);
                  }
                })
              }
              {...(selected.length > 0 &&
                selected.length !== dessertData.length && {
                  indeterminate: true,
                  color: 'default',
                })}
            />
          ),
          cell: rowData => (
            <Checkbox checked={selected.some(id => rowData.id === id)} />
          ),
          cellProps: { style: { padding: 0 } },
        },
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
      isCellHovered={({ rowData, hoveredRowData }) =>
        rowData?.id === hoveredRowData.id
      }
      isCellSelected={({ rowData }) =>
        selected.some(id => rowData && rowData.id === id)
      }
      onCellClick={({ rowData }) => {
        setSelected(prevState => {
          if (prevState.some(id => rowData.id === id)) {
            // Remove item
            return prevState.filter(id => id !== rowData.id);
          } else {
            // Add item
            return [...prevState, rowData.id];
          }
        });
      }}
      includeHeaders={true}
      style={{ backgroundColor: 'white' }}
    />
  );
};
