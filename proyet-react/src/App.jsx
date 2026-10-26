import { useState, useEffect } from 'react';
import './styles/Utilidades.css';
import './App.css';

import { CarritoModal } from './components/basicos/CarritoModal';
import { Navbar } from './components/basicos/Navbar';
import { Footer } from './components/basicos/Footer';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';

import { 
  agregarAlCarrito, 
  eliminarDelCarrito, 
  cambiarCantidad, 
  contarTotalItems 
} from './logica/carrito';

export function App() {
  const [vistaActual, setVistaActual] = useState('inicio');

  // Carga inicial respaldada desde localStorage para no perder los productos al recargar
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('buildmypc_carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [showCarrito, setShowCarrito] = useState(false);

  // Guarda automáticamente en localStorage ante cualquier cambio en el carrito
  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_carrito', JSON.stringify(carrito));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [carrito]);

  // Manejadores con validaciones
  const handleAgregarAlCarrito = (producto) => {
    if (!producto || !producto.id) return;
    setCarrito((prev) => agregarAlCarrito(prev, producto));
  };

  const handleEliminarDelCarrito = (id) => {
    setCarrito((prev) => eliminarDelCarrito(prev, id));
  };

  const handleCambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) => cambiarCantidad(prev, id, nuevaCantidad));
  };

  const handleVaciarCarrito = () => {
    setCarrito([]);
  };

  const renderizarVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio onAgregar={handleAgregarAlCarrito} />;
      case 'catalogo':
        return <Catalogo onAgregar={handleAgregarAlCarrito} />;
      case 'armador':
        return <Armador onAgregar={handleAgregarAlCarrito} />;
      case 'cotizaciones':
      case 'login':
      case 'auth':
        return <Auth />;
      default:
        return <Inicio onAgregar={handleAgregarAlCarrito} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        setVista={setVistaActual} 
        vistaActual={vistaActual} 
        totalItems={contarTotalItems(carrito)}
        onOpenCarrito={() => setShowCarrito(true)}
      />

      {renderizarVista()}

      <CarritoModal
        items={carrito}
        show={showCarrito}
        onClose={() => setShowCarrito(false)}
        onEliminar={handleEliminarDelCarrito}
        onCantidad={handleCambiarCantidad}
        onLimpiar={handleVaciarCarrito}
      />

      <Footer />
    </div>
  );
}

export default App;