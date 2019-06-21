import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { getHeaders, getColumns, merge } from './utils';

const resolveProp = (prop, args) => {
  return typeof prop === 'function' ? prop(args) : prop;
};

export const useStyles = makeStyles(theme => ({
  container: {},
  tableWrapper: {},
  cellSelected: {
    backgroundColor: theme.palette.grey[100]
  },
  cellHovered: {
    backgroundColor: theme.palette.grey[200]
  }
}));

function MuiTable(props) {
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

  const [state, setState] = useState({
    hoveredColumn: null,
    hoveredRowData: null
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
                    column: {},
                    rowData: {},
                    hoveredColumn,
                    hoveredRowData
                  })}
                  {...resolveProp(headerRowProps, {
                    column: {},
                    rowData: {},
                    hoveredColumn,
                    hoveredRowData
                  })}
                  key={`header-row-${headerRowIndex}`}
                >
                  {headerRow &&
                    headerRow.map((column, columnIndex) => {
                      const contents = column.header || column.name;

                      const isHovered =
                        hoveredColumn &&
                        hoveredRowData &&
                        isCellHovered &&
                        isCellHovered({
                          column,
                          rowData: {},
                          hoveredColumn,
                          hoveredRowData
                        });

                      const isSelected =
                        isCellSelected &&
                        isCellSelected({ column, rowData: {} });

                      const className = clsx({
                        [classes.cellHovered]: isHovered,
                        [classes.cellSelected]: isSelected
                      });

                      const cellProps = merge(
                        {},
                        { className },
                        resolveProp(defaultCellProps, {
                          column,
                          rowData: {},
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(column.cellProps, {
                          column,
                          rowData: {},
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(defaultHeaderCellProps, {
                          column,
                          rowData: {},
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(column.headerCellProps, {
                          column,
                          rowData: {},
                          hoveredColumn,
                          hoveredRowData
                        })
                      );

                      return (
                        <TableCell
                          {...isCellHovered && {
                            onMouseEnter: () => {
                              setState({
                                hoveredColumn: column,
                                hoveredRowData: {}
                              });
                            },
                            onMouseLeave: () =>
                              setState({
                                hoveredColumn: null,
                                hoveredRowData: null
                              })
                          }}
                          key={`header-cell-${column.name}`}
                          colSpan={column.colSpan}
                          rowSpan={column.rowSpan}
                          {...cellProps}
                        >
                          {column.onHeaderClick !== false &&
                          (column.onHeaderClick || onHeaderClick) ? (
                            <TableSortLabel
                              active={
                                orderBy &&
                                (orderBy === column.name ||
                                  orderBy === column.orderBy)
                              }
                              style={{ width: 'inherit' }} // fix text overflowing
                              direction={orderDirection}
                              onClick={() =>
                                column.onHeaderClick
                                  ? column.onHeaderClick()
                                  : onHeaderClick({ column })
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
                      column: {},
                      rowData,
                      hoveredColumn,
                      hoveredRowData
                    })}
                    {...resolveProp(bodyRowProps, {
                      column: {},
                      rowData,
                      hoveredColumn,
                      hoveredRowData
                    })}
                  >
                    {getColumns(columns).map((column, columnIndex) => {
                      const contents = column.cell
                        ? column.cell(rowData)
                        : rowData[column.name];

                      const isHovered =
                        hoveredColumn &&
                        hoveredRowData &&
                        isCellHovered &&
                        isCellHovered({
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData
                        });

                      const isSelected =
                        isCellSelected && isCellSelected({ column, rowData });

                      const className = clsx({
                        [classes.cellHovered]: isHovered,
                        [classes.cellSelected]: isSelected
                      });

                      const cellProps = merge(
                        {},
                        { className },
                        resolveProp(defaultCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(column.cellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(defaultBodyCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData
                        }),
                        resolveProp(column.bodyCellProps, {
                          column,
                          rowData,
                          hoveredColumn,
                          hoveredRowData
                        })
                      );

                      return (
                        <TableCell
                          style={{
                            ...((onCellClick || column.onClick) && {
                              cursor: 'pointer'
                            })
                          }}
                          {...isCellHovered && {
                            onMouseEnter: () => {
                              setState({
                                hoveredColumn: column,
                                hoveredRowData: rowData
                              });
                            },
                            onMouseLeave: () =>
                              setState({
                                hoveredColumn: null,
                                hoveredRowData: null
                              })
                          }}
                          {...onCellClick && {
                            onClick: () => onCellClick({ column, rowData }) // Can be overridden by cellProps.onClick on column definition
                          }}
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
                length: pagination.rowsPerPage - (data ? data.length : 0)
              }).map((rowData, rowIndex) => (
                <TableRow
                  {...resolveProp(rowProps, {
                    column: {},
                    rowData,
                    hoveredColumn,
                    hoveredRowData
                  })}
                  {...resolveProp(bodyRowProps, {
                    column: {},
                    rowData,
                    hoveredColumn,
                    hoveredRowData
                  })}
                  key={`body-row-placeholder-${rowIndex}`}
                >
                  {columns.map(column => {
                    const cellProps = merge(
                      {},
                      resolveProp(defaultCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData
                      }),
                      resolveProp(column.cellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData
                      }),
                      resolveProp(defaultBodyCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData
                      }),
                      resolveProp(column.bodyCellProps, {
                        column,
                        rowData,
                        hoveredColumn,
                        hoveredRowData
                      })
                    );

                    cellProps.style = {
                      ...cellProps.style,
                      visibility: 'hidden'
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
      {pagination && <TablePagination component="div" {...pagination} />}
    </div>
  );
}

MuiTable.propTypes = {
  addPlaceholderRows: PropTypes.bool,
  bodyCellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  bodyRowProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  cellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  classes: PropTypes.object,
  columns: PropTypes.array,
  containerProps: PropTypes.object,
  data: PropTypes.array,
  headerCellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  headerRowProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  includeHeaders: PropTypes.bool,
  isCellHovered: PropTypes.func,
  isCellSelected: PropTypes.func,
  onCellClick: PropTypes.func,
  onHeaderClick: PropTypes.func,
  orderBy: PropTypes.string,
  orderDirection: PropTypes.string,
  pagination: PropTypes.object,
  rowProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  tableWrapperProps: PropTypes.object,
  headerProps: PropTypes.object,
  bodyProps: PropTypes.object
};

export default MuiTable;
