
declare module 'mui-table' {
  import React from 'react';
  import { TableBodyProps } from '@material-ui/core/TableBody';
  import { TablePaginationProps } from '@material-ui/core/TablePagination';
  import { TableRowProps } from '@material-ui/core/TableRow';
  import { TableCellProps } from '@material-ui/core/TableCell';

  export interface ColumnDef<T = any> {
    name: string;
    header?: string | React.ReactNode;
    cell?: (data: T) => React.ReactNode;
    cellProps?:
      | TableCellProps
      | ((obj: { rowData: T }) => TableCellProps | void);
    onHeaderClick?: boolean;
    headerCellProps?: TableCellProps;
    orderBy?: string;
    columns?: ColumnDef<T>[];
  }

  export interface MuiTableProps<T = any> {
    data: T[];
    bodyProps?: TableBodyProps;
    containerProps?: any;
    includeHeaders?: boolean;
    headerProps?: TableCellProps;
    rowProps?:
      | TableRowProps
      | ((obj: { rowData: T }) => TableRowProps | void);
    bodyRowProps?:
      | TableRowProps
      | ((obj: { rowData: T }) => TableRowProps | void);
    bodyCellProps?:
      | TableCellProps
      | ((obj: { rowData: T }) => TableCellProps | void);
    cellProps?:
      | TableCellProps
      | ((obj: { rowData: T }) => TableCellProps | void);
    onHeaderClick?: (obj: { column: ColumnDef<T> }) => void;
    onCellClick?: (obj: { rowData: T; column: ColumnDef<T> }) => void;
    columns: ColumnDef<T>[];
    orderBy?: string;
    orderDirection?: string;
    pagination?: {};
    addPlaceholderRows?: boolean;
    tableWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
    headerCellProps?:
      | TableCellProps
      | ((obj: { rowData: T }) => TableCellProps | void);
    headerRowProps?:
      | TableRowProps
      | ((obj: { rowData: T }) => TableRowProps | void);
    isCellHovered?: (obj: { column: string; rowData: T; hoveredColumn: string; hoveredRowData: T; }) => void;
    isCellSelected?: (obj: { column: string; rowData: T; }) => void;
    classes?: { container?: string; tableWrapper?: string; cellHovered?: string; cellSelected?: string; };
  }
  export default class MuiTable<T> extends React.Component<MuiTableProps<T>> {}
}
