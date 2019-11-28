import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import Shop from './pages/shop/shop.component.jsx';

// const HatsPage = (props) => (
//   <div>
//       <h1>HATS PAGE</h1>
//       { console.log(props)};
      
//   </div>
// );

function App() {
  return (
    <div>
      <Switch>
        {/**Switch matches the exact path to render */}
        {/** Route only passes the three props to the component specified and not to the children of the components such as Menu Item */}
      <Route exact component={HomePage} path={'/'} />
      <Route component={Shop} path={'/shop'} />
      </Switch>
    </div>
  );
}

export default App;
