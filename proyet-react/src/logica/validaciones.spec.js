import { describe, it, expect } from 'vitest';
import { validarLogin, validarCotizacion } from './validaciones';

describe('Pruebas en validaciones.js', () => {
  describe('validarLogin', () => {
    it('debe retornar esValido = true si email y password son correctos', () => {
      const resultado = validarLogin('usuario@correo.com', '123456');
      expect(resultado.esValido).toBe(true);
      expect(resultado.errores).toHaveLength(0);
    });

    it('debe marcar error si el correo está vacío o es solo espacios', () => {
      const resultado = validarLogin('   ', '123456');
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores).toContain('El correo electronico es obligatorio.');
    });

    it('debe marcar error si la contraseña tiene menos de 6 caracteres', () => {
      const resultado = validarLogin('usuario@correo.com', '12345');
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores).toContain('La contraseña debe tener al menos 6 caracteres.');
    });

    it('debe retornar múltiples errores si ambos campos son inválidos', () => {
      const resultado = validarLogin('', '');
      expect(resultado.esValido).toBe(false);
      expect(resultado.errores.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('validarCotizacion', () => {
    it('debe retornar esValido = true con nombre válido y componentes seleccionados', () => {
      const componentesMock = [{ id: 1, nombre: 'Procesador', watts: 120 }];
      const resultado = validarCotizacion('Maximiliano Veas', componentesMock);

      expect(resultado.esValido).toBe(true);
      expect(resultado.errores).toHaveLength(0);
    });

    it('debe marcar error si el nombre del cliente está vacío', () => {
      const componentesMock = [{ id: 1, nombre: 'Procesador' }];
      const resultado = validarCotizacion('', componentesMock);

      expect(resultado.esValido).toBe(false);
      expect(resultado.errores).toContain('Debe ingresar el nombre del cliente o usuario.');
    });

    it('debe marcar error si el arreglo de componentes está vacío o es nulo', () => {
      const resultado = validarCotizacion('Maximiliano Veas', []);

      expect(resultado.esValido).toBe(false);
      expect(resultado.errores).toContain('Debe seleccionar al menos un componente para la cotización.');
    });
  });
});