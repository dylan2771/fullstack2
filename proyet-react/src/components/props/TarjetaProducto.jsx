// src/components/props/TarjetaProducto.jsx
import React from 'react';
import { formatearCLP } from '../../logica/formato';

export const TarjetaProducto = (props) => {
  // Soporta recibir la prop como 'producto' o como props individuales destructuradas
  const prod = props.producto || props;
  const { id, nombre, precio, watts, imagen, categoria, onAgregar } = props.producto 
    ? { ...props.producto, onAgregar: props.onAgregar } 
    : props;

  if (!nombre) return null;

  const handleAgregar = () => {
    if (onAgregar) {
      onAgregar({
        id: String(id || Date.now()),
        nombre,
        precio: Number(precio) || 0,
        watts: Number(watts) || 0,
        imagen,
        cantidad: 1
      });
    }
  };

  return (
    <div 
      className="card h-100 p-3 text-white border-secondary shadow-sm" 
      style={{ backgroundColor: '#111827', borderRadius: '10px' }}
    >
      {imagen && (
        <img 
          src={imagen} 
          alt={nombre} 
          className="card-img-top rounded mb-3"
          style={{ height: '180px', objectFit: 'cover', backgroundColor: '#080C14' }}
        />
      )}

      <div className="card-body d-flex flex-column justify-content-between p-0">
        <div>
          {categoria && (
            <span className="badge bg-secondary mb-2 text-uppercase" style={{ fontSize: '0.7rem' }}>
              {categoria}
            </span>
          )}
          <h5 className="card-title fw-bold text-white mb-2">{nombre}</h5>
          {watts !== undefined && <p className="text-muted small mb-2">⚡ Consumo: {watts}W</p>}
        </div>

        <div className="mt-3">
          <div className="fs-4 fw-bold text-success mb-3">
            {formatearCLP ? formatearCLP(precio) : `$${Number(precio).toLocaleString('es-CL')}`}
          </div>

          <button
            type="button"
            className="btn w-100 fw-bold text-dark d-flex align-items-center justify-content-center gap-2"
            style={{ 
              backgroundColor: '#00FF66', 
              border: 'none',
              borderRadius: '6px'
            }}
            onClick={handleAgregar}
          >
            🛒 Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};