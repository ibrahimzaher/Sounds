import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
   readonly message = input<string>('');
}
