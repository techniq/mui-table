export function getHeaders(columns) {
  const maxDepth = getDepth(columns, 'columns');
  const result = Array.from({ length: maxDepth }).map(i => []);

  function addItems(columns, depth) {
    columns.forEach(column => {
      const columnDef = { ...column };
      delete columnDef.columns;

      if (column.columns) {
        const colSpan = getWidth(column, 'columns');
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

export function getColumns(columns) {
  const result = [];

  function setColumns(column) {
    if (column.columns == null) {
      result.push(column);
      return;
    }

    column.columns.forEach(child => setColumns(child));
  }
  columns.forEach(column => setColumns(column));

  return result;
}

export function getDepth(arr, childProp) {
  if (arr == null) {
    return 0;
  }

  let depth = 0;
  arr.forEach(item => {
    depth = Math.max(depth, getDepth(item[childProp], childProp));
  });

  return depth + 1;
}

export function getWidth(item, childProp) {
  if (item[childProp] == null) {
    return 1;
  }

  let width = 0;
  item[childProp].forEach(child => {
    width += getWidth(child, childProp);
  });

  return width;
}
