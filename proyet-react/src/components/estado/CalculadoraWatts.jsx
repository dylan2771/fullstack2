import { useState } from 'react';
import { productos } from '../../logica/datos';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from '../../logica/armador';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../../logica/formato';

export const CalculadoraWatts = () => {
  const [seleccionados, setSeleccionados] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  // Filtrado de productos
  const productosFiltrados = categoriaFiltro === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaFiltro);

  // Selección/Deselección
  const alternarSeleccion = (producto) => {
    const existe = seleccionados.some(p => p.id === producto.id);
    if (existe) {
      setSeleccionados(seleccionados.filter(p => p.id !== producto.id));
    } else {
      setSeleccionados([...seleccionados, producto]);
    }
  };

  // Cálculos dinámicos
  const totalWatts = calcularConsumoTotalWatts(seleccionados);
  const fuenteRecomendada = obtenerFuenteRecomendadaWatts(totalWatts);
  const subtotalPrecio = seleccionados.reduce((acc, p) => acc + p.precio, 0);
  const ivaCalculado = calcularIVA(subtotalPrecio);
  const totalConIVA = calcularTotalConIVA(subtotalPrecio);

  // Porcentaje visual para la barra de watts (máximo estimado 1000W)
  const porcentajeWatts = Math.min((totalWatts / 1000) * 100, 100);

  // Copiar resumen al portapapeles
  const copiarResumen = () => {
    if (seleccionados.length === 0) return;
    
    const listaNombres = seleccionados.map(p => `• ${p.nombre} (${p.watts}W) - ${formatearCLP(p.precio)}`).join('\n');
    const resumenText = `⚡ COTIZACIÓN BUILDMYPC\n------------------------------\nComponentes Seleccionados:\n${listaNombres}\n------------------------------\nConsumo Estimado: ${totalWatts}W\nFuente Recomendada: ${fuenteRecomendada}W\n\nSubtotal Neto: ${formatearCLP(subtotalPrecio)}\nIVA (19%): ${formatearCLP(ivaCalculado)}\nTOTAL CON IVA: ${formatearCLP(totalConIVA)}`;
    
    navigator.clipboard.writeText(resumenText);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 2500);
  };

  return (
    <section className="container py-2 text-start">
      {/* 1. Encabezado de Control y Filtros */}
      <div className="card p-3 mb-4 text-white" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h5 className="fw-bold mb-1" style={{ color: '#00FF66' }}>1. Selecciona los Componentes</h5>
            <p className="text-secondary small mb-0">Haz clic sobre las tarjetas para agregar o quitar piezas de tu armado.</p>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span className="small text-secondary fw-bold me-1">Filtrar:</span>
            {['Todas', 'Gamer', 'Workstation', 'Oficina'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltro(cat)}
                className={`btn btn-sm fw-bold ${categoriaFiltro === cat ? 'btn-success' : 'btn-outline-secondary'}`}
                style={categoriaFiltro === cat ? { backgroundColor: '#00FF66', color: '#000', border: 'none' } : { borderRadius: '6px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* 2. Lista de Piezas */}
        <div className="col-lg-7 col-xl-8">
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {productosFiltrados.map((prod) => {
              const estaSeleccionado = seleccionados.some(p => p.id === prod.id);
              return (
                <div className="col" key={prod.id}>
                  <div 
                    className="card h-100 p-3 text-white" 
                    style={{ 
                      backgroundColor: estaSeleccionado ? '#0c2214' : '#111827', 
                      border: estaSeleccionado ? '2px solid #00FF66' : '1px solid #1F2937', 
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => alternarSeleccion(prod)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={prod.imagen} 
                        alt={prod.nombre} 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=Hardware'; }}
                        style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: '8px', backgroundColor: '#0B0F19' }} 
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge text-uppercase" style={{ backgroundColor: '#1F2937', color: '#00FF66', fontSize: '0.7rem' }}>
                            {prod.categoria}
                          </span>
                          <span className="badge fw-bold" style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66' }}>
                            ⚡ {prod.watts}W
                          </span>
                        </div>
                        <h6 className="fw-bold mb-2 small text-white">{prod.nombre}</h6>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold" style={{ color: '#00FF66' }}>{formatearCLP(prod.precio)}</span>
                          <span className={`badge ${estaSeleccionado ? 'bg-success text-black' : 'bg-dark text-secondary border border-secondary'}`}>
                            {estaSeleccionado ? '✓ Añadido' : '+ Agregar'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Panel Lateral de Resumen Energético y Presupuesto */}
        <div className="col-lg-5 col-xl-4">
          <div className="card p-4 text-white shadow" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px', sticky: 'top' }}>
            <h5 className="fw-bold mb-3 d-flex justify-content-between align-items-center" style={{ color: '#00FF66' }}>
              <span>⚡ Resumen del Armado</span>
              <span className="badge bg-dark border border-secondary text-white fs-6">
                {seleccionados.length} piezas
              </span>
            </h5>

            {/* Medidor de Watts */}
            <div className="p-3 mb-3 rounded" style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937' }}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-secondary">Consumo Total:</small>
                <span className="fw-bold text-white fs-5">{totalWatts} Watts</span>
              </div>
              
              {/* Barra de Progreso */}
              <div className="progress mb-2" style={{ height: '8px', backgroundColor: '#1F2937' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${porcentajeWatts}%`, backgroundColor: '#00FF66' }}
                ></div>
              </div>

              <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                <small className="text-secondary">Fuente Recomendada:</small>
                <span className="fw-bold fs-5" style={{ color: '#00FF66' }}>{fuenteRecomendada}W</span>
              </div>
            </div>

            {/* Lista abreviada de items seleccionados */}
            <div className="mb-3" style={{ maxHeight: '160px', overflowY: 'auto' }}>
              {seleccionados.length === 0 ? (
                <p className="text-secondary small text-center py-3 mb-0 border border-dashed border-secondary rounded">
                  No has seleccionado ninguna pieza todavía.
                </p>
              ) : (
                <ul className="list-group list-group-flush">
                  {seleccionados.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white px-0 py-2 border-secondary small">
                      <span className="text-truncate me-2" style={{ maxWidth: '180px' }}>{item.nombre}</span>
                      <span className="fw-bold" style={{ color: '#00FF66' }}>{formatearCLP(item.precio)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Desglose de Precios */}
            <div className="pt-3 border-top border-secondary">
              <div className="d-flex justify-content-between small text-secondary mb-1">
                <span>Subtotal Neto:</span>
                <span>{formatearCLP(subtotalPrecio)}</span>
              </div>
              <div className="d-flex justify-content-between small text-secondary mb-3">
                <span>IVA (19%):</span>
                <span>{formatearCLP(ivaCalculado)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4 pt-2 border-top border-secondary">
                <span className="fw-bold fs-6">Total Final:</span>
                <span className="fw-bold fs-4 text-white">{formatearCLP(totalConIVA)}</span>
              </div>
            </div>

            {/* Botones de Acción Estructurados */}
            <div className="d-grid gap-2">
              <button 
                className="btn fw-bold py-2 shadow-sm" 
                style={{ 
                  backgroundColor: seleccionados.length > 0 ? '#00FF66' : '#1F2937', 
                  color: seleccionados.length > 0 ? '#000' : '#6C757D', 
                  border: 'none',
                  borderRadius: '8px' 
                }}
                disabled={seleccionados.length === 0}
                onClick={copiarResumen}
              >
                {mensajeCopiado ? '✅ ¡Configuración Copiada!' : '📋 Copiar Configuración'}
              </button>

              {seleccionados.length > 0 && (
                <button 
                  className="btn btn-outline-danger btn-sm py-2 fw-semibold"
                  style={{ borderRadius: '8px' }}
                  onClick={() => setSeleccionados([])}
                >
                  🗑️ Limpiar Selección
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};