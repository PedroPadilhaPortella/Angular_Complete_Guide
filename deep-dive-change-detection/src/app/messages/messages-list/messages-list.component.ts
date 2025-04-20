import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MessageService } from '../message.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class MessagesListComponent {
  private messageService = inject(MessageService);

  messages = this.messageService.getMessages;

  // private changeDetectorRef = inject(ChangeDetectorRef);
  // private destroyRef = inject(DestroyRef);

  // messages: string[] = [];

  /* This will do exact the same as the code above using async pipe
      (manage the subscription, change detection and unsubscribe all at the end) 
  */
  // messages$ = this.messageService.messages$;

  // ngOnInit(): void {
  //   const subscription = this.messageService.messages$.subscribe((messages) => {
  //     this.messages = messages;
  //     this.changeDetectorRef.markForCheck();
  //   });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }

}
