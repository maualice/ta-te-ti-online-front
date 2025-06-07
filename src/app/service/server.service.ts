import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  server = io("localhost:3000", { autoConnect: false }) //se crea instancia de un cliente socket.io,y no se va a conectar automaticamente al crear la instancia

  constructor() {
    this.server.on("connect", () => {//listener para el evento connect del socket,cuando se dispare evento connect ejecuta esta funcion
      console.log("Conectado al back");
    });
    this.server.onAny(event => console.log("Onany", event)); //escucha cualquier evento recibido por el socket
    this.server.connect();//se inicia la conexión manualmente
    this.server.emit("Mensaje custom") //Una vez conectado, el cliente emite un evento llamado "Mensaje custom" al servidor
  }

}
