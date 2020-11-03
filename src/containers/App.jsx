import React from 'react';
import Offers from '../components/Offers';
// import Create from '../components/Create';

import '../assets/css/App.scss';
import 'jquery';
import 'popper.js';

const App = () => {
  return (
    <div className="container py-4">
      <Offers />
    </div>
  );
};

export default App;
