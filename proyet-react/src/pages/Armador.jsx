// src/pages/Armador.jsx
import { CalculadoraWatts } from '../components/estado/CalculadoraWatts';

export const Armador = ({ onAgregar }) => {
  return (
    <main className="contenedor-armador" style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#00FF66' }}>
        Armador de PC y Calculadora de Potencia
      </h1>
      <CalculadoraWatts onAgregar={onAgregar} />
    </main>
  );
};