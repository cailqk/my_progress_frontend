import { useEffect, useState } from "react";
import { CreateExerciseModal } from "../../shared/components/CreateExerciseModal";
import { Exercise, User } from "../../shared/utils/interfaces";
import * as api from "../../requests/API";
import { dateParser } from "../../shared/utils/dateFunctions";
import Error from "../../shared/components/Error";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../shared/utils/enums";

const WorkoutCreate = () => {
  const [user, setUser] = useState({} as User);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [date, setDate] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  const addExercise = (info: any) => {
    setExercises((prevState) => [...prevState, info]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises((prevState) => {
      const updatedExercises = prevState.filter(
        (exercise) => exercise._id !== exerciseId
      );
      return updatedExercises;
    });
  };

  const exercisesIds = exercises.map((el) => el._id);

  const info = exercises.map((ex: Exercise) => {
    return (
      <li key={ex._id}>
        {`${ex.name} - ${ex.series} series`}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            removeExercise(ex._id);
          }}
        >
          X
        </button>
      </li>
    );
  });

  const workout = {
    user: user._id,
    exer: exercisesIds,
    date,
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.post("workout", workout).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);

        return;
      }
      navigate(RoutesEnum.workouts);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <CreateExerciseModal
          cancelButtonText="Dismiss"
          confirmButtonText="Confirm"
          onAdd={(el: any) => addExercise(el)}
        />
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-group">
              Exercises
            </label>
            <ul>{exercises.length ? info : <p>No Exercises</p>}</ul>
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
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

export default WorkoutCreate;
