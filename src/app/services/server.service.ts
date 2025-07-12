import { inject, Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { UsuarioService } from './usuario.service';
import { SalaBackend } from '../interfaces/sala';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io(environment.SERVER_URL, { autoConnect: false }) //se crea instancia de un cliente socket.io,y no se va a conectar automaticamente al crear la instancia
  usuarioService = inject(UsuarioService)

  actualizacionDeSala$ = new Subject<SalaBackend>()

  constructor() {
    this.server.on("connect", () => {//listener para el evento connect del socket,cuando se dispare evento connect ejecuta esta funcion
      //console.log("Conectado al back");
    });
    this.server.on("sala", (args) => {
      this.actualizacionDeSala$.next(args)
    })
    this.server.connect();//se inicia la conexión manualmente
  }
}
