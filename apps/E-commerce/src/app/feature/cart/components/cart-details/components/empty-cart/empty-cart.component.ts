import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-empty-cart',
  imports: [LucideAngularModule, TranslateModule],
  templateUrl: './empty-cart.component.html',
})
export class EmptyCartComponent {}
