// src/components/basicos/CarritoModal.jsx
import React from 'react';
import { calcularFinanzas } from '../../logica/formato';

export function CarritoModal({ items, show, onClose, onEliminar, onCantidad, onLimpiar }) {
  if (!show) return null;

  const finanzas = calcularFinanzas(items);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-dark text-white border-success">

          <div className="modal-header border-secondary">
            <h5 className="modal-title text-success fw-bold">🛒 Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {items.length === 0 ? (
              <p className="text-center text-muted my-4">El carrito está vacío. ¡Agrega algunos componentes!</p>
            ) : (
              <>
                <ul className="list-group list-group-flush mb-3">
                  {items.map((item) => (
                    <li key={item.id} className="list-group-item bg-dark text-white d-flex justify-content-between align-items-center border-secondary">
                      <div>
                        <h6 className="mb-0 text-white">{item.nombre}</h6>
                        <small className="text-success">${item.precio?.toLocaleString('es-CL')}</small>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => onCantidad(item.id, item.cantidad - 1)}>-</button>
                        <span className="fw-bold px-2">{item.cantidad}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => onCantidad(item.id, item.cantidad + 1)}>+</button>
                        <button className="btn btn-sm btn-danger ms-2" onClick={() => onEliminar(item.id)}>🗑️</button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="p-3 bg-secondary bg-opacity-10 rounded border border-secondary">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Subtotal Neto:</span>
                    <span>{finanzas.netoFormateado}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span>IVA (19%):</span>
                    <span>{finanzas.ivaFormateado}</span>
                  </div>
                  <hr className="border-secondary" />
                  <div className="d-flex justify-content-between fw-bold text-success fs-5">
                    <span>Total Final:</span>
                    <span>{finanzas.totalFormateado}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer border-secondary d-flex justify-content-between">
            {items.length > 0 && (
              <button className="btn btn-outline-danger btn-sm" onClick={onLimpiar}>Vaciar Carrito</button>
            )}
            <button className="btn btn-success fw-bold text-dark" onClick={onClose}>Cerrar</button>
          </div>

        </div>
      </div>
    </div>
  );
}