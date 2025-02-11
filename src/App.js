import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Animation from './pages/Animation';
import Parameters from './pages/Parameters';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animation" element={<Animation />} />
      <Route path="/parameters" element={<Parameters />} />
    </Routes>
  );
}

export default App;
