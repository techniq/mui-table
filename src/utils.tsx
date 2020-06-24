import * as deepmerge from 'deepmerge';
import { ColumnDef } from './index';

type ColumnDefHeader = ColumnDef & {
  colSpan?: number;
  rowSpan?: number;
};

export function getHeaders(columns: ColumnDef[]) {
  const maxDepth = getDepth(columns);
  const result: ColumnDefHeader[][] = Array.from({
    length: maxDepth,
  }).map(() => []);

  function addItems(columns: ColumnDef[], depth: number) {
    columns.forEach(column => {
      const columnDef: ColumnDefHeader = {
        ...column,
      };
      delete columnDef.columns;

      if (column.columns) {
        const colSpan = getWidth(column);
        if (colSpan > 1) {
          columnDef.colSpan = colSpan;
        }
        addItems(column.columns, depth + 1);
      } else {
        const rowSpan = maxDepth - depth;
        if (rowSpan > 1) {
          columnDef.rowSpan = maxDepth - depth;
        }
      }
      result[depth].push(columnDef);
    });
  }
  addItems(columns, 0);

  return result;
}

export function getColumns(columns: ColumnDef[]) {
  const result: ColumnDef[] = [];

  function setColumns(column: ColumnDef) {
    if (column.columns == null) {
      result.push(column);
      return;
    }

    column.columns.forEach(child => setColumns(child));
  }
  columns.forEach(column => setColumns(column));

  return result;
}

export function getDepth(columns: ColumnDef[] | undefined) {
  if (columns == null) {
    return 0;
  }

  let depth = 0;
  columns.forEach(item => {
    depth = Math.max(depth, getDepth(item.columns));
  });

  return depth + 1;
}

export function getWidth(column: ColumnDef) {
  if (column.columns == null) {
    return 1;
  }

  let width = 0;
  column.columns.forEach(child => {
    width += getWidth(child);
  });

  return width;
}

export function isNil(obj: any) {
  return obj == null;
}

export function merge(...objects: any[]) {
  const [firstObj] = objects;
  const destination = isNil(firstObj) ? {} : firstObj;
  const existingObjects = objects.filter(source => !isNil(source));
  const sources = [destination].concat(existingObjects);

  return deepmerge.all(sources);
}
