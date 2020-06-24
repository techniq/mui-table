import {
  getDepth,
  getWidth,
  getHeaders,
  getColumns,
  isNil,
  merge,
} from '../src/utils';

describe('getDepth', () => {
  it('flat', () => {
    const columns = [
      {
        name: 'name',
      },
      { name: 'age' },
      {
        name: 'job',
      },
    ];

    const actual = getDepth(columns);
    expect(actual).toBe(1);
  });

  it('nested', () => {
    const columns = [
      {
        name: 'name',
        columns: [
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' },
        ],
      },
      { name: 'age' },
      {
        name: 'job',
        columns: [
          { name: 'jobTitle', header: 'title' },
          { name: 'jobArea', header: 'area' },
        ],
      },
    ];

    const actual = getDepth(columns);
    expect(actual).toBe(2);
  });

  it('deeply nested', () => {
    const columns = [
      {
        name: 'name',
        columns: [
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' },
        ],
      },
      {
        name: 'job',
        columns: [
          { name: 'jobTitle', header: 'title' },
          { name: 'jobArea', header: 'area', columns: [{ name: 'position' }] },
        ],
      },
      { name: 'age' },
    ];

    const actual = getDepth(columns);
    expect(actual).toBe(3);
  });
});

describe('getWidth', () => {
  it('flat', () => {
    const columns = [{ name: 'name' }, { name: 'age' }, { name: 'job' }];

    expect(getWidth(columns[0])).toBe(1);
    expect(getWidth(columns[1])).toBe(1);
    expect(getWidth(columns[2])).toBe(1);
  });

  it('nested', () => {
    const columns = [
      {
        name: 'name',
        columns: [
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' },
        ],
      },
      { name: 'age' },
      {
        name: 'job',
        columns: [
          { name: 'jobTitle', header: 'title' },
          { name: 'jobArea', header: 'area' },
        ],
      },
    ];

    expect(getWidth(columns[0])).toBe(2);
    expect(getWidth(columns[1])).toBe(1);
    expect(getWidth(columns[2])).toBe(2);
  });

  it('deeply nested', () => {
    const columns = [
      {
        name: 'name',
        columns: [
          { name: 'firstName', header: 'First Name' },
          { name: 'lastName', header: 'Last Name' },
        ],
      },
      {
        name: 'job',
        columns: [
          { name: 'jobTitle', header: 'title' },
          {
            name: 'jobArea',
            header: 'area',
            columns: [{ name: 'position' }, { name: 'location' }],
          },
        ],
      },
      { name: 'age' },
    ];

    expect(getWidth(columns[0])).toBe(2);
    expect(getWidth(columns[1])).toBe(3);
    expect(getWidth(columns[2])).toBe(1);
  });
});

describe('getHeaderRows', () => {
  it('flat', () => {
    const columns = [
      { name: 'firstName', header: 'First Name' },
      { name: 'lastName', header: 'Last Name' },
      { name: 'age' },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ];

    const expected = [
      [
        { name: 'firstName', header: 'First Name' },
        { name: 'lastName', header: 'Last Name' },
        { name: 'age' },
        { name: 'jobTitle', header: 'Job Title' },
        { name: 'jobArea', header: 'Job Area' },
      ],
    ];

    const actual = getHeaders(columns);
    expect(actual.length).toBe(1);
    expect(actual).toMatchObject(expected);
  });

  it('nested columns', () => {
    const columns = [
      {
        name: 'Person',
        columns: [
          {
            name: 'Name',
            columns: [{ name: 'First' }, { name: 'Last' }],
          },
          { name: 'Age' },
          {
            name: 'Job',
            columns: [{ name: 'Position' }, { name: 'Location' }],
          },
        ],
      },
      {
        name: 'Id',
      },
    ];

    const expected = [
      [
        {
          name: 'Person',
          colSpan: 5,
        },
        {
          name: 'Id',
          rowSpan: 3,
        },
      ],
      [
        { name: 'Name', colSpan: 2 },
        { name: 'Age', rowSpan: 2 },
        { name: 'Job', colSpan: 2 },
      ],
      [
        { name: 'First' },
        { name: 'Last' },
        { name: 'Position' },
        { name: 'Location' },
      ],
    ];

    const actual = getHeaders(columns);
    expect(actual.length).toBe(3);
    expect(actual[0].length).toBe(2);
    expect(actual[1].length).toBe(3);
    expect(actual[2].length).toBe(4);

    expect(actual).toMatchObject(expected);
  });
});

describe('getColumns', () => {
  it('flat', () => {
    const columns = [
      { name: 'firstName', header: 'First Name' },
      { name: 'lastName', header: 'Last Name' },
      { name: 'age' },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ];

    const expected = [
      { name: 'firstName', header: 'First Name' },
      { name: 'lastName', header: 'Last Name' },
      { name: 'age' },
      { name: 'jobTitle', header: 'Job Title' },
      { name: 'jobArea', header: 'Job Area' },
    ];

    const actual = getColumns(columns);
    expect(actual.length).toBe(5);
    expect(actual).toMatchObject(expected);
  });

  it('nested columns', () => {
    const columns = [
      {
        name: 'Person',
        columns: [
          {
            name: 'Name',
            columns: [{ name: 'First' }, { name: 'Last' }],
          },
          { name: 'Age' },
          {
            name: 'Job',
            columns: [{ name: 'Position' }, { name: 'Location' }],
          },
        ],
      },
      {
        name: 'Id',
      },
    ];

    const expected = [
      { name: 'First' },
      { name: 'Last' },
      { name: 'Age' },
      { name: 'Position' },
      { name: 'Location' },
      { name: 'Id' },
    ];

    // const actual = [];
    // columns.forEach(column => setColumns(actual, column));
    const actual = getColumns(columns);
    expect(actual.length).toBe(6);
    expect(actual).toMatchObject(expected);
  });
});

describe('isNil', () => {
  it('should be true for null and undefined values, false otherwise', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
    expect(isNil({})).toBe(false);
    expect(isNil(1)).toBe(false);
    expect(isNil(true)).toBe(false);
    expect(isNil(false)).toBe(false);
  });
});

describe('merge', () => {
  it('should merge all passed sources', () => {
    const actual = merge(
      {},
      { className: 'myClass' },
      {
        nested: {
          prop1: 1,
          prop2: [1, 2],
        },
        deep_nested: {
          prop1: { id: 1, value: 'value' },
        },
      },
      {
        nested: {
          prop1: 2,
          prop2: [3, 4],
        },
        deep_nested: {
          prop1: { id: 2, value: 'value', extra: 'extra' },
        },
        extraProp: {
          id: 3,
        },
      }
    );

    const expected = {
      className: 'myClass',
      nested: {
        prop1: 2,
        prop2: [1, 2, 3, 4],
      },
      deep_nested: {
        prop1: { id: 2, value: 'value', extra: 'extra' },
      },
      extraProp: {
        id: 3,
      },
    };

    expect(actual).toMatchObject(expected);
  });
});
