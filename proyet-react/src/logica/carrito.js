// src/logica/carrito.js

/**
 * Agrega un producto al carrito respetando el límite estricto de stock.
 */
export function agregarAlCarrito(carritoActual = [], producto, cantidadAñadir = 1) {
  if (!producto || !producto.id) return carritoActual;

  const stockMaximo = Number(producto.stock) ?? 99;
  const cantSolicitada = Number(cantidadAñadir) > 0 ? Number(cantidadAñadir) : 1;

  const indiceExistente = carritoActual.findIndex(item => item.id === producto.id);

  if (indiceExistente !== -1) {
    return carritoActual.map((item, i) => {
      if (i === indiceExistente) {
        // CORRECCIÓN: Usamos Math.min con el stock máximo basado en la cantidad total actual del item
        const cantidadActualEnCarro = Number(item.cantidad) || 0;
        const nuevaCantidad = Math.min(cantidadActualEnCarro + cantSolicitada, stockMaximo);
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    });
  }

  // Si es nuevo en el carrito, se asegura de no superar el stock inicial
  const cantidadInicial = Math.min(cantSolicitada, stockMaximo);
  return [...carritoActual, { ...producto, cantidad: cantidadInicial }];
}

/**
 * Elimina un producto del carrito por su ID.
 */
export function eliminarDelCarrito(carritoActual = [], idProducto) {
  return carritoActual.filter(item => item.id !== idProducto);
}

/**
 * Actualiza la cantidad de un producto específico validando el tope de stock.
 */
export function cambiarCantidad(carritoActual = [], idProducto, nuevaCantidad) {
  const cant = Number(nuevaCantidad);
  if (isNaN(cant) || cant <= 0) {
    return eliminarDelCarrito(carritoActual, idProducto);
  }

  return carritoActual.map(item => {
    if (item.id === idProducto) {
      const stockMaximo = Number(item.stock) ?? 99;
      const cantidadControlada = Math.min(cant, stockMaximo);
      return { ...item, cantidad: cantidadControlada };
    }
    return item;
  });
}

/**
 * Calcula el total de ítems individuales en el carrito.
 */
export function contarTotalItems(carritoActual = []) {
  return carritoActual.reduce((acc, item) => acc + (Number(item.cantidad) || 1), 0);
}