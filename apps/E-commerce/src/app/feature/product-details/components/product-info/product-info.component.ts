import { Component, input, output } from '@angular/core';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { LucideAngularModule } from 'lucide-angular';
import { Divider } from 'primeng/divider';
import { DecimalPipe } from '@angular/common';
import { ButtonComponent } from '@elevate/reusable-ui';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-info',
  imports: [LucideAngularModule, Divider, DecimalPipe, ButtonComponent, TranslateModule],
  templateUrl: './product-info.component.html',
})
export class ProductInfoComponent {
  product = input.required<Product | null>();
  addToCart = output<string>();
  toggleWishlist = output<string>();
}
