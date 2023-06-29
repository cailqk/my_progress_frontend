import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import MeasurementsItem from "./MeasurementsItem";
import MeasurementChart from "./MeasurementsStatistic";

import { RoutesEnum } from "../../shared/utils/enums";
import { dateParser } from "../../shared/utils/dateFunctions";
import { Measurement } from "../../shared/utils/interfaces";

import styles from "./Measurements.module.css"
import CardLayout from "../../shared/layouts/CardLayout";

const Measurements = () => {
  const [data, setData] = useState<Measurement[]>([]);
  const [dateFrom, setDateFrom] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );

  const [dateTo, setDateTo] = useState<Date>(new Date());
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  const getMeasurements = () => {
    let path = "measurements";

    if (dateFrom && dateTo) {
      path += `?${new URLSearchParams({
        from: dateParser(dateFrom),
        to: dateParser(dateTo),
      })}`;
    }

    api.get(path).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    getMeasurements();
  }, []);

  return (
    <CardLayout>
    <div className="container">
      <div className={styles.searchDiv}>
        <input
          className="form-control mr-1"
          type="date"
          id="dateFrom"
          value={dateFrom ? dateFrom.toISOString().split("T")[0] : ""}
          onChange={(e) => setDateFrom(new Date(e.target.value))}
          />
        <input
          className="form-control mr-1"
          type="date"
          id="dateTo"
          value={dateTo ? dateTo.toISOString().split("T")[0] : ""}
          onChange={(e) => setDateTo(new Date(e.target.value))}
          max={dateParser(new Date())}
          />
        <button className="btn btn-warning" onClick={getMeasurements}>
          Seacrh
        </button>
        <button
          className="btn btn-success"
          onClick={() => navigate(`${RoutesEnum.measurements}/create`)}
          >
          Create
        </button>
      </div>
      {data.length ? (
        <>
          <MeasurementsItem
            measurements={data}
            reloadMeasurements={getMeasurements}
            />
          <MeasurementChart
            measurements={data}
            dateFrom={dateFrom}
            dateTo={dateTo}
            />
        </>
      ) : (
        <p>No Data</p>
        )}
    </div>
        </CardLayout>
  );
};

export default Measurements;
