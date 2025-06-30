// src/App.js
import React, { useEffect } from 'react'; // 👈 Importa useEffect
import './App.css';
import Anuncio from './components/Anuncio';

function App() {
  // 👇 Este useEffect se ejecuta una vez al cargar el componente
  useEffect(() => {
    window.scrollTo(0, 1); // Empujón para esconder la barra del navegador
  }, []);

  return (
    <div className="App">
      <Anuncio />
    </div>
  );
}

export default App;
