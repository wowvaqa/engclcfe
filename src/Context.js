import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  /* Modal to show text */
  const [modalInfoShow, setModalInfoShow] = useState(false);
  const [modalInfoText, setModalInfoText] = useState("no text");
  /* Promp modal to accept value*/
  const [modalInputShow, setModalInputShow] = useState(false);
  const [modalInputText, setModalInputText] = useState("no text");
  /* Input modal OK button state*/
  const [modalInputOkState, setModalInputOkState] = useState(false);
  /* Loading modal */
  const [modalWaitShow, setModalWaitShow] = useState(false);
  const [modalWaitText, setModalWaitText] = useState(false);
  /* User loging & registration */
  const [auth, setAuth] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  /* Reinforced Concrete data for API and handle errors */
  const [reinforcedConcreteData, setReinforcedConcreteData] = useState({});
  /* Double Reinforced Concrete data for API and handle errors & data from API */
  const [doubleReinforcedConcreteData, setDoubleReinforcedConcreteData] =
    useState({});
  const [
    doubleReinforcedConcreteDataFromApi,
    setDoubleReinforcedConcreteDataFromApi,
  ] = useState({});
  /* T Reinforced Concrete data for API and handle errors & data from API */
  const [tReinforcedConcreteData, setTreinforcedConcreteData] = useState({});
  const [tReinforcedConcreteDataFromApi, setTreinforcedConcreteDataFromApi] =
    useState({});
  /* Single dimensioning concrete data for API and handle errors & data from API */
  const [singleDimensioningData, setSingleDimensioningData] = useState({});
  const [singleDimensioningDataFromApi, setSingleDimensioningDataDataFromApi] =
    useState({});
  /* Flag for start computing */
  const [apiTrigger, setApiTrigger] = useState({
    isButtonPressed: false,
    isNoErrors: false,
    isWaitForAction: false,
  });

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
        setAuth,
        auth,
        isLogged,
        setIsLogged,
        reinforcedConcreteData,
        setReinforcedConcreteData,
        /* Double Reinforced Concrete data for API and handle errors & data from API */
        doubleReinforcedConcreteData,
        setDoubleReinforcedConcreteData,
        doubleReinforcedConcreteDataFromApi,
        setDoubleReinforcedConcreteDataFromApi,
        apiTrigger,
        setApiTrigger,
        /* T Reinforced Concrete data for API and handle errors & data from API */
        tReinforcedConcreteData,
        setTreinforcedConcreteData,
        tReinforcedConcreteDataFromApi,
        setTreinforcedConcreteDataFromApi,
        /* Single dimensioning concrete data for API and handle errors & data from API */
        singleDimensioningData,
        setSingleDimensioningData,
        singleDimensioningDataFromApi,
        setSingleDimensioningDataDataFromApi,
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
