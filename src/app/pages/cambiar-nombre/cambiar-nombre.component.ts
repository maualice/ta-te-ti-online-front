import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-nombre',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './cambiar-nombre.component.html',
  styleUrl: './cambiar-nombre.component.scss'
})
export class CambiarNombreComponent {

  usuarioService = inject(UsuarioService)
  router = inject(Router)

  cambiarNombreYVolver(nuevoNombre: string) {
    this.usuarioService.nombre.set(nuevoNombre);
    this.router.navigate(["/"])
  }
}
