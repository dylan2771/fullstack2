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
    <section className="contenedor-calculadora">
      <h2>Calculadora de Consumo Energético</h2>
      <p>Selecciona los equipos para estimar el consumo en Watts:</p>

      <div className="lista-seleccion-hardware">
        {productos.map((prod) => {
          const estaSeleccionado = componentesSeleccionados.some((item) => item.id === prod.id);
          return (
            <div 
              key={prod.id} 
              className={`opcion-hardware ${estaSeleccionado ? 'seleccionado' : ''}`}
              onClick={() => toggleComponente(prod)}
              style={{ cursor: 'pointer', margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
            >
              <input 
                type="checkbox" 
                checked={estaSeleccionado} 
                readOnly 
              />
              <span style={{ marginLeft: '10px' }}><strong>{prod.nombre}</strong></span>
              <small style={{ marginLeft: '10px' }}>{prod.watts}W</small>
              <strong style={{ marginLeft: '10px' }}>{formatearCLP(prod.precio)}</strong>
            </div>
          );
        })}
      </div>

      <div className="resumen-calculo" style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Resumen de Consumo</h3>
        <p>Consumo Estimado: <strong>{wattsTotales} Watts</strong></p>
        <p>Fuente Recomendada: <strong>{fuenteRecomendada}W o superior</strong></p>
      </div>
    </section>
  );
};