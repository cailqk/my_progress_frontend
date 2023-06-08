import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { RoutesEnum } from "../../shared/utils/enums";
import { RootState } from "../../store";
import { logActions } from "../../store/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state: RootState) => state.user.loggedIn);

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
                <NavLink
                  className="nav-link"
                  onClick={logoutHandler}
                  to={RoutesEnum.login}
                >
                  Logout
                </NavLink>
              </div>
            )}
            {!logged && (
              <div className="navbar-nav position-absolute end-0">
                <NavLink className="nav-link" to={RoutesEnum.login}>
                  Login
                </NavLink>
                <NavLink className="nav-link" to={RoutesEnum.register}>
                  Register
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
