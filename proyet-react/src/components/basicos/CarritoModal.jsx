import React from 'react';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../../logica/formato';

export function CarritoModal({ 
  items = [], 
  show, 
  onClose, 
  onEliminar, 
  onCantidad, 
  onLimpiar,
  onIrAPagar 
}) {
  if (!show) return null;

  const listaItems = Array.isArray(items) ? items : [];

  const neto = listaItems.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 1;
    return acc + (precio * cantidad);
  }, 0);

  const iva = calcularIVA(neto);
  const total = calcularTotalConIVA(neto);

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content text-white border-success shadow-lg" style={{ backgroundColor: '#111827' }}>
          
          <div className="modal-header border-secondary">
            <h5 className="modal-title text-success fw-bold d-flex align-items-center gap-2">
              🛒 Carrito de Compras <span className="badge bg-success text-dark fs-6">{listaItems.length}</span>
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {listaItems.length === 0 ? (
              <div className="text-center my-5">
                <div className="fs-1 mb-2">🛒</div>
                <h5 className="text-white fw-bold">Tu carrito está vacío</h5>
                <p className="text-muted small">Explora el catálogo o el armador para añadir componentes a tu orden.</p>
              </div>
            ) : (
              <>
                <ul className="list-group list-group-flush mb-3">
                  {listaItems.map((item) => (
                    <li key={item.id} className="list-group-item text-white d-flex justify-content-between align-items-center border-secondary py-3" style={{ backgroundColor: '#1F2937' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div>
                          <h6 className="mb-0 text-white fw-bold">{item.nombre}</h6>
                          <small className="text-success fw-semibold">{formatearCLP(item.precio)} c/u</small>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        {/* Selector de cantidad con entrada manual e incremento */}
                        <div className="d-flex align-items-center gap-1">
                          <button 
                            className="btn btn-sm btn-outline-secondary text-white px-2" 
                            onClick={() => onCantidad(item.id, Math.max(1, item.cantidad - 1))}
                          >
                            -
                          </button>
                          
                          <input
                            type="number"
                            min="1"
                            max={item.stock || 99}
                            value={item.cantidad}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val) && val >= 1) {
                                onCantidad(item.id, val);
                              }
                            }}
                            className="form-control bg-dark text-white border-secondary text-center p-1"
                            style={{ width: '60px', fontSize: '14px', fontWeight: 'bold' }}
                          />

                          <button 
                            className="btn btn-sm btn-outline-secondary text-white px-2" 
                            onClick={() => onCantidad(item.id, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>

                        {/* Multiplicación limpia del Subtotal */}
                        <span className="fw-bold ms-2 text-success me-3">
                          {formatearCLP(item.precio * item.cantidad)}
                        </span>
                        
                        <button className="btn btn-sm btn-outline-danger border-0" onClick={() => onEliminar(item.id)}>🗑️</button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Resumen de Pago */}
                <div className="p-3 rounded border border-secondary" style={{ backgroundColor: '#080C14' }}>
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>Subtotal Neto:</span>
                    <span>{formatearCLP(neto)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1 text-muted">
                    <span>IVA (19%):</span>
                    <span>{formatearCLP(iva)}</span>
                  </div>
                  <hr className="border-secondary my-2" />
                  <div className="d-flex justify-content-between fw-bold text-success fs-4">
                    <span>Total a Pagar:</span>
                    <span>{formatearCLP(total)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer border-secondary d-flex justify-content-between">
            {listaItems.length > 0 ? (
              <>
                <button className="btn btn-outline-danger btn-sm" onClick={onLimpiar}>Vaciar Carrito</button>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-light btn-sm px-3" onClick={onClose}>Seguir Comprando</button>
                  <button 
                    className="btn btn-success fw-bold text-dark px-4"
                    onClick={() => {
                      onClose();
                      onIrAPagar();
                    }}
                  >
                    💳 Continuar al Pago
                  </button>
                </div>
              </>
            ) : (
              <button className="btn btn-success fw-bold text-dark w-100" onClick={onClose}>Ir a Explorar</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}