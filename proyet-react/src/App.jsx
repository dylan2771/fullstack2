import { useState } from 'react';
import './styles/Utilidades.css';
import './App.css';

import { Navbar } from './components/basicos/Navbar';
import { Footer } from './components/basicos/Footer';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';
// Importa aquí tu componente o página de Cotizaciones si lo tienes por separado:
// import { Cotizaciones } from './pages/Cotizaciones';

export function App() {
  // Estado principal para la navegación
  const [vistaActual, setVistaActual] = useState('inicio');

  // Renderizado condicional según la vista seleccionada
  const renderizarVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio />;
      case 'catalogo':
        return <Catalogo />;
      case 'armador':
        return <Armador />;
      case 'cotizaciones':
        // Si no tienes una página Cotizaciones separada aún, renderiza la vista que corresponda
        return <Auth />; // Cambiar por <Cotizaciones /> según tu proyecto
      case 'login':
        return <Auth />;
      default:
        return <Inicio />;
    }
  };

  return (
    <div className="app-container">
      {/* Pasamos la función para cambiar de vista al Navbar */}
      <Navbar setVista={setVistaActual} vistaActual={vistaActual} />
      
      {/* Se muestra solo la página seleccionada */}
      {renderizarVista()}

      <Footer />
    </div>
  );
}

export default App;