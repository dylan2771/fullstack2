// src/pages/Cotizaciones.jsx
import React, { useState, useEffect } from 'react';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../logica/formato';

export function Cotizaciones({ setVista, onAgregar }) {
  const [cotizaciones, setCotizaciones] = useState([]);

  // Carga las cotizaciones guardadas desde localStorage
  useEffect(() => {
    try {
      const guardadas = localStorage.getItem('buildmypc_cotizaciones');
      setCotizaciones(guardadas ? JSON.parse(guardadas) : []);
    } catch (e) {
      console.error('Error al obtener las cotizaciones:', e);
    }
  }, []);

  const handleCargarAlCarrito = (cotizacion) => {
    if (onAgregar) {
      onAgregar({
        id: 'cotizacion-' + Date.now(),
        nombre: cotizacion.nombre || 'Cotización de PC Gamer',
        precio: cotizacion.totalNeto || cotizacion.precio || 0,
        cantidad: 1
      });
      alert('✅ ¡Cotización añadida al Carrito de Compras!');
    }
  };

  return (
    <main className="container py-5">
      {/* Encabezado */}
      <div className="mb-4 text-start">
        <span 
          className="badge mb-2 px-3 py-2 fw-bold" 
          style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
        >
          📄 Historial de Presupuestos
        </span>
        <h1 className="display-5 fw-bold mb-2" style={{ color: '#00FF66' }}>
          Mis Cotizaciones
        </h1>
        <p className="text-secondary fs-5 mb-0">
          Gestiona y revisa los presupuestos guardados de tus configuraciones de PC.
        </p>
      </div>

      {/* Lista / Estado Vacío */}
      {cotizaciones.length === 0 ? (
        <div 
          className="card p-5 text-center my-4 border-secondary" 
          style={{ backgroundColor: '#111827', color: '#E5E7EB' }}
        >
          <div className="fs-1 mb-3">📄</div>
          <h4 className="fw-bold mb-2">No tienes cotizaciones guardadas</h4>
          <p className="text-muted mb-4">
            Puedes armar una configuración personalizada en el Armador y guardar tu presupuesto para después.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button 
              className="btn fw-bold px-4 py-2 text-dark" 
              style={{ backgroundColor: '#00FF66' }}
              onClick={() => setVista('armador')}
            >
              🛠️ Ir al Armador
            </button>
            <button 
              className="btn btn-outline-light px-4 py-2"
              onClick={() => setVista('login')}
            >
              🔐 Iniciar Sesión
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {cotizaciones.map((cot, index) => {
            const neto = cot.totalNeto || cot.precio || 0;
            const iva = calcularIVA(neto);
            const total = calcularTotalConIVA(neto);

            return (
              <div key={cot.id || index} className="col-md-6 col-lg-4">
                <div 
                  className="card p-4 border-secondary text-white h-100 d-flex flex-column justify-content-between" 
                  style={{ backgroundColor: '#111827' }}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold text-success mb-0">{cot.nombre || `Cotización #${index + 1}`}</h5>
                      <small className="text-muted">{cot.fecha || 'Reciente'}</small>
                    </div>
                    <hr className="border-secondary" />
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>Subtotal Neto:</span>
                      <span>{formatearCLP(neto)}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted mb-1">
                      <span>IVA (19%):</span>
                      <span>{formatearCLP(iva)}</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold text-success fs-5 my-2">
                      <span>Total:</span>
                      <span>{formatearCLP(total)}</span>
                    </div>
                  </div>

                  <button 
                    className="btn w-100 fw-bold mt-3 text-dark"
                    style={{ backgroundColor: '#00FF66' }}
                    onClick={() => handleCargarAlCarrito(cot)}
                  >
                    🛒 Cargar al Carrito
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}