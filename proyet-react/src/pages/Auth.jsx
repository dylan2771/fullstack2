import { Navbar } from '../components/basicos/Navbar';
import { Footer } from '../components/basicos/Footer';
import { FormLogin } from '../components/formularios/FormLogin';
import { FormRegistro } from '../components/formularios/FormRegistro';

export const Auth = () => {
  return (
    <div className="pagina-auth">
      <Navbar />
      <main className="contenedor-auth" style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Autenticación de Usuario
        </h1>
        <div className="seccion-formularios">
          <FormLogin />
          <FormRegistro />
        </div>
      </main>
      <Footer />
    </div>
  );
};