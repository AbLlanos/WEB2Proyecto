import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { FormularioProductoPageComponent } from './pages/productos/formulario-producto-page/formulario-producto-page.component';
import { ListaProductosPageComponent } from './pages/productos/lista-productos-page/lista-productos-page.component';

export const routes: Routes = [

    //Rutas generales
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "contacto", component: ContactoComponent },
    { path: "nosotros", component: NosotrosComponent },
    { path: "listaProducto", component: ListaProductosPageComponent },
    { path: "formularioProducto", component: FormularioProductoPageComponent },


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
