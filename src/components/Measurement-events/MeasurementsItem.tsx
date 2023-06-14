import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import { Modal } from "../../shared/components/Modal";
import { dateParser } from "../../shared/utils/dateFunctions";
import { RoutesEnum } from "../../shared/utils/enums";
import img from "./measurement.jpg";

import style from "./Measurements.module.css";

const MeasurementsItem = (props: any) => {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const deleteHandler = (id: string) => {
    api.del(`measurements/${id}`).then((res) => {
      console.log(res);
      return res;
    });
  };

  const editHandler = (id: string) => {
    navigate(`${RoutesEnum.measurements_edit}/${id}`);
  };

  return (
    <>
      {/* <div>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Filter measurements"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Filter
        </button>
      </div> */}
      <Modal
        text={"Are you sure you want to delete this measurement ?"}
        onConfirm={() => deleteHandler(id)}
        cancelButtonText={"No"}
        confirmButtonText={"Yes"}
      />
      {props.measurements.length === 0 && (
        <div key={Math.random()}>
          <p>No data</p>
        </div>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Weight</th>
            <th scope="col">Chest</th>
            <th scope="col">Waist</th>
            <th scope="col">Hips</th>
            <th scope="col">Biceps</th>
          </tr>
        </thead>
        <tbody>
          {props.measurements.length > 0 &&
            props.measurements.map((el: any) => {
              return (
                <tr key={el._id}>
                  <td>{dateParser(el.date)}</td>
                  <td>{el.weight} kg</td>
                  <td>{el.chest} cm</td>
                  <td>{el.waist} cm</td>
                  <td>{el.hips} cm</td>
                  <td>{el.biceps} cm</td>
                  <div className={style.buttons}>
                    <button
                      className="btn btn-success"
                      onClick={() => editHandler(el._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#modal"
                      onClick={() => setId(el._id)}
                    >
                      Delete
                    </button>
                  </div>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default MeasurementsItem;
