/* eslint-disable prettier/prettier */

export interface Content {
    id: string;
    title: string;
    parent?: string; // ID de la unidad padre (para subunidades)
    course: string; // ID del curso al que pertenece
    getContent(): string; // Ejemplo de método común
}