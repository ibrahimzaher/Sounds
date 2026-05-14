import { Component, input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-value-card',
  standalone: true,
  host: {
    class: 'block w-full',
  },
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './about-value-card.component.html',
})
export class AboutValueCardComponent {
  readonly icon = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descriptionKey = input.required<string>();
}
