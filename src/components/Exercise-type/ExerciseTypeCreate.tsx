import { useState } from "react";
import Error from "../../shared/components/Error";
import * as api from "../../requests/API";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../shared/utils/enums";
import { highlightField } from "../../shared/utils/highlightField";
import { groups } from "../../shared/utils/interfaces";

const ExerciseTypeCreate = () => {
  const [name, setName] = useState<string>("");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const exerciseType = {
    name,
    muscleGroups,
  };

  const groupChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions: string[] = Array.from(
      e.target.options as unknown as HTMLOptionElement[]
    )
      .filter((option) => option.selected)
      .map((option) => option.value);
    setMuscleGroups(selectedOptions);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.post("exercise-type", exerciseType).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        return;
      }
      navigate(RoutesEnum.exercise_types);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-group">
              Name
            </label>
            <input
              type="text"
              className={`form-control ${highlightField(errors, "name")}`}
              id="nameInput"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="groups" className="form-group">
              Muscle groups
            </label>
            <select
              className={`form-control ${highlightField(errors, "groups")}`}
              value={muscleGroups}
              onChange={groupChangeHandler}
              multiple
            >
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseTypeCreate;
