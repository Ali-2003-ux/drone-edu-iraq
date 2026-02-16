import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FlightTimeCalculator from './components/Calculators/FlightTimeCalculator';
import ForcesOfFlight from './modules/fundamentals/ForcesOfFlight'; // Placeholder for next step

import BuildWizard from './modules/build-guide/BuildWizard';
import CodeLab from './modules/codelab/CodeLab';
import ThrustToWeightCalculator from './components/Calculators/ThrustToWeightCalculator';

import Hardware from './modules/hardware/Hardware';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ForcesOfFlight />} />
        <Route path="hardware" element={<Hardware />} />
        <Route path="tools" element={
          <div className="space-y-12">
            <FlightTimeCalculator />
            <hr className="border-slate-800" />
            <ThrustToWeightCalculator />
          </div>
        } />
        <Route path="build" element={<BuildWizard />} />
        <Route path="code" element={<CodeLab />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
