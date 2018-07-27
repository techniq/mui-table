## mui-table
Combination of [Material UI](http://www.material-ui.com) visual components with react-virtualized for improved performance and features with a simple API. 

For examples of `<MuiTable>` in action, see [demo](https://techniq.github.io/mui-table/) or view the [source](https://github.com/techniq/mui-table/tree/master/stories)

### Features
- Uses windowing for performance (via [react-virtualized](https://github.com/bvaughn/react-virtualized))
- Freeze rows and/or columns
- Fixed or variable (%) column widths

### Props
Property | Type | Required | Default | Description
-------- | ---- | -------- | ------- | -----------
`data` | array | ✓ |  | Data to render using defined `columns`
`columns` | array | ✓ |  | Defines the columns in the table.<br/>Column format: {'name', 'header', 'onHeaderClick', 'width', 'cell', ...cellProps }<br/>`name`: Name of header<br/>`header`: (optional) Name to display instead 'name'<br/>`onHeaderClick`: (optional) Callback when header is clicked on (has precendence over `onHeaderClick` on table<br/>`width`: (optional) Width of cell<br/>`cell`: (optional) Callback for rendering associated column cell data.  Passes the row data for the associated cell.    
`cellProps` | object | func | | | Pass initial props to [TableCell](https://material-ui.com/api/table-cell/) (ex. `cellProps={{ padding: 'dense' }}`).  Specifying same property within the column definition `cellProps` will override.  Can also be a function which is passed `column, rowData` similiarly to `onCellClick`
`width` | number | ✓ |  | Visible width of table.  Will scroll horizontally if sum of column widths are greater than defined width
`columnWidth` | number or func | | | Static column widths if number, calulated based on `columns` definitons if not specificed, or can pass in a function to peform own calcuation based on data
`height` | number | | calculted from `data.length` or `pagination.rowsPerPage` if defined | Visible height of table.  Will scroll vertically if sum of column heights are great than defined height
`maxHeight` | number | | 0 | Maximum height of table.  Useful when using calculated 
`fitHeightToRows` | boolean | | false | Always fit the content height to row data.  Only useful when using pagination and you want to reduce the height on non-full pages (will move paginator on different length results)
`rowHeight` | number | | 48 | Height of rows
`fixedRowCount` | number | | 0 | Number of rows to remain fixed at the top of the viewport (freeze rows).  Based on `columns` definition order
`fixedColumnCount` | number | | 0 | Number of columns to remain fixed at the left of the viewport (freeze columns).  Based on `columns` definition order
`includeHeaders` | bool | | false | Add header row to top of data.  Useful to also set `fixedRowCount` to `1`
`onHeaderClick` | func | | | Called with column definition of header clicked on.  Useful to set sort data and set `orderBy` and `orderDirection`
`onCellClick` | func | | | Called with column definition and row data when non-header cell is clicked on (ex. `onCellClick={(column, data) => alert(data[column.name])}`)
`pagination` | object | | | If defined, will add pagination to bottom of table and pass props to Material-UI's [TablePagination](https://material-ui.com/api/table-pagination/) component.  Must set `count`, `onChangePage`, `page`, and `rowsPerPage` if defined.
`orderBy` | string | | | If defined, will show column's header with matching `name` using [TableSortLabel](https://material-ui.com/api/table-sort-label/)
`orderDirection` | string | | 'desc' | The order of the sort direction
`rowId` | string | | 'id' | The column name of the unique row identifier used with rowHover and rowSelect.
`rowHover` | bool | | | If true, the cells within the associated row will change to the cellHovered class when the row is hovered over.
`rowSelect` | bool | | | If true, the cells within the associated row will toggle between the cell and cellSelected class when the row is clicked on.
`onRowSelect` | func | | | Called with column selected boolean status and row data when non-header row is selected or deselected. (ex. `onRowSelect={(selected, rowData)=>console.log('Row select: selected=' + JSON.stringify(selected) + ', rowData=' + JSON.stringify(rowData))} )      
