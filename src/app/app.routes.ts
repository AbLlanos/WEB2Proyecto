import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { FormularioProductoPageComponent } from './pages/productos/formulario-producto-page/formulario-producto-page.component';
import { ListaProductosPageComponent } from './pages/productos/lista-productos-page/lista-productos-page.component';
import { EditarProductosVistaComponent } from './pages/productos/editar-productos-vista/editar-productos-vista.component';
import { LoginVistaComponent } from './pages/login-vista/login-vista.component';
import { RegistroClienteComponent } from './pages/registro-cliente/registro-cliente.component';
import { PerfilClienteVistaComponent } from './pages/cliente/perfil-cliente-vista/perfil-cliente-vista.component';
import { PaginaNoEncontradaComponent } from './components/Error/pagina-no-encontrada/pagina-no-encontrada.component';
import { registroEmpleadoGuard } from './guards/registro-empleado.guard';
import { FormularioClienteComponent } from './components/cliente/formulario-cliente/formulario-cliente.component';
import { loginCanMatchGuard } from './guards/login-can-match.guard';
import { autenticaGuard } from './guards/autentica.guard';
import { FormularioLoginComponent } from './components/credenciales/formulario-login/formulario-login.component';
import { PerfilClienteComponent } from './components/cliente/perfil-cliente/perfil-cliente.component';
import { EditarClienteComponent } from './components/cliente/editar-cliente/editar-cliente.component';

export const routes: Routes = [

    //Rutas generales
    { path: "home", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "contacto", component: ContactoComponent },
    { path: "nosotros", component: NosotrosComponent },

    //Inciar sesion

    { path: "login", component: FormularioLoginComponent , canMatch: [loginCanMatchGuard]  },


    //Productos

    { path: "listaProducto", component: ListaProductosPageComponent },
    { path: "formularioProducto", component: FormularioProductoPageComponent, canActivate: [autenticaGuard] },
    { path: "editarFormulario/:id", component: EditarProductosVistaComponent, canActivate: [autenticaGuard] },


    //Clientes
    {
        path: "registroCliente",
        component: RegistroClienteComponent,
        canDeactivate: [registroEmpleadoGuard]
    },
    {
        path: "registroCliente1",
        component: FormularioClienteComponent,
        canDeactivate: [registroEmpleadoGuard]
    },

    { path: "perfilCliente", component: PerfilClienteComponent, canActivate: [autenticaGuard] },

    { path: "editarCliente", component: EditarClienteComponent, canActivate: [autenticaGuard] },


    //Empleados
    { path: "", component: HomeComponent },
    { path: "", redirectTo: "home", pathMatch: "full" },

    //Pagina No encontrada

    { path: "**", component: PaginaNoEncontradaComponent }


];
