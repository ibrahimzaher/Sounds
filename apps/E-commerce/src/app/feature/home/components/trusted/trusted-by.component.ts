import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-trusted-by',
  imports: [TranslatePipe],
  templateUrl: './trusted-by.component.html',
})
export class TrustedByComponent {
  readonly images = signal<string[]>([
    './images/trust-section/trust1.webp',
    './images/trust-section/trust2.webp',
    './images/trust-section/trust3.webp',
    './images/trust-section/trust4.webp',
    './images/trust-section/trust5.webp',
    './images/trust-section/trust6.webp',
  ]);
}
