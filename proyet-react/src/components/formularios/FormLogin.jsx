import { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { validarLogin } from '../../logica/validaciones';

export const FormLogin = ({ onLogin }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState([]);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ejecuta la función de validación de la capa lógica
    const resultado = validarLogin(email, password);
    if (!resultado.esValido) {
      setErrores(resultado.errores);
      return;
    }

    setErrores([]);
    setCargando(true);

    try {
      // Llama al contexto AuthProvider -> authService.login() -> POST /api/auth/login
      const datos = await login({ email, password });

      setEmail('');
      setPassword('');

      if (typeof onLogin === 'function') {
        onLogin(datos.usuario);
      }
    } catch (err) {
      setErrores([err.message || 'Email o contraseña incorrectos']);
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="contenedor-login text-start">
      {/* Alerta de Errores con Estilo Gamer */}
      {errores.length > 0 && (
        <div
          className="alert p-3 mb-4 rounded"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #EF4444',
            color: '#F87171',
          }}
        >
          <ul className="m-0 ps-3 small">
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-login">
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-secondary small fw-bold">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            className="form-control text-white"
            style={{
              backgroundColor: '#0B0F19',
              border: '1px solid #1F2937',
              borderRadius: '6px',
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            disabled={cargando}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label text-secondary small fw-bold">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control text-white"
            style={{
              backgroundColor: '#0B0F19',
              border: '1px solid #1F2937',
              borderRadius: '6px',
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={cargando}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="btn w-100 fw-bold py-2 mt-2"
          style={{
            backgroundColor: '#00FF66',
            color: '#000000',
            border: 'none',
            borderRadius: '6px',
            opacity: cargando ? 0.7 : 1,
          }}
        >
          {cargando ? 'Entrando...' : 'Ingresar ⚡'}
        </button>
      </form>
    </section>
  );
};