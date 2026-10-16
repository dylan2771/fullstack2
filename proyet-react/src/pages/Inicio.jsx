import { VideoNativo } from '../components/basicos/VideoNativo';

export const Inicio = () => {
  return (
    <main className="contenido-principal" style={{ padding: '20px' }}>
      <section className="banner-bienvenida">
        <h2>Bienvenido a BuildMyPC</h2>
        <p>Arma tu PC gamer o de trabajo con la mejor compatibilidad.</p>
        <VideoNativo />
      </section>
    </main>
  );
};