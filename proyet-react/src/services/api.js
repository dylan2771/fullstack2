// src/services/api.js
import { leerSesion, borrarSesion } from './sesion';

const API_URL = import.meta.env.VITE_API_URL;

export async function solicitar(ruta, opciones = {}) {
  const sesion = leerSesion();
  const token = sesion?.token;
  const headers = { 'Content-Type': 'application/json' };

  const esRegistro = ruta.includes('/users') && (opciones.method?.toUpperCase() === 'POST');
  const esBuild = ruta.includes('/builds');
  const esTokenRealJWT = Boolean(token && token.split('.').length === 3);

  // Solo adjuntamos Authorization si es un JWT HS256 real (3 segmentos) y no es ruta pública (/builds o registro)
  if (esTokenRealJWT && !esRegistro && !esBuild) {
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
        return esBuild ? [] : null;
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
    if (!esTokenRealJWT && esBuild) {
      return [];
    }
    throw error;
  }
}