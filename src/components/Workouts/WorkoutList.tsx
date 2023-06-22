import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Workout } from "../../shared/utils/interfaces";
import WorkoutItem from "./WorkoutItem";

import styles from "./Workout.module.css"
import { dateParser } from "../../shared/utils/dateFunctions";

const WorkoutList = () => {
  const [data, setData] = useState<Workout[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("workout").then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="container">
      <div className={styles.searchDiv}>
        <input
          type="date"
          className="form-control mr-1"
          max={dateParser(new Date())}
        ></input>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="FIlter by exercise type"
        ></input>
         <input
          type="text"
          className="form-control mr-1"
          placeholder="Filter by muscle group"
        ></input>
        <button className="btn btn-warning">Search</button>
        <button
          className="btn btn-success"
          onClick={() => navigate(RoutesEnum.workouts_create)}
        >
          Create
        </button>
      </div>
      <WorkoutItem workout={data} />
    </div>
  );
};

export default WorkoutList;
