// src/services/api.js
import { leerSesion, borrarSesion } from './sesion';

const API_URL = import.meta.env.VITE_API_URL;

export async function solicitar(ruta, opciones = {}) {
  const sesion = leerSesion();
  const token = sesion?.token;
  const headers = { 'Content-Type': 'application/json' };

  const esRegistro = ruta.includes('/users') && (opciones.method?.toUpperCase() === 'POST');
  const esTokenRealJWT = Boolean(token && token.split('.').length === 3);

  // Adjuntamos la autorización si es un JWT válido (excepto en el registro de usuarios)
  if (esTokenRealJWT && !esRegistro) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: { ...headers, ...opciones.headers },
    });

    if (res.status === 401) {
      if (!esTokenRealJWT) {
        console.warn(`[Sesión local] El endpoint ${ruta} devolvió 401.`);
        return ruta.includes('/builds') ? [] : null;
      }
      borrarSesion();
      window.dispatchEvent(new Event('sesion-expirada'));
    }

    if (!res.ok) {
      const cuerpo = await res.json().catch(() => ({}));
      throw new Error(cuerpo.mensaje || `Error ${res.status}`);
    }

    return res.status === 204 ? null : res.json();
  } catch (error) {
    if (!esTokenRealJWT && ruta.includes('/builds')) {
      return [];
    }
    throw error;
  }
}