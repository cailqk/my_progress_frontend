import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../requests/API";
import { dateParser, maxDate } from "../../shared/utils/dateFunctions";
import { highlightField } from "../../shared/utils/highlightField";
import { User } from "../../shared/utils/interfaces";
import Error from "../../shared/components/Error";
import { Modal } from "../../shared/components/Modal";
import { RoutesEnum } from "../../shared/utils/enums";

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({} as User);
  const [errors, setErrors] = useState([]);
  const [enableEdit, setEnableEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`users/${id}`).then((res) => {
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

    const edited = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      role: user.role,
      dateOfBirth: user.dateOfBirth,
      height: user.height,
    };

    api.patch(`users/${user._id}`, { ...edited }).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        setEnableEdit(false);
        return;
      }
      setUser({ ...user });
      navigate(RoutesEnum.users);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <Modal
          text="Are you sure you'd like to keep these changes ?"
          onConfirm={submitHandler}
          cancelButtonText={"Discard"}
          confirmButtonText={"Keep"}
        />
        <form>
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
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${highlightField(errors, "email")}`}
              id="emailInput"
              value={user.email}
              onChange={(e) => {
                editValue("email", e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genderInput" className="form-label">
              Gender
            </label>
            <select
              className={`form-control ${highlightField(errors, "gender")}`}
              id="genderInput"
              value={user.gender}
              required
              onChange={(e) => {
                editValue("gender", e.target.value);
              }}
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="roleInput" className="form-label">
              Role
            </label>
            <select
              className={`form-control ${highlightField(errors, "role")}`}
              id="roleInput"
              value={user.role}
              required
              onChange={(e) => {
                editValue("role", e.target.value);
              }}
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className={`form-control ${highlightField(errors, "date")}`}
              id="dateInput"
              value={dateParser(user.dateOfBirth)}
              max={dateParser(new Date(maxDate()))}
              onChange={(e) => {
                editValue("dateOfBirth", new Date(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="heightInput" className="form-label">
              Height(cm)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "height")}`}
              id="heightInput"
              value={user.height}
              onChange={(e) => {
                editValue("height", Number(e.target.value));
              }}
              required
            />
          </div>
        </form>
        <button
          type="submit"
          disabled={!enableEdit}
          className="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUser;
