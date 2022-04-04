import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  /* Modal to show text */
  const [modalInfoShow, setModalInfoShow] = useState(false);
  const [modalInfoText, setModalInfoText] = useState("no text");
  /* Promp modal to accept value*/
  const [modalInputShow, setModalInputShow] = useState(false);
  const [modalInputText, setModalInputText] = useState("no text");
  /* Input modal OK button state */
  const [modalInputOkState, setModalInputOkState] = useState(false);
  /* Loading modal */
  const [modalWaitShow, setModalWaitShow] = useState(false);
  const [modalWaitText, setModalWaitText] = useState(false);

  /**
   * Change flag of input modal OK button state
   */
  const inputModalOkButtonClick = () => {
    setModalInputOkState(!modalInputOkState);
  };

  return (
    <AppContext.Provider
      value={{
        modalInfoShow,
        setModalInfoShow,
        modalInfoText,
        setModalInfoText,
        modalInputShow,
        setModalInputShow,
        modalInputText,
        setModalInputText,
        modalWaitShow,
        setModalWaitShow,
        modalWaitText,
        setModalWaitText,
        modalInputOkState,
        inputModalOkButtonClick,
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
