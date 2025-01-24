import './App.css';
import React from 'react';
import Gallery from './Components/Gallery';  // Import the Gallery component

const App = () => {
  
  return (
    <div className="App">
      <h1 className="text-center my-4">Game Gallery</h1>
      <Gallery /> {/* Render the Gallery component here */}
    </div>
  );
}

export default App;