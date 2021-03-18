import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import Routes from './Routes'

ReactDOM.render(
  <Router>
        <div className="App">
            <Routes />
        </div>
    </Router>,
  document.getElementById('root')
);