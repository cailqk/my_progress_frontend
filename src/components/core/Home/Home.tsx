import "./Home.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { NavLink } from "react-router-dom";
import { RoutesEnum } from "../../../shared/utils/enums";
import * as api from "../../../requests/API";
import { User } from "../../../shared/utils/interfaces";

const Home = () => {
  const [user, setUser] = useState({} as User);
  const isLoggedIn = useSelector((state: RootState) => state.user.loggedIn);

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <section className="home">
      {isLoggedIn ? (
        <h3>Hello {user.name}! Glad to see you again!</h3>
      ) : (
        <div>
          <div style={{ margin: "2rem" }}>
            <h1>ShapeShifter</h1>
          </div>
          <p>
            Welcome to the app that helps you track your workouts and change
            your life.
          </p>
          <p>Log in or create your account and let's get started!</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "2rem",
            }}
          >
            <NavLink className="btn btn-primary" to={RoutesEnum.login}>
              Login
            </NavLink>
            <NavLink className="btn btn-primary" to={RoutesEnum.register}>
              Register
            </NavLink>
          </div>
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "3rem",
        }}
      ></div>
    </section>
  );
};

export default Home;
