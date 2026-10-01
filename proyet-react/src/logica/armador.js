// Suma el consumo total en Watts de las piezas seleccionadas
export const calcularConsumoTotalWatts = (componentes = []) => {
  if (!Array.isArray(componentes)) return 0;
  return componentes.reduce((total, pieza) => {
    return total + (pieza && pieza.watts ? pieza.watts : 0);
  }, 0);
};

// Recomienda el wattage para la fuente de poder con un 20% de margen de seguridad
export const obtenerFuenteRecomendadaWatts = (consumoWatts = 0) => {
  if (consumoWatts <= 0) return 0;
  const consumoConMargen = consumoWatts * 1.20;
  // Redondea hacia arriba al múltiplo de 50W más cercano
  return Math.ceil(consumoConMargen / 50) * 50;
};

// Revisa si la CPU y la Placa Madre usan el mismo socket
export const verificarCompatibilidadSocket = (cpu, motherboard) => {
  if (!cpu || !motherboard) {
    return {
      compatible: true,
      mensaje: 'Selecciona una CPU y una Placa Madre para verificar la compatibilidad.'
    };
  }

  if (cpu.socket === motherboard.socket) {
    return {
      compatible: true,
      mensaje: `¡Compatible! Ambos componentes utilizan el socket ${cpu.socket}.`
    };
  }

  return {
    compatible: false,
    mensaje: `Incompatible: La CPU usa socket ${cpu.socket} y la Placa Madre usa ${motherboard.socket}.`
  };
};