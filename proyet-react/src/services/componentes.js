// src/services/componentes.js
import { solicitar } from './api';

export const componentesService = {
  listar: (opciones) => solicitar('/api/v1/components', opciones),
  obtener: (id, opciones) => solicitar(`/api/v1/components/${id}`, opciones),
};