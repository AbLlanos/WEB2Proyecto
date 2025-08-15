export interface Empleado {
    id: number;
    nombreCompleto: string;
    cedula: string;
    direccion: string;
    telefono: string;
    correoElectronico: string;
    fechaNacimiento: string;
    genero?: string;
    password:string;
    fechaRegistro?: string;
}
