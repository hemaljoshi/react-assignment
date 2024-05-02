import React from "react";
import { capitalizeFirstLetter } from "../../utils";
import moment from "moment";
import classNames from "classnames";

const EventHistory = ({ eventHistoryData, visibleRows, handleViewMore }) => {
  return (
    <div className="w-full md:w-1/2 rounded-lg bg-white p-4 shadow-lg">
      <p className="text-[#595959] text-base mb-2">Event History</p>
      <div className="max-h-[340px] overflow-y-auto flex flex-col justify-between ">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[#333333] text-sm p-3">Event</th>
              <th className="text-[#333333] text-sm p-3">Version</th>
              <th className="text-[#333333] text-sm p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {eventHistoryData.slice(0, visibleRows).map((event) => {
              let isWarning = event.status === "in_progress";
              let isSuccess = event.status === "successful";
              let isFailed = event.status === "failed";
              return (
                <tr key={event.id} className="border-t">
                  <td className="text-[#595959] text-sm w-1/3 p-3">
                    {event.event}
                    <p className="text-[#A5A5A5] text-xs">
                      {moment(new Date(event.timestamp * 1000)).fromNow()}
                    </p>
                  </td>
                  <td className="text-[#595959] text-sm w-1/3 p-3">
                    {event.version}
                  </td>
                  <td className="p-3">
                    <div
                      className={classNames(
                        "flex items-center gap-2 text-xs w-fit py-1 px-2 rounded-lg",
                        {
                          "text-[#E91F04] bg-[#fff4f2]": isFailed,
                          "text-[#00B88C] bg-[#effcf9]": isSuccess,
                          "text-[#F39C12] bg-[#fef6e6]": isWarning,
                        }
                      )}
                    >
                      <div
                        className={classNames({
                          "h-2 w-2 rounded-full": true,
                          "bg-[#E91F04]": isFailed,
                          "bg-[#00B88C]": isSuccess,
                          "bg-[#F39C12]": isWarning,
                        })}
                      />
                      {capitalizeFirstLetter(event.status)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {eventHistoryData.length > visibleRows && (
          <button
            className="text-primary-800 font-bold self-start mt-6"
            onClick={handleViewMore}
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default EventHistory;
