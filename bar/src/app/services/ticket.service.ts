import { EventEmitter, Injectable } from '@angular/core';

interface comandaTicket {
  id: number;
  total: number;
  mesa: string;
  pago: string;
  comandas: any[];
}

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  ticket: comandaTicket[] = [];
  ticketChange: EventEmitter<comandaTicket[]> = new EventEmitter();

  constructor() {}

  cargarTicket() {
    const ticketGuardado = localStorage.getItem('ticket');
    if (ticketGuardado) {
      this.ticket = JSON.parse(ticketGuardado);
    }
    this.emitirCambioTicket();
  }

  agregarAlTicket(comanda: comandaTicket) {
    this.ticket.push(comanda);
    this.actualizarTicket();
  }

  // Actualizar ticket en el almacenamiento local
  actualizarTicket() {
    localStorage.setItem('ticket', JSON.stringify(this.ticket));
    this.emitirCambioTicket();
  }


  eliminarComanda(id: number) {
    this.ticket = this.ticket.filter((p) => p.id !== id);
    this.actualizarTicket();
  }

  vaciarTicket() {
    localStorage.removeItem('ticket');
    this.ticket = [];
    this.emitirCambioTicket();
  }

  emitirCambioTicket() {
    this.ticketChange.emit(this.ticket);
  }

  calcularTotal() {
    return this.ticket.reduce((total, comanda) => total + comanda.total, 0);
  }

  agregarTickets(tickets: comandaTicket[]) {
    this.ticket = [...this.ticket, ...tickets];
    this.actualizarTicket();
  }
}
