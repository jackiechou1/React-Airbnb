import { Navigate } from "react-router-dom";
import React from "react";
const Home = React.lazy(() => import("@/views/home"));
const Entire = React.lazy(() => import("@/views/entire"));
const Login = React.lazy(() => import("@/views/login"));
const Register = React.lazy(() => import("@/views/register"));
const Profile = React.lazy(() => import("@/views/profile"));
const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/entire",
    element: <Entire />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];

export default routes;
