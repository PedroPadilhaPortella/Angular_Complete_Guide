import { Directive, ElementRef, inject } from '@angular/core';

// Attached Directive to a hostDirective
@Directive({
  selector: '[appAnalytics]',
  standalone: true,
  host: {
    '(click)': 'registerEvent()'
  }
})
export class AnalyticsDirective {
  private elementRef = inject(ElementRef);

  registerEvent() {
    console.log('Event dispatched on:', this.elementRef.nativeElement);
  }

}
