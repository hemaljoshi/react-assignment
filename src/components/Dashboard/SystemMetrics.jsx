import React from "react";
import { MyTab, MyTabs } from "../Tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
    title: {
      display: true,
    },
  },
};  

const SystemMetrics = ({ chartData, handleActiveTabClick }) => {
  return (
    <div className="w-full md:w-1/2 rounded-lg bg-white p-4 shadow-lg">
      <p className="text-[#595959] text-base mb-2">System metrics</p>
      <MyTabs onTabClick={handleActiveTabClick}>
        <MyTab
          component={<Line data={chartData} options={options} />}
          active={true}
        >
          CPU
        </MyTab>
        <MyTab component={<Line data={chartData} options={options} />}>
          Memory
        </MyTab>
      </MyTabs>
    </div>
  );
};

export default SystemMetrics;
