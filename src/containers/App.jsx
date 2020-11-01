import React from 'react';
import Offers from '../components/Offers';

import '../assets/css/App.scss';
import 'jquery';
import 'popper.js';

const App = () => {
  return (
    <div className="container py-4">
      <div className="row">
        <Offers />
      </div>
    </div>
  );
};

export default App;
