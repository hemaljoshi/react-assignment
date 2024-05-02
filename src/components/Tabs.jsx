import React, { useState } from "react";

export function MyTabs({ children, onTabClick }) {
    const [activeTab, setActiveTab] = useState(findActiveTab(children));
    
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    if (onTabClick) {
      onTabClick(tabIndex);
    }
  };

  function findActiveTab(a) {
    return a.findIndex((tab) => tab.props.active);
  }

  return (
    <>
      <div className="flex justify-center  p-2 rounded-md">
        {children.map((item, i) => (
          <MyTab
            key={`tab-${i}`}
            currentTab={i}
            activeTab={activeTab}
            onClick={() => handleTabClick(i)}
          >
            {item.props.children}
          </MyTab>
        ))}
      </div>
      <div className="p-5">
        {children.map((item, i) => (
          <div
            key={`content-${i}`}
            className={i === activeTab ? "block" : "hidden"}
          >
            {item.props.component}
          </div>
        ))}
      </div>
    </>
  );
}

export function MyTab({ children, activeTab, currentTab, onClick }) {
  return (
    <div
      className={`px-5 py-3 cursor-pointer text-center w-full ${
        activeTab === currentTab
          ? "border-b-[2.5px] border-primary-800"
          : "border-[#BDBDBD] border-b"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
