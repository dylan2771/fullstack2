import { TarjetaProducto } from './TarjetaProducto';

export const ListaProductos = ({ productos }) => {
  return (
    <section className="seccion-catalogo">
      <h2>Lista de Productos</h2>

      {!productos || productos.length === 0 ? (
        <p className="mensaje-vacio">No hay productos disponibles por el momento.</p>
      ) : (
        <div className="contenedor-tarjetas">
          {productos.map((prod) => (
            <TarjetaProducto
              key={prod.id}
              nombre={prod.nombre}
              precio={prod.precio}
              watts={prod.watts}
              imagen={prod.imagen}
              categoria={prod.categoria}
            />
          ))}
        </div>
      )}
    </section>
  );
};