export interface Producto {
    id: string;
    nombre: string;
    precio: number;
    cantidad: number;
    iva: number;
    precioTotal: number;
    ingredientes: string;
    categoria: string;
    img: string;
    disponible: string | number;   
    disponibleTexto?: string;     
    cantidadSeleccionada?: number; 
    precioConDescuento?: number;   
}
