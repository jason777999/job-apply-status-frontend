import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "react-notifications/lib/notifications.css";
import "./react-notification.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-perfect-scrollbar/dist/css/styles.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
