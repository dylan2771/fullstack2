import { useState } from 'react';
import './styles/Utilidades.css';
import './App.css';

import { CarritoModal } from './components/basicos/CarritoModal';
import { Navbar } from './components/basicos/Navbar';
import { Footer } from './components/basicos/Footer';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';

export function App() {
  const [vistaActual, setVistaActual] = useState('inicio');

  const renderizarVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio />;
      case 'catalogo':
        return <Catalogo />;
      case 'armador':
        return <Armador />;
      case 'cotizaciones':
        // Acepta 'cotizaciones' desde el Navbar
        return <Auth />; // Reemplaza por tu componente <Cotizaciones /> si lo tienes
      case 'login':
      case 'auth':
        // Acepta tanto 'login' como 'auth'
        return <Auth />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="app-container">
      <Navbar setVista={setVistaActual} vistaActual={vistaActual} />
      {renderizarVista()}
      <Footer />
    </div>
  );
}

export default App;