import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // Modal window view to show messages
  const [modalShow, setModalShow] = useState(false);
  // Text to show in modal window
  const [modalText, setModalText] = useState("no text");  

  return (
    <AppContext.Provider
      value={{
        modalShow,
        setModalShow,
        modalText,
        setModalText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
