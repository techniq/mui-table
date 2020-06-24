import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Table, { TableProps } from '@material-ui/core/Table';
import TableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead, { TableHeadProps } from '@material-ui/core/TableHead';
import TablePagination, {
  TablePaginationProps,
} from '@material-ui/core/TablePagination';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { getHeaders, getColumns, merge } from './utils';

type ResolvePropType<T> =
  | T
  | ((obj: { rowData: T; column: ColumnDef<T> }) => T | void);

function resolveProp<T>(prop: ResolvePropType<T> | undefined, args: any) {
  return prop instanceof Function ? prop(args) : prop;
}

export const useStyles = makeStyles(theme => ({
  container: {},
  tableWrapper: {},
  cellSelected: {
    backgroundColor: theme.palette.grey[100],
  },
  cellHovered: {
    backgroundColor: theme.palette.grey[200],
  },
}));

export type ColumnDef<T = any> = {
  name: string;
  header?: string | React.ReactNode;
  cell?: (data: T, index: number) => React.ReactNode;
  cellProps?: ResolvePropType<TableCellProps>;
  onClick?: TableCellProps['onClick'];
  onHeaderClick?: boolean | ((obj: { column: ColumnDef<T> }) => void);
  headerCellProps?: TableCellProps;
  bodyCellProps?: TableCellProps;
  orderBy?: string | boolean | ((a: any, b: any) => number);
  columns?: ColumnDef<T>[];
};

export type MuiTableProps<T = any> = {
  data: T[] | null;
  columns: ColumnDef<T>[];
  bodyProps?: TableBodyProps;
  containerProps?: any;
  includeHeaders?: boolean;
  headerProps?: TableHeadProps;
  rowProps?: ResolvePropType<TableRowProps>;
  headerRowProps?: ResolvePropType<TableRowProps>;
  headerCellProps?: ResolvePropType<TableCellProps>;
  bodyRowProps?: ResolvePropType<TableRowProps>;
  bodyCellProps?: ResolvePropType<TableCellProps>;
  cellProps?: ResolvePropType<TableCellProps>;
  onHeaderClick?: (obj: { column: ColumnDef<T> }) => void;
  onCellClick?: (obj: { rowData: T; column: ColumnDef<T> }) => void;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  pagination?: TablePaginationProps;
  addPlaceholderRows?: boolean;
  tableWrapperProps?: React.HTMLAttributes<HTMLDivElement>;

  isCellHovered?: (obj: {
    column: ColumnDef<T>;
    rowData: T | null;
    hoveredColumn: ColumnDef<T> | null;
    hoveredRowData: T | null;
  }) => boolean;
  isCellSelected?: (obj: {
    column: ColumnDef<T>;
    rowData: T | null;
  }) => boolean;
  classes?: {
    container?: string;
    tableWrapper?: string;
    cellHovered?: string;
    cellSelected?: string;
  };
} & TableProps;

function MuiTable<T = any>(props: MuiTableProps<T>) {
  const {
    data,
    columns,

    containerProps,
    tableWrapperProps,
    headerProps,
    bodyProps,

    rowProps,
    headerRowProps,
    bodyRowProps,

    cellProps: defaultCellProps,
    headerCellProps: defaultHeaderCellProps,
    bodyCellProps: defaultBodyCellProps,

    includeHeaders,
    onHeaderClick,
    onCellClick,
    isCellHovered,
    isCellSelected,
    pagination,
    addPlaceholderRows,
    orderBy,
    orderDirection,

    ...tableProps
  } = props;

  const [state, setState] = useState<{
    hoveredColumn: ColumnDef | null;
    hoveredRowData: T | null;
  }>({
    hoveredColumn: null,
    hoveredRowData: null,
  });
  const classes = useStyles();

  const { hoveredColumn, hoveredRowData } = state;

  return (
    <div className={classes.container} {...containerProps}>
      <div className={classes.tableWrapper} {...tableWrapperProps}>
        <Table {...tableProps}>
          {includeHeaders && (
            <TableHead {...headerProps}>
              {getHeaders(columns).map((headerRow, headerRowIndex) => (
                <TableRow
                  {...resolveProp(rowProps, {
                    column: null,
                    rowData: null,
                    hoveredColumn,
                    hoveredRowData,
                  })}
                  {...resolveProp(headerRowProps, {
                    column: null,
                    rowData: null,
                    hoveredColumn,
                    hoveredRowData,
                  })}
                  key={`header-row-${headerRowIndex}`}
                >
                  {headerRow &&
                    headerRow.map((column, _columnIndex) => {
                      const contents = column.header || column.name;

                      const isHovered =
                        hoveredColumn &&
                        hoveredRowData &&
                        isCellHovered &&
                        isCellHovered({
                          column,
                          rowData: null,
                          hoveredColumn,
                          hoveredRowData,
                        });

                      const isSelected =
                        isCellSelected &&
                        isCellSelected({ column, rowData: null });

                      const className = clsx({
                        [classes.cellHovered]: isHovered,
                        [classes.cellSelected]: isSelected,
                      });

                      const cellProps = merge(
                        {},
                        { className },
                        resolveProp(defaultCellProps, {
                          column,
                          rowData: null,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(column.cellProps, {
                          column,
                          rowData: null,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(defaultHeaderCellProps, {
                          column,
                          rowData: null,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(column.headerCellProps, {
                          column,
                          rowData: null,
                          hoveredColumn,
                          hoveredRowData,
                        })
                      );

                      return (
                        <TableCell
                          {...(isCellHovered && {
                            onMouseEnter: () => {
                              setState({
                                hoveredColumn: column,
                                hoveredRowData: null,
                              });
                            },
                            onMouseLeave: () =>
                              setState({
                                hoveredColumn: null,
                                hoveredRowData: null,
                              }),
                          })}
                          key={`header-cell-${column.name}`}
                          colSpan={column.colSpan}
                          rowSpan={column.rowSpan}
                          {...cellProps}
                        >
                          {column.orderBy !== false &&
                          column.onHeaderClick !== false &&
                          (column.onHeaderClick || onHeaderClick) ? (
                            <TableSortLabel
                              active={
                                orderBy === column.name ||
                                orderBy === column.orderBy
                              }
                              style={{ width: 'inherit' }} // fix text overflowing
                              direction={orderDirection}
                              onClick={() =>
                                typeof column.onHeaderClick === 'function'
                                  ? column.onHeaderClick({ column })
                                  : onHeaderClick?.({ column })
                              }
                            >
                              {contents}
                            </TableSortLabel>
                          ) : (
                            contents
                          )}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
            </TableHead>
          )}

          <TableBody {...bodyProps}>
            {data &&
              data.map((rowData, rowIndex) => {
                return (
                  <TableRow
                    key={`body-row-${rowIndex}`}
                    {...resolveProp(rowProps, {
                      column: null,
                      rowData,
                      hoveredColumn,
                      hoveredRowData,
                    })}
                    {...resolveProp(bodyRowProps, {
                      column: null,
                      rowData,
                      hoveredColumn,
                      hoveredRowData,
                    })}
                  >
                    {getColumns(columns).map((column, _columnIndex) => {
                      const contents = column.cell
                        ? column.cell(rowData, rowIndex)
                        : // @ts-ignore: add index signature
                          rowData[column.name];

                      const isHovered =
                        hoveredColumn &&
                        hoveredRowData &&
                        isCellHovered &&
                        isCellHovered({
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData,
                        });

                      const isSelected =
                        isCellSelected && isCellSelected({ column, rowData });

                      const className = clsx({
                        [classes.cellHovered]: isHovered,
                        [classes.cellSelected]: isSelected,
                      });

                      const cellProps = merge(
                        {},
                        { className },
                        resolveProp(defaultCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(column.cellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(defaultBodyCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData,
                        }),
                        resolveProp(column.bodyCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData,
                        })
                      );

                      return (
                        <TableCell
                          style={{
                            ...((onCellClick || column.onClick) && {
                              cursor: 'pointer',
                            }),
                          }}
                          {...(isCellHovered && {
                            onMouseEnter: () => {
                              setState({
                                hoveredColumn: column,
                                hoveredRowData: rowData,
                              });
                            },
                            onMouseLeave: () =>
                              setState({
                                hoveredColumn: null,
                                hoveredRowData: null,
                              }),
                          })}
                          {...(onCellClick && {
                            onClick: () => {
                              if (window.getSelection()?.toString() === '') {
                                onCellClick({ column, rowData }); // Can be overridden by cellProps.onClick on column definition
                              }
                            },
                          })}
                          key={`body-cell-${rowIndex}-${column.name}`}
                          {...cellProps}
                        >
                          {contents}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}

            {/* Fill remaining space to keep pagination controls in consistent location */}
            {pagination &&
              addPlaceholderRows &&
              pagination.rowsPerPage > (data ? data.length : 0) &&
              Array.from({
                length: pagination.rowsPerPage - (data ? data.length : 0),
              }).map((rowData, rowIndex) => (
                <TableRow
                  {...resolveProp(rowProps, {
                    column: null,
                    rowData,
                    hoveredColumn,
                    hoveredRowData,
                  })}
                  {...resolveProp(bodyRowProps, {
                    column: null,
                    rowData,
                    hoveredColumn,
                    hoveredRowData,
                  })}
                  key={`body-row-placeholder-${rowIndex}`}
                >
                  {columns.map(column => {
                    const cellProps: any = merge(
                      {},
                      resolveProp(defaultCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData,
                      }),
                      resolveProp(column.cellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData,
                      }),
                      resolveProp(defaultBodyCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData,
                      }),
                      resolveProp(column.bodyCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData,
                      })
                    );

                    cellProps.style = {
                      ...cellProps.style,
                      visibility: 'hidden',
                    };

                    return (
                      <TableCell
                        style={{ visibility: 'hidden' }}
                        key={`body-cell-placeholder-${rowIndex}-${column.name}`}
                        {...cellProps}
                      >
                        &nbsp;
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        // @ts-ignore - component?
        <TablePagination component="div" {...pagination} />
      )}
    </div>
  );
}

export { getHeaders, getColumns };
export default MuiTable;
