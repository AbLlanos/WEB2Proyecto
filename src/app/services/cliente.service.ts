import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /*
  constructor(private http: HttpClient) {
  
    }
  
    private API_PRODUCTOS = "https://web2proyecto-eb88f-default-rtdb.firebaseio.com/";
  
    
    //Mostrar
  
    leerProductos():Observable<any>{
          return this.http.get<{ [key: string]: Producto }>(`${this.API_PRODUCTOS}/productos.json`)
    }
  
    //Guardar
    guardarProducto(producto: any): Observable<any> {
      return this.http.post(`${this.API_PRODUCTOS}/productos.json`, producto);
    }
  */
}
