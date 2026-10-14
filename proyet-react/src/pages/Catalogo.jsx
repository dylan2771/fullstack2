import { Navbar } from '../components/basicos/Navbar';
import { Footer } from '../components/basicos/Footer';
import { ListaProductos } from '../components/props/ListaProductos';
import { productos } from '../logica/datos';

export const Catalogo = () => {
  return (
    <div className="pagina-catalogo">
      <Navbar />
      <main className="contenedor-catalogo" style={{ padding: '20px' }}>
        <h1>Catálogo de Componentes</h1>
        <ListaProductos productos={productos} />
      </main>
      <Footer />
    </div>
  );
};