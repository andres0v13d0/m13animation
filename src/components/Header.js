import React from 'react';
import '../assets/styles/Header.css';

function Header({ showNav, currentPage }) {
  return (
    <header>
      <img src="icono.png" alt="Logo" />
      <h1>BactoSim</h1>
      {showNav && (
        <nav>
          <ul>
            <a href="/"><li className='noactive'>Inicio</li></a>
            <a href="/animation"><li className={currentPage === 'animation' ? 'active' : ''}>Animación</li></a>
            <a href="/parameters"><li className={currentPage === 'parameters' ? 'active' : ''}>Parámetros</li></a>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
