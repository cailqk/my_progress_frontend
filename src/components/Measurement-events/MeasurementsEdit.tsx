import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../requests/API";
import { Modal } from "../../shared/components/Modal";
import { dateParser } from "../../shared/utils/dateFunctions";
import { Measurement } from "../../shared/utils/interfaces";
import Error from "../../shared/components/Error";
import { RoutesEnum } from "../../shared/utils/enums";
import { highlightField } from "../../shared/utils/highlightField";
import { AdvancedImage,  } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import Clod from "../../shared/components/Cloudinary";

const MeasurementsEdit = () => {
  const { id } = useParams();
  const [measurement, setMeasurement] = useState({} as Measurement);
  const [enableEdit, setEnableEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`measurements/${id}`).then((res) => {
      setMeasurement(res);
      setImage(res.photo[0])
    });
  }, []);
  
 
  const editValue = (field: string, value: string | number | Date) => {
    setMeasurement({
      ...measurement,
      [field]: value,
    });
    setEnableEdit(true);
  };

  const submitHandler = () => {
    setErrors([]);

    const edited = {
      photo: measurement.photo,
      weight: measurement.weight,
      chest: measurement.chest,
      waist: measurement.waist,
      hips: measurement.hips,
      biceps: measurement.biceps,
      date: measurement.date,
    };

    api.patch(`measurements/${measurement._id}`, { ...edited }).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        setEnableEdit(false);
        return;
      }
      console.log(res);
      setMeasurement({ ...measurement });
      navigate(RoutesEnum.measurements);
    });
  };


  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <Modal
          text="Are you sure you'd like to keep these changes ?"
          onConfirm={submitHandler}
          cancelButtonText={"Discard"}
          confirmButtonText={"Keep"}
        />
        <form>
          <div className="mb-3">
            {Clod(image)}
            <input
              type="text"
              className="form-control"
              id="photoInput"
              value={measurement.photo}
              onChange={(e) => {
                editValue("photo", e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Weight (kg)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "weight")}`}
              id="weightInput"
              value={measurement.weight}
              onChange={(e) => {
                editValue("weight", Number(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Chest (cm)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "chest")}`}
              id="chestInput"
              value={measurement.chest}
              onChange={(e) => {
                editValue("chest", Number(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Waist (cm)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "waist")}`}
              id="waistInput"
              value={measurement.waist}
              onChange={(e) => {
                editValue("waist", Number(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Hips (cm)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "hips")}`}
              id="hipsInput"
              value={measurement.hips}
              onChange={(e) => {
                editValue("hips", Number(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Biceps (cm)
            </label>
            <input
              type="number"
              className={`form-control ${highlightField(errors, "biceps")}`}
              id="bicepsInput"
              value={measurement.biceps}
              onChange={(e) => {
                editValue("biceps", Number(e.target.value));
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Date
            </label>
            <input
              type="date"
              className={`form-control ${highlightField(errors, "date")}`}
              id="dateInput"
              value={dateParser(measurement.date)}
              onChange={(e) => {
                editValue("date", new Date(e.target.value));
              }}
              required
            />
          </div>
        </form>
        <button
          type="submit"
          disabled={!enableEdit}
          className="btn btn-outline-dark"
          data-bs-toggle="modal"
          data-bs-target="#modal"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MeasurementsEdit;
