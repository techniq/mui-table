import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme();

addDecorator(storyFn => (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>
  </CssBaseline>
));

addParameters({
  options: {
    storySort: (a, b) => {
      // Always place Props at bottom
      if (a[1].kind === 'Props') {
        return 1;
      }

      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
  },
});
