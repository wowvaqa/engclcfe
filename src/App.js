import NavigationBar from "./NavigationBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import TestApiView from "./views/TestApiView";
import ReinforcedConcreteCalcView from "./calcsViews/ReinforcedConcreteCalcView";
import RectDoubleReinfCalcView from "./calcsViews/RectDoubleReinfCalcView";
import RectFindReinfCalcView from "./calcsViews/RectFindReinfCalcView";
import TsecReinfCalcView from "./calcsViews/TsecReinfCalcView";

import LogView from "./views/LogView";
import AppModalInfo from "./modals/AppModalInfo";
import AppModalInput from "./modals/AppModalInput";
import AppModalWait from "./modals/AppModalWait";
import RegisterView from "./views/RegisterView";
import CompDataThree from "./views/CompDataThree";
import CanvasTesting from "./views/CanvasTesting";

import { useGlobalContext } from "./Context";

function App() {
  const {
    modalInfoShow,
    setModalInfoShow,
    modalInfoText,
    modalInputShow,
    setModalInputShow,
    modalInputText,
    modalWaitShow,
    modalWaitText,
    setModalWaitShow,
  } = useGlobalContext();

  return (
    <>
      <AppModalInfo
        show={modalInfoShow}
        onHide={() => setModalInfoShow(false)}
        text={modalInfoText}
      />
      <AppModalInput
        show={modalInputShow}
        onHide={() => setModalInputShow(false)}
        text={modalInputText}
      />
      <AppModalWait
        show={modalWaitShow}
        onHide={() => setModalWaitShow(false)}
        text={modalWaitText}
      />
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/testapi" element={<TestApiView />} />
          <Route
            path="/calcs/reinforcedconcretecalc"
            element={<ReinforcedConcreteCalcView />}
          />
          <Route
            path="/calcs/rectdoublereinfcalc"
            element={<RectDoubleReinfCalcView />}
          />
          <Route
            path="/calcs/rectfindreinfcalc"
            element={<RectFindReinfCalcView />}
          />
          <Route path="/calcs/tsecreinfcalc" element={<TsecReinfCalcView />} />
          <Route path="/login" element={<LogView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/compdatathree" element={<CompDataThree />} />
          <Route path="/canvastesting" element={<CanvasTesting />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
