// src/pages/Cotizaciones.jsx
import { useState, useEffect } from 'react';
import { CalculadoraWatts } from '../components/estado/CalculadoraWatts';
import { formatearCLP } from '../logica/formato';

export function Cotizaciones({ usuario, onAgregar }) {
  const [cotizaciones, setCotizaciones] = useState(() => {
    try {
      const guardado = localStorage.getItem('buildmypc_cotizaciones');
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('buildmypc_cotizaciones', JSON.stringify(cotizaciones));
    } catch (e) {
      console.error('Error al guardar cotizaciones:', e);
    }
  }, [cotizaciones]);

  if (!usuario) {
    return (
      <main className="container py-5 text-center">
        <div className="card p-5 bg-dark text-white border-secondary">
          <h3 className="fw-bold">Inicia sesión para cotizar</h3>
          <p className="text-secondary mb-0">Debes ingresar con tu cuenta para crear y guardar tus cotizaciones.</p>
        </div>
      </main>
    );
  }

  const handleGuardarCotizacion = (datosCotizacion) => {
    const nueva = {
      id: `COT-${Date.now().toString().slice(-5)}`,
      propietario: usuario.nombre,
      fecha: new Date().toLocaleDateString('es-CL'),
      ...datosCotizacion,
    };

    setCotizaciones((prev) => [nueva, ...prev]);
    setMensajeExito(`Cotización "${nueva.titulo}" guardada con éxito.`);
    setTimeout(() => setMensajeExito(''), 3500);
  };

  const handleEliminarCotizacion = (id) => {
    setCotizaciones((prev) => prev.filter((c) => c.id !== id));
  };

  const handlePasarAlCarrito = (cotizacion) => {
    if (typeof onAgregar !== 'function') return;
    cotizacion.items.forEach((item) => onAgregar(item, 1));
    setMensajeExito(`Componentes de "${cotizacion.titulo}" agregados al carrito.`);
    setTimeout(() => setMensajeExito(''), 3500);
  };

  const misCotizaciones = cotizaciones.filter((c) => c.propietario === usuario.nombre);

  return (
    <main className="py-4">
      {/* Encabezado */}
      <div className="container mb-3 text-start">
        <span
          className="badge mb-2 px-3 py-2 fw-bold"
          style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
        >
          👤 Cotizador de {usuario.nombre}
        </span>
        <h1 className="display-5 fw-bold mb-1" style={{ color: '#00FF66' }}>
          Cotizaciones de PC
        </h1>
        <p className="text-secondary mb-0">
          Arma tu presupuesto, revisa el consumo en Watts y guarda el valor final con IVA en tu cuenta.
        </p>

        {mensajeExito && (
          <div
            className="alert mt-3 mb-0 fw-bold"
            style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', border: '1px solid #00FF66', color: '#00FF66' }}
          >
            ✅ {mensajeExito}
          </div>
        )}
      </div>

      {/* Cotizador Interactivo */}
      <CalculadoraWatts onGuardarCotizacion={handleGuardarCotizacion} />

      {/* Listado de Cotizaciones Guardadas del Usuario */}
      <section className="container mt-5 text-start">
        <h3 className="fw-bold mb-3 text-white">
          📋 Cotizaciones Guardadas de {usuario.nombre} ({misCotizaciones.length})
        </h3>

        {misCotizaciones.length === 0 ? (
          <div
            className="card p-4 text-center text-white"
            style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}
          >
            <p className="text-secondary mb-0">
              Aún no tienes cotizaciones guardadas. Selecciona componentes arriba y presiona <strong>Guardar Cotización</strong>.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {misCotizaciones.map((cot) => (
              <div className="col-12 col-md-6" key={cot.id}>
                <div
                  className="card h-100 p-4 text-white"
                  style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}
                >
                  <div className="d-flex justify-content-between align-items-start border-bottom border-secondary pb-3 mb-3">
                    <div>
                      <span
                        className="badge me-2 fw-bold"
                        style={{ backgroundColor: '#00FF66', color: '#000000' }}
                      >
                        {cot.id}
                      </span>
                      <span className="fw-bold fs-5">{cot.titulo}</span>
                      <div className="text-secondary small mt-1">
                        Fecha: {cot.fecha} • ⚡ {cot.totalWatts}W (Fuente: {cot.fuenteRecomendada}W)
                      </div>
                    </div>
                    <div className="text-end">
                      <small className="text-secondary d-block">Total Final (c/IVA)</small>
                      <span className="fw-bold fs-4" style={{ color: '#00FF66' }}>
                        {formatearCLP(cot.totalFinal)}
                      </span>
                    </div>
                  </div>

                  <ul className="list-unstyled small mb-3 flex-grow-1">
                    {cot.items.map((item) => (
                      <li
                        key={item.id}
                        className="d-flex justify-content-between py-1 border-bottom border-dark"
                      >
                        <span>• {item.nombre}</span>
                        <span className="text-secondary">{formatearCLP(item.precio)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                    <span className="small text-secondary">
                      Neto: {formatearCLP(cot.subtotal)} + IVA: {formatearCLP(cot.iva)}
                    </span>
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-sm fw-bold"
                        style={{ backgroundColor: '#00FF66', color: '#000000' }}
                        onClick={() => handlePasarAlCarrito(cot)}
                      >
                        🛒 Al Carrito
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger fw-bold"
                        onClick={() => handleEliminarCotizacion(cot.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Cotizaciones;