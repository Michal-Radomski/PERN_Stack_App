import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
