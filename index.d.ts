declare module 'mui-table' {
  import React from 'react';
  import { TablePaginationProps } from '@material-ui/core/TablePagination';
  import { TableRowProps } from '@material-ui/core/TableRow';
  import { TableCellProps } from '@material-ui/core/TableCell';

  export interface ColumnDef<T> {
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

  export interface MuiTableProps<T> {
    data: T[];
    includeHeaders?: boolean;
    headerProps?: TableCellProps;
    rowProps?: TableRowProps;
    bodyRowProps?:
      | TableRowProps
      | ((obj: { rowData: T }) => TableRowProps | void);
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
  }
  export default class MuiTable<T> extends React.Component<MuiTableProps<T>> {}
}
