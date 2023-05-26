import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logActions } from "../../store/user-slice";
import { useDispatch } from "react-redux";

import * as api from "../../requests/API";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      return window.alert("Please fill all the fields!");
    }

    const token = await api.post("auth", {
      email: email,
      password: password,
    });

    localStorage.setItem("token", token["access_token"]);
    dispatch(logActions.toggle())
    navigate("/");
  };

  return (
    <div className="row">
      <div className="col-md-5 offset-md-3">
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
            <a style={{cursor:'pointer'}}>Don't have an account ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
