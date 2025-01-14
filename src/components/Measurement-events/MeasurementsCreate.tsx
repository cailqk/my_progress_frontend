import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../requests/API";
import Error from "../../shared/components/Error";
import CardLayout from "../../shared/layouts/CardLayout";
import { dateParser } from "../../shared/utils/dateFunctions";
import { RoutesEnum } from "../../shared/utils/enums";
import { highlightField } from "../../shared/utils/highlightField";

const MeasurementsCreate = () => {
  const [photo, setPhoto] = useState<string>("");
  const [weight, setWeight] = useState<number>(40);
  const [chest, setChest] = useState<number>(70);
  const [waist, setWaist] = useState<number>(50);
  const [hips, setHips] = useState<number>(60);
  const [biceps, setBiceps] = useState<number>(25);
  const [date, setDate] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const navigate = useNavigate();

  const measurementEvent = {
    photo,
    weight,
    chest,
    waist,
    hips,
    biceps,
    date,
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await api.post("measurements", measurementEvent).then((res) => {
      if (res.statusCode === 400) {
        setErrors(res.message);
        return;
      }

      navigate(RoutesEnum.measurements);
    });
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 offset-md-3">
        {errors.length > 0 && <Error error={errors} />}
        <CardLayout>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Photo
              </label>
              <input
                type="text"
                className={`form-control ${highlightField(errors, "photo")}`}
                id="photoInput"
                placeholder="photo url"
                onChange={(e) => setPhoto(e.target.value)}
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
                placeholder={`min: ${weight}`}
                onChange={(e) => setWeight(Number(e.target.value))}
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
                placeholder={`min: ${chest}`}
                onChange={(e) => setChest(Number(e.target.value))}
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
                placeholder={`min: ${waist}`}
                onChange={(e) => setWaist(Number(e.target.value))}
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
                placeholder={`min: ${hips}`}
                onChange={(e) => setHips(Number(e.target.value))}
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
                placeholder={`min: ${biceps}`}
                onChange={(e) => setBiceps(Number(e.target.value))}
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
                value={date}
                id="dateInput"
                max={dateParser(new Date())}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Create
            </button>
          </form>
        </CardLayout>
      </div>
    </div>
  );
};

export default MeasurementsCreate;
