import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logActions } from "../../store/user-slice";
import * as api from "../../requests/API";
import { Error } from "../core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showError, setshowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill all the fields!");
      setshowError(true);
      return;
    }

    await api
      .post("auth", {
        email,
        password,
      })
      .then((res) => {
        if (res.statusCode || res === undefined) {
          setPassword("");
          setError(res.message);
          setshowError(true);
          return;
        }
        localStorage.setItem("token", res["access_token"]);
        dispatch(logActions.toggle());
        navigate("/");
      });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        <div className={showError ? "mb-5 visible" : "invisible"}>
          <Error error={error} />
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
            <NavLink style={{ cursor: "pointer" }} to="/register">
              Don't have an account ?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
