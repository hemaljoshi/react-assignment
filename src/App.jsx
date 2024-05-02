import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import { capitalizeFirstLetter } from "./utils";
import { moreIcon } from "./assets";
import { dashboardTabs } from "./components/constants";
import ServiceInfo from "./components/Dashboard/ServiceInfo";
import SystemMetrics from "./components/Dashboard/SystemMetrics";
import EventHistory from "./components/Dashboard/EventHistory";
import { useSelectedApplication } from "./context/SelectedApplicationContext";
import axios from "axios";
import moment from "moment";
import EnvironmentVariables from "./components/Dashboard/EnvironmentVariables";
import { TailSpin } from "react-loader-spinner";

const App = () => {
  const { selectedApplication } = useSelectedApplication();
  const [tabs, setTabs] = useState(dashboardTabs);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "CPU",
        data: [],
        backgroundColor: "rgba(184, 139, 254, 0.2)",
        borderColor: "#B88BFE",
        pointRadius: 5,
        pointHitRadius: 10,
      },
    ],
  });
  const [eventHistoryData, setEventHistoryData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewMore = useCallback(() => {
    setVisibleRows(eventHistoryData.length);
  }, [eventHistoryData]);

  const handleTabClick = useCallback((tabId) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({ ...tab, active: tab.id === tabId }))
    );
  }, []);

  const handleActiveTabClick = (tabIndex) => {
    tabIndex === 0 ? fetchCpuData() : fetchMemoryData();
  };

  const processData = (data, fieldName) => {
    const labels = data.map((item) =>
      moment.unix(item.timestamp).format("h:mma")
    );
    const field = data.map((item) => item[fieldName]);
    return { labels, field };
  };

  const fetchCpuData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://retoolapi.dev/Ymxfa2/cpuutilization"
      );
      let activeApplicationMemoryData = res.data.filter(
        (item) =>
          item.applicationId.toString() === selectedApplication.id.toString()
      );
      const processedData = processData(
        activeApplicationMemoryData,
        "cpuUtilization"
      );
      setChartData({
        ...chartData,
        labels: processedData.labels,
        datasets: [
          { ...chartData.datasets[0], data: processedData.field, label: "CPU" },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchMemoryData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://retoolapi.dev/ybFVVH/memoryutilization"
      );
      let activeApplicationMemoryData = res.data.filter(
        (item) =>
          item.applicationId.toString() === selectedApplication.id.toString()
      );
      const processedData = processData(
        activeApplicationMemoryData,
        "memoryUtilization"
      );
      setChartData({
        ...chartData,
        labels: processedData.labels,
        datasets: [
          {
            ...chartData.datasets[0],
            data: processedData.field,
            label: "Memory",
          },
        ],
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchEventHistoryData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://retoolapi.dev/TYjDIe/eventhistory");
      const activeApplicationEventHistoryData = res.data.filter(
        (item) =>
          item.applicationId.toString() === selectedApplication.id.toString()
      );
      setEventHistoryData(activeApplicationEventHistoryData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedApplication?.id) {
      fetchCpuData();
      fetchEventHistoryData();
    }
  }, [selectedApplication]);

  const activeTabId = tabs.find((tab) => tab.active)?.id;

  return (
    <div className="p-6 font-inter">
      <div className="flex justify-between mb-3">
        <span className="text-xl font-bold">{selectedApplication?.name}</span>
        <div className="flex items-center">
          <div
            className={classNames({
              "flex items-center gap-2 border rounded-md px-2 py-1": true,
              "bg-[#effcf9] border-[#00B88C]":
                selectedApplication?.status === "deployed",
              "bg-[#ffeded] border-[#FF4D4F]":
                selectedApplication?.status !== "deployed",
            })}
          >
            <div
              className={classNames({
                "h-2 w-2 rounded-full": true,
                "bg-[#00B88C]": selectedApplication?.status === "deployed",
                "bg-[#FF4D4F]": selectedApplication?.status !== "deployed",
              })}
            />
            <span
              className={classNames({
                "text-[#00B88C]": selectedApplication?.status === "deployed",
                "text-[#FF4D4F]": selectedApplication?.status !== "deployed",
              })}
            >
              {capitalizeFirstLetter(selectedApplication?.status)}
            </span>
          </div>
          <img src={moreIcon} alt="more" className="h-4 ml-4" />
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className="flex items-center cursor-pointer"
          >
            {tab.icon}
            <span
              className={classNames({
                "relative text-[#595959] text-sm ml-2 font-bold": true,
                "text-black": tab.active,
              })}
            >
              {tab.label === "Alerts" && (
                <div className="h-[6px] w-[6px] rounded-full bg-[#E91F04] absolute -right-2 top-0" />
              )}
              {tab.label}
            </span>
          </div>
        ))}
      </div>
      {activeTabId === 1 && (
        <>
          <ServiceInfo selectedApplication={selectedApplication} />
          <div className="flex gap-4 flex-col md:flex-row">
            <SystemMetrics
              chartData={chartData}
              handleActiveTabClick={handleActiveTabClick}
            />
            <EventHistory
              eventHistoryData={eventHistoryData}
              visibleRows={visibleRows}
              handleViewMore={handleViewMore}
            />
          </div>
        </>
      )}
      {activeTabId === 2 && <EnvironmentVariables />}
      {(activeTabId === 3 || activeTabId === 4) && (
        <div className="rounded-lg bg-white p-4 mb-4 w-full min-h-[400px] flex items-center justify-center">
          <p className="text-base font-bold font-inter text-[#595959]">
            Coming soon !
          </p>
        </div>
      )}
      {/* loader */}
      {!selectedApplication?.id ||
        (isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 z-50 flex items-center justify-center">
            <TailSpin color="#37146B" height={50} width={50} />
          </div>
        ))}
    </div>
  );
};

export default App;
