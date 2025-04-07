import { AfterViewInit, Component, ElementRef, output, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { NewTicket } from '../../../../models/ticket.model';

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent implements AfterViewInit {
  // @ViewChild('ticketForm') ticketForm?: ElementRef<HTMLFormElement>;
  private ticketForm = viewChild.required<ElementRef<HTMLFormElement>>('ticketForm');

  createTicket = output<NewTicket>();

  ngAfterViewInit(): void {
    // Ensures all the ViewChild or ViewChildren are ready
    console.log('View Child: ', this.ticketForm().nativeElement);
  }

  onSubmit(titleEl: HTMLInputElement, requestEl: HTMLTextAreaElement) {
    const title = titleEl.value;
    const request = requestEl.value;
    this.createTicket.emit({ title, request });
    this.ticketForm().nativeElement.reset();
  }
}
