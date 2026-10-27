import React, { useState } from 'react';

export function TarjetaProducto({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState("1");
  const [agregadoExito, setAgregadoExito] = useState(false);
  const stockMaximo = producto?.stock ?? 20;

  const handleChange = (e) => {
    const val = e.target.value;

    if (val === "") {
      setCantidad("");
      return;
    }

    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num > stockMaximo) {
        setCantidad(stockMaximo.toString());
      } else {
        setCantidad(num.toString());
      }
    }
  };

  const handleBlur = () => {
    const num = parseInt(cantidad, 10);
    if (isNaN(num) || num < 1) {
      setCantidad("1");
    }
  };

  const handleAgregar = (e) => {
    if (e) e.preventDefault();

    const numFinal = parseInt(cantidad, 10);
    const cantidadAñadir = !isNaN(numFinal) && numFinal >= 1 ? numFinal : 1;
    
    if (typeof onAgregar === 'function') {
      onAgregar(producto, cantidadAñadir);
      
      // Cambia el estado del botón momentáneamente
      setAgregadoExito(true);
      setTimeout(() => setAgregadoExito(false), 1200);
    }
  };

  return (
    <div className="card bg-dark text-white border-secondary h-100 p-3 shadow-sm">
      <img
        src={producto?.imagen}
        alt={producto?.nombre}
        className="card-img-top rounded mb-3"
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column justify-content-between p-0">
        <div>
          <span className="badge bg-secondary mb-2">{producto?.categoria}</span>
          <h5 className="card-title text-white fs-6 fw-bold mb-2">{producto?.nombre}</h5>

          <p className="text-white fw-bold mb-2 small">
            ⚡ Consumo: <span className="text-white fs-6">{producto?.watts}W</span>
          </p>

          <p className="text-success fw-bold fs-5 mb-2">
            ${producto?.precio?.toLocaleString('es-CL')}
          </p>

          <div className="d-flex align-items-center justify-content-between my-2 bg-black bg-opacity-25 p-2 rounded border border-secondary-subtle">
            <small className="text-white">
              Stock: <strong className="text-success">{stockMaximo} un.</strong>
            </small>

            <div className="d-flex align-items-center gap-1">
              <label htmlFor={`cant-${producto?.id}`} className="small text-white me-1">Cant:</label>
              <input
                id={`cant-${producto?.id}`}
                type="number"
                min="1"
                max={stockMaximo}
                value={cantidad}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control bg-dark text-white border-secondary text-center p-1"
                style={{ width: '70px', fontSize: '14px', fontWeight: 'bold' }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAgregar}
          disabled={stockMaximo === 0}
          className={`btn w-100 fw-bold mt-3 ${agregadoExito ? 'btn-light text-dark' : 'btn-success'}`}
        >
          {stockMaximo === 0 
            ? "Agotado" 
            : agregadoExito 
            ? "✓ ¡Agregado!" 
            : "🛒 Añadir al Carrito"}
        </button>
      </div>
    </div>
  );
}