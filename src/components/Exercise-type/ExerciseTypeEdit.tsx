import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../shared/components/Modal";
import { highlightField } from "../../shared/utils/highlightField";
import Error from "../../shared/components/Error";
import { Exercise_types } from "../../shared/utils/interfaces";
import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";

const ExerciseTypeEdit = () => {
  const { id } = useParams();
  const [exerciseType, setExerciseType] = useState({} as Exercise_types);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get(`exercise-type/${id}`).then((res) => {
      setExerciseType(res);
    });
  }, []);

  const editValue = (field: string, value: string) => {
    setExerciseType({
      ...exerciseType,
      [field]: value,
    });
    setEnableEdit(true);
  };

  const submitHandler = () => {
    setErrors([]);

    const edited = {
      name: exerciseType.name,
      muscleGroups: exerciseType.muscleGroups,
    };

    api.patch(`exercise-type/${id}`, { ...edited }).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        setEnableEdit(false);
        return;
      }

      setExerciseType({ ...exerciseType });
      navigate(RoutesEnum.exercise_types);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <Modal
          text="Are you sure you'd like to keep these changes ?"
          cancelButtonText={"Discard"}
          confirmButtonText={"Keep"}
          onConfirm={submitHandler}
        />
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${highlightField(errors, "name")}`}
              id="nameInput"
              value={exerciseType.name}
              onChange={(e) => {
                editValue("name", e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Muscle groups
            </label>
            <select
              className={`form-control ${highlightField(errors, "groups")}`}
              value={exerciseType.muscleGroups}
              multiple
            >
              {exerciseType.muscleGroups ? (
                exerciseType.muscleGroups.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))
              ) : (
                <p>No data</p>
              )}
            </select>
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

export default ExerciseTypeEdit;
