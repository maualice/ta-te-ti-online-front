import { Component, inject, input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss'
})
export class JugarComponent implements OnInit {

  serverService = inject(ServerService)
  usuarioService = inject(UsuarioService)
  esPrivada = input()
  id = input<string>()

  ngOnInit(): void {
    if (!this.esPrivada() && !this.id()) {
      this.serverService.crearSala()
    } else if (this.id()) {
      this.serverService.unirseASala(parseInt(this.id()!)) //si llego hasta aca entonces es porque existe
    } else {
      this.serverService.crearSala(true)
    }
  }
}