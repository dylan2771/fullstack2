import React, { useState } from 'react';

export function TarjetaProducto({ producto, agregarAlCarrito }) {
  // Manejamos el valor como string para permitir borrar el 1 y escribir números de 2 cifras libremente
  const [cantidad, setCantidad] = useState("1");

  const handleChange = (e) => {
    const val = e.target.value;

    // Permite borrar todo el campo sin forzar el 1 de inmediato
    if (val === "") {
      setCantidad("");
      return;
    }

    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (producto.stock && num > producto.stock) {
        setCantidad(producto.stock.toString());
      } else {
        setCantidad(num.toString());
      }
    }
  };

  const handleBlur = () => {
    // Si el usuario deja el campo vacío o coloca 0/negativo, al salir del campo vuelve a 1
    const num = parseInt(cantidad, 10);
    if (isNaN(num) || num < 1) {
      setCantidad("1");
    }
  };

  const handleAgregar = () => {
    const numFinal = parseInt(cantidad, 10);
    const cantidadAñadir = !isNaN(numFinal) && numFinal >= 1 ? numFinal : 1;
    
    // Ejecuta la función del carrito pasando el producto y la cantidad numérica procesada
    agregarAlCarrito(producto, cantidadAñadir);
  };

  return (
    <div className="card bg-dark text-white border-secondary h-100 p-3 shadow-sm">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img-top rounded mb-3"
        style={{ height: '180px', objectFit: 'cover' }}
      />

      <div className="card-body d-flex flex-column justify-content-between p-0">
        <div>
          <span className="badge bg-secondary mb-2">{producto.categoria}</span>
          <h5 className="card-title text-white fs-6 fw-bold mb-2">{producto.nombre}</h5>

          {/* Consumo visible en blanco */}
          <p className="text-white fw-bold mb-2 small">
            ⚡ Consumo: <span className="text-white fs-6">{producto.watts}W</span>
          </p>

          <p className="text-success fw-bold fs-5 mb-2">
            ${producto.precio?.toLocaleString('es-CL')}
          </p>

          {/* Stock e Input que permite borrar y tipear 20 */}
          <div className="d-flex align-items-center justify-content-between my-2 bg-black bg-opacity-25 p-2 rounded border border-secondary-subtle">
            <small className="text-white">
              Stock: <strong className="text-success">{producto.stock ?? 20} un.</strong>
            </small>

            <div className="d-flex align-items-center gap-1">
              <label htmlFor={`cant-${producto.id}`} className="small text-white me-1">Cant:</label>
              <input
                id={`cant-${producto.id}`}
                type="number"
                min="1"
                max={producto.stock ?? 99}
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
          onClick={handleAgregar}
          disabled={producto.stock === 0}
          className="btn btn-success w-100 fw-bold mt-3"
        >
          {producto.stock === 0 ? "Agotado" : "🛒 Añadir al Carrito"}
        </button>
      </div>
    </div>
  );
}