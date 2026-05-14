import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Product } from '../product-card/interface/product';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-prodcut-carousal',
  imports: [CarouselModule, ProductCardComponent],
  templateUrl: './prodcut-carousal.component.html',
  styleUrl: './prodcut-carousal.component.css',
})
export class ProdcutCarousalComponent {
  private readonly platformId = inject(PLATFORM_ID);
  readonly prevButtonProps = { ariaLabel: 'Previous products' };
  readonly nextButtonProps = { ariaLabel: 'Next products' };

  products = input.required<Product[]>();
  numVisible = input<number>(4);
  numScroll = input<number>(1);
  notFound = input<string>('Not Have Products');
  readonly isCarouselReady = signal(false);
  readonly previewProducts = computed(() =>
    this.products().slice(0, Math.max(this.numVisible(), 1))
  );
  readonly showNavigators = computed(() => this.products().length > 4);
  readonly useCarousel = computed(() => this.products().length >= 4);

  responsiveOptions = input<any[]>([
    { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '991px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
  ]);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    afterNextRender(() => {
      this.isCarouselReady.set(true);
    });
  }
}
