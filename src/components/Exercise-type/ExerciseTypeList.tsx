import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Exercise_types, Param, User } from "../../shared/utils/interfaces";
import ExerciseTypeItem from "./ExerciseTypeItem";

import styles from "./ExerciseType.module.css";
import CardLayout from "../../shared/layouts/CardLayout";

const ExerciseTypeList = () => {
  const [data, setData] = useState<Exercise_types[]>([]);
  const [name, setName] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [user, setUser] = useState({} as User);

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
    api.get("users/single").then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <CardLayout>
      <div className="container">
        <div className={styles.searchDiv}>
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
          <button className="btn btn-warning" onClick={getTypes}>
            Search
          </button>

          {user.role === "admin" && (
            <button
              className="btn btn-success"
              onClick={() => navigate(RoutesEnum.exercise_types_create)}
            >
              Create
            </button>
          )}
        </div>
        {data.length ? (
          <>
            <ExerciseTypeItem types={data} reloadTypes={getTypes} user={user} />
          </>
        ) : (
          <p>No data</p>
        )}
      </div>
    </CardLayout>
  );
};

export default ExerciseTypeList;
