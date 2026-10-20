// Calcula la suma total de Watts de los componentes seleccionados
export const calcularConsumoTotalWatts = (componentes = []) => {
  return componentes.reduce((total, item) => total + (Number(item.watts) || 0), 0);
};

// Obtiene la fuente recomendada agregando un margen de seguridad (ej. +100W)
export const obtenerFuenteRecomendadaWatts = (wattsTotales = 0) => {
  if (wattsTotales <= 0) return 0;
  // Agrega 100W de margen y redondea hacia arriba a la centena más cercana
  const margen = wattsTotales + 100;
  return Math.ceil(margen / 50) * 50;
};