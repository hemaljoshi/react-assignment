import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { arrowDownIcon } from "../assets";
import axios from "axios";
import { useSelectedApplication } from "../context/SelectedApplicationContext";

const Navbar = ({ onMenuButtonClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const { selectedApplication, setSelectedApplication } =
    useSelectedApplication();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "https://retoolapi.dev/71NNjB/applications"
        );
        setApplications(res.data);
        setSelectedApplication(res.data[0]);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplications();
  }, []);

  return (
    <nav
      className={classNames({
        "bg-white text-zinc-500": true,
        "flex items-center": true,
        "sticky z-10 px-4 shadow-sm h-[73px] top-0 ": true,
      })}
    >
      <div>
        <span className="text-[#595959] text-[10px] ">Applications</span>
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-[#595959] text-sm ">
              {selectedApplication?.name}
            </span>
            <img src={arrowDownIcon} alt="arrow down" className="h-2" />
          </button>
          {isMenuOpen && (
            <div className="absolute top-5 left-0 w-[200px] bg-white shadow-md mt-2 py-2 rounded-md">
              {applications?.map((app) => (
                <button
                  key={app.id}
                  className={classNames({
                    "w-full text-left px-4 py-2 hover:bg-zinc-100": true,
                    "bg-zinc-100": app.id === selectedApplication?.id,
                  })}
                  onClick={() => {
                    setSelectedApplication(app);
                    setIsMenuOpen(false);
                  }}
                >
                  {app.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-[#FFD07B] h-10 w-10 flex items-center justify-center">
            <span className="text-white text-lg font-bold font-inter">JD</span>
          </div>
          <span className="text-[#333333] text-sm hidden md:block font-inter">
            John Doe
          </span>
          <img
            src={arrowDownIcon}
            alt="arrow down"
            className="h-2 hidden md:block"
          />
        </div>
        <button className="md:hidden" onClick={onMenuButtonClick}>
            <Bars3Icon className="h-6 text-[#595959]" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
