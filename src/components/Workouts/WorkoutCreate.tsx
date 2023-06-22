import { useEffect, useState } from "react";
import { CreateExerciseModal } from "../../shared/components/CreateExerciseModal";
import { User } from "../../shared/utils/interfaces";
import * as api from "../../requests/API";
import { dateParser } from "../../shared/utils/dateFunctions";

const WorkoutCreate = () => {
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        <CreateExerciseModal
          cancelButtonText="Dismiss"
          confirmButtonText="Confirm"
        />
        <div className="card">
          <div className="card-body">
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
                  value={user.name}
                  disabled
                />
              </div>
              <hr></hr>
              <div className="mb-3">
                <label htmlFor="name" className="form-group">
                  Exercises
                </label>
                <ul></ul>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#modal"
                >
                  *Add Exercise*
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-group">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateInput"
                  max={dateParser(new Date())}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCreate;
