// src/logica/carrito.js

/**
 * Agrega un producto al carrito con la cantidad especificada o la incrementa si ya existe.
 */
export function agregarAlCarrito(carritoActual = [], producto, cantidadAñadir = 1) {
  if (!producto || !producto.id) return carritoActual;

  const cant = Number(cantidadAñadir) > 0 ? Number(cantidadAñadir) : 1;
  const indiceExistente = carritoActual.findIndex(item => item.id === producto.id);

  if (indiceExistente !== -1) {
    return carritoActual.map((item, i) => 
      i === indiceExistente 
        ? { ...item, cantidad: (item.cantidad || 0) + cant } 
        : item
    );
  }

  return [...carritoActual, { ...producto, cantidad: cant }];
}

/**
 * Elimina un producto del carrito por su ID.
 */
export function eliminarDelCarrito(carritoActual = [], idProducto) {
  return carritoActual.filter(item => item.id !== idProducto);
}

/**
 * Actualiza la cantidad de un producto específico.
 */
export function cambiarCantidad(carritoActual = [], idProducto, nuevaCantidad) {
  const cant = Number(nuevaCantidad);
  if (isNaN(cant) || cant <= 0) {
    return eliminarDelCarrito(carritoActual, idProducto);
  }
  return carritoActual.map(item =>
    item.id === idProducto ? { ...item, cantidad: cant } : item
  );
}

/**
 * Calcula el total de ítems individuales en el carrito.
 */
export function contarTotalItems(carritoActual = []) {
  return carritoActual.reduce((acc, item) => acc + (Number(item.cantidad) || 1), 0);
}