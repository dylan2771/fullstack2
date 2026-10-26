// src/components/props/ListaProductos.jsx
import React from 'react';
import { TarjetaProducto } from './TarjetaProducto';

export const ListaProductos = ({ productos = [], onAgregar }) => {
  if (!productos || productos.length === 0) {
    return (
      <div 
        className="card p-5 text-center my-4" 
        style={{ 
          backgroundColor: '#111827', 
          border: '2px dashed #1F2937', 
          borderRadius: '12px' 
        }}
      >
        <div className="fs-1 mb-2" style={{ color: '#00FF66' }}>📦</div>
        <h4 className="text-white fw-bold mb-2">No hay productos disponibles</h4>
        <p className="text-secondary mb-0">Por el momento no encontramos componentes registrados en esta lista.</p>
      </div>
    );
  }

  return (
    <section className="seccion-catalogo my-4">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {productos.map((prod) => (
          <div className="col" key={prod.id || prod.nombre}>
            <TarjetaProducto
              producto={prod}
              id={prod.id}
              nombre={prod.nombre}
              precio={prod.precio}
              watts={prod.watts}
              imagen={prod.imagen}
              categoria={prod.categoria}
              onAgregar={onAgregar}
            />
          </div>
        ))}
      </div>
    </section>
  );
};