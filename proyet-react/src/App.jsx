// src/App.jsx
import { useState, useEffect } from 'react';
import './styles/Utilidades.css';
import './App.css';

import { useAuth } from './auth/useAuth';
import { CarritoModal } from './components/basicos/CarritoModal';
import { PagoModal } from './components/basicos/PagoModal';
import { Navbar } from './components/basicos/Navbar';
import { Footer } from './components/basicos/Footer';

import { Inicio } from './pages/Inicio';
import { Catalogo } from './pages/Catalogo';
import { Armador } from './pages/Armador';
import { Auth } from './pages/Auth';
import { Pedidos } from './pages/Pedidos';
import { Cotizaciones } from './pages/cotizaciones';

import { 
  agregarAlCarrito, 
  eliminarDelCarrito, 
  cambiarCantidad, 
  contarTotalItems 
} from './logica/carrito';

export function App() {
  const { usuario: usuarioAuth, logout } = useAuth();
  const [usuarioSesion, setUsuarioSesion] = useState(null);
  const usuario = usuarioAuth || usuarioSesion;

  const [vistaActual, setVistaActual] = useState('inicio');
  const [showCarrito, setShowCarrito] = useState(false);
  const [showPago, setShowPago] = useState(false);
  const [pendientePago, setPendientePago] = useState(false);
  const [montoPagoFinal, setMontoPagoFinal] = useState(null); // 👈 Nuevo estado para el total con cupón

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [vistaActual]);

  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_carrito', JSON.stringify(carrito));
    } catch (e) {
      console.error('Error al guardar el carrito:', e);
    }
  }, [carrito]);

  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_pedidos', JSON.stringify(pedidos));
    } catch (e) {
      console.error('Error al guardar los pedidos:', e);
    }
  }, [pedidos]);

  const handleNavegar = (nuevaVista) => {
    if (nuevaVista !== 'login' && nuevaVista !== 'auth') {
      setPendientePago(false);
    }
    setVistaActual(nuevaVista);
  };

  const handleLoginExitoso = (usuarioLogueado) => {
    if (usuarioLogueado) {
      setUsuarioSesion(usuarioLogueado);
    }
    if (pendientePago) {
      setPendientePago(false);
      setVistaActual('inicio');
      setShowPago(true);
    } else {
      setVistaActual('cotizaciones');
    }
  };

  // Cerrar sesión con confirmación, vaciado de carrito y alerta de éxito
  const handleLogout = () => {
    const seguro = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (!seguro) return;

    logout();
    setUsuarioSesion(null);
    setCarrito([]);
    localStorage.removeItem('buildmypc_carrito');
    setPendientePago(false);
    setVistaActual('inicio');

    alert('¡Sesión cerrada con éxito!');
  };

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

  // Recibe el total final con descuento desde el CarritoModal
  const handleIrAPagar = (totalConDescuento) => {
    setShowCarrito(false);
    setMontoPagoFinal(totalConDescuento); // 👈 Guardamos el total con cupón
    if (!usuario) {
      setPendientePago(true);
      setVistaActual('login');
      return;
    }
    setShowPago(true);
  };

  const handleConfirmarPago = (nuevoPedido) => {
    const pedidoConPropietario = {
      ...nuevoPedido,
      total: montoPagoFinal !== null ? montoPagoFinal : nuevoPedido.total, // Asegura registrar el total con descuento
      propietario: usuario ? (usuario.nombre || usuario.email) : 'Invitado'
    };

    setPedidos((prev) => [pedidoConPropietario, ...prev]);
    setCarrito([]);
    setShowPago(false);
    setMontoPagoFinal(null);
    setVistaActual('pedidos');
  };

  const handleEliminarPedido = (idPedido) => {
    setPedidos((prev) => prev.filter((p) => p.id !== idPedido));
  };

  const renderizarVista = () => {
    switch (vistaActual) {
      case 'inicio':
        return <Inicio setVista={handleNavegar} onAgregar={handleAgregarAlCarrito} />;
      case 'catalogo':
        return <Catalogo onAgregar={handleAgregarAlCarrito} />;
      case 'armador':
        return <Armador onAgregar={handleAgregarAlCarrito} />;
      case 'pedidos':
        return (
          <Pedidos 
            pedidos={pedidos} 
            onEliminarPedido={handleEliminarPedido} 
            usuario={usuario} 
          />
        );
      case 'cotizaciones':
      case 'login':
      case 'auth':
        return usuario ? (
          <Cotizaciones 
            usuario={usuario} 
            onAgregar={handleAgregarAlCarrito} 
          />
        ) : (
          <Auth 
            onLogin={handleLoginExitoso} 
            mensajeAviso={pendientePago ? 'Inicia sesión para finalizar tu compra.' : null}
          />
        );
      default:
        return <Inicio setVista={handleNavegar} onAgregar={handleAgregarAlCarrito} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar 
        setVista={handleNavegar} 
        vistaActual={vistaActual} 
        totalItems={contarTotalItems(carrito)}
        onOpenCarrito={() => setShowCarrito(true)}
        usuario={usuario}
        onLogout={handleLogout}
      />

      {renderizarVista()}

      <CarritoModal
        items={carrito}
        show={showCarrito}
        onClose={() => setShowCarrito(false)}
        onEliminar={handleEliminarDelCarrito}
        onCantidad={handleCambiarCantidad}
        onLimpiar={handleVaciarCarrito}
        onIrAPagar={handleIrAPagar}
      />

      <PagoModal
        show={showPago}
        items={carrito}
        montoTotalFinal={montoPagoFinal} // 👈 Le pasamos el total con descuento al modal de pago
        onClose={() => setShowPago(false)}
        onConfirmarPago={handleConfirmarPago}
      />

      <Footer />
    </div>
  );
}

export default App;