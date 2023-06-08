import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import MeasurementsItem from "./MeasurementsItem";

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
    <div className="row mt-3">
      <MeasurementsItem measurements={data} />
    </div>
  );
};

export default Measurements;
