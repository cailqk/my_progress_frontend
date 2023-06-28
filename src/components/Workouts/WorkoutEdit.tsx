import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Exercise_types } from "../../shared/utils/interfaces";
import * as api from "../../requests/API";
import { dateParser } from "../../shared/utils/dateFunctions";
import { Modal } from "../../shared/components/Modal";
import Error from "../../shared/components/Error";

const WorkoutEdit = () => {
  const { id } = useParams();
  const [names, setNames] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    api.get(`workout/${id}`).then((res) => {
      setDate(res[0].date);
      setNames(res[0].found_exType.map((el: Exercise_types) => `${el.name}`));
    });
  }, []);

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {/* {errors.length > 0 && <Error error={errors} />} */}
        {/* <Modal
        text="Are you sure you'd like to keep these changes ?"
        cancelButtonText={"Discard"}
        confirmButtonText={"Keep"}
        onConfirm={}
      /> */}
        <form>
          <div className="mb-3">
            <label htmlFor="exercisesInput" className="form-label">
              Exercises
            </label>
            {names.map((el) => (
              <input type="text" className={`form-control`} value={el}></input>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">
              Date
            </label>
            <input
              type="date"
              className={`form-control`}
              id="dateInput"
              value={dateParser(new Date(date))}
              required
            />
          </div>
        </form>
        <button
          type="submit"
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

export default WorkoutEdit;
