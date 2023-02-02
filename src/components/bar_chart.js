import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

class Bar_chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let { data, title } = this.props;
    return (
      <div>
        <Bar options={options} data={data} />

        {title ? (
          <span
            style={{
              marginTop: 20,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
              marginBottom: 20,
            }}
          >
            {title}
          </span>
        ) : null}
      </div>
    );
  }
}

export default Bar_chart;
