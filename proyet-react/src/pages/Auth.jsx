import { useState } from 'react';
import { FormLogin } from '../components/formularios/FormLogin';
import { FormRegistro } from '../components/formularios/FormRegistro';

export const Auth = ({ onLogin, mensajeAviso }) => {
  const [esLogin, setEsLogin] = useState(true);

  return (
    <main className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div 
        className="card p-4 w-100" 
        style={{ 
          maxWidth: '460px', 
          backgroundColor: '#111827', 
          border: '1px solid #1F2937', 
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        }}
      >
        {mensajeAviso && (
          <div 
            className="alert p-3 mb-3 rounded small fw-bold text-center"
            style={{ 
              backgroundColor: 'rgba(245, 158, 11, 0.15)', 
              border: '1px solid #F59E0B', 
              color: '#FBBF24' 
            }}
          >
            🔒 {mensajeAviso}
          </div>
        )}

        <h2 className="text-center fw-bold mb-2" style={{ color: '#00FF66' }}>
          Autenticación de Usuario
        </h2>
        <p className="text-center text-secondary small mb-4">
          {esLogin ? 'Ingresa tus credenciales para acceder' : 'Crea tu cuenta para guardar tus cotizaciones'}
        </p>

        <div className="d-flex rounded p-1 mb-4" style={{ backgroundColor: '#0B0F19', border: '1px solid #1F2937' }}>
          <button 
            type="button" 
            className="btn w-50 fw-bold py-2"
            onClick={() => setEsLogin(true)}
            style={{
              backgroundColor: esLogin ? '#00FF66' : 'transparent',
              color: esLogin ? '#000000' : '#9CA3AF',
              border: 'none',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            Iniciar Sesión
          </button>
          <button 
            type="button" 
            className="btn w-50 fw-bold py-2"
            onClick={() => setEsLogin(false)}
            style={{
              backgroundColor: !esLogin ? '#00FF66' : 'transparent',
              color: !esLogin ? '#000000' : '#9CA3AF',
              border: 'none',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            Registrarse
          </button>
        </div>

        <div className="seccion-formularios">
          {esLogin ? <FormLogin onLogin={onLogin} /> : <FormRegistro />}
        </div>
      </div>
    </main>
  );
};