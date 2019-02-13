import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

addDecorator(storyFn => (
  <CssBaseline>
    <MuiThemeProvider theme={theme}>
      {storyFn()}
    </MuiThemeProvider>
  </CssBaseline>
));

function loadStories() {
  require('../stories/basic');
}

configure(loadStories, module);
