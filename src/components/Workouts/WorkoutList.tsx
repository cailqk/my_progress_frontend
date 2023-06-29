import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as api from "../../requests/API";
import { RoutesEnum } from "../../shared/utils/enums";
import { Workout } from "../../shared/utils/interfaces";
import WorkoutItem from "./WorkoutItem";

import styles from "./Workout.module.css";
import { dateParser } from "../../shared/utils/dateFunctions";
import CardLayout from "../../shared/layouts/CardLayout";

// TODO FIX FITLER
const WorkoutList = () => {
  const [data, setData] = useState<Workout[]>([]);
  const [filterDate, setFilterDate] = useState<Date>();
  const [filterExType, setFilterExType] = useState("");
  const [filterMuscleGroup, setFilterMuscleGroup] = useState("");
  const navigate = useNavigate();

  const getWorkouts = () => {
    let path = "workout";

    if (filterDate) {
      path += `/filter?${new URLSearchParams({
        date: dateParser(filterDate),
      })}`;
    }

    if (filterExType) {
      path += `/filter?${new URLSearchParams({
        type: filterExType,
      })}`;
    }

    if (filterMuscleGroup) {
      path += `/filter?${new URLSearchParams({
        group: filterMuscleGroup,
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
    <CardLayout>
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
            value={filterExType}
            onChange={(e) => setFilterExType(e.target.value)}
            placeholder="Filter by exercise type"
          ></input>
          <input
            type="text"
            className="form-control mr-1"
            value={filterMuscleGroup}
            onChange={(e) => setFilterMuscleGroup(e.target.value)}
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
    </CardLayout>
  );
};

export default WorkoutList;
