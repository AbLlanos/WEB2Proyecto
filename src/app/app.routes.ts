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
import { HistorialClienteComponent } from './components/cliente/historial-cliente/historial-cliente.component';
import { SuscripcionClienteComponent } from './components/suscripcion-cliente/suscripcion-cliente.component';
import { GenerarPedidoComponent } from './components/cliente/generar-pedido/generar-pedido.component';

import { InicioEmpleadoComponent } from './pages/inicio-empleado/inicio-empleado.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleado/registro-empleado.component';
import { FormularioEmpleadoComponent } from './components/empleado/formulario-empleado/formulario-empleado.component';
import { PerfilEmpleadoComponent } from './components/empleado/perfil-empleado/perfil-empleado.component';
import { EditarEmpleadoComponent } from './components/empleado/editar-empleado/editar-empleado.component';
import { ProductosEmpleadoComponent } from './components/empleado/productos-empleado/productos-empleado.component';
import { clienteGuard } from './guards/cliente.guard';
import { empleadoGuard } from './guards/empleado.guard';

export const routes: Routes = [
  // Rutas generales
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "contacto", component: ContactoComponent },
  { path: "nosotros", component: NosotrosComponent },

  // Sesión
  { path: "login", component: FormularioLoginComponent, canMatch: [loginCanMatchGuard] },

  // Empleados
  { path: "perfilEmpleado", component: PerfilEmpleadoComponent, canActivate: [empleadoGuard] },
  { path: "inicioEmpleado", component: InicioEmpleadoComponent },
  { path: "registroEmpleado", component: FormularioEmpleadoComponent },
  { path: "editarEmpleado", component: EditarEmpleadoComponent, canActivate: [empleadoGuard] },
  { path: "productosEmpleado", component: ProductosEmpleadoComponent, canActivate: [empleadoGuard] },

  // Productos
  { path: "productosDisponibles", component: GenerarPedidoComponent },
  { path: "listaProducto", component: ListaProductosPageComponent, canActivate: [clienteGuard] },

  { path: "formularioProducto", component: FormularioProductoPageComponent, canActivate: [empleadoGuard] },
  { path: "editarFormulario/:id", component: EditarProductosVistaComponent, canActivate: [empleadoGuard] },

  // Clientes
  { path: "registroCliente", component: RegistroClienteComponent, canDeactivate: [registroEmpleadoGuard] },
  { path: "registroCliente1", component: FormularioClienteComponent},
  { path: "perfilCliente", component: PerfilClienteComponent, canActivate: [clienteGuard] },
  { path: "editarCliente", component: EditarClienteComponent, canActivate: [clienteGuard] },
  { path: "historialCliente", component: HistorialClienteComponent, canActivate: [clienteGuard] },
  { path: "suscripcionCliente", component: SuscripcionClienteComponent, canActivate: [clienteGuard] },

  // Página no encontrada
  { path: "**", component: PaginaNoEncontradaComponent }
];
