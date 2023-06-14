import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dateParser, maxDate, minDate } from "../../shared/utils/dateFunctions";
import * as api from "../../requests/API";
import { User } from "../../shared/utils/interfaces";
import { RoutesEnum } from "../../shared/utils/enums";
import Error from "../../shared/components/Error";
import { highlightField } from "../../shared/utils/highlightField";
import { Modal } from "../../shared/components/Modal";

const Profile = () => {
  const [user, setUser] = useState({} as User);
  const [errors, setErrors] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  const editValue = (field: string, value: string | number | Date) => {
    setUser({
      ...user,
      [field]: value,
    });
    setEnableEdit(true);
  };

  const submitHandler = () => {
    setErrors([]);

    const updated = {
      name: user.name,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      height: user.height,
    };

    api.patch(`users/${user._id}`, { ...updated }).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        setEnableEdit(false);
        return;
      }

      setUser({ ...user });
      navigate(RoutesEnum.home);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <Modal
          text={"Are you sure you'd like to keep the changes?"}
          onConfirm={submitHandler}
          cancelButtonText={"Cancel"}
          confirmButtonText={"Save changes"}
        />
        <form>
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
              className={`form-control ${highlightField(errors, "name")}`}
              id="nameInput"
              value={user.name}
              onChange={(e) => {
                editValue("name", e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <select
              className={`form-control ${highlightField(errors, "gender")}`}
              name="gender"
              id="gender"
              value={user.gender}
              onChange={(e) => {
                editValue("gender", e.target.value);
              }}
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
              className={`form-control ${highlightField(
                errors,
                "dateOfBirth"
              )}`}
              id="dateOfBirthInput"
              value={dateParser(user.dateOfBirth)}
              min={dateParser(minDate)}
              max={dateParser(new Date(maxDate()))}
              onChange={(e) => {
                editValue("dateOfBirth", new Date(e.target.value));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Height
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "height")}`}
              id="heightInput"
              value={user.height}
              min={110}
              max={230}
              onChange={(e) => {
                editValue("height", Number(e.target.value));
              }}
            />
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-outline-dark"
          disabled={!enableEdit}
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Profile;
