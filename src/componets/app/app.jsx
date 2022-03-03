import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Soccer Stat</h1>
      <div>
        <span>Token</span>
        <span>{process.env.REACT_APP_TOKEN}</span>
      </div>
    </div>
  );
}

export default App;
