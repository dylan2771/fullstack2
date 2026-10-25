import { describe, it, expect } from 'vitest';
import { calcularConsumoTotalWatts, obtenerFuenteRecomendadaWatts } from './armador';

describe('Pruebas en armador.js (Calculadora Energética)', () => {

  it('debe sumar correctamente los Watts de los componentes seleccionados', () => {
    const listaComponentes = [
      { id: 1, watts: 250 },
      { id: 2, watts: 450 }
    ];
    expect(calcularConsumoTotalWatts(listaComponentes)).toBe(700);
  });

  it('debe retornar 0 Watts si la lista de componentes está vacía', () => {
    expect(calcularConsumoTotalWatts([])).toBe(0);
  });

  it('debe calcular la fuente de poder recomendada (+100W redondeado a múltiplos de 50W)', () => {
    // 180W + 100W = 280W -> Redondea hacia arriba a 300W
    expect(obtenerFuenteRecomendadaWatts(180)).toBe(300);
    // 250W + 100W = 350W -> Se mantiene en 350W
    expect(obtenerFuenteRecomendadaWatts(250)).toBe(350);
  });

  it('debe retornar 0W de fuente recomendada si el consumo total es 0', () => {
    expect(obtenerFuenteRecomendadaWatts(0)).toBe(0);
  });

});