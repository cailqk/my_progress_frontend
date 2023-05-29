import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import Error from "../core/Error";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [height, setHeight] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      name == "" ||
      email == "" ||
      password == "" ||
      gender == "" ||
      date == "" ||
      height == ""
    ) {
      setShow(true);
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      gender: gender,
      dateOfBirth: date,
      height: Number(height),
    };

    await api.post("users", user).then((res) => {
      if (res.statusCode !== 200) {
        console.log(res);
        setShow(true);
        if (Array.isArray(res.message)) {
          res.message.forEach((el: string) => {
            setErr(el + "\n");
          });
        }
        setErr(res.message);
        return err;
      }
      navigate("/login");
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        <div className={show === true ? "mb-5 visible" : "invisible"}>
          <Error error={err} />
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              name="gender"
              id="gender"
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=""></option>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateInput"
              aria-describedby="emailHelp"
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="heightInput" className="form-label">
              Height
            </label>
            <input
              type="number"
              className="form-control"
              id="heightInput"
              aria-describedby="emailHelp"
              value={height}
              required
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <NavLink style={{ cursor: "pointer" }} to="/login">
              Already have an account ?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
