// src/services/sesion.js
const CLAVE = 'sesion';

function vencida(sesion) {
  if (!sesion?.token) return true;
  
  // Si es nuestro token local, no intentamos parsearlo como JWT
  if (sesion.token.startsWith('token-local-')) {
    return false;
  }

  try {
    const parte = sesion.token.split('.')[1];
    if (!parte) return true;
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