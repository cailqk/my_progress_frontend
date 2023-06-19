import { useState } from "react";
import Error from "../../shared/components/Error";

const ExerciseTypeCreate = () => {
  const [name, setName] = useState("");
  const [groups, setGroups] = useState([]);
  const [errors, setErrors] = useState([]);

  const exerciseType = {
    name,
    groups,
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-group">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-group">
              Muscle groups
            </label>
            <input
              type="text"
              className="form-control"
              id="muscleGroupsInput"
              required
              //   onChange={(e) => setGroups(e.target.value)}
            />
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
