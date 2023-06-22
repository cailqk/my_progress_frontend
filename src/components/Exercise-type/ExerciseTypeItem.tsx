import { Modal } from "../../shared/components/Modal";
import { RoutesEnum } from "../../shared/utils/enums";
import * as api from "../../requests/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Exercise_types } from "../../shared/utils/interfaces";
import { User } from "../../shared/utils/interfaces";

import styles from "./ExerciseType.module.css";

const ExerciseTypeItem = (props: {
  types: Exercise_types[];
  reloadTypes: () => void;
  user: User;
}) => {
  const [id, setId] = useState<string>("");
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    api.del(`exercise-type/${id}`).then(() => {
      props.reloadTypes();
    });
  };

  const editHandler = (id: string) => {
    navigate(`${RoutesEnum.exercise_types_edit}/${id}`);
  };

  function sortMuscleGroups(array: string[]): string {
    return array.sort((a: string, b: string) => a.localeCompare(b)).join(", ");
  }

  function sortExerciseTypes(types: Exercise_types[]): JSX.Element[] {
    const sortedTypes = types
      .sort((a: Exercise_types, b: Exercise_types) =>
        a.name.localeCompare(b.name)
      )
      .map((type: Exercise_types) => {
        return (
          <tr key={type._id}>
            <td className={styles.centered_text}>{type.name}</td>
            <td className={styles.centered_text}>
              {sortMuscleGroups(type.muscleGroups)}
            </td>
            <td
              className={styles.buttons}
              hidden={props.user.role === "admin" ? false : true}
            >
              <button
                className="btn btn-success"
                onClick={() => editHandler(type._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target="#modal"
                onClick={() => setId(type._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    return sortedTypes;
  }

  return (
    <>
      <Modal
        text={"Are you sure you want to delete this exercise type ?"}
        onConfirm={() => deleteHandler(id)}
        cancelButtonText={"No"}
        confirmButtonText={"Yes"}
      />
      <table className={`table table-striped`}>
        <thead>
          <tr>
            <th scope="col" className={styles.centered_text}>
              Name
            </th>
            <th scope="col" className={styles.centered_text}>
              Muscle groups
            </th>
          </tr>
        </thead>
        <tbody>{props.types.length && sortExerciseTypes(props.types)}</tbody>
      </table>
    </>
  );
};

export default ExerciseTypeItem;
