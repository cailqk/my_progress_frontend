const MeasurementsItem = (props: any) => {
  return (
    <>
      {props.measurements.length === 0 && (
        <div>
          <p>No data</p>
        </div>
      )}
      {props.measurements.length > 0 &&
        props.measurements.map((el: any) => {
          return (
            <div className="col-4">
              <div className="card" style={{ width: "15rem" }} key={el._id}>
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
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MeasurementsItem;
