import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  /* Dynamic draw data */
  const [dynamicDrawData, setDynamicDrawData] = useState({});
  /* Stroke Width, bleeding of figure on dynamic draw */
  const [drawProperties, setDrawProperties] = useState({});
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
  const [singleDimensioningDataFromApi, setSingleDimensioningDataFromApi] =
    useState({});
  /* Data for T Draw */
  const [tDrawData, setTDrawData] = useState({
    b: 0.5,
    h: 1.2,
    b_eff: 1,
    h_sl: 0.2,
  });
  /* Data for T Draw */
  const [tDrawDataFromSliders, setTDrawDataFromSliders] = useState({
    b: 0.5,
    h: 1.2,
    b_eff: 1,
    h_sl: 0.2,
  });

  /* 
      A flag indicating that the calculation is ready to begin.
      isButtonPressed - Button 'Calculate' from calc view 
      isNoErrors - There is no errrs from ErrorHandler
      isWaitForAction - Waiting for user action (./modals/AppModalWait)
  */
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

  const [reRenderComponent, setReRenderComponent] = useState(false);

  return (
    <AppContext.Provider
      value={{
        dynamicDrawData,
        setDynamicDrawData,
        drawProperties,
        setDrawProperties,
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
        /* T Reinforced Concrete data for API and handle errors & data from API */
        tReinforcedConcreteData,
        setTreinforcedConcreteData,
        tReinforcedConcreteDataFromApi,
        setTreinforcedConcreteDataFromApi,
        /* Single dimensioning concrete data for API and handle errors & data from API */
        singleDimensioningData,
        setSingleDimensioningData,
        singleDimensioningDataFromApi,
        setSingleDimensioningDataFromApi,
        /* A flag indicating that the calculation is ready to begin. */
        apiTrigger,
        setApiTrigger,
        /* Flag for reRendering component */
        reRenderComponent,
        setReRenderComponent,
        /* Data for T Draw */
        tDrawData,
        setTDrawData,
        /* Data from JSXDrawT sliders */
        tDrawDataFromSliders,
        setTDrawDataFromSliders,
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
