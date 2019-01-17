declare module 'mui-table' {
  import React from 'react';
  import { TablePaginationProps } from '@material-ui/core/TablePagination';
  import { TableRowProps } from '@material-ui/core/TableRow';
  import { TableCellProps } from '@material-ui/core/TableCell';

  export interface ColumnDef {
    name: string;
    header?: string | React.ReactNode;
    cell?: (data: any) => React.ReactNode;
    cellProps?:
      | TableCellProps
      | ((obj: { rowData: any }) => TableCellProps | void);
    onHeaderClick?: boolean;
    headerCellProps?: TableCellProps;
    orderBy?: string;
    columns?: ColumnDef[];
  }

  export interface MuiTableProps {
    data: any;
    includeHeaders?: boolean;
    headerProps?: TableCellProps;
    rowProps?: TableRowProps;
    bodyRowProps?:
      | TableRowProps
      | ((obj: { rowData: any }) => TableRowProps | void);
    cellProps?:
      | TableCellProps
      | ((obj: { rowData: any }) => TableCellProps | void);
    onHeaderClick?: (obj: { column: ColumnDef }) => void;
    onCellClick?: (obj: { rowData: any; column: ColumnDef }) => void;
    columns: ColumnDef[];
    orderBy?: string;
    orderDirection?: string;
    pagination?: {};
    addPlaceholderRows?: boolean;
    tableWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  }
  export default class MuiTable extends React.Component<MuiTableProps> {}
}
