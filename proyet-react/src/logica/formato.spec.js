import { describe, it, expect } from 'vitest';
import { formatearCLP, calcularIVA, calcularTotalConIVA } from './formato';

describe('Pruebas en formato.js', () => {
  describe('formatearCLP', () => {
    it('debe formatear un número correctamente a pesos chilenos', () => {
      const resultado = formatearCLP(389990);
      expect(resultado).toBe('$389.990');
    });

    it('debe retornar $0 si el monto es 0', () => {
      expect(formatearCLP(0)).toBe('$0');
    });

    it('debe retornar $0 si el valor es nulo, indefinido o no es un número', () => {
      expect(formatearCLP(null)).toBe('$0');
      expect(formatearCLP(undefined)).toBe('$0');
      expect(formatearCLP('texto')).toBe('$0');
    });
  });

  describe('calcularIVA', () => {
    it('debe calcular el 19% de IVA de un monto', () => {
      expect(calcularIVA(100000)).toBe(19000);
    });

    it('debe redondear el resultado al entero más cercano', () => {
      // 100 * 0.19 = 19
      expect(calcularIVA(100)).toBe(19);
    });

    it('debe retornar 0 si el monto es inválido o 0', () => {
      expect(calcularIVA(0)).toBe(0);
      expect(calcularIVA('abc')).toBe(0);
    });
  });

  describe('calcularTotalConIVA', () => {
    it('debe calcular el monto total sumando el 19% de IVA', () => {
      expect(calcularTotalConIVA(100000)).toBe(119000);
    });
  });
});