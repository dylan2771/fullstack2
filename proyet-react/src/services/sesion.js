// src/services/sesion.js
const CLAVE = 'sesion';

function vencida(sesion) {
  if (!sesion?.token) return true;
  
  // Si es un token local, no expira por JWT
  if (typeof sesion.token === 'string' && sesion.token.startsWith('token-local-')) {
    return false;
  }

  try {
    const partes = sesion.token.split('.');
    if (partes.length < 2) return false; // Si no tiene estructura JWT, lo dejamos pasar seguro

    const base64 = partes[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    
    if (!payload.exp) return false; // Si no tiene fecha de expiración, no expira solo
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    // ANTES: si fallaba, devolvía true y borraba la sesión. 
    // AHORA: si falla al leer el token, lo dejamos pasar para que NO te bote la sesión.
    return false;
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