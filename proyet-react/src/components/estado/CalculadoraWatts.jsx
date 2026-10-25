import { useState } from 'react';
import { productos } from '../../logica/datos';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from '../../logica/armador';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from '../../logica/formato';

export const CalculadoraWatts = () => {
  const [seleccionados, setSeleccionados] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  // Filtrado de productos por categoría
  const productosFiltrados = categoriaFiltro === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaFiltro);

  // Lógica de selección de componentes
  const alternarSeleccion = (producto) => {
    const existe = seleccionados.some(p => p.id === producto.id);
    if (existe) {
      setSeleccionados(seleccionados.filter(p => p.id !== producto.id));
    } else {
      setSeleccionados([...seleccionados, producto]);
    }
  };

  // Cálculos dinámicos utilizando las funciones puras de logica/
  const totalWatts = calcularConsumoTotalWatts(seleccionados);
  const fuenteRecomendada = obtenerFuenteRecomendadaWatts(totalWatts);
  const subtotalPrecio = seleccionados.reduce((acc, p) => acc + p.precio, 0);
  const ivaCalculado = calcularIVA(subtotalPrecio);
  const totalConIVA = calcularTotalConIVA(subtotalPrecio);

  // Función para copiar la cotización
  const copiarResumen = () => {
    if (seleccionados.length === 0) return;
    
    const listaNombres = seleccionados.map(p => `- ${p.nombre} (${p.watts}W - ${formatearCLP(p.precio)})`).join('\n');
    const resumenText = `⚡ Resumen de Cotización - BuildMyPC\n\nComponentes:\n${listaNombres}\n\nConsumo Total: ${totalWatts}W\nFuente Recomendada: ${fuenteRecomendada}W\nSubtotal: ${formatearCLP(subtotalPrecio)}\nIVA (19%): ${formatearCLP(ivaCalculado)}\nTotal Final: ${formatearCLP(totalConIVA)}`;
    
    navigator.clipboard.writeText(resumenText);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 2500);
  };

  return (
    <section className="container py-4 text-start">
      {/* Filtros de Categorías */}
      <div className="d-flex flex-wrap gap-2 mb-4 align-items-center">
        <span className="text-secondary me-2 fw-semibold">Filtrar por:</span>
        {['Todas', 'Gamer', 'Workstation', 'Oficina'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaFiltro(cat)}
            className={`btn btn-sm ${categoriaFiltro === cat ? 'btn-success' : 'btn-outline-secondary'}`}
            style={categoriaFiltro === cat ? { backgroundColor: '#00FF66', color: '#000', border: 'none' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {/* Grilla de Selección de Componentes */}
        <div className="col-lg-8">
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {productosFiltrados.map((prod) => {
              const estaSeleccionado = seleccionados.some(p => p.id === prod.id);
              return (
                <div className="col" key={prod.id}>
                  <div 
                    className="card h-100 p-3" 
                    style={{ 
                      backgroundColor: estaSeleccionado ? '#112211' : '#111827', 
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
                        style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                      <div className="flex-grow-1">
                        <span className="badge text-uppercase mb-1" style={{ backgroundColor: '#1F2937', color: '#00FF66' }}>
                          {prod.categoria}
                        </span>
                        <h6 className="fw-bold text-white mb-1">{prod.nombre}</h6>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <small className="text-success fw-bold">⚡ {prod.watts}W</small>
                          <small className="text-white fw-bold">{formatearCLP(prod.precio)}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel lateral: Resumen Energético y Presupuesto */}
        <div className="col-lg-4">
          <div className="card p-4 text-white" style={{ backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '12px' }}>
            <h5 className="fw-bold mb-3 style-title" style={{ color: '#00FF66' }}>⚡ Resumen de tu PC</h5>
            
            <p className="text-secondary small mb-3">
              {seleccionados.length === 0 ? 'Haz clic en los componentes para agregarlos a tu armado.' : `${seleccionados.length} componentes seleccionados`}
            </p>

            <ul className="list-group list-group-flush mb-3">
              {seleccionados.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-white px-0 border-secondary">
                  <span className="small text-truncate" style={{ maxWidth: '180px' }}>{item.nombre}</span>
                  <span className="small fw-bold text-success">+{item.watts}W</span>
                </li>
              ))}
            </ul>

            <hr className="border-secondary" />

            {/* Totales */}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Consumo Total:</span>
              <strong className="fs-5 text-white">{totalWatts} W</strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span className="text-secondary">Fuente Recomendada:</span>
              <strong className="fs-5" style={{ color: '#00FF66' }}>{fuenteRecomendada} W</strong>
            </div>

            <div className="d-flex justify-content-between mb-1 small text-secondary">
              <span>Subtotal Neto:</span>
              <span>{formatearCLP(subtotalPrecio)}</span>
            </div>

            <div className="d-flex justify-content-between mb-3 small text-secondary">
              <span>IVA (19%):</span>
              <span>{formatearCLP(ivaCalculado)}</span>
            </div>

            <div className="d-flex justify-content-between mb-4 pt-2 border-top border-secondary">
              <span className="fw-bold">Total con IVA:</span>
              <strong className="fs-4 text-white">{formatearCLP(totalConIVA)}</strong>
            </div>

            {/* Acciones */}
            <div className="d-grid gap-2">
              <button 
                className="btn fw-bold py-2" 
                style={{ backgroundColor: '#00FF66', color: '#000', border: 'none' }}
                disabled={seleccionados.length === 0}
                onClick={copiarResumen}
              >
                {mensajeCopiado ? '✅ ¡Copiado al portapapeles!' : '📋 Copiar Configuración'}
              </button>
              
              <button 
                className="btn btn-outline-danger btn-sm"
                disabled={seleccionados.length === 0}
                onClick={() => setSeleccionados([])}
              >
                🗑️ Limpiar Selección
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};