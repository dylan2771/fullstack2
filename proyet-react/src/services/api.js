// src/services/api.js
import { leerSesion, borrarSesion } from './sesion';

const API_URL = import.meta.env.VITE_API_URL;

export async function solicitar(ruta, opciones = {}) {
  const sesion = leerSesion();
  const token = sesion?.token;
  const headers = { 'Content-Type': 'application/json' };

  // Detectar si es una petición de registro (POST a /api/v1/users o /api/v2/users)
  const esRegistro = ruta.includes('/users') && (opciones.method?.toUpperCase() === 'POST');

  // Solo enviamos el Bearer token si HAY token, NO es local, Y NO es una ruta de registro
  if (token && !token.startsWith('token-local-') && !esRegistro) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: { ...headers, ...opciones.headers },
    });

    if (res.status === 401) {
      if (token && token.startsWith('token-local-')) {
        console.warn(`[Modo Local] El endpoint ${ruta} requiere JWT real en el servidor. Omitiendo 401.`);
        return ruta.includes('builds') ? [] : null;
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
    if (token && token.startsWith('token-local-')) {
      console.warn(`[Modo Local] Capturado error en ${ruta}:`, error.message);
      return ruta.includes('builds') ? [] : null;
    }
    throw error;
  }
}