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
    <section className="contenedor-registro text-start">
      {/* Caja de Alerta de Errores Gamer */}
      {errores.length > 0 && (
        <div 
          className="alert p-3 mb-4 rounded" 
          style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.15)', 
            border: '1px solid #EF4444', 
            color: '#F87171' 
          }}
        >
          <ul className="m-0 ps-3 small">
            {errores.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-registro">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label text-secondary small fw-bold">
            Nombre Completo
          </label>
          <input
            id="nombre"
            type="text"
            className="form-control text-white"
            style={{ 
              backgroundColor: '#0B0F19', 
              border: '1px solid #1F2937',
              borderRadius: '6px'
            }}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Maximiliano Veas"
          />
        </div>

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
              borderRadius: '6px'
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
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
              borderRadius: '6px'
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          className="btn w-100 fw-bold py-2 mt-2"
          style={{ 
            backgroundColor: '#00FF66', 
            color: '#000000', 
            border: 'none',
            borderRadius: '6px' 
          }}
        >
          Crear Cuenta 
        </button>
      </form>
    </section>
  );
};