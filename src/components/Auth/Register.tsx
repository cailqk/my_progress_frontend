import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import Error from "../../shared/Error";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState<number>(0);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      dateOfBirth === "" ||
      height === 0
    ) {
      return;
    }

    const user = {
      name,
      email,
      password,
      gender,
      dateOfBirth,
      height,
    };

    await api.post("users", user).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        return;
      }
      navigate(RoutesEnum.login);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
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
              value={dateOfBirth}
              required
              onChange={(e) => setDateOfBirth(e.target.value)}
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
              onChange={(e) => setHeight(Number(e.target.value))}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <NavLink to={RoutesEnum.login}>
              Already have an account ?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
