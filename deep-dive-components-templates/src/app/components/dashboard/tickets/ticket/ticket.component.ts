import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  onCloseTicket = output<string>();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((wasVisible) => !wasVisible);
  }

  markAsCompleted() {
    this.onCloseTicket.emit(this.ticket().id);
  }
}
