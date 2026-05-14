import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  Component,
  computed,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { languageService } from '../../../../core/services/language-service';
import { BottomBannerComponent } from './components/bottom-banner/bottom-banner.component';
import { heroBannerConfig } from '../../interfaces/home';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterLink, CarouselModule, BottomBannerComponent, TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly langService = inject(languageService);

  readonly activeMainBanner = signal(0);
  readonly isHeroCarouselReady = signal(false);
  readonly isRTL = this.langService.isRTL;
  readonly currentMainBanner = computed(
    () => this.mainBanners[this.activeMainBanner()] ?? this.mainBanners[0]
  );
  readonly isFirstMainBanner = computed(() => this.activeMainBanner() === 0);
  readonly isLastMainBanner = computed(
    () => this.activeMainBanner() === this.mainBanners.length - 1
  );

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    afterNextRender(() => {
      this.isHeroCarouselReady.set(true);
    });
  }

  leftBanner: heroBannerConfig = {
    title: 'HERO_SECTION.LEFT_BANNER.TITLE',
    badge: 'HERO_SECTION.LEFT_BANNER.BADGE',
    ctaText: 'HERO_SECTION.LEFT_BANNER.CTA',
    imageSrc: 'images/hero-section/hero1.webp',
    link: '/categories'
  };

  mainBanners: heroBannerConfig[] = [
    {
      title: 'HERO_SECTION.MAIN_BANNERS.1.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.1.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.1.CTA',
      imageSrc: 'images/hero-section/hero2.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.2.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.2.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.2.CTA',
      imageSrc: 'images/hero-section/hero3.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.3.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.3.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.3.CTA',
      imageSrc: 'images/hero-section/hero4.webp',
      link: '/products'
    },
    {
      title: 'HERO_SECTION.MAIN_BANNERS.4.TITLE',
      subtitle: 'HERO_SECTION.MAIN_BANNERS.4.SUBTITLE',
      ctaText: 'HERO_SECTION.MAIN_BANNERS.4.CTA',
      imageSrc: 'images/hero-section/hero5.webp',
      link: '/products'
    }
  ];

  bottomBanners: heroBannerConfig[] = [
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.1.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.1.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.1.CTA',
      imageSrc: 'images/hero-section/hero3.webp',
      link: '/occasions'
    },
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.2.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.2.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.2.CTA',
      imageSrc: 'images/hero-section/hero4.webp',
      link: '/occasions'
    },
    {
      title: 'HERO_SECTION.BOTTOM_BANNERS.3.TITLE',
      badge: 'HERO_SECTION.BOTTOM_BANNERS.3.BADGE',
      ctaText: 'HERO_SECTION.BOTTOM_BANNERS.3.CTA',
      imageSrc: 'images/hero-section/hero5.webp',
      link: '/occasions'
    }
  ];

  setActiveMainBanner(page: number | undefined): void {
    if (page === undefined) return;

    this.activeMainBanner.set(page);
  }

  showPreviousMainBanner(): void {
    if (this.isFirstMainBanner()) return;

    this.activeMainBanner.update((page) => page - 1);
  }

  showNextMainBanner(): void {
    if (this.isLastMainBanner()) return;

    this.activeMainBanner.update((page) => page + 1);
  }
}
