import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../../store";
import { RoutesEnum } from "../../../shared/utils/enums";
import * as api from "../../../requests/API";
import { User } from "../../../shared/utils/interfaces";

import styles from "./Core.module.css";

const Home = () => {
  const [user, setUser] = useState({} as User);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <section className={styles.home}>
      {isLoggedIn ? (
        <>
          <h3>Hello {user.name}! Glad to see you again!</h3>
          <div className={styles.home_buttons}>
            <NavLink
              className="btn btn-success"
              to={RoutesEnum.measurements_create}
            >
              Log a Measurement
            </NavLink>

            <NavLink
              className="btn btn-success"
              to={RoutesEnum.workouts_create}
            >
              Log a Workout
            </NavLink>
          </div>
        </>
      ) : (
        <div>
          <div className={styles.main_div}>
            <h1>ShapeShifter</h1>
          </div>
          <p>
            Welcome to the app that helps you track your workouts and change
            your life.
          </p>
          <p>Log in or create your account and let's get started!</p>
          <div className={styles.home_buttons}>
            <NavLink className="btn btn-primary" to={RoutesEnum.login}>
              Login
            </NavLink>
            <NavLink className="btn btn-primary" to={RoutesEnum.register}>
              Register
            </NavLink>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
