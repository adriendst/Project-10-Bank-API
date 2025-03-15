import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Root from './Root/Root';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import User from './User/User';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
/*     errorElement: <ErrorPage />,
 */    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/user",
        element: <User />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
