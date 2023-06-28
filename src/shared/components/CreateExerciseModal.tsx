import { useEffect, useState } from "react";
import * as api from "../../requests/API";
import { Exercise_types } from "../utils/interfaces";

export const CreateExerciseModal = (props: any) => {
  const [exTypes, setExtypes] = useState<Exercise_types[]>([]);
  const [exerciseType, setexerciseType] = useState<string>("");
  const [series, setSeries] = useState<number>(1);
  const [repetitions, setRepetitions] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [time, setTime] = useState<number>();
  const [distance, setDistance] = useState<number>();

  const exercise = {
    exerciseType,
    series,
    repetitions,
    weight,
    time,
    distance,
  };

  const addExercise = async () => {
    await api.post("exercises", exercise).then((res) => {
      setexerciseType("");
      setSeries(1);
      setRepetitions(undefined);
      setWeight(undefined);
      setTime(undefined);
      setDistance(undefined);
      
      const exTypeInformation = exTypes.find(
        (type) => type._id === res.data.exerciseType
      );

      res.data.name = exTypeInformation?.name;
      props.onAdd(res.data);
    });
  };

  useEffect(() => {
    api.get("exercise-type").then((res) => {
      setExtypes(res);
    });
  }, []);

  function sortedExTypes() {
    return exTypes
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((type) => {
        return (
          <option key={type._id} value={type._id}>
            {type.name}
          </option>
        );
      });
  }

  const renderForCardio = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="name" className="form-group">
            Time (min)
          </label>
          <input
            type="number"
            className="form-control"
            id="timeInput"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-group">
            Distance (km)
          </label>
          <input
            type="number"
            className="form-control"
            id="distanceInput"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
        </div>
      </>
    );
  };

  const renderForWeight = () => {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="name" className="form-group">
            Repetitions
          </label>
          <input
            type="number"
            className="form-control"
            id="repsInput"
            value={repetitions}
            onChange={(e) => setRepetitions(Number(e.target.value))}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-group">
            Weight (kg)
          </label>
          <input
            type="number"
            className="form-control"
            id="weightInput"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
          />
        </div>
      </>
    );
  };

  return (
    <div
      className="modal fade"
      id="modal"
      aria-labelledby="modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <strong>Create Exercise</strong>
          </div>
          <div className="modal-body">
            <div className="row mt-5">
              <div className="col-md-5 offset-md-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-group">
                      Exercise type*
                    </label>
                    <select
                      className="form-select"
                      value={exerciseType}
                      onChange={(e) => setexerciseType(e.target.value)}
                    >
                      <option></option>
                      {sortedExTypes()}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-group">
                      Series*
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="seriesInput"
                      value={series}
                      onChange={(e) => setSeries(Number(e.target.value))}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
            >
              {props.cancelButtonText}
            </button>
            <button
              type="submit"
              className="btn btn-outline-success"
              onClick={addExercise}
              data-bs-dismiss="modal"
            >
              {props.confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
