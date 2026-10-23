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

  return (
    <section className="contenedor-calculadora p-4 rounded text-white" style={{ backgroundColor: '#0B0F19' }}>
      <h2 className="text-center mb-3" style={{ color: '#00FF66' }}>Calculadora de Consumo Energético</h2>
      <p className="text-center mb-4" style={{ color: '#9CA3AF' }}>
        Selecciona los equipos para estimar el consumo en Watts:
      </p>

      <div className="lista-seleccion-hardware">
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
                boxShadow: estaSeleccionado ? '0 0 10px rgba(0, 255, 102, 0.25)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="d-flex align-items-center">
                <input 
                  type="checkbox" 
                  checked={estaSeleccionado} 
                  readOnly 
                  style={{ accentColor: '#00FF66', transform: 'scale(1.2)', cursor: 'pointer' }}
                />
                <span style={{ marginLeft: '12px', color: '#FFFFFF', fontWeight: 'bold' }}>
                  {prod.nombre}
                </span>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="badge" style={{ backgroundColor: '#00FF66', color: '#000000', fontWeight: 'bold', fontSize: '0.85rem' }}>
                  {prod.watts}W
                </span>
                <strong style={{ color: '#00FF66' }}>{formatearCLP(prod.precio)}</strong>
              </div>
            </div>
          );
        })}
      </div>

      <div className="resumen-calculo mt-4 p-3 rounded" style={{ backgroundColor: '#111827', border: '1px solid #00FF66' }}>
        <h3 style={{ color: '#00FF66', fontSize: '1.25rem' }} className="mb-2">Resumen de Consumo</h3>
        <p className="mb-1" style={{ color: '#E5E7EB' }}>
          Consumo Estimado: <strong style={{ color: '#00FF66' }}>{wattsTotales} Watts</strong>
        </p>
        <p className="mb-0" style={{ color: '#E5E7EB' }}>
          Fuente Recomendada: <strong style={{ color: '#00FF66' }}>{fuenteRecomendada}W o superior</strong>
        </p>
      </div>
    </section>
  );
};