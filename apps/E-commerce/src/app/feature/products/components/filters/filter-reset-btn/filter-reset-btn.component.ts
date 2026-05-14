import { Component, output } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-reset-btn',
  imports: [LucideAngularModule, TranslatePipe],
  templateUrl: './filter-reset-btn.component.html',
})
export class FilterResetBtnComponent {
  readonly XIcon = X;
  reset = output<void>();
}