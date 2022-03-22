import NavigationBar from "./NavigationBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import TestApiView from "./views/TestApiView";
import ReinforcedConcreteCalcView from "./views/ReinforcedConcreteCalcView";
import AppModal from "./views/AppModal";

import { useGlobalContext } from "./Context";

function App() {
  const { modalShow, setModalShow, modalText } = useGlobalContext();
  return (
    <>
      <AppModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        text={modalText}
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
