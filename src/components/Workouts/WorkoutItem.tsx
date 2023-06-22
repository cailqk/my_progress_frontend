import { dateParser } from "../../shared/utils/dateFunctions";
import { Workout } from "../../shared/utils/interfaces";

import styles from "./Workout.module.css";

const WorkoutItem = (props: { workout: Workout[] }) => {
  const sortedWorkouts = props.workout.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <table className={`table table-striped`}>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Exercises</th>
        </tr>
      </thead>
      <tbody>
        {props.workout.length &&
          sortedWorkouts.map((w: Workout) => {
            return (
              <tr key={w._id}>
                <td>{dateParser(w.date)}</td>
                <td>{w.exer}</td>
                <td className={styles.buttons}>
                  <button className="btn btn-success">Edit</button>
                  <button
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target="#modal"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default WorkoutItem;
