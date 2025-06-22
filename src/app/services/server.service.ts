import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UsuarioService } from './usuario.service';
import { CrearSalaArgs } from '../interfaces/crearSala';
import { UnirseASalaArgs } from '../interfaces/unirseASala';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io("localhost:3000", { autoConnect: false }) //se crea instancia de un cliente socket.io,y no se va a conectar automaticamente al crear la instancia
  usuarioService = inject(UsuarioService)

  constructor() {
    this.server.on("connect", () => {//listener para el evento connect del socket,cuando se dispare evento connect ejecuta esta funcion
      console.log("Conectado al back");
    });
    this.server.on("sala",(args)=>console.log(args))
    this.server.connect();//se inicia la conexión manualmente
  }

  crearSala(esPrivada: boolean = false) {
    const args: CrearSalaArgs = {
      publica: !esPrivada,
      nombreJugador: this.usuarioService.nombre()
    }
    this.server.emitWithAck('crearSala', args).then(res => {
      console.log("Crear Sala", res);
    })
  }

  unirseASala(id: number) {
    const args: UnirseASalaArgs = {
      id,
      nombreJugador: this.usuarioService.nombre()
    }
    this.server.emitWithAck('unirseASala', args).then(res => {
      console.log("Resutlado de union a sala", res);
    })
  }

}
