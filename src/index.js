import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/context";
import {
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
