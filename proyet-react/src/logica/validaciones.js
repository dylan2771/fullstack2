// Valida los datos del formulario de inicio de sesion (Login)
export const validarLogin = (email, password) => {
  const errores = [];

  if (!email || email.trim() === '') {
    errores.push('El correo electronico es obligatorio.');
  }

  if (!password || password.trim() === '') {
    errores.push('La contraseña es obligatoria.');
  } else if (password.length < 6) {
    errores.push('La contraseña debe tener al menos 6 caracteres.');
  }

  return {
    esValido: errores.length === 0,
    errores
  };
};

// Valida el formulario del armador de PC antes de guardar cotizacion
export const validarCotizacion = (nombreCliente, componentes) => {
  const errores = [];

  if (!nombreCliente || nombreCliente.trim() === '') {
    errores.push('Debe ingresar el nombre del cliente o usuario.');
  }

  if (!componentes || componentes.length === 0) {
    errores.push('Debe seleccionar al menos un componente para la cotización.');
  }

  return {
    esValido: errores.length === 0,
    errores
  };
};