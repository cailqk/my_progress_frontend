import { useState } from "react";
import { dateParser } from "../../shared/utils/dateFunctions";
import { Exercise_types, Workout } from "../../shared/utils/interfaces";
import * as api from "../../requests/API";
import { Modal } from "../../shared/components/Modal";

import styles from "./Workout.module.css";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../shared/utils/enums";

const WorkoutItem = (props: {
  workout: Workout[];
  reloadWorkouts: () => void;
}) => {
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    api.del(`workout/${id}`).then(() => {
      props.reloadWorkouts();
    });
  };

  const editHandler = (id: string) => {
    navigate(`${RoutesEnum.workouts_edit}/${id}`);
  };

  const sortedWorkouts = props.workout
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((w: Workout) => {
      const names = w.found_exType
        .map((el: Exercise_types) => el.name)
        .join(", ");

      return (
        <tr key={w._id}>
          <td>{dateParser(w.date)}</td>
          <td>{names}</td>
          <td className={styles.buttons}>
            <button
              className="btn btn-success"
              onClick={() => editHandler(w._id)}
            >
              Details
            </button>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              onClick={() => setId(w._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  return (
    <>
      <Modal
        text={"Are you sure you want to delete this workout ?"}
        onConfirm={() => deleteHandler(id)}
        cancelButtonText={"No"}
        confirmButtonText={"Yes"}
      />
      <table className={`table table-striped`}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Exercises</th>
          </tr>
        </thead>
        <tbody>{props.workout.length && sortedWorkouts}</tbody>
      </table>
    </>
  );
};

export default WorkoutItem;
