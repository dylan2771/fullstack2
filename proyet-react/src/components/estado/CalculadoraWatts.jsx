import { useState } from 'react';
import { productos } from '../../logica/datos';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from '../../logica/armador';
import { formatearCLP } from '../../logica/formato';

export const CalculadoraWatts = () => {
  const [componentesSeleccionados, setComponentesSeleccionados] = useState([]);

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

  const wattsTotales = calcularConsumoTotalWatts(componentesSeleccionados);
  const fuenteRecomendada = obtenerFuenteRecomendadaWatts(wattsTotales);
  const precioTotal = componentesSeleccionados.reduce((total, item) => total + (item.precio || 0), 0);

  return (
    <section 
      className="contenedor-calculadora p-4 rounded text-white" 
      style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937', borderRadius: '12px' }}
    >
      <div className="text-start mb-4">
        <h2 className="fw-bold mb-1" style={{ color: '#00FF66' }}>⚡ Calculadora de Consumo Energético</h2>
        <p className="text-secondary small mb-0">
          Selecciona los componentes para estimar el consumo en Watts y la fuente recomendada.
        </p>
      </div>

      {/* Lista de Hardware Seleccionable */}
      <div className="lista-seleccion-hardware mb-4">
        {productos.map((prod) => {
          const estaSeleccionado = componentesSeleccionados.some((item) => item.id === prod.id);
          return (
            <div 
              key={prod.id} 
              className="opcion-hardware d-flex align-items-center justify-content-between p-3 my-2 rounded"
              onClick={() => toggleComponente(prod)}
              style={{ 
                cursor: 'pointer', 
                backgroundColor: estaSeleccionado ? '#112217' : '#111827', 
                border: estaSeleccionado ? '2px solid #00FF66' : '1px solid #1F2937',
                boxShadow: estaSeleccionado ? '0 0 12px rgba(0, 255, 102, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={estaSeleccionado} 
                  readOnly 
                  style={{ accentColor: '#00FF66', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <span className="fw-bold text-white fs-6">
                  {prod.nombre}
                </span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span 
                  className="badge px-2 py-1 fw-bold" 
                  style={{ backgroundColor: '#00FF66', color: '#000000', fontSize: '0.85rem' }}
                >
                  {prod.watts}W
                </span>
                <strong style={{ color: '#00FF66', minWidth: '90px', textAlign: 'right' }}>
                  {formatearCLP(prod.precio)}
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tarjeta de Resumen Energético */}
      <div 
        className="resumen-calculo p-4 rounded" 
        style={{ 
          backgroundColor: '#111827', 
          border: '1px solid #00FF66',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-secondary pb-2">
          <h3 style={{ color: '#00FF66', fontSize: '1.2rem' }} className="fw-bold m-0">
            📊 Resumen Energético & Cotización
          </h3>
          <span className="badge bg-dark border border-secondary text-secondary">
            {componentesSeleccionados.length} componentes
          </span>
        </div>

        <div className="row g-3 text-start">
          <div className="col-md-4">
            <span className="text-secondary small d-block">Consumo Estimado:</span>
            <strong className="fs-5" style={{ color: '#00FF66' }}>{wattsTotales} Watts</strong>
          </div>
          <div className="col-md-4">
            <span className="text-secondary small d-block">Fuente Recomendada:</span>
            <strong className="fs-5" style={{ color: '#00FF66' }}>{fuenteRecomendada}W o superior</strong>
          </div>
          <div className="col-md-4">
            <span className="text-secondary small d-block">Total Estimado:</span>
            <strong className="fs-5 text-white">{formatearCLP(precioTotal)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};