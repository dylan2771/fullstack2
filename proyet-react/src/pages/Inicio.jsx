import { Navbar } from '../components/basicos/Navbar';
import { Footer } from '../components/basicos/Footer';
import { VideoNativo } from '../components/basicos/VideoNativo';

export const Inicio = () => {
  return (
    <div className="pagina-inicio">
      <Navbar />
      <main className="contenido-principal" style={{ padding: '20px' }}>
        <section className="banner-bienvenida">
          <h2>Bienvenido a BuildMyPC</h2>
          <p>Arma tu PC gamer o de trabajo con la mejor compatibilidad.</p>
          <VideoNativo />
        </section>
      </main>
      <Footer />
    </div>
  );
};