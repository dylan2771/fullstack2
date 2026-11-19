// src/components/basicos/CarritoModal.jsx
import React, { useState, useEffect } from 'react';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../../logica/formato';

// Reglas estrictas por cupón según categoría y tipo de producto
const VALIDAR_CUPONES = {
  'BUILDPC50': {
    descuento: 50000,
    validar: (items) => items.some(i => 
      i.categoria?.toUpperCase() === 'GAMER' && 
      (i.tipo === 'componente' || i.nombre.toLowerCase().includes('pack') || i.nombre.toLowerCase().includes('pc'))
    ),
    mensajeError: 'Este cupón aplica solo para PCs armados o componentes de la categoría GAMER.'
  },
  'HYPERX20': {
    descuento: 20000,
    validar: (items) => items.some(i => 
      i.tipo === 'periferico' || 
      /mouse|teclado|aud[ií]fonos|pad/i.test(i.nombre)
    ),
    mensajeError: 'Este cupón es exclusivo para Periféricos y Accesorios (Mouse, Teclado, Audífonos).'
  },
  'RTXTECH30': {
    descuento: 30000,
    validar: (items) => items.some(i => 
      /rtx|tarjeta de video/i.test(i.nombre) || 
      i.categoria?.toUpperCase() === 'WORKSTATION'
    ),
    mensajeError: 'Este cupón aplica únicamente para Tarjetas Gráficas RTX o equipos WORKSTATION.'
  },
  'OFFICE10': {
    descuento: 10000,
    validar: (items) => items.some(i => 
      i.categoria?.toUpperCase() === 'OFICINA' || 
      /monitor/i.test(i.nombre)
    ),
    mensajeError: 'Este cupón es válido exclusivamente para productos de OFICINA o Monitores.'
  }
};

export function CarritoModal({ 
  items = [], 
  show, 
  onClose, 
  onEliminar, 
  onCantidad, 
  onLimpiar,
  onIrAPagar 
}) {
  const [codigoCupon, setCodigoCupon] = useState('');
  const [cuponActivo, setCuponActivo] = useState(null);
  const [descuentoAplicado, setDescuentoAplicado] = useState(0);
  const [mensajeCupon, setMensajeCupon] = useState({ texto: '', tipo: '' });

  const listaItems = Array.isArray(items) ? items : [];

  // Revalidar automáticamente si el usuario elimina productos del carrito
  useEffect(() => {
    if (cuponActivo && VALIDAR_CUPONES[cuponActivo]) {
      const sigueSiendoValido = VALIDAR_CUPONES[cuponActivo].validar(listaItems);
      if (!sigueSiendoValido) {
        setCuponActivo(null);
        setDescuentoAplicado(0);
        setCodigoCupon('');
        setMensajeCupon({ 
          texto: 'El cupón fue removido porque ya no hay productos válidos en el carrito.', 
          tipo: 'danger' 
        });
      }
    }
  }, [listaItems, cuponActivo]);

  if (!show) return null;

  const neto = listaItems.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.cantidad) || 1;
    return acc + (precio * cantidad);
  }, 0);

  const iva = calcularIVA(neto);
  const totalBase = calcularTotalConIVA(neto);
  const totalFinal = Math.max(0, totalBase - descuentoAplicado);

  const handleAplicarCupón = (e) => {
    e.preventDefault();
    const codigoLimpio = codigoCupon.trim().toUpperCase();
    const regla = VALIDAR_CUPONES[codigoLimpio];

    if (!regla) {
      setMensajeCupon({ texto: 'Cupón inválido o expirado.', tipo: 'danger' });
      return;
    }

    if (!regla.validar(listaItems)) {
      setMensajeCupon({ texto: regla.mensajeError, tipo: 'danger' });
      return;
    }

    setCuponActivo(codigoLimpio);
    setDescuentoAplicado(regla.descuento);
    setMensajeCupon({ 
      texto: `¡Cupón ${codigoLimpio} aplicado con éxito (-${formatearCLP(regla.descuento)})!`, 
      tipo: 'success' 
    });
  };

  const handleRemoverCupón = () => {
    setCuponActivo(null);
    setDescuentoAplicado(0);
    setCodigoCupon('');
    setMensajeCupon({ texto: '', tipo: '' });
  };

  const handleVaciarTodo = () => {
    handleRemoverCupón();
    onLimpiar();
  };

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
                <ul className="list-group list-group-flush mb-3" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                  {listaItems.map((item) => (
                    <li key={item.id} className="list-group-item text-white d-flex justify-content-between align-items-center border-secondary py-3" style={{ backgroundColor: '#1F2937' }}>
                      <div className="d-flex align-items-center gap-3">
                        <div>
                          <h6 className="mb-0 text-white fw-bold">{item.nombre}</h6>
                          <small className="text-success fw-semibold">{formatearCLP(item.precio)} c/u</small>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2">
                        {/* Selector de cantidad */}
                        <div className="d-flex align-items-center gap-1">
                          <button 
                            type="button"
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
                            type="button"
                            className="btn btn-sm btn-outline-secondary text-white px-2" 
                            onClick={() => onCantidad(item.id, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>

                        <span className="fw-bold ms-2 text-success me-3">
                          {formatearCLP(item.precio * item.cantidad)}
                        </span>
                        
                        <button type="button" className="btn btn-sm btn-outline-danger border-0" onClick={() => onEliminar(item.id)}>🗑️</button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Sección de Canje de Cupones */}
                <div className="p-3 rounded border border-secondary mb-3" style={{ backgroundColor: '#0B0F19' }}>
                  <label className="form-label small text-secondary fw-bold mb-2">🎟️ ¿Tienes un código de descuento?</label>
                  <form onSubmit={handleAplicarCupón} className="input-group input-group-sm">
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary text-uppercase"
                      placeholder="Ej: BUILDPC50"
                      value={codigoCupon}
                      onChange={(e) => setCodigoCupon(e.target.value)}
                      disabled={descuentoAplicado > 0}
                    />
                    {descuentoAplicado === 0 ? (
                      <button type="submit" className="btn btn-outline-success fw-bold">Aplicar</button>
                    ) : (
                      <button type="button" className="btn btn-outline-danger fw-bold" onClick={handleRemoverCupón}>Quitar</button>
                    )}
                  </form>
                  {mensajeCupon.texto && (
                    <div className={`text-${mensajeCupon.tipo === 'success' ? 'success' : 'danger'} small mt-2 fw-semibold`}>
                      {mensajeCupon.texto}
                    </div>
                  )}
                </div>

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
                  {descuentoAplicado > 0 && (
                    <div className="d-flex justify-content-between mb-1 text-success fw-semibold">
                      <span>Descuento Cupón ({cuponActivo}):</span>
                      <span>-{formatearCLP(descuentoAplicado)}</span>
                    </div>
                  )}
                  <hr className="border-secondary my-2" />
                  <div className="d-flex justify-content-between fw-bold text-success fs-4">
                    <span>Total a Pagar:</span>
                    <span>{formatearCLP(totalFinal)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer border-secondary d-flex justify-content-between">
            {listaItems.length > 0 ? (
              <>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleVaciarTodo}>Vaciar Carrito</button>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-outline-light btn-sm px-3" onClick={onClose}>Seguir Comprando</button>
                  <button 
                    type="button"
                    className="btn btn-success fw-bold text-dark px-4"
                    onClick={() => {
                      onClose();
                      onIrAPagar(totalFinal);
                    }}
                  >
                    💳 Continuar al Pago
                  </button>
                </div>
              </>
            ) : (
              <button type="button" className="btn btn-success fw-bold text-dark w-100" onClick={onClose}>Ir a Explorar</button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}