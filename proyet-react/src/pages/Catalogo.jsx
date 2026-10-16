import { ListaProductos } from '../components/props/ListaProductos';
import { productos } from '../logica/datos';

export const Catalogo = () => {
  return (
    <main className="contenedor-catalogo" style={{ padding: '20px' }}>
      <h1>Catálogo de Componentes</h1>
      <ListaProductos productos={productos} />
    </main>
  );
};