// src/services/componentes.js
import { solicitar } from './api';

export const componentesService = {
  listar: (opciones) => solicitar('/api/v1/cpus', opciones),
  obtener: (id, opciones) => solicitar(`/api/v1/cpus/${id}`, opciones),
};