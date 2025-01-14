import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/core";
import { Profile } from "./components/user";

import {
  LoggedInProtection,
  LoggedOutProtection,
} from "./shared/layouts/ProtectedRoutes";

import Spinner from "./shared/components/Spinner";
import { RoutesEnum } from "./shared/utils/enums";
import { logActions } from "./store/user-slice";
import MeasurementsList from "./components/Measurement-events/MeasurementsList";
import MeasurementsCreate from "./components/Measurement-events/MeasurementsCreate";
import MeasurementsEdit from "./components/Measurement-events/MeasurementsEdit";
import ExerciseTypeList from "./components/Exercise-type/ExerciseTypeList";
import ExerciseTypeCreate from "./components/Exercise-type/ExerciseTypeCreate";
import ExerciseTypeEdit from "./components/Exercise-type/ExerciseTypeEdit";
import WorkoutCreate from "./components/Workouts/WorkoutCreate";
import WorkoutList from "./components/Workouts/WorkoutList";
import WorkoutEdit from "./components/Workouts/WorkoutEdit";
import ShowUsers from "./components/Admin/ShowUsers";
import EditUser from "./components/Admin/EditUser";

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
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.measurements}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <MeasurementsList />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.measurements_create}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <MeasurementsCreate />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.measurements_edit}/:id`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <MeasurementsEdit />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.exercise_types}`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <ExerciseTypeList />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.exercise_types_create}`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <ExerciseTypeCreate />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.exercise_types_edit}/:id`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <ExerciseTypeEdit />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.workouts}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <WorkoutList />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.workouts_create}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <WorkoutCreate />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.workouts_edit}/:id`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <WorkoutEdit />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={RoutesEnum.users}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <ShowUsers />
                </React.Suspense>
              }
            />
          </Route>
          <Route element={<LoggedOutProtection />}>
            <Route
              path={`${RoutesEnum.user_edit}/:id`}
              element={
                <React.Suspense fallback={<Spinner />}>
                  <EditUser />
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
