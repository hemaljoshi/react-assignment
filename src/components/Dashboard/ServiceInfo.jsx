import React from "react";
import { arrowUpIcon, successIcon } from "../../assets";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import moment from "moment";

const ServiceInfo = ({ selectedApplication }) => {
  return (
    <div className="rounded-lg bg-white p-4 mb-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-base font-bold font-inter text-[#595959]">
          Service info
        </span>
        <img src={arrowUpIcon} alt="arrow up" className="h-2 cursor-pointer" />
      </div>
      <div className="flex items-center gap-12 mb-6">
        <div>
          <span className="text-[#595959] text-sm">Current version</span>
          <div className="flex items-center gap-2 mt-1">
            {selectedApplication?.version ===
            selectedApplication?.desiredVersion ? (
              <img src={successIcon} alt="success" className="h-4" />
            ) : (
              <ArrowPathIcon className="h-4 text-[#FF4D4F]" />
            )}
            <span className="text-[#595959] text-sm font-bold">
              {selectedApplication?.version ===
              selectedApplication?.desiredVersion
                ? "In sync"
                : selectedApplication.version == "null"
                ? "Not installed"
                : selectedApplication.version}
            </span>
          </div>
        </div>
        <div>
          <span className="text-[#595959] text-sm mb-3">Desired version</span>
          <p className="text-[#595959] text-sm font-bold mt-1">
            {selectedApplication?.desiredVersion}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="text-white bg-primary-800 text-sm font-bold px-4 py-2 rounded-md"
          onClick={() => console.log("Upgrade")}
        >
          Deploy
        </button>
        <span className="text-sm text-[#595959]">
          Last updated{" "}
          {moment(new Date(selectedApplication?.updatedAt * 1000)).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default ServiceInfo;
