import { useState, useEffect } from "react";
import { dateParser } from "../../shared/dateParser";
import * as api from "../../requests/API";
import { User } from "../../shared/interfaces";
import { Error } from "../core";

const Profile = () => {
  const [user, setUser] = useState({} as User);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO place a dialog here asking if the changes should be sent

    api.patch(`users/${user._id}`, { ...user }).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        setUser({...user});
        return;
      }
      return res;
    });

    return;
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
              value={user.name}
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
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
              value={user.email}
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="roleInput" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="roleInput"
              value={user.role}
              required
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <input
              type="text"
              className="form-control"
              id="genderInput"
              value={user.gender}
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  gender: e.target.value,
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirthInput" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirthInput"
              value={dateParser(user.dateOfBirth)}
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  dateOfBirth: new Date(e.target.value),
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Height
            </label>
            <input
              type="number"
              className="form-control"
              id="heightInput"
              value={user.height}
              required
              onChange={(e) => {
                setUser({
                  ...user,
                  height: Number(e.target.value),
                });
              }}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
