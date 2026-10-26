// src/logica/carrito.spec.js
import { describe, it, expect } from 'vitest';
import { agregarAlCarrito, eliminarDelCarrito, cambiarCantidad, contarTotalItems } from './carrito';

describe('Pruebas del Módulo de Carrito (carrito.js)', () => {
  it('debe agregar un producto nuevo con cantidad 1', () => {
    const producto = { id: 1, nombre: 'Procesador Ryzen 5', precio: 150000 };
    const resultado = agregarAlCarrito([], producto);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].cantidad).toBe(1);
  });

  it('debe incrementar la cantidad si el producto ya está en el carrito', () => {
    const inicial = [{ id: 1, nombre: 'Procesador Ryzen 5', cantidad: 1 }];
    const producto = { id: 1, nombre: 'Procesador Ryzen 5' };
    const resultado = agregarAlCarrito(inicial, producto);
    expect(resultado[0].cantidad).toBe(2);
  });

  it('debe eliminar un producto por ID', () => {
    const inicial = [{ id: 1, nombre: 'Procesador' }, { id: 2, nombre: 'RAM' }];
    const resultado = eliminarDelCarrito(inicial, 1);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe(2);
  });

  it('debe contar el total de ítems acumulados correctamente', () => {
    const carrito = [{ cantidad: 2 }, { cantidad: 3 }];
    expect(contarTotalItems(carrito)).toBe(5);
  });
});