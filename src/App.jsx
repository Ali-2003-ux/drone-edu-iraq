import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import FlightTimeCalculator from './components/Calculators/FlightTimeCalculator';
import ForcesOfFlight from './modules/fundamentals/ForcesOfFlight'; // Placeholder for next step

import BuildWizard from './modules/build-guide/BuildWizard';
import CodeLab from './modules/codelab/CodeLab';
import ThrustToWeightCalculator from './components/Calculators/ThrustToWeightCalculator';

// Placeholder components for routes not yet implemented
const Hardware = () => <div className="text-center mt-20 text-slate-500">Hardware Module Coming Soon</div>;

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
