import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import { getUsers } from "./actions/users.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
);

store.dispatch(getUsers());

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
