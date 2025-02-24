import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:restaurante" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
