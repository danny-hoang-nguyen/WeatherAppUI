import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListWeatherLogComponent from './ListWeatherLogComponent'
import SearchWeatherComponent from './SearchWeatherComponent'
function App() {
  return (
    <div className="App">
      <SearchWeatherComponent/>
      <ListWeatherLogComponent/>
    </div>
  );
}

export default App;
