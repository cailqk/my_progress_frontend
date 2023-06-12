import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/core";
import { Profile } from "./components/user";

import {
  LoggedInProtection,
  LoggedOutProtection,
} from "./shared/ProtectedRoutes";

import Spinner from "./shared/Spinner";
import { RoutesEnum } from "./shared/utils/enums";
import { logActions } from "./store/user-slice";

const Home = React.lazy(() => import("./components/core/Home/Home"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Register = React.lazy(() => import("./components/Auth/Register"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(logActions.toggle());
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path={RoutesEnum.home}
            element={
              <React.Suspense fallback={<Spinner />}>
                <Home />
              </React.Suspense>
            }
          ></Route>
          <Route element={<LoggedInProtection />}>
            <Route
              path={RoutesEnum.login}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <Login />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedInProtection />}>
            <Route
              path={RoutesEnum.register}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <Register />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.profile}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <Profile />
                </React.Suspense>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
