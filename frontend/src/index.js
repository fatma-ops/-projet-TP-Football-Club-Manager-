import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Routes/errorPage";
import Home from "./Routes/Home";
import Login from './Routes/Login';
import Register from './Routes/Register';
import User from "./Routes/User";
import Admin from './Routes/Admin';

const rooting = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <ErrorPage/>,
    },

    {
      path: "/login",
      element: <Login/>,
      errorElement: <ErrorPage/>,
    },
    {
      path: "/register",
      element: <Register/>,
      errorElement: <ErrorPage/>,
    },

  {
      path: "/user",
      element: <User/>,
      errorElement: <ErrorPage/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
    errorElement: <ErrorPage/>,
}
    path: "*",
    element: <ErrorPage/>,
  }

  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rooting}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
