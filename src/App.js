import { Routes, Route } from "react-router-dom";

import RimacHeader from "./components/rimac-header";

import HomeScreen from './screens/Home';
import ArmaTuPlanScreen from './screens/Arma_Tu_Plan';
import GraciasScreen from './screens/Gracias';

function App() {
  return (
    <>
      {/* TODO: get from redux or something like that */}
      <RimacHeader />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/arma-tu-plan" element={<ArmaTuPlanScreen />} />
          <Route path="/gracias" element={<GraciasScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
