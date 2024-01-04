import React, { Component } from 'react';
import './App.css';

import Map from './components/map';
import FloatingButton from './components/FloatingButton'; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />
        <FloatingButton />
      </div>
    );
  }
}

export default App;
