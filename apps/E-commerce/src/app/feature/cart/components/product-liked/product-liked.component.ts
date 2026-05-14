import { Component, inject, OnInit, signal, input } from '@angular/core';
import { HeadingTitleComponent } from '../../../../../app/shared/components/ui/heading/heading-title.component';
import { ProdcutCarousalComponent } from '../../../../../app/shared/components/ui/product-carousal/prodcut-carousal.component';
import { ProductsService } from '../../../products/services/product';
import { Product } from '../../../products/interfaces/product';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-liked',
  imports: [HeadingTitleComponent, ProdcutCarousalComponent, TranslateModule],
  templateUrl: './product-liked.component.html',
  styleUrl: './product-liked.component.css',
})
export class ProductLikedComponent implements OnInit {
  productService = inject(ProductsService);
  products = signal<Product[]>([]);
  responsiveOptions = input<any[]>([
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
  ]);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products.set(data.products),
    });
  }
  title = signal('CART.LIKED_PRODUCTS_TITLE');
  notFound = signal('CART.LIKED_PRODUCT_NOT_FOUND');
}
