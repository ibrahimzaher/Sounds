import { Component, effect, input, signal } from '@angular/core';
import { Product } from '../../../../shared/components/ui/product-card/interface/product';

@Component({
  selector: 'app-product-gallery',
  imports: [],
  templateUrl: './product-gallery.component.html',
})
export class ProductGalleryComponent {
  product = input.required<Product | null>();

  mainImage = signal<string>('');

  constructor() {
    effect(() => {
      const cover = this.product()?.imgCover;
      if (cover) {
        this.mainImage.set(cover);
      }
    });
  }

  changeImage(imgUrl: string): void {
    this.mainImage.set(imgUrl);
  }
}
