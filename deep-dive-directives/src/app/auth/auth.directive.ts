import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

// Structural Directive
@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  userRole = input.required<Permission>({ alias: 'appAuth' });

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userRole()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

}
