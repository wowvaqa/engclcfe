import NavigationBar from "./NavigationBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import TestApiView from "./views/TestApiView";
import ReinforcedConcreteCalcView from "./views/ReinforcedConcreteCalcView";
import LogView from "./views/LogView";
import AppModalInfo from "./modals/AppModalInfo";
import AppModalInput from "./modals/AppModalInput";
import AppModalWait from "./modals/AppModalWait";
import RegisterView from "./views/RegisterView";
import CompDataThree from "./views/CompDataThree"

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
            path="/reinforcedconcretecalc"
            element={<ReinforcedConcreteCalcView />}
          />
          <Route path="/login" element={<LogView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/compdatathree" element={<CompDataThree/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
