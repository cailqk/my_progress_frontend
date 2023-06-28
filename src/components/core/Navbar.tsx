import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { RoutesEnum } from "../../shared/utils/enums";
import { RootState } from "../../store";
import { logActions } from "../../store/user-slice";

import * as api from "../../requests/API";
import { User } from "../../shared/utils/interfaces";

const Navbar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: RootState) => state.user.loggedIn);
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, [logged]);

  const logoutHandler = () => {
    dispatch(logActions.logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="d-flex">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link active" to={RoutesEnum.home}>
              Home
            </NavLink>
            {logged && (
              <div className="navbar-nav position-absolute end-0">
                <NavLink className="nav-link" to={RoutesEnum.profile}>
                  Profile
                </NavLink>
                <NavLink className="nav-link" to={RoutesEnum.measurements}>
                  Measurements
                </NavLink>
                <NavLink className="nav-link" to={RoutesEnum.exercise_types}>
                  Exercise Types
                </NavLink>
                <NavLink className="nav-link" to={RoutesEnum.workouts}>
                  Workouts
                </NavLink>
                {user.role === "admin" && (
                  <NavLink className="nav-link" to={RoutesEnum.users}>
                    Users
                  </NavLink>
                )}
                <NavLink
                  className="nav-link"
                  onClick={logoutHandler}
                  to={RoutesEnum.login}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
