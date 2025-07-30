import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';

export const routes: Routes = [

    //Rutas generales
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "contacto", component: ContactoComponent },
    { path: "contacto", component: NosotrosComponent },
    { path: "contacto", component: ContactoComponent },
    { path: "contacto", component: ContactoComponent },


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
