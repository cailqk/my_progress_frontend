import { useState } from "react";
import * as api from "../../requests/API";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || pass === "") {
      return window.alert("Please fill all the fields!");
    }
    await api.post("auth", {
      email: email,
      password: pass,
    });

    setEmail("");
    setPass("");
  };

  return (
    <div className="row">
      <div className="col-md-5 offset-md-3">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="******"
              onChange={(e: any) => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div>
            <a>Don't have an account ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
