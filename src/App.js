import NavigationBar from "./NavigationBar";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeView from "./views/HomeView";
import TestApiView from "./views/TestApiView";
import ReinforcedConcreteCalcView from "./views/ReinforcedConcreteCalcView";

function App() {
  return (
    <>
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
