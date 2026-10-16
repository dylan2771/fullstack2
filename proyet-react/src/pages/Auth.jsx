import { useState } from 'react';
import { FormLogin } from '../components/formularios/FormLogin';
import { FormRegistro } from '../components/formularios/FormRegistro';

export const Auth = () => {
  // Estado para alternar entre vista de Login (true) y Registro (false)
  const [esLogin, setEsLogin] = useState(true);

  return (
    <main className="contenedor-auth" style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Autenticación de Usuario
      </h1>

      <div className="selector-pestanas" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          type="button" 
          onClick={() => setEsLogin(true)}
          style={{ fontWeight: esLogin ? 'bold' : 'normal', marginRight: '10px' }}
        >
          Iniciar Sesión
        </button>
        <button 
          type="button" 
          onClick={() => setEsLogin(false)}
          style={{ fontWeight: !esLogin ? 'bold' : 'normal' }}
        >
          Registrarse
        </button>
      </div>

      <div className="seccion-formularios">
        {esLogin ? <FormLogin /> : <FormRegistro />}
      </div>
    </main>
  );
};