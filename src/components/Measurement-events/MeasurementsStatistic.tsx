const MeasurementsStats = (props: any) => {

  return (
    <div key={Math.random()}>
      {props.measurements.map((el: any) => {
        return (
          <div>
            <p>{el.weight}</p>
          </div>
        );
      })}
    </div>
  );
};

export default MeasurementsStats;
