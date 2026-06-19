import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Calculator from './components/calculator/Calculator';

function App() {
  return (
    <ThemeProvider>
      <main className="app-container">
        <h1 className="sr-only">Máy Tính Đa Năng ReactJS - Multi-Theme Calculator</h1>
        <Calculator />
      </main>
    </ThemeProvider>
  );
}

export default App;
