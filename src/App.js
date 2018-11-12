import React, { Component } from "react";
import logo from "./logo.svg";
import Home from "./views/Home";
import { MuiThemeProvider,createMuiTheme } from "@material-ui/core";
import "./App.css";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducer";
import { indigo, deepPurple, red } from '@material-ui/core/colors';

const store = createStore(reducers, applyMiddleware(thunk));

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepPurple,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Home />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
