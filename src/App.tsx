import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/core";
import { Profile } from "./components/user";
import Spinner from "./shared/Spinner";
import { RoutesEnum } from "./shared/utils/enums";
import { RootState } from "./store";
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

  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

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
          <Route
            path={RoutesEnum.login}
            element={
              !isLoggedIn ? (
                <React.Suspense fallback={<Spinner />}>
                  <Login />
                </React.Suspense>
              ) : (
                <Navigate to={RoutesEnum.home} />
              )
            }
          ></Route>
          <Route
            path={RoutesEnum.register}
            element={
              !isLoggedIn ? (
                <React.Suspense fallback={<Spinner />}>
                  <Register />
                </React.Suspense>
              ) : (
                <Navigate to={RoutesEnum.home} />
              )
            }
          ></Route>
          <Route
            path={RoutesEnum.profile}
            element={
              isLoggedIn ? (
                <React.Suspense fallback={<Spinner />}>
                  <Profile />
                </React.Suspense>
              ) : (
                <Navigate to={RoutesEnum.login} />
              )
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
