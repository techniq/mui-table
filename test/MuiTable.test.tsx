import React from 'react';
import * as ReactDOM from 'react-dom';
import MuiTable from '../src/index';

describe('MuiTable', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MuiTable data={null} columns={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
