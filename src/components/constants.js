import React from "react";
import { bookmarkIcon, dollarIcon, historyIcon, linkIcon, screenIcon, securityIcon, settingsIcon, userIcon, warningIcon } from "../assets";

export const defaultNavItems = [
    {
        label: "Connections",
        href: "#",
        icon: <img src={linkIcon} alt="Connections" className="w-[14.5px] h-[14.5px]" />,
        isBeta: false,
    },
    {
        label: "Cost",
        href: "#",
        icon: <img src={dollarIcon} alt="Cost" className="w-[10px] h-[16px]" />,
        isBeta: false,
    },
    {
        label: "Security",
        href: "#",
        icon: <img src={securityIcon} alt="Security" className="w-[12px] h-[14.5px]" />,
        isBeta: true,
    },
];

export const bottomNavItems = [
    {
        label: "Admin",
        href: "#",
        icon: <img src={userIcon} alt="Admin" className="w-[13px] h-[13px]" />,
    },
    {
        label: "Docs",
        href: "#",
        icon: <img src={bookmarkIcon} alt="Docs" className="w-[10px] h-[14px]" />,
    }
];

export const dashboardTabs = [
    {
        id: 1,
        label: "Overview",
        icon: <img src={screenIcon} alt="Overview" className="w-[14.5px] h-[14.5px]" />,
        active: true,
    },
    {
        id: 2,
        label: "Environment Variables",
        icon: <img src={settingsIcon} alt="Environment Variables" className="w-[14.5px] h-[14.5px]" />,
        active: false,
    },
    {
        id: 3,
        label: "Alerts",
        icon: <img src={warningIcon} alt="Alerts" className="w-[14.5px] h-[14.5px]" />,
        active: false,
    },
    {
        id: 4,
        label: "Event History",
        icon: <img src={historyIcon} alt="Event History" className="w-[14.5px] h-[14.5px]" />,
        active: false,
    }
];
