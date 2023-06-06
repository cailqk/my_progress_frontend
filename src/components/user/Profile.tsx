import { useState, useEffect } from "react";
import { dateParser } from "../../shared/dateParser";
import * as api from "../../requests/API";
import { User } from "../../shared/interfaces";
import { Error } from "../core";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({} as User);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO create a modal here asking if the changes should be set

    if(confirm('Are you sure?')) {

      const updated = {
        name: user.name,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        height: user.height,
      };
      
      api.patch(`users/${user._id}`, { ...updated }).then((res) => {
        if (res.statusCode === 400) {
          setErrors(res.message);
          r
        }
        
        setUser({ ...user });
        navigate("/");
      });
    }
    };
    
    return (
      <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <form onSubmit={submitHandler}>
        <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={user.email}
              readOnly
              disabled
              // onChange={(e) => {
              //   setUser({
              //     ...user,
              //     email: e.target.value,
              //   });
              // }}
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
              readOnly
              disabled
            />
          </div>
          <hr></hr>
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
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              name="gender"
              id="gender"
              value={user.gender}
              onChange={(e) =>
                setUser({
                  ...user,
                  gender: e.target.value,
                })
              }
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
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
