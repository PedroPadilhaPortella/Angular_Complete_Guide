import { AfterContentInit, afterNextRender, afterRender, Component, contentChild, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'control', '(click)': 'onClick()' }
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';
  // @HostListener('click') onClick = () => console.log('Control clicked');

  // @ContentChild('control') private controlContent?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private controlContent = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('control');

  label = input.required<string>();
  element = inject(ElementRef);

  constructor() {
    afterRender(() => {
      console.log('afterRender lifecycle hook');
    });

    afterNextRender(() => {
      console.log('afterRender lifecycle hook');
    });
  }

  ngAfterContentInit(): void {
    // Ensures all the ContentChild or ContentChildren are ready
    console.log('Content Child: ', this.controlContent());
  }

  onClick() {
    console.log('Host Element: ', this.element);
  }
}
