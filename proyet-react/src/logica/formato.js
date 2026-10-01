// Formatea un valor numérico a pesos chilenos ($CLP)
export const formatearCLP = (monto) => {
  if (!monto || isNaN(monto)) return '$0';
  return `$${Number(monto).toLocaleString('es-CL')}`;
};

// Calcula el IVA del 19% sobre un monto
export const calcularIVA = (monto) => {
  if (!monto || isNaN(monto)) return 0;
  return Math.round(monto * 0.19);
};

// Calcula el precio total sumando el IVA
export const calcularTotalConIVA = (monto) => {
  return monto + calcularIVA(monto);
};