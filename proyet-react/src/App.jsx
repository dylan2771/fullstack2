import { useState, useEffect } from 'react';
import './styles/Utilidades.css';
import './App.css';

import { CarritoModal } from './components/basicos/CarritoModal';
import { PagoModal } from './components/basicos/PagoModal';
import { Navbar } from './components/basicos/Navbar';
import { Footer } from './components/basicos/Footer';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';
import { Pedidos } from './pages/Pedidos';

import { 
  agregarAlCarrito, 
  eliminarDelCarrito, 
  cambiarCantidad, 
  contarTotalItems 
} from './logica/carrito';

export function App() {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [showCarrito, setShowCarrito] = useState(false);
  const [showPago, setShowPago] = useState(false);

  // Carrito respaldado en localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('buildmypc_carrito');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  // Historial de pedidos respaldado en localStorage
  const [pedidos, setPedidos] = useState(() => {
    try {
      const guardado = localStorage.getItem('buildmypc_pedidos');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  // Guardado automático del carrito
  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_carrito', JSON.stringify(carrito));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [carrito]);

  // Guardado automático de los pedidos
  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_pedidos', JSON.stringify(pedidos));
    } catch (e) {
      console.error('Error al guardar los pedidos:', e);
    }
  }, [pedidos]);

  // Manejadores del carrito
  const handleAgregarAlCarrito = (producto, cantidad = 1) => {
    if (!producto || !producto.id) return;
    const numCantidad = Number(cantidad) || 1;
    setCarrito((prev) => agregarAlCarrito(prev, producto, numCantidad));
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

  // Flujo de pago y pedidos
  const handleIrAPagar = () => {
    setShowCarrito(false);
    setShowPago(true);
  };

  const handleConfirmarPago = (nuevoPedido) => {
    setPedidos((prev) => [nuevoPedido, ...prev]);
    setCarrito([]);
    setShowPago(false);
    setVistaActual('pedidos');
  };

  const handleEliminarPedido = (idPedido) => {
    setPedidos((prev) => prev.filter((p) => p.id !== idPedido));
  };

  const renderizarVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio onAgregar={handleAgregarAlCarrito} />;
      case 'catalogo':
        return <Catalogo onAgregar={handleAgregarAlCarrito} />;
      case 'armador':
        return <Armador onAgregar={handleAgregarAlCarrito} />;
      case 'pedidos':
        return <Pedidos pedidos={pedidos} onEliminarPedido={handleEliminarPedido} />;
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

      {/* Modal del Carrito */}
      <CarritoModal
        items={carrito}
        show={showCarrito}
        onClose={() => setShowCarrito(false)}
        onEliminar={handleEliminarDelCarrito}
        onCantidad={handleCambiarCantidad}
        onLimpiar={handleVaciarCarrito}
        onIrAPagar={handleIrAPagar}
      />

      {/* Modal de Pago / Checkout */}
      <PagoModal
        show={showPago}
        items={carrito}
        onClose={() => setShowPago(false)}
        onConfirmarPago={handleConfirmarPago}
      />

      <Footer />
    </div>
  );
}

export default App;