import { useEffect, useState } from "react";
import * as api from "../../requests/API";
import MeasurementsItem from "./MeasurementsItem";

const Measurements = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("measurements").then((res) => {
      setData(res)
    });
  }, []);

  return (
    <div className="row mt-3">
      <MeasurementsItem measurements={data} />
    </div>
  );
};

export default Measurements;
