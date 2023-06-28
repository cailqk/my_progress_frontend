import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Workout } from "../../shared/utils/interfaces";
import WorkoutItem from "./WorkoutItem";

import styles from "./Workout.module.css";
import { dateParser } from "../../shared/utils/dateFunctions";

// TODO FIX FITLER
const WorkoutList = () => {
  const [data, setData] = useState<Workout[]>([]);
  const [filterDate, setFilterDate] = useState<Date>();
  const navigate = useNavigate();

  const getWorkouts = () => {
    let path = "workout";

    if (filterDate) {
      path += `/filter?${new URLSearchParams({
        date: dateParser(filterDate),
      })}`;
    }

    api.get(path).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <div className="container">
      <div className={styles.searchDiv}>
        <input
          type="date"
          className="form-control mr-1"
          value={filterDate ? filterDate.toISOString().split("T")[0] : ""}
          max={dateParser(new Date())}
          onChange={(e) => setFilterDate(new Date(e.target.value) || "")}
        ></input>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Filter by exercise type"
        ></input>
        <input
          type="text"
          className="form-control mr-1"
          placeholder="Filter by muscle group"
        ></input>
        <button className="btn btn-warning" onClick={getWorkouts}>
          Search
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(RoutesEnum.workouts_create)}
        >
          Create
        </button>
      </div>
      <WorkoutItem workout={data} reloadWorkouts={getWorkouts} />
    </div>
  );
};

export default WorkoutList;
