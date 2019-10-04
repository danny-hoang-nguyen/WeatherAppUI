import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListWeatherLogComponent from './component/ListWeatherLogComponent'
import SearchWeatherComponent from './component/SearchWeatherComponent'
function App() {
  return (
    <div className="App">
    <h1>Weather App</h1>
      <SearchWeatherComponent/>
      <br/>
      <ListWeatherLogComponent/>
    </div>
  );
}

export default App;
