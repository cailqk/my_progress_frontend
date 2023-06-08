import * as api from "../../requests/API";

const MeasurementsItem = (props: any) => {

  const deleteHandler = (data: string) => {

    if (window.confirm("Would you really like to delete this Measurement ?")) {
      api.del(`measurements/${data}`).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <>
      {props.measurements.length === 0 && (
        <div key={Math.random()}>
          <p>No data</p>
        </div>
      )}
      {props.measurements.length > 0 &&
        props.measurements.map((el: any) => {
          return (
            <div className="col-4" key={el._id}>
              <div className="card" style={{ width: "15rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Date: {el.date}</h5>
                  <p className="card-text">
                    <strong>Photo/s:</strong> {el.photo}
                  </p>
                  <p className="card-text">
                    <strong>Weight:</strong> {el.weight} kg
                  </p>
                  <p className="card-text">
                    <strong>Chest:</strong> {el.chest} cm
                  </p>
                  <p className="card-text">
                    <strong>Waist:</strong> {el.waist} cm
                  </p>
                  <p className="card-text">
                    <strong>Hips:</strong> {el.hips} cm
                  </p>
                  <p className="card-text">
                    <strong>Biceps:</strong> {el.biceps} cm
                  </p>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button className="btn btn-warning">Details</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(el._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MeasurementsItem;
