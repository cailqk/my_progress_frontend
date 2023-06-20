import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Exercise_types, Param } from "../../shared/utils/interfaces";
import ExerciseTypeItem from "./ExerciseTypeItem";

const ExerciseTypeList = () => {
  const [data, setData] = useState<Exercise_types[]>([]);
  const [name, setName] = useState<string>("");
  const [group, setGroup] = useState<string>("");

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
      setData(res);
    });
  };

  useEffect(() => {
    getTypes();
  }, []);

  //TODO: DISCUSS ON STYLES AND IMPLEMENT THEM IN CSS

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Search by name"
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "1rem" }}
        ></input>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Search by muscle group"
          onChange={(e) => setGroup(e.target.value)}
          style={{ marginRight: "1rem" }}
        ></input>
        <button
          className="btn btn-outline-success"
          onClick={getTypes}
          style={{ marginRight: "1rem" }}
        >
          Search
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(RoutesEnum.exercise_types_create)}
        >
          Create
        </button>
      </div>
      {data.length ? (
        <>
          <ExerciseTypeItem types={data} reloadTypes={getTypes} />
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default ExerciseTypeList;
