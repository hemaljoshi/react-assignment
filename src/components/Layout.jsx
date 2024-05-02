import classNames from "classnames";
import React, {useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
const Layout = (props) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div
      className={classNames({
        "grid bg-zinc-100 min-h-screen": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        shown={showSidebar}
      />
      <div className="w-screen md:w-full max-h-screen overflow-x-auto">
        <Navbar
          onMenuButtonClick={() => setShowSidebar((prev) => !prev)}
          collapsed={collapsed}
        />
        {props.children}
      </div>
    </div>
  );
};
export default Layout;
