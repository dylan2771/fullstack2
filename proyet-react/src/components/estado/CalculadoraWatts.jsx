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
      <p>Selecciona los componentes para estimar el consumo en Watts:</p>

      <div className="lista-seleccion-hardware">
        {productos.map((prod) => {
          const estaSeleccionado = componentesSeleccionados.some((item) => item.id === prod.id);
          return (
            <div 
              key={prod.id} 
              className={`opcion-hardware ${estaSeleccionado ? 'seleccionado' : ''}`}
              onClick={() => toggleComponente(prod)}
            >
              <input 
                type="checkbox" 
                checked={estaSeleccionado} 
                onChange={() => {}} 
              />
              <span>{prod.nombre}</span>
              <small>{prod.watts}W</small>
              <strong>{formatearCLP(prod.precio)}</strong>
            </div>
          );
        })}
      </div>

      <div className="resumen-calculo">
        <h3>Resumen de Consumo</h3>
        <p>Consumo Estimado: <strong>{wattsTotales} Watts</strong></p>
        <p>Fuente Recomendada: <strong>{fuenteRecomendada}W o superior</strong></p>
      </div>
    </section>
  );
};