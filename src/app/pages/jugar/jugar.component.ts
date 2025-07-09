import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerService } from '../../services/server.service';
import { UsuarioService } from '../../services/usuario.service';
import { DetallePartidaComponent } from '../../components/detalle-partida/detalle-partida.component';
import { TableroComponent } from '../../components/tablero/tablero.component';
import { SalaService } from '../../services/sala.service';
import { ModalFullscreenComponent } from "../../components/modal-fullscreen/modal-fullscreen.component";
import { EstadoJuego } from '../../interfaces/sala';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jugar',
  standalone: true,
  imports: [RouterModule, DetallePartidaComponent, TableroComponent, ModalFullscreenComponent],
  templateUrl: './jugar.component.html',
  styleUrl: './jugar.component.scss'
})
export class JugarComponent implements OnInit {

  serverService = inject(ServerService);
  usuarioService = inject(UsuarioService);
  salaService = inject(SalaService)
  location = inject(Location)
  esPrivada = input();
  id = input<string>();
  estadosConModal: EstadoJuego[] = ["ABANDONADO", "EMPATE", "ESPERANDO_COMPAÑERO", "VICTORIA_FINAL_P1", "VICTORIA_FINAL_P2", "VICTORIA_P1", "VICTORIA_P2"];
  mostrarModal = computed(() => this.estadosConModal.includes(this.salaService.estado()));
  estadoAnterior = signal<EstadoJuego>("ESPERANDO_COMPAÑERO");
  cambiarEstadoAnterior = effect(() => {
    if (this.salaService.estado()) { //porque effect no puede leer el estado si esta dentro de setTimeout
      setTimeout(() => this.estadoAnterior.set(this.salaService.estado()), 300)//como turno p1 no tiene texto,guardo estado anterior(esperando jugador) para que la animacion funcione
    }
  }, { allowSignalWrites: true }); //por defecto dentro de effect no se permite modificar signals
  linkCopiado = signal<boolean>(false);

  ngOnInit(): void {
    this.location.replaceState("jugar")//se pierde los valores de los parametros si hay
    if (!this.esPrivada() && !this.id()) {
      this.salaService.crearSala();
    } else if (this.id()) {
      //console.log("Intentando unirse a la sala", this.id())
      this.salaService.unirseASala(parseInt(this.id()!));
    } else {
      this.salaService.crearSala(true);
    }
  }

  nuevaRonda() {
    this.salaService.nuevaRonda()
  }

  copiarLink() {
    navigator.clipboard.writeText("localhost:4200/jugar/" + this.salaService.id());
    this.linkCopiado.set(true);
    setTimeout(() => this.linkCopiado.set(false), 2000);
  }
}