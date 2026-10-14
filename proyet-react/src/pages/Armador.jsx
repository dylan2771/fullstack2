import { Navbar } from '../components/basicos/Navbar';
import { Footer } from '../components/basicos/Footer';
import { CalculadoraWatts } from '../components/estado/CalculadoraWatts';

export const Armador = () => {
  return (
    <div className="pagina-armador">
      <Navbar />
      <main className="contenedor-armador" style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Armador de PC y Calculadora de Potencia
        </h1>
        <CalculadoraWatts />
      </main>
      <Footer />
    </div>
  );
};