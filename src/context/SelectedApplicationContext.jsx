import React, { createContext, useContext, useState } from "react";

const SelectedApplicationContext = createContext();

export const SelectedApplicationProvider = ({ children }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  return (
    <SelectedApplicationContext.Provider
      value={{ selectedApplication, setSelectedApplication }}
    >
      {children}
    </SelectedApplicationContext.Provider>
  );
};

export const useSelectedApplication = () => {
  return useContext(SelectedApplicationContext);
};
