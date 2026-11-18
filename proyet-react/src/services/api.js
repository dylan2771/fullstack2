// src/services/api.js
import { leerSesion, borrarSesion } from './sesion';

const API_URL = import.meta.env.VITE_API_URL;

export async function solicitar(ruta, opciones = {}) {
  const token = leerSesion()?.token;
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: { ...headers, ...opciones.headers },
  });

  if (res.status === 401 && token) {
    borrarSesion();
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}));
    throw new Error(cuerpo.mensaje || `Error ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}