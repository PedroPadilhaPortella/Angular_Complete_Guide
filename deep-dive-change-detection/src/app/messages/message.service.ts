import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // messages$ = new BehaviorSubject<string[]>([]);
  // private messages: string[] = [];

  private messages = signal<string[]>([]);

  getMessages = this.messages.asReadonly();

  addMessage(message: string) {
    // this.messages = [...this.messages, message];
    // this.messages$.next(this.messages);

    this.messages.update((prevMessages) => [...prevMessages, message]);
  }
}
