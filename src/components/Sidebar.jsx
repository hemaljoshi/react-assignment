import React from "react";
import classNames from "classnames";
import { bottomNavItems, defaultNavItems } from "./constants";
import {
  applicationIcon,
  leftArrowIcon,
  logoIcon,
  logoTextIcon,
} from "../assets";

const RenderItem = ({ index, collapsed, item }) => (
  <li
    key={index}
    className={classNames({
      "text-indigo-100 hover:bg-primary-900 flex p-3": true,
      "transition-colors duration-300": true,
      "rounded-md p-2 mx-3 gap-4 ": !collapsed,
      "rounded-md p-2 mx-3 w-10 h-10": collapsed,
    })}
  >
    <a href={item.href} className="flex gap-2 items-center font-inter">
      <div className="w-5 flex justify-center">{item.icon}</div>
      <span>{!collapsed && item.label}</span>
      {!collapsed && item.isBeta && (
        <span className="text-xs text-white bg-primary-800 rounded-sm p-2">
          Beta
        </span>
      )}
    </a>
  </li>
);

const Sidebar = ({
  collapsed,
  navItems = defaultNavItems,
  shown,
  setCollapsed,
}) => {
  return (
    <div
      className={classNames({
        "bg-primary-950 text-zinc-50 fixed md:static md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-16": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen md:h-full sticky inset-0": true,
        })}
      >
        <div
          className={classNames({
            "p-4 flex items-center transition-none gap-3": true,
          })}
        >
          <img src={logoIcon} alt="logo" className="h-8 w-[34.5px]" />
          {!collapsed && <img src={logoTextIcon} alt="logo" className="h-5" />}
        </div>
        <ul
          className={classNames({
            "mt-2 flex flex-col gap-2 items-stretch border-primary-900 border-t pt-2": true,
          })}
        >
          <li
            className={classNames({
              "text-indigo-100 hover:bg-primary-900 flex ": true,
              "transition-colors duration-300": true,
              "rounded-md mx-3 gap-4 p-3": !collapsed,
              "rounded-lg pl-[0.7rem] mx-3 w-10 h-10 ": collapsed,
              "bg-primary-900": true,
            })}
          >
            <a href="#" className="flex gap-2 items-center font-inter">
              <div className="w-5 flex justify-center">
                <img
                  src={applicationIcon}
                  alt="Applications"
                  className="w-[13px] h-[13px]"
                />
              </div>{" "}
              <span>{!collapsed && "Applications"}</span>
            </a>
          </li>
        </ul>
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch border-primary-900 border py-2": true,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <RenderItem
                  key={item.label}
                  collapsed={collapsed}
                  index={index}
                  item={item}
                />
              );
            })}
          </ul>
        </nav>
        <div className="flex flex-col justify-center">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            {bottomNavItems.map((item, index) => {
              return (
                <RenderItem
                  key={item.label}
                  collapsed={collapsed}
                  index={index}
                  item={item}
                />
              );
            })}
          </ul>
        </div>
        <div
          className={classNames({
            "grid place-content-stretch p-4 border-primary-900 border ": true,
          })}
        >
          <button
            className={classNames({
              "flex gap-4 overflow-hidden items-center pl-2": true,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <img
              src={leftArrowIcon}
              className={classNames({
                "w-4 h-3": true,
                "transform rotate-180": collapsed,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
