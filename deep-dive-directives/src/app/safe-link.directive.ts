import { Directive, ElementRef, inject, input } from '@angular/core';
import { AnalyticsDirective } from './analytics.directive';

// Attribute Directive
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  hostDirectives: [AnalyticsDirective],
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  },
})
export class SafeLinkDirective {
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  queryParam = input.required({ alias: 'appSafeLink' });

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      (event.target as HTMLAnchorElement).href = `${address}?from=${this.queryParam()}`;
      return;
    }

    event?.preventDefault();
  }

}
