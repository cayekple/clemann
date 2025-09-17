import React from 'react';
import logo from './logo.svg';
import './App.css';
import WeddingTasks from './components/WeddingTasks/WeddingTasks';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main style={{ padding: '1rem', textAlign: 'left' }}>
        <WeddingTasks />
      </main>
    </div>
  );
}

export default App;
