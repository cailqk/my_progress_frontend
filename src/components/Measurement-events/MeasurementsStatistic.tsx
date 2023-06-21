import { useRef } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { dateParser, getDates } from "../../shared/utils/dateFunctions";
import { Measurement } from "../../shared/utils/interfaces";

export const MeasurementChart = (props: any): JSX.Element => {
  const ref = useRef();

  const weight: number[] = [];
  const chest: number[] = [];
  const waist: number[] = [];
  const hips: number[] = [];
  const biceps: number[] = [];

  const check = getDates(props.dateFrom, props.dateTo);
  const showInGraph: any = [];

  check.forEach((el) => {
    const found = props.measurements.find((measurement: Measurement) => {
      return dateParser(measurement.date) === el;
    });

    if (found) {
      showInGraph.push(found);
    } else {
      showInGraph.push(0);
    }
  });

  showInGraph.forEach((x: Measurement) => {
    if (check.includes(dateParser(x.date))) {
      weight.push(x.weight);
      chest.push(x.chest);
      waist.push(x.waist);
      hips.push(x.hips);
      biceps.push(x.biceps);
    } else {
      weight.push(0);
      chest.push(0);
      waist.push(0);
      hips.push(0);
      biceps.push(0);
    }
  });

  const data = {
    labels: check,
    datasets: [
      {
        data: weight,
        label: "weight",
        backgroundColor: "rgb(233,114,77)",
      },
      {
        data: chest,
        label: "chest",
        backgroundColor: "rgb(214,215,39)",
      },
      {
        data: waist,
        label: "waist",
        backgroundColor: "rgb(146,202,209)",
      },
      {
        data: hips,
        label: "hips",
        backgroundColor: "rgb(121,204,179)",
      },
      {
        data: biceps,
        label: "biceps",
        backgroundColor: "rgb(134,134,134)",
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };
  return (
    <>
      <Bar ref={ref} data={data} />
    </>
  );
};

export default MeasurementChart;
