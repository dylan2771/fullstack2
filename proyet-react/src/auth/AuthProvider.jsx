// src/auth/AuthProvider.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from './useAuth';
import { authService } from '../services/auth';
import { leerSesion, guardarSesion, borrarSesion } from '../services/sesion';

export default function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(leerSesion);

  useEffect(() => {
    const alExpirar = () => setSesion(null);
    const evento = 'sesion-expirada';
    window.addEventListener(evento, alExpirar);
    return () => window.removeEventListener(evento, alExpirar);
  }, []);

  async function login(credenciales) {
    const datos = await authService.login(credenciales);
    guardarSesion(datos);
    setSesion(datos);
    return datos;
  }

  function logout() {
    borrarSesion();
    setSesion(null);
  }

  const valor = {
    usuario: sesion?.usuario ?? null,
    autenticado: sesion !== null,
    esAdmin: sesion?.usuario?.rol === 'ADMIN',
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valor}>
      {children}
    </AuthContext.Provider>
  );
}