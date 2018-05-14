import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import App from './App.jsx';


const StyledApp = ()=> {
  return (
      <MuiThemeProvider >
          <App/>
      </MuiThemeProvider>
  );
}

ReactDOM.render(
  <StyledApp />,
  document.getElementById('app')
);