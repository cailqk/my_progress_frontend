import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Exercise_types, Param } from "../../shared/utils/interfaces";

const ExerciseTypes = () => {
  const [types, setTypes] = useState<Exercise_types[]>([]);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const navigate = useNavigate();

  const getTypes = () => {
    let path = "";

    const params: Param = {};

    if (name) {
      params.name = name;
    }

    if (group) {
      params.group = group;
    }

    if (Object.keys(params).length > 0) {
      path += `exercise-type/filter?${new URLSearchParams({ ...params })}`;
    } else {
      path = "exercise-type";
    }

    api.get(path).then((res) => {
      setTypes(res);
    });
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <div className="container">
      <div style={{ width: "50rem", display: "flex" }}>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Search by name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Search by muscle group"
          onChange={(e) => setGroup(e.target.value)}
        ></input>
        <button className="btn btn-outline-success" onClick={getTypes}>
          Search
        </button>
      </div>
      <div className="text-end mb-2">
        <button
          className="btn btn-success"
          onClick={() => navigate(RoutesEnum.exercise_types_create)}
        >
          Create
        </button>
      </div>
      <table className={`table table-striped`}>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Muscle groups</th>
          </tr>
        </thead>
        <tbody>
          {types.length > 0 &&
            types.map((type) => {
              return (
                <tr key={type._id}>
                  <td>{type.name}</td>
                  <td>{type.muscleGroups.join(", ")}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseTypes;
