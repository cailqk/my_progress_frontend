import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, Spinner } from "./components/core";
import Measurements from "./components/Measurement-events/MeasurementsList";

const Home = React.lazy(() => import("./components/core/Home"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Register = React.lazy(() => import("./components/Auth/Register"));

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Home />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Login />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Register />
              </React.Suspense>
            }
          ></Route>
            <Route
            path="/measurements"
            element={
              <React.Suspense fallback={<Spinner />}>
                <Measurements />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
