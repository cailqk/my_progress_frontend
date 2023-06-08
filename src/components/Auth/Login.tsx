import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logActions } from "../../store/user-slice";
import * as api from "../../requests/API";
import { Error } from "../core";
import { RoutesEnum } from "../../shared/utils/enums";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage(true);
      return;
    }

    const token = await api.post("auth", {
      email,
      password,
    });

    if (token.statusCode && token.statusCode !== 200) {
      setPassword("");
      setErrorMessage(true);
      return;
    }

    localStorage.setItem("token", token["access_token"]);
    dispatch(logActions.toggle());
    navigate(RoutesEnum.home);
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        <div className={errorMessage ? "mb-5 visible" : "invisible"}>
          <Error error={"Incorrect data!"} />
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
            <NavLink to={RoutesEnum.register}>
              Don't have an account ?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
