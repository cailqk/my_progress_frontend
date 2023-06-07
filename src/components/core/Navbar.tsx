import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { logActions } from "../../store/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = useSelector((state: RootState) => state.user.loggedIn);

  const logoutHandler = () => {
    dispatch(logActions.logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="d-flex">
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link active" to="/">
              Home
            </NavLink>
            {logged && (
              <div className="navbar-nav position-absolute end-0">
                <NavLink className="nav-link" to="/measurements">
                  Measurements
                </NavLink>
                <a className="nav-link" onClick={logoutHandler}>
                  Logout
                </a>
              </div>
            )}
            {!logged && (
              <div className="navbar-nav position-absolute end-0">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/register">
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
