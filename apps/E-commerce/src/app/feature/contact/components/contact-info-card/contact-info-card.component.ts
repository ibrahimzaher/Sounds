import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-info-card',
  standalone: true,
  host: {
    class: 'block w-full',
  },
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './contact-info-card.component.html',
})
export class ContactInfoCardComponent {
  readonly icon = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly valueKey = input.required<string>();
  readonly href = input<string>('');
  readonly forceLtr = input(false);
}
