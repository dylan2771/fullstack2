// src/pages/Cotizaciones.jsx
import { useState, useEffect } from 'react';
import { CalculadoraWatts } from '../components/estado/CalculadoraWatts';
import { formatearCLP } from '../logica/formato';
import { solicitar } from '../services/api';

export function Cotizaciones({ usuario, onAgregar }) {
  const [cotizaciones, setCotizaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const cargarCotizacionesBackend = async () => {
      if (!usuario) return;
      try {
        const data = await solicitar('/api/v1/builds');
        if (Array.isArray(data)) {
          const mapeadas = data.map((item) => ({
            id: String(item.id || `COT-${Date.now().toString().slice(-5)}`),
            titulo: item.titulo || item.nombreEnsamble || 'Mi PC Armado',
            propietario: usuario.nombre || usuario.email,
            fecha: item.fecha || new Date().toLocaleDateString('es-CL'),
            totalWatts: item.totalWatts || item.consumoTotal || 0,
            fuenteRecomendada: item.fuenteRecomendada || 500,
            subtotal: item.subtotal || 0,
            iva: item.iva || 0,
            totalFinal: item.totalFinal || item.precioTotal || 0,
            items: item.items || item.componentes || []
          }));
          setCotizaciones(mapeadas);
        }
      } catch (err) {
        console.warn('Aviso: No se pudieron cargar cotizaciones del backend, usando respaldo local:', err.message);
        const guardado = localStorage.getItem('buildmypc_cotizaciones');
        if (guardado) {
          try { setCotizaciones(JSON.parse(guardado)); } catch {}
        }
      } finally {
        setCargando(false);
      }
    };

    cargarCotizacionesBackend();
  }, [usuario]);

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

  const handleGuardarCotizacion = async (datosCotizacion) => {
    // CORREGIDO: Usamos directamente los datos que vienen de CalculadoraWatts (incluyendo nombreEnsamble y IDs)
    const nuevaPayload = {
      ...datosCotizacion,
      userId: usuario.id || 1
    };

    try {
      const respuestaBackend = await solicitar('/api/v1/builds', {
        method: 'POST',
        body: JSON.stringify(nuevaPayload),
      });

      const nueva = {
        id: String(respuestaBackend?.id || `COT-${Date.now().toString().slice(-5)}`),
        propietario: usuario.nombre || usuario.email,
        fecha: new Date().toLocaleDateString('es-CL'),
        ...datosCotizacion,
      };

      setCotizaciones((prev) => [nueva, ...prev]);
      setMensajeExito(`Cotización "${nueva.titulo || nueva.nombreEnsamble}" guardada y sincronizada con éxito.`);
    } catch (err) {
      console.warn('Error al guardar en el backend, guardando localmente:', err);
      const nuevaLocal = {
        id: `COT-${Date.now().toString().slice(-5)}`,
        propietario: usuario.nombre || usuario.email,
        fecha: new Date().toLocaleDateString('es-CL'),
        ...datosCotizacion,
      };
      setCotizaciones((prev) => [nuevaLocal, ...prev]);
      setMensajeExito(`Cotización "${nuevaLocal.titulo || nuevaLocal.nombreEnsamble}" guardada localmente.`);
    }

    setTimeout(() => setMensajeExito(''), 3500);
  };

  const handleEliminarCotizacion = async (id) => {
    try {
      await solicitar(`/api/v1/builds/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('No se pudo eliminar en el backend, removiendo localmente:', err);
    }
    setCotizaciones((prev) => cotizaciones.filter((c) => c.id !== id));
  };

  const handlePasarAlCarrito = (cotizacion) => {
    if (typeof onAgregar !== 'function') return;
    cotizacion.items.forEach((item) => onAgregar(item, 1));
    setMensajeExito(`Componentes de "${cotizacion.titulo || cotizacion.nombreEnsamble}" agregados al carrito.`);
    setTimeout(() => setMensajeExito(''), 3500);
  };

  const handleDescargarTxt = (cot) => {
    let contenido = "========================================\n";
    contenido += "         BUILDMYPC - COTIZACIÓN         \n";
    contenido += "========================================\n\n";
    contenido += `ID Cotización: ${cot.id}\n`;
    contenido += `Título: ${cot.titulo || cot.nombreEnsamble}\n`;
    contenido += `Cliente: ${cot.propietario}\n`;
    contenido += `Fecha: ${cot.fecha}\n`;
    contenido += `Consumo Estimado: ${cot.totalWatts}W (Fuente recomendada: ${cot.fuenteRecomendada}W)\n\n`;
    contenido += "----------------------------------------\n";
    contenido += "DETALLE DE COMPONENTES:\n";
    contenido += "----------------------------------------\n";

    cot.items.forEach((item, index) => {
      contenido += `${index + 1}. ${item.nombre} - ${formatearCLP(item.precio)}\n`;
    });

    contenido += "\n----------------------------------------\n";
    contenido += `Subtotal: ${formatearCLP(cot.subtotal)}\n`;
    contenido += `IVA (19%): ${formatearCLP(cot.iva)}\n`;
    contenido += `TOTAL FINAL (c/IVA): ${formatearCLP(cot.totalFinal)}\n`;
    contenido += "========================================\n";

    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${cot.id}-${(cot.titulo || cot.nombreEnsamble).replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const misCotizaciones = cotizaciones.filter((c) => c.propietario === (usuario.nombre || usuario.email));

  return (
    <main className="py-4">
      <div className="container mb-3 text-start">
        <span
          className="badge mb-2 px-3 py-2 fw-bold"
          style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
        >
          👤 Cotizador de {usuario.nombre || usuario.email}
        </span>
        <h1 className="display-5 fw-bold mb-1" style={{ color: '#00FF66' }}>
          Cotizaciones de PC
        </h1>
        <p className="text-secondary mb-0">
          Arma tu presupuesto, revisa el consumo en Watts y guarda el valor final con IVA en tu cuenta conectada al servidor.
        </p>

        {cargando && <div className="text-info mt-2">🔄 Sincronizando cotizaciones con el servidor...</div>}

        {mensajeExito && (
          <div
            className="alert mt-3 mb-0 fw-bold"
            style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', border: '1px solid #00FF66', color: '#00FF66' }}
          >
            ✅ {mensajeExito}
          </div>
        )}
      </div>

      <CalculadoraWatts onGuardarCotizacion={handleGuardarCotizacion} />

      <section className="container mt-5 text-start">
        <h3 className="fw-bold mb-3 text-white">
          📋 Cotizaciones Guardadas de {usuario.nombre || usuario.email} ({misCotizaciones.length})
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
                      <span className="fw-bold fs-5">{cot.titulo || cot.nombreEnsamble}</span>
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
                    {cot.items?.map((item, idx) => (
                      <li
                        key={item.id || idx}
                        className="d-flex justify-content-between py-1 border-bottom border-dark"
                      >
                        <span>• {item.nombre}</span>
                        <span className="text-secondary">{formatearCLP(item.precio)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex flex-column gap-2 pt-2 border-top border-secondary">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-secondary">
                        Neto: {formatearCLP(cot.subtotal)} + IVA: {formatearCLP(cot.iva)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-light fw-bold"
                        onClick={() => handleDescargarTxt(cot)}
                      >
                        📄 Descargar .TXT
                      </button>
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
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Cotizaciones;