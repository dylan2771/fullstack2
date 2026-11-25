// src/services/api.js
import { leerSesion, borrarSesion } from './sesion';

const API_URL = import.meta.env.VITE_API_URL;

export async function solicitar(ruta, opciones = {}) {
  const sesion = leerSesion();
  const token = sesion?.token;
  const headers = { 'Content-Type': 'application/json' };

  // Solo enviamos el Bearer token si NO es un token local de respaldo
  if (token && !token.startsWith('token-local-')) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: { ...headers, ...opciones.headers },
    });

    // Si recibimos un 401 del servidor pero estamos usando token local, 
    // no expulsamos al usuario; devolvemos un arreglo vacío o un objeto nulo según corresponda
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
    // Si el servidor rechaza por completo la conexión o da error de red/401 en modo local
    if (token && token.startsWith('token-local-')) {
      console.warn(`[Modo Local] Capturado error en ${ruta}:`, error.message);
      return ruta.includes('builds') ? [] : null;
    }
    throw error;
  }
}