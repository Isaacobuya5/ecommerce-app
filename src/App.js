import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = (props) => (
  <div>
      <h1>HATS PAGE</h1>
      { console.log(props)};
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        {/**Switch matches the exact path to render */}
      <Route exact component={HomePage} path={'/'} />
      <Route component={HatsPage} path={'/hats'} />
      </Switch>
    </div>
  );
}

export default App;
