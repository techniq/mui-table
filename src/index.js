import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import merge from 'lodash.merge';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const resolveProp = (prop, args) => {
  return typeof prop === 'function' ? prop(args) : prop;
};

export const styles = theme => ({
  cellSelected: {
    backgroundColor: theme.palette.grey[100]
  },
  cellHovered: {
    backgroundColor: theme.palette.grey[200]
  }
});

class MuiTable extends Component {
  state = {
    hoveredColumn: null,
    hoveredRowData: null
  };

  render() {
    const {
      data,
      columns,

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

      classes,
      ...props
    } = this.props;

    const { hoveredColumn, hoveredRowData } = this.state;

    return (
      <Table {...props}>
        {includeHeaders && (
          <TableHead>
            <TableRow {...rowProps} {...headerRowProps}>
              {columns &&
                columns.map((column, columnIndex) => {
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
                    isCellSelected && isCellSelected({ column, rowData: {} });

                  const className = classNames({
                    [classes.cellHovered]: isHovered,
                    [classes.cellSelected]: isSelected
                  });

                  const cellProps = merge(
                    {},
                    { className },
                    resolveProp(column.cellProps, {
                      column,
                      rowData: {},
                      hoveredColumn,
                      hoveredRowData
                    }),
                    resolveProp(defaultCellProps, {
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
                    }),
                    resolveProp(defaultHeaderCellProps, {
                      column,
                      rowData: {},
                      hoveredColumn,
                      hoveredRowData
                    })
                  );

                  return (
                    <TableCell
                      onMouseEnter={() => {
                        this.setState({
                          hoveredColumn: column,
                          hoveredRowData: {}
                        });
                      }}
                      onMouseLeave={() =>
                        this.setState({
                          hoveredColumn: null,
                          hoveredRowData: null
                        })
                      }
                      key={`header-cell-${column.name}`}
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
          </TableHead>
        )}

        <TableBody>
          {data &&
            data.map((rowData, rowIndex) => {
              return (
                <TableRow
                  key={`body-row-${rowIndex}`}
                  {...rowProps}
                  {...bodyRowProps}
                >
                  {columns.map((column, columnIndex) => {
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

                    const className = classNames({
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
                        onMouseEnter={() => {
                          this.setState({
                            hoveredColumn: column,
                            hoveredRowData: rowData
                          });
                        }}
                        onMouseLeave={() =>
                          this.setState({
                            hoveredColumn: null,
                            hoveredRowData: null
                          })
                        }
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
                {...rowProps}
                {...bodyRowProps}
                key={`body-row-placeholder-${rowIndex}`}
              >
                {columns.map(column => (
                  <TableCell
                    style={{ visibility: 'hidden' }}
                    key={`body-cell-placeholder-${rowIndex}-${column.name}`}
                  />
                ))}
              </TableRow>
            ))}
        </TableBody>

        {pagination && (
          <TableFooter>
            <TableRow>
              <TablePagination {...pagination} />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    );
  }
}

MuiTable.propTypes = {
  addPlaceholderRows: PropTypes.bool,
  bodyCellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  bodyRowProps: PropTypes.object,
  cellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  classes: PropTypes.object,
  columns: PropTypes.array,
  data: PropTypes.array,
  headerCellProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  headerRowProps: PropTypes.object,
  includeHeaders: PropTypes.bool,
  isCellHovered: PropTypes.func,
  isCellSelected: PropTypes.func,
  onCellClick: PropTypes.func,
  onHeaderClick: PropTypes.func,
  orderBy: PropTypes.string,
  orderDirection: PropTypes.string,
  pagination: PropTypes.object,
  rowProps: PropTypes.object
};

export default withStyles(styles)(MuiTable);
