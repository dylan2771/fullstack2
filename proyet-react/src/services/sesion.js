// src/services/sesion.js
const CLAVE = 'sesion';

function vencida(sesion) {
  if (!sesion?.token) return true;
  try {
    const parte = sesion.token.split('.')[1];
    const base64 = parte.replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(base64));
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function leerSesion() {
  const texto = localStorage.getItem(CLAVE);
  const sesion = texto ? JSON.parse(texto) : null;
  if (sesion && vencida(sesion)) {
    borrarSesion();
    return null;
  }
  return sesion;
}

export function guardarSesion(sesion) {
  localStorage.setItem(CLAVE, JSON.stringify(sesion));
}

export function borrarSesion() {
  localStorage.removeItem(CLAVE);
}