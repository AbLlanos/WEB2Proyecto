export interface Cliente {
    id?: string;
    nombreCompleto: string;
    cedula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    password?: string;
    fechaNacimiento: string;
    genero: string;
    fechaRegistro?: string;
    rol?: string;

    // Campos de suscripción adaptados al backend
    suscripcion_activa?: number; // 1 = activa, 0 = inactiva
    tipo_suscripcion?: string;
    fecha_activacion?: string;
}
