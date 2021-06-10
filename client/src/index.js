import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./App";
import reducers from "./reducers";
import theme from "./theme";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);
ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <ColorModeScript theme={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
