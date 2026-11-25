import { solicitar } from './api';

export const componentesService = {
  listar: (opciones) => solicitar('/v1/components', opciones),
  obtener: (id, opciones) => solicitar(`/v1/components/${id}`, opciones),
};