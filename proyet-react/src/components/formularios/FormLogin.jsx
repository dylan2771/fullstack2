import { useState } from 'react';
import { validarLogin } from '../../logica/validaciones';

export const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ejecuta la funcion de validacion de la capa logica
    const resultado = validarLogin(email, password);

    if (!resultado.esValido) {
      setErrores(resultado.errores);
      return;
    }

    setErrores([]);
    alert('¡Inicio de sesión exitoso!');
    // Limpia el formulario
    setEmail('');
    setPassword('');
  };

  return (
    <section className="contenedor-login">
      <h2>Iniciar Sesión</h2>

      {errores.length > 0 && (
        <div className="alert-error">
          <ul>
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-login">
        <div className="campo">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div className="campo">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
          />
        </div>

        <button type="submit" className="btn-ingresar">Ingresar</button>
      </form>
    </section>
  );
};