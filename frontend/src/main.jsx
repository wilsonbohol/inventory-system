import React from "react";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from "./routes";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Context from "./context";

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>

      <Provider store={store}>
       
        <RouterProvider router={router} />
        {/**this is the router provider */}
       
        </Provider>
  </React.StrictMode>
)
