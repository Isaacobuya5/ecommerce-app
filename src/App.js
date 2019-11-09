import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
      <h1>HATS PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
    <Route exact component={HomePage} path={'/'} />
    <Route exact component={HatsPage} path={'/'} />
    </div>
  );
}

export default App;
