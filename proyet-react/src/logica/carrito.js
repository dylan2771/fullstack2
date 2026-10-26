// src/logica/carrito.js

/**
 * Agrega un producto al carrito o incrementa su cantidad si ya existe.
 */
export function agregarAlCarrito(carritoActual = [], producto) {
  if (!producto || !producto.id) return carritoActual;

  const indiceExistente = carritoActual.findIndex(item => item.id === producto.id);

  if (indiceExistente !== -1) {
    return carritoActual.map((item, i) => 
      i === indiceExistente 
        ? { ...item, cantidad: (item.cantidad || 1) + 1 } 
        : item
    );
  }

  return [...carritoActual, { ...producto, cantidad: 1 }];
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
  if (nuevaCantidad <= 0) {
    return eliminarDelCarrito(carritoActual, idProducto);
  }
  return carritoActual.map(item =>
    item.id === idProducto ? { ...item, cantidad: nuevaCantidad } : item
  );
}

/**
 * Calcula el total de ítems individuales en el carrito.
 */
export function contarTotalItems(carritoActual = []) {
  return carritoActual.reduce((acc, item) => acc + (item.cantidad || 1), 0);
}