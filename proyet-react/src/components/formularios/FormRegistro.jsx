import { useState } from 'react';

export const FormRegistro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const listaErrores = [];

    if (!nombre.trim()) listaErrores.push('El nombre es obligatorio.');
    if (!email.trim()) listaErrores.push('El correo es obligatorio.');
    if (!password.trim() || password.length < 6) {
      listaErrores.push('La contraseña debe tener al menos 6 caracteres.');
    }

    if (listaErrores.length > 0) {
      setErrores(listaErrores);
      return;
    }

    setErrores([]);
    alert('¡Registro completado con éxito!');
    setNombre('');
    setEmail('');
    setPassword('');
  };

  return (
    <section className="contenedor-registro">
      <h2>Registro de Usuario</h2>

      {errores.length > 0 && (
        <div className="alert-error">
          <ul>
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-registro">
        <div className="campo">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Juan Pérez"
          />
        </div>

        <div className="campo">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
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

        <button type="submit" className="btn-registrar">Registrarse</button>
      </form>
    </section>
  );
};