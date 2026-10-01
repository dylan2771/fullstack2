export function calcularWattsTotales(componentes) {
  return componentes.reduce((total, item) => total + (item.watts || 0), 0);
}