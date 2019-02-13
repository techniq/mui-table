import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Component from '@reactions/component';
import { css } from 'glamor';

import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, orange, purple } from '@material-ui/core/colors';

import MuiTable from '../src';
import { createPersonData, createDessertData } from './data';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const hoveredRowClass = css({
  ':hover': {
    background: theme.palette.grey[200]
  }
});

const selectedRowClass = css({
  background: theme.palette.grey[200]
});

const stickyHeaderClass = css({
  position: 'sticky',
  top: 0
});

const stickyColumnClass = css({
  position: 'sticky',
  left: 0
});

storiesOf('Basic', module)
  .add('default (empty)', () => (
    <MuiTable style={{ backgroundColor: 'white' }} />
  ))
  .add('simple', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('fixed width', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        style={{ width: 300, backgroundColor: 'white' }}
      />
    );
  })
  .add('row height', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          {
            name: 'fat',
            header: 'Fat (g)',
            cellProps: { align: 'right' }
          },
          {
            name: 'carbs',
            header: 'Carbs (g)',
            cellProps: { align: 'right' }
          },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        includeHeaders={true}
        rowProps={{ style: { height: 24 } }}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('default cellProps', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        includeHeaders={true}
        cellProps={{ padding: 'dense' }}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('cellProps as function', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
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
  })
  .add('text overflow', () => {
    const data = createPersonData(10);
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`
          },
          {
            name: 'jobTitle',
            header: 'Job Title',
            cellProps: { style: { width: 100 } }
          },
          {
            name: 'jobArea',
            header: 'Job Area',
            cellProps: { style: { width: 100 } }
          }
        ]}
        includeHeaders={true}
        cellProps={{
          style: {
            paddingRight: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }}
        style={{
          width: 400,
          tableLayout: 'fixed',
          backgroundColor: 'white'
        }}
      />
    );
  })
  .add('clickable headers and cells', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName', header: 'First Name' },
          {
            name: 'lastName',
            header: 'Last Name (disabled)',
            onHeaderClick: false
          },
          {
            name: 'jobTitle',
            header: 'Job Title (custom)',
            onHeaderClick: () => {
              alert('Job Title header clicked');
            }
          }
        ]}
        includeHeaders={true}
        onHeaderClick={({ column }) =>
          alert(`Clicked '${column.name}' header in column'`)
        }
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
  });

storiesOf('Headers', module)
  .add('include headers', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('custom headers', () => {
    const data = createPersonData(5);
    return (
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' }
        ]}
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('grouped headers', () => {
    const data = createPersonData(5);

    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'Name',
            headerCellProps: {
              style: {
                textAlign: 'center',
                border: 0,
                background: blue[500]
              }
            },
            columns: [
              {
                name: 'firstName',
                header: 'First Name',
                headerCellProps: {
                  style: {
                    background: blue[400]
                  }
                }
              },
              {
                name: 'lastName',
                header: 'Last Name',
                headerCellProps: {
                  style: {
                    background: blue[400]
                  }
                }
              }
            ]
          },
          {
            name: 'age',
            header: 'Age',
            headerCellProps: {
              style: {
                background: orange[500]
              }
            }
          },
          {
            name: 'Job',
            headerCellProps: {
              style: { textAlign: 'center', border: 0, background: purple[500] }
            },
            columns: [
              {
                name: 'jobTitle',
                header: 'Title',
                headerCellProps: {
                  style: {
                    background: purple[400]
                  }
                }
              },
              {
                name: 'jobArea',
                header: 'Area',
                headerCellProps: {
                  style: {
                    background: purple[400]
                  }
                }
              }
            ]
          }
        ]}
        includeHeaders={true}
        headerRowProps={{ style: { height: 24 } }}
        headerCellProps={{ style: { border: 0, background: '#eee' } }}
        cellProps={{ padding: 'dense' }}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('composite cells', () => {
    const data = createPersonData(100);
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`
          },
          { name: 'jobTitle', header: 'Job Title' },
          { name: 'jobArea', header: 'Job Area' }
        ]}
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('sticky header row', () => {
    const data = createPersonData(100);
    return (
      <MuiTable
        data={data}
        columns={[
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' },
          { name: 'jobTitle', header: 'Job Title' },
          { name: 'jobArea', header: 'Job Area' }
        ]}
        includeHeaders={true}
        headerCellProps={{
          className: stickyHeaderClass.toString(),
          style: { background: '#eee' }
        }}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('sticky header column', () => {
    const data = createPersonData(100);
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`,
            cellProps: { style: { width: 200 } }
          },
          {
            name: 'jobTitle',
            header: 'Job Title',
            cellProps: { style: { width: 400 } }
          },
          {
            name: 'jobArea',
            header: 'Job Area',
            cellProps: { style: { width: 400 } }
          },
          {
            name: 'jobType',
            header: 'Job Type',
            cellProps: { style: { width: 400 } }
          }
        ]}
        includeHeaders={true}
        cellProps={({ column }) => {
          if (column.name === 'fullName') {
            return {
              className: stickyColumnClass.toString(),
              style: { background: '#eee' }
            };
          }
        }}
        style={{ tableLayout: 'fixed', backgroundColor: 'white' }}
      />
    );
  })
  .add('sticky header row and column', () => {
    const data = createPersonData(100);
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`,
            cellProps: { style: { width: 200 } }
          },
          {
            name: 'jobTitle',
            header: 'Job Title',
            cellProps: { style: { width: 400 } }
          },
          {
            name: 'jobArea',
            header: 'Job Area',
            cellProps: { style: { width: 400 } }
          },
          {
            name: 'jobType',
            header: 'Job Type',
            cellProps: { style: { width: 400 } }
          }
        ]}
        includeHeaders={true}
        headerCellProps={({ column }) => {
          return {
            className: `${stickyHeaderClass} ${stickyColumnClass}`,
            style: {
              background: '#eee',
              zIndex: column.name === 'fullName' ? 1 : undefined // corner
            }
          };
        }}
        cellProps={({ column }) => {
          if (column.name === 'fullName') {
            return {
              className: stickyColumnClass.toString(),
              style: { background: '#eee' }
            };
          }
        }}
        style={{ tableLayout: 'fixed', backgroundColor: 'white' }}
      />
    );
  });

storiesOf('Pagination', module)
  .add('basic', () => {
    const data = createPersonData(13);
    return (
      <PaginatedTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`
          },
          { name: 'jobTitle', header: 'Job Title' },
          { name: 'jobArea', header: 'Job Area' }
        ]}
        includeHeaders={true}
        containerProps={{ style: { backgroundColor: 'white' } }}
      />
    );
  })
  .add('addPlaceholderRows', () => {
    const data = createPersonData(13);
    return (
      <PaginatedTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`
          },
          { name: 'jobTitle', header: 'Job Title' },
          { name: 'jobArea', header: 'Job Area' }
        ]}
        addPlaceholderRows
        includeHeaders={true}
        containerProps={{ style: { backgroundColor: 'white' } }}
      />
    );
  })
  .add('addPlaceholderRows and empty data', () => {
    return (
      <PaginatedTable
        data={null}
        columns={[{ name: 'firstName' }, { name: 'lastName' }]}
        addPlaceholderRows
        includeHeaders
        containerProps={{ style: { backgroundColor: 'white' } }}
      />
    );
  })
  .add('overflow', () => {
    const data = createPersonData(13);
    return (
      <PaginatedTable
        data={data}
        columns={[
          {
            name: 'fullName',
            header: 'Name',
            cell: d => `${d.firstName} ${d.lastName}`
          },
          { name: 'jobTitle', header: 'Job Title' },
          { name: 'jobArea', header: 'Job Area' }
        ]}
        includeHeaders={true}
        style={{ minWidth: '150vw' }}
        tableWrapperProps={{ style: { overflowX: 'auto' } }}
        containerProps={{ style: { backgroundColor: 'white' } }}
      />
    );
  });

// storiesOf('Column widths', module)
//   .add('TODO fixed width (first column)', () => {
//     const data = createPersonData(100);
//     return (
//       <MuiTable
//         data={data}
//         columns={[
//           {
//             name: 'fullName',
//             header: 'Name',
//             cell: d => `${d.firstName} ${d.lastName}`,
//             cellProps: { style: { width: 180 } }
//           },
//           { name: 'jobTitle', header: 'Job Title' },
//           { name: 'jobArea', header: 'Job Area' }
//         ]}
//         includeHeaders={true}
//         style={{ backgroundColor: 'white' }}
//       />
//     );
//   })
//   .add('TODO minWidth (first column)', () => {
//     const data = createPersonData(100);
//     return (
//       <MuiTable
//         data={data}
//         columns={[
//           {
//             name: 'fullName',
//             header: 'Name',
//             cell: d => `${d.firstName} ${d.lastName}`,
//             cellProps: { style: { minWidth: 180 } }
//           },
//           { name: 'jobTitle', header: 'Job Title' },
//           { name: 'jobArea', header: 'Job Area' }
//         ]}
//         includeHeaders={true}
//         style={{ backgroundColor: 'white' }}
//       />
//     );
//   })
//   .add('TODO minWidth (all columns)', () => {
//     const data = createPersonData(100);
//     return (
//       <div style={{ height: 'calc(100vh)' }}>
//         <AutoSizer>
//           {({ width, height }) => (
//             <MuiTable
//               data={data}
//               columns={[
//                 {
//                   name: 'fullName',
//                   header: 'Name',
//                   minWidth: 180,
//                   cell: d => `${d.firstName} ${d.lastName}`,
//                   cellProps: { style: { paddingRight: 0 } }
//                 },
//                 { name: 'jobTitle', header: 'Job Title', minWidth: 300 },
//                 { name: 'jobArea', header: 'Job Area', minWidth: 200 }
//               ]}
//               width={width}
//               maxHeight={height}
//               includeHeaders={true}
//               style={{ backgroundColor: 'white' }}
//             />
//           )}
//         </AutoSizer>
//       </div>
//     );
//   })

//   .add('TODO percentage widths exceeding table width (40% each)', () => {
//     const data = createPersonData(100);
//     return (
//       <MuiTable
//         data={data}
//         columns={[
//           {
//             name: 'fullName',
//             header: 'Name',
//             cell: d => `${d.firstName} ${d.lastName}`,
//             cellProps: { style: { width: '100%' } }
//           },
//           {
//             name: 'jobTitle',
//             header: 'Job Title',
//             cellProps: { style: { width: '40%' } }
//           },
//           {
//             name: 'jobArea',
//             header: 'Job Area',
//             cellProps: { style: { width: '40%' } }
//           }
//         ]}
//         includeHeaders={true}
//         style={{ width: 600, tableLayout: 'fixed', backgroundColor: 'white' }}
//       />
//     );
//   })
//   .add('TODO fixed width (long headers)', () => {
//     const data = createPersonData(100);
//     return (
//       <div style={{ height: 'calc(100vh)' }}>
//         <AutoSizer>
//           {({ width, height }) => (
//             <MuiTable
//               data={data}
//               columns={[
//                 { name: 'jobTitle', header: 'Job Title' },
//                 {
//                   name: 'fullName',
//                   header: 'Person Full Name',
//                   width: 100,
//                   cell: d => `${d.firstName} ${d.lastName}`,
//                   cellProps: { style: { paddingRight: 0 } }
//                 },
//                 { name: 'jobArea', header: 'Job Area' }
//               ]}
//               width={width}
//               maxHeight={height}
//               includeHeaders={true}
//               // fixedRowCount={1}
//               onHeaderClick={({ column }) => console.log({ column })}
//               style={{ backgroundColor: 'white' }}
//             />
//           )}
//         </AutoSizer>
//       </div>
//     );
//   });

// storiesOf('maxHeight', module)
//   .add('TODO basic', () => {
//     const data = createPersonData(100);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <MuiTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             maxHeight={500}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })
//   .add('TODO headers', () => {
//     const data = createPersonData(100);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <MuiTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             maxHeight={500}
//             includeHeaders={true}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })
//   .add('TODO fixed headers', () => {
//     const data = createPersonData(100);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <MuiTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             maxHeight={500}
//             includeHeaders={true}
//             // fixedRowCount={1}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })
//   .add('TODO pagination', () => {
//     const data = createPersonData(15);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <PaginatedTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             maxHeight={400}
//             includeHeaders={true}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })
//   .add('TODO pagination (maxHeight > calculatedHeight)', () => {
//     const data = createPersonData(15);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <PaginatedTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             maxHeight={800}
//             includeHeaders={true}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })
//   .add('TODO pagination (fitHeightToRows)', () => {
//     const data = createPersonData(15);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <PaginatedTable
//             data={data}
//             columns={[
//               {
//                 name: 'fullName',
//                 header: 'Name',
//                 width: 180,
//                 cell: d => `${d.firstName} ${d.lastName}`,
//                 cellProps: { style: { paddingRight: 0 } }
//               },
//               { name: 'jobTitle', header: 'Job Title' },
//               { name: 'jobArea', header: 'Job Area' }
//             ]}
//             width={width}
//             fitHeightToRows={true}
//             includeHeaders={true}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   });

storiesOf('Hover', module)
  .add('row (rowProps class)', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        rowProps={{
          className: hoveredRowClass.toString()
        }}
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('row (isCellHovered)', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        isCellHovered={({ rowData, hoveredRowData }) =>
          rowData.id && rowData.id === hoveredRowData.id
        }
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('column (isCellHovered)', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        isCellHovered={({ column, hoveredColumn }) =>
          column.name === hoveredColumn.name
        }
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  })
  .add('row and cell (isCellHovered)', () => {
    const data = createDessertData();
    return (
      <MuiTable
        data={data}
        columns={[
          {
            name: 'name',
            header: 'Dessert (100g serving)',
            cellProps: { style: { paddingRight: 0 } }
          },
          {
            name: 'calories',
            header: 'Calories',
            cellProps: { align: 'right' }
          },
          { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
          { name: 'carbs', header: 'Carbs (g)', cellProps: { align: 'right' } },
          {
            name: 'protein',
            header: 'Protein (g)',
            cellProps: { align: 'right' }
          }
        ]}
        isCellHovered={({ column, rowData, hoveredColumn, hoveredRowData }) =>
          (rowData.id && rowData.id === hoveredRowData.id) ||
          column.name === hoveredColumn.name
        }
        includeHeaders={true}
        style={{ backgroundColor: 'white' }}
      />
    );
  });

storiesOf('Selected', module)
  .add('basic', () => {
    const data = createDessertData();
    return (
      <Component initialState={{ selectedRowIds: [] }}>
        {({ state, setState }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'name',
                header: 'Dessert (100g serving)',
                cellProps: { style: { paddingRight: 0 } }
              },
              {
                name: 'calories',
                header: 'Calories',
                cellProps: { align: 'right' }
              },
              { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
              {
                name: 'carbs',
                header: 'Carbs (g)',
                cellProps: { align: 'right' }
              },
              {
                name: 'protein',
                header: 'Protein (g)',
                cellProps: { align: 'right' }
              }
            ]}
            isCellSelected={({ rowData }) =>
              state.selectedRowIds.some(id => rowData && rowData.id === id)
            }
            onCellClick={({ rowData }) => {
              setState(prevState => {
                if (prevState.selectedRowIds.some(id => rowData.id === id)) {
                  // remove
                  return {
                    selectedRowIds: prevState.selectedRowIds.filter(
                      id => id !== rowData.id
                    )
                  };
                } else {
                  // add
                  return {
                    selectedRowIds: [...prevState.selectedRowIds, rowData.id]
                  };
                }
              });
            }}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </Component>
    );
  })
  .add('with hover', () => {
    const data = createDessertData();
    return (
      <Component initialState={{ selectedRowIds: [] }}>
        {({ state, setState }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'name',
                header: 'Dessert (100g serving)',
                cellProps: { style: { paddingRight: 0 } }
              },
              {
                name: 'calories',
                header: 'Calories',
                cellProps: { align: 'right' }
              },
              { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
              {
                name: 'carbs',
                header: 'Carbs (g)',
                cellProps: { align: 'right' }
              },
              {
                name: 'protein',
                header: 'Protein (g)',
                cellProps: { align: 'right' }
              }
            ]}
            isCellSelected={({ rowData }) =>
              state.selectedRowIds.some(id => rowData && rowData.id === id)
            }
            isCellHovered={({ rowData, hoveredRowData }) =>
              rowData.id && rowData.id === hoveredRowData.id
            }
            onCellClick={({ rowData }) => {
              setState(prevState => {
                if (prevState.selectedRowIds.some(id => rowData.id === id)) {
                  // remove
                  return {
                    selectedRowIds: prevState.selectedRowIds.filter(
                      id => id !== rowData.id
                    )
                  };
                } else {
                  // add
                  return {
                    selectedRowIds: [...prevState.selectedRowIds, rowData.id]
                  };
                }
              });
            }}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </Component>
    );
  })
  .add('with hover and checkbox', () => {
    const data = createDessertData();
    return (
      <Component initialState={{ selectedRowIds: [] }}>
        {({ state, setState }) => (
          <MuiTable
            data={data}
            columns={[
              {
                name: 'checkbox',
                header: (
                  <Checkbox
                    checked={state.selectedRowIds.length > 0}
                    onChange={e =>
                      setState(prevState => {
                        if (prevState.selectedRowIds.length === data.length) {
                          // deselect all
                          return { selectedRowIds: [] };
                        } else {
                          // select all
                          return { selectedRowIds: data.map(d => d.id) };
                        }
                      })
                    }
                    {...state.selectedRowIds.length > 0 &&
                      state.selectedRowIds.length !== data.length && {
                        indeterminate: true,
                        color: 'default'
                      }}
                  />
                ),
                cell: rowData => (
                  <Checkbox
                    checked={state.selectedRowIds.some(id => rowData.id === id)}
                  />
                ),
                cellProps: { style: { paddingRight: 0 } },
                width: 72
              },
              {
                name: 'name',
                header: 'Dessert (100g serving)',
                cellProps: { style: { paddingRight: 0 } }
              },
              {
                name: 'calories',
                header: 'Calories',
                cellProps: { align: 'right' }
              },
              { name: 'fat', header: 'Fat (g)', cellProps: { align: 'right' } },
              {
                name: 'carbs',
                header: 'Carbs (g)',
                cellProps: { align: 'right' }
              },
              {
                name: 'protein',
                header: 'Protein (g)',
                cellProps: { align: 'right' }
              }
            ]}
            isCellSelected={({ rowData }) =>
              state.selectedRowIds.some(id => rowData && rowData.id === id)
            }
            isCellHovered={({ rowData, hoveredRowData }) =>
              rowData.id && rowData.id === hoveredRowData.id
            }
            onCellClick={({ rowData }) => {
              setState(prevState => {
                if (prevState.selectedRowIds.some(id => rowData.id === id)) {
                  // remove
                  return {
                    selectedRowIds: prevState.selectedRowIds.filter(
                      id => id !== rowData.id
                    )
                  };
                } else {
                  // add
                  return {
                    selectedRowIds: [...prevState.selectedRowIds, rowData.id]
                  };
                }
              });
            }}
            includeHeaders={true}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </Component>
    );
  });

// storiesOf('Performance', module)
//   .add('TODO 1000 rows (no virtualizaiton)', () => {
//     const data = createPersonData(1000);
//     return (
//       <AutoSizer>
//         {({ width }) => (
//           <MuiTable
//             data={data}
//             columns={[{ name: 'firstName' }, { name: 'lastName' }]}
//             width={width}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })

//   .add('TODO 1000 rows (fixed height)', () => {
//     const data = createPersonData(1000);
//     return (
//       <AutoSizer>
//         {({ width, height }) => (
//           <MuiTable
//             data={data}
//             columns={[{ name: 'firstName' }, { name: 'lastName' }]}
//             width={width}
//             height={400}
//             style={{ backgroundColor: 'white' }}
//           />
//         )}
//       </AutoSizer>
//     );
//   })

//   .add('TODO 1000 rows (viewport height)', () => {
//     const data = createPersonData(1000);
//     return (
//       <div style={{ height: 'calc(100vh)' }}>
//         <AutoSizer>
//           {({ width, height }) => (
//             <MuiTable
//               data={data}
//               columns={[{ name: 'firstName' }, { name: 'lastName' }]}
//               width={width}
//               height={height}
//               style={{ backgroundColor: 'white' }}
//             />
//           )}
//         </AutoSizer>
//       </div>
//     );
//   });

storiesOf('Examples', module)
  .add('dessert', () => {
    const data = createDessertData();
    return (
      <Component initialState={{ orderBy: 'name', orderDirection: 'asc' }}>
        {({ state, setState }) => (
          <PaginatedTable
            data={data.sort((a, b) => {
              if (a[state.orderBy] < b[state.orderBy]) {
                return state.orderDirection === 'asc' ? -1 : 1;
              } else if (a[state.orderBy] > b[state.orderBy]) {
                return state.orderDirection === 'asc' ? 1 : -1;
              } else {
                return 0;
              }
            })}
            columns={[
              {
                name: 'name',
                header: 'Dessert (100g serving)',
                width: 200,
                cellProps: { style: { paddingRight: 0 } }
              },
              {
                name: 'calories',
                header: 'Calories',
                cellProps: { align: 'right' }
              },
              {
                name: 'fat',
                header: 'Fat (g)',
                cellProps: { align: 'right' }
              },
              {
                name: 'carbs',
                header: 'Carbs (g)',
                cellProps: { align: 'right' }
              },
              {
                name: 'protein',
                header: 'Protein (g)',
                cellProps: { align: 'right' }
              }
            ]}
            includeHeaders={true}
            onHeaderClick={({ column }) =>
              setState(prevState => {
                const orderBy = column.orderBy || column.name;
                if (prevState.orderBy === orderBy) {
                  return {
                    orderDirection:
                      prevState.orderDirection === 'asc' ? 'desc' : 'asc'
                  };
                } else {
                  return { orderBy, orderDirection: 'asc' };
                }
              })
            }
            orderBy={state.orderBy}
            orderDirection={state.orderDirection}
            defaultPagination={{ rowsPerPage: 5 }}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </Component>
    );
  })
  .add('all the things', () => {
    const data = createPersonData(100);
    return (
      <Component initialState={{ orderBy: 'lastName', orderDirection: 'asc' }}>
        {({ state, setState }) => (
          <PaginatedTable
            data={data.sort((a, b) => {
              if (a[state.orderBy] < b[state.orderBy]) {
                return state.orderDirection === 'asc' ? -1 : 1;
              } else if (a[state.orderBy] > b[state.orderBy]) {
                return state.orderDirection === 'asc' ? 1 : -1;
              } else {
                return 0;
              }
            })}
            columns={[
              {
                name: 'fullName',
                header: 'Name',
                orderBy: 'lastName',
                width: 180,
                cell: d => `${d.firstName} ${d.lastName}`
              },
              { name: 'jobTitle', header: 'Job Title', width: 400 },
              { name: 'jobArea', header: 'Job Area', width: 400 },
              { name: 'jobType', header: 'Job Type', width: 400 }
            ]}
            includeHeaders={true}
            onHeaderClick={({ column }) =>
              setState(prevState => {
                const orderBy = column.orderBy || column.name;
                if (prevState.orderBy === orderBy) {
                  return {
                    orderDirection:
                      prevState.orderDirection === 'asc' ? 'desc' : 'asc'
                  };
                } else {
                  return { orderBy, orderDirection: 'asc' };
                }
              })
            }
            orderBy={state.orderBy}
            orderDirection={state.orderDirection}
            headerRowProps={{
              style: {
                // backgroundColor: '#eee',
                // borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
                height: 24
              }
            }}
            headerCellProps={({ column }) => ({
              className: `${stickyHeaderClass} ${stickyColumnClass}`,
              style: {
                backgroundColor: '#eee',
                zIndex: column.name === 'fullName' ? 1 : undefined // corner
              }
            })}
            cellProps={({ column }) => {
              if (column.name === 'fullName') {
                return {
                  className: stickyColumnClass.toString(),
                  style: {
                    backgroundColor: '#eee',
                    borderRight: '2px solid rgba(0, 0, 0, 0.12)'
                  }
                };
              }
            }}
            style={{ backgroundColor: 'white' }}
          />
        )}
      </Component>
    );
  });

class PaginatedTable extends React.Component {
  state = {
    page: 1,
    perPage:
      (this.props.defaultPagination &&
        this.props.defaultPagination.rowsPerPage) ||
      10
  };

  render() {
    const { data, defaultPagination, ...props } = this.props;
    const { page, perPage } = this.state;

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
          onChangePage: (e, page) => this.setState({ page: page + 1 }),
          onChangeRowsPerPage: e => this.setState({ perPage: e.target.value })
        }}
        {...props}
      />
    );
  }
}
