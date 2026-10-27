import React from 'react';
import { formatearCLP } from '../logica/formato';

export function Pedidos({ pedidos = [], onEliminarPedido }) {
  const listaPedidos = Array.isArray(pedidos) ? pedidos : [];

  const formatearMonto = (monto) => {
    if (typeof formatearCLP === 'function') {
      return formatearCLP(monto);
    }
    return `$${Number(monto || 0).toLocaleString('es-CL')}`;
  };

  if (listaPedidos.length === 0) {
    return (
      <main className="container py-5 text-center">
        <div className="card p-5 bg-dark text-white border-secondary shadow-sm">
          <div className="fs-1 mb-2">📋</div>
          <h3 className="fw-bold">No tienes pedidos registrados</h3>
          <p className="text-secondary mb-0">
            Tus compras confirmadas aparecerán en esta sección.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-5">
      <h2 className="text-success fw-bold mb-4">📦 Pedidos Realizados</h2>
      <div className="d-flex flex-column gap-4">
        {listaPedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="card bg-dark text-white border-secondary p-4 shadow-sm"
          >
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3 flex-wrap gap-2">
              <div>
                <span className="badge bg-success text-dark me-2 fw-bold fs-6">
                  {pedido.id}
                </span>
                <small className="text-secondary">{pedido.fecha}</small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="text-success fw-bold fs-5">
                  {formatearMonto(pedido.total)}
                </span>
                <button
                  className="btn btn-outline-danger btn-sm fw-bold"
                  onClick={() =>
                    typeof onEliminarPedido === 'function' &&
                    onEliminarPedido(pedido.id)
                  }
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-8">
                <h6 className="text-secondary small mb-2">
                  Componentes Adquiridos:
                </h6>
                <ul className="list-group list-group-flush">
                  {pedido.items?.map((it) => (
                    <li
                      key={it.id || it.nombre}
                      className="list-group-item bg-transparent text-white border-0 p-0 mb-1 d-flex justify-content-between"
                    >
                      <span>
                        • {it.nombre}{' '}
                        <strong className="text-success">x{it.cantidad}</strong>
                      </span>
                      <span className="text-secondary">
                        {formatearMonto(it.precio * it.cantidad)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-12 col-md-4 border-start border-secondary ps-md-4">
                <h6 className="text-secondary small mb-2">Detalle de Pago:</h6>
                <p className="small mb-1 fw-bold">{pedido.metodoPago}</p>
                <p className="small text-secondary mb-0">
                  Terminada en **** {pedido.ultimosDigitos}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// 🟢 Exportación por defecto para evitar errores de importación
export default Pedidos;