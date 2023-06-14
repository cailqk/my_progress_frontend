import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import MeasurementsItem from "./MeasurementsItem";
import MeasurementsStats from "./MeasurementsStatistic";

import styles from "./Measurements.module.css";
import { RoutesEnum } from "../../shared/utils/enums";

const Measurements = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    api.get("measurements").then((res) => {
      setData(res);
    });
  }, [data]);

  return (
    <div className="container">
      <h2>Measurements</h2>
      <div className="text-end mb-2">
        <button
          className="btn btn-success"
          onClick={() => navigate(`${RoutesEnum.measurements}/create`)}
        >
          Create
        </button>
      </div>
      <MeasurementsItem measurements={data} />
      <MeasurementsStats measurements={data} />
    </div>
  );
};

export default Measurements;
