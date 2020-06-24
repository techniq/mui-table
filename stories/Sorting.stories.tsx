import React, { useState } from 'react';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

export default {
  title: 'Sorting',
};

const dessertData = createDessertData();

export const Basic = () => {
  const [order, setOrder] = useState<{ by: string; direction: 'asc' | 'desc' }>(
    { by: 'name', direction: 'asc' }
  );
  return (
    <MuiTable
      data={dessertData.sort((a, b) => {
        if (a[order.by] < b[order.by]) {
          return order.direction === 'asc' ? -1 : 1;
        } else if (a[order.by] > b[order.by]) {
          return order.direction === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      })}
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
      onHeaderClick={({ column }) =>
        setOrder(prevState => {
          const orderBy =
            typeof column.orderBy === 'string' ? column.orderBy : column.name;
          if (prevState.by === orderBy) {
            return {
              by: prevState.by,
              direction: prevState.direction === 'asc' ? 'desc' : 'asc',
            };
          } else {
            return { by: orderBy, direction: 'asc' };
          }
        })
      }
      orderBy={order.by}
      orderDirection={order.direction}
      style={{ backgroundColor: 'white' }}
    />
  );
};
