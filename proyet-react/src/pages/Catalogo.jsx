// src/pages/Catalogo.jsx
import { ListaProductos } from '../components/props/ListaProductos';
import { productos } from '../logica/datos';

export const Catalogo = ({ onAgregar }) => {
  return (
    <main className="contenedor-catalogo container py-5">
      {/* Encabezado del Catálogo */}
      <div className="mb-4 text-start">
        <span 
          className="badge mb-2 px-3 py-2 fw-bold" 
          style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
        >
          🛒 Stock Disponible
        </span>
        <h1 className="display-5 fw-bold mb-2" style={{ color: '#00FF66' }}>
          Catálogo de Componentes
        </h1>
        <p className="text-secondary fs-5 mb-0">
          Explora nuestro inventario de hardware de alto rendimiento para tu próximo build.
        </p>
      </div>

      {/* Listado de Productos con conexión al Carrito */}
      <div className="seccion-productos">
        <ListaProductos productos={productos} onAgregar={onAgregar} />
      </div>
    </main>
  );
};