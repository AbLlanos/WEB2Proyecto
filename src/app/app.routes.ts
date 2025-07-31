import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { FormularioProductoComponent } from './pages/productos/formulario-producto/formulario-producto.component';
import { ListaProductosComponent } from './pages/productos/lista-productos/lista-productos.component';
import { CarruselComponent } from './components/home/carrusel/carrusel.component';

export const routes: Routes = [

    //Rutas generales
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "contacto", component: ContactoComponent },
    { path: "carrusel", component: CarruselComponent },
    { path: "nosotros", component: NosotrosComponent },
    { path: "listaProducto", component: ListaProductosComponent },
    { path: "formularioProducto", component: FormularioProductoComponent },


    //Clientes
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },




    //Empleados
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },



    //Productos
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },



];
