import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [height, setHeight] = useState("");

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
      window.alert("Please fill all the fields");
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
      console.log(res);
      navigate("/login");
    });
  };

  return (
    <div className="row">
      <div className="col-md-5 offset-md-3">
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
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              name="gender"
              id="gender"
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
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <a>Already have an account ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
