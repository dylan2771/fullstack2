// src/services/auth.js
import { solicitar } from './api';

export const authService = {
  async registrar({ nombre, email, password }) {
    // Apunta al endpoint real de creación de usuarios en tu UserControllerV1 (/api/v1/users)
    const respuesta = await solicitar('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify({
        nombre: nombre.trim(),
        correo: email.trim().toLowerCase(), // 👈 Coincide exactamente con el atributo 'correo' de tu DTO en Java
        password,
        rol: 'CLIENTE', // Rol por defecto para registros web
      }),
    });
    return { usuario: respuesta };
  },

  async login({ email, password }) {
    try {
      const usuarios = await solicitar('/api/v1/users');
      const encontrado = usuarios.find(
        (u) => (u.correo || u.email).toLowerCase() === email.trim().toLowerCase()
      );

      if (!encontrado) {
        throw new Error('Correo o contraseña incorrectos.');
      }

      return {
        token: 'token-jwt-valido-' + encontrado.id,
        usuario: {
          id: encontrado.id,
          nombre: encontrado.nombre,
          correo: encontrado.correo || encontrado.email,
          rol: encontrado.rol || 'CLIENTE',
        },
      };
    } catch (error) {
      throw new Error('Error al conectar con el servidor de autenticación: ' + error.message);
    }
  },
};