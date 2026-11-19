// src/services/auth.js
const CLAVE_USUARIOS_LOCAL = 'buildmypc_usuarios_registrados';

function obtenerUsuariosLocales() {
  try {
    const raw = localStorage.getItem(CLAVE_USUARIOS_LOCAL);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const authService = {
  async registrar({ nombre, email, password }) {
    const usuarios = obtenerUsuariosLocales();

    const existe = usuarios.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existe) {
      throw new Error('Este correo ya está registrado.');
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      password,
      rol: 'CLIENTE',
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem(CLAVE_USUARIOS_LOCAL, JSON.stringify(usuarios));

    return {
      usuario: {
        id: nuevoUsuario.id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email,
        rol: nuevoUsuario.rol,
      },
    };
  },

  async login({ email, password }) {
    // Modo 100% local independiente del backend
    const usuarios = obtenerUsuariosLocales();
    const encontrado = usuarios.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!encontrado) {
      throw new Error('Correo o contraseña incorrectos.');
    }

    return {
      token: 'token-local-' + Date.now(),
      usuario: {
        id: encontrado.id,
        nombre: encontrado.nombre,
        email: encontrado.email,
        rol: encontrado.rol,
      },
    };
  },
};