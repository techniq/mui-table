import React, { useState } from 'react';

import Box from '@material-ui/core/Box';

import MuiTable, { ColumnDef } from '../src';
import { createPersonData } from './data';

export default {
  title: 'Performance',
};

const personData = createPersonData(1000);

export const Basic = () => {
  const [count, setCount] = useState(0);

  const columns = React.useMemo<ColumnDef[]>(
    () => [
      {
        name: 'firstName',
        header: 'First Name',
      },
      {
        name: 'lastName',
        header: 'Last Name',
      },
      {
        name: 'age',
        header: 'Age',
      },
      {
        name: 'jobTitle',
        header: 'Job Title',
      },
      {
        name: 'jobArea',
        header: 'Job Area',
      },
      {
        name: 'jobType',
        header: 'Job Type',
      },
    ],

    []
  );

  const style = React.useMemo(() => ({ backgroundColor: 'white' }), []);

  return (
    <div>
      <div>
        <button onClick={() => setCount(count => count - 1)}>-</button>
        <Box display="inline" mx={2}>
          {count}
        </Box>
        <button onClick={() => setCount(count => count + 1)}>+</button>
      </div>
      <MuiTable
        data={personData}
        columns={columns}
        style={style}
        includeHeaders
      />
    </div>
  );
};
