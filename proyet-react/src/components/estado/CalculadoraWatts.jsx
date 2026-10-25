import { useState } from 'react';
import { productos } from '../../logica/datos';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from '../../logica/armador';
import { formatearCLP } from '../../logica/formato';

export const CalculadoraWatts = () => {
  const [componentesSeleccionados, setComponentesSeleccionados] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  // Filtrado de productos por categoría
  const productosFiltrados = categoriaFiltro === 'Todas' 
    ? productos 
    : productos.filter(p => p.categoria === categoriaFiltro);

  // Manejo de selección
  const toggleComponente = (producto) => {
    const existe = componentesSeleccionados.some((item) => item.id === producto.id);
    if (existe) {
      setComponentesSeleccionados(
        componentesSeleccionados.filter((item) => item.id !== producto.id)
      );
    } else {
      setComponentesSeleccionados([...componentesSeleccionados, producto]);
    }
  };

  const limpiarSeleccion = () => {
    setComponentesSeleccionados([]);
  };

  // Cálculos dinámicos
  const wattsTotales = calcularConsumoTotalWatts(componentesSeleccionados);
  const fuenteRecomendada = obtenerFuenteRecomendadaWatts(wattsTotales);
  const precioTotal = componentesSeleccionados.reduce((acc, item) => acc + (item.precio || 0), 0);

  // Copiar resumen al portapapeles
  const copiarConfiguracion = () => {
    if (componentesSeleccionados.length === 0) return;
    const textoResumen = `⚡ BuildMyPC - Mi Configuración:\n` +
      componentesSeleccionados.map(item => `- ${item.nombre}: ${formatearCLP(item.precio)} (${item.watts}W)`).join('\n') +
      `\n\nConsumo Estimado: ${wattsTotales}W\nFuente Recomendada: ${fuenteRecomendada}W\nTotal: ${formatearCLP(precioTotal)}`;
    
    navigator.clipboard.writeText(textoResumen);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 3000);
  };

  return (
    <section 
      className="contenedor-calculadora p-4 p-md-5 rounded text-white shadow-lg" 
      style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937', borderRadius: '16px' }}
    >
      {/* Encabezado Principal */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom border-secondary">
        <div>
          <span className="badge mb-2 px-3 py-2 fw-bold" style={{ backgroundColor: 'rgba(0, 255, 102, 0.12)', color: '#00FF66', border: '1px solid #00FF66' }}>
            ⚡ Armador & Power Calculator
          </span>
          <h2 className="fw-bold mb-1" style={{ color: '#00FF66' }}>Configurador Energético de PC</h2>
          <p className="text-secondary small mb-0">Selecciona los equipos para verificar consumo en Watts y compatibilidad de fuente.</p>
        </div>
        
        {componentesSeleccionados.length > 0 && (
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm mt-3 mt-md-0 fw-bold px-3 py-2"
            onClick={limpiarSeleccion}
          >
            🗑️ Limpiar Selección
          </button>
        )}
      </div>

      {/* Filtros de Categoría */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {['Todas', 'Gamer', 'Workstation', 'Oficina'].map((cat) => (
          <button
            key={cat}
            type="button"
            className={`btn btn-sm px-3 py-2 fw-bold rounded-pill ${categoriaFiltro === cat ? 'text-dark' : 'text-white'}`}
            style={{
              backgroundColor: categoriaFiltro === cat ? '#00FF66' : '#111827',
              border: '1px solid #1F2937',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setCategoriaFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lista de Hardware Seleccionable */}
      <div className="lista-hardware mb-5">
        {productosFiltrados.map((prod) => {
          const estaSeleccionado = componentesSeleccionados.some((item) => item.id === prod.id);
          return (
            <div 
              key={prod.id} 
              className="d-flex align-items-center justify-content-between p-3 my-2 rounded"
              onClick={() => toggleComponente(prod)}
              style={{ 
                cursor: 'pointer', 
                backgroundColor: estaSeleccionado ? '#112217' : '#111827', 
                border: estaSeleccionado ? '2px solid #00FF66' : '1px solid #1F2937',
                boxShadow: estaSeleccionado ? '0 0 12px rgba(0, 255, 102, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={estaSeleccionado} 
                  readOnly 
                  style={{ accentColor: '#00FF66', transform: 'scale(1.25)', cursor: 'pointer' }}
                />
                <div>
                  <span className="fw-bold text-white d-block">{prod.nombre}</span>
                  <span className="badge text-secondary p-0" style={{ fontSize: '0.75rem' }}>{prod.categoria}</span>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span className="badge px-3 py-2 fw-bold" style={{ backgroundColor: '#00FF66', color: '#000000' }}>
                  {prod.watts}W
                </span>
                <strong style={{ color: '#00FF66', minWidth: '100px', textAlign: 'right' }}>
                  {formatearCLP(prod.precio)}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Resumen Energético & Acciones Web */}
      <div 
        className="resumen-calculo p-4 rounded-3" 
        style={{ 
          backgroundColor: '#111827', 
          border: '1px solid #00FF66',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
          <h4 style={{ color: '#00FF66' }} className="fw-bold m-0">📊 Resumen de Cotización</h4>
          <span className="badge bg-dark text-white border border-secondary px-3 py-2">
            {componentesSeleccionados.length} Seleccionado(s)
          </span>
        </div>

        <div className="row g-4 text-start mb-4">
          <div className="col-md-4">
            <span className="text-secondary small d-block mb-1">Consumo Estimado:</span>
            <strong className="fs-4 d-block" style={{ color: '#00FF66' }}>{wattsTotales} Watts</strong>
          </div>
          <div className="col-md-4">
            <span className="text-secondary small d-block mb-1">Fuente Recomendada:</span>
            <strong className="fs-4 d-block" style={{ color: '#00FF66' }}>{fuenteRecomendada}W o superior</strong>
          </div>
          <div className="col-md-4">
            <span className="text-secondary small d-block mb-1">Inversión Total:</span>
            <strong className="fs-4 d-block text-white">{formatearCLP(precioTotal)}</strong>
          </div>
        </div>

        {/* Botones de Acción de Página Web Lanzada */}
        <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
          <button 
            type="button" 
            className="btn fw-bold py-2 px-4 flex-grow-1"
            style={{ backgroundColor: '#00FF66', color: '#000', border: 'none' }}
            disabled={componentesSeleccionados.length === 0}
            onClick={() => alert('¡Cotización guardada exitosamente en tu sesión!')}
          >
            💾 Guardar Cotización
          </button>

          <button 
            type="button" 
            className="btn btn-outline-light fw-bold py-2 px-4"
            disabled={componentesSeleccionados.length === 0}
            onClick={copiarConfiguracion}
          >
            {mensajeCopiado ? '✅ ¡Copiado!' : '📋 Copiar Configuración'}
          </button>
        </div>
      </div>
    </section>
  );
};