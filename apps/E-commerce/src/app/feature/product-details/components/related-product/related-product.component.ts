import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';
import { ProdcutCarousalComponent } from '../../../../shared/components/ui/product-carousal/prodcut-carousal.component';
@Component({
  selector: 'app-related-product',
  imports: [
    HeadingTitleComponent,
    CarouselModule,
    ProdcutCarousalComponent,
    TranslateModule,
  ],
  templateUrl: './related-product.component.html',
})
export class RelatedProductComponent {
  products = input.required<Product[]>();
  responsiveOptions = input<any[]>([
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
  ]);
}
