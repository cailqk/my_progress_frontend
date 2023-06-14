import * as api from "../../requests/API";
import img from './measurement.jpg'

const MeasurementsItem = (props: any) => {
  const deleteHandler = (data: string) => {
    if (window.confirm("Would you really like to delete this Measurement ?")) {
      api.del(`measurements/${data}`).then((res) => {
        console.log(res);
      });
    }
  };
// TODO: CHANGE ACCORDINGLY -> THIS TEMPORARY
  const dateP = (date: Date) => {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();

    return `${day}-${month}-${year}`;
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
                  <td>{dateP(el.date)}</td>
                  <td>{el.weight} cm</td>
                  <td>{el.chest} cm</td>
                  <td>{el.waist} cm</td>
                  <td>{el.hips} cm</td>
                  <td>{el.biceps} cm</td>
                  <div>
                    <button className="btn btn-success">Edit</button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(el._id)}
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
