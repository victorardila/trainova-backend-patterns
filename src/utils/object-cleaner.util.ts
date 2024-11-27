/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
export function removeEmptyKeys(obj: any): any {
    if (Array.isArray(obj)) {
        return obj
            .map(removeEmptyKeys) // Procesa cada elemento del arreglo
            .filter((item) => Object.keys(item).length > 0); // Elimina objetos vacíos
    } else if (typeof obj === "object" && obj !== null) {
        const cleanedObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
            const cleanedValue = removeEmptyKeys(value);
            // Agrega solo si el valor no está vacío
            if (
                cleanedValue !== null &&
                cleanedValue !== undefined &&
                (!(Array.isArray(cleanedValue) || typeof cleanedValue === "object")
                    || Object.keys(cleanedValue).length > 0)
            ) {
                cleanedObj[key] = cleanedValue;
            }
        }
        return cleanedObj;
    }
    return obj; // Retorna valores primitivos sin modificar
}
