import { Component } from '@angular/core';
import { AddTicketComponent } from "./add-ticket/add-ticket.component";
import { TicketComponent } from './ticket/ticket.component';
import { NewTicket, Ticket } from '../../../models/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [AddTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onCreateTicket({ title, request }: NewTicket) {
    const ticket: Ticket = { title, request, id: Math.random().toString(), status: 'opened' };
    this.tickets.push(ticket);
  }

  onCloseTicket(ticketId: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === ticketId) return { ...ticket, status: 'closed' };
      return ticket;
    });
  }
}
