import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import type { SeoMeta } from '../interfaces/seo-meta.interface';

const defaultSeo: SeoMeta = {
  title: 'Elevate Gifts | Flowers and Gift Boxes Online',
  description:
    'Shop elegant flowers, gift boxes, and occasion-ready surprises from Elevate with curated collections for birthdays, weddings, anniversaries, and more.',
  robots: 'index, follow',
};

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  init(): void {
    this.update(defaultSeo);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe(() => this.update(this.routeSeo));
  }

  update(seo: SeoMeta): void {
    const currentSeo = {
      ...defaultSeo,
      ...seo,
      description: this.normalizeDescription(seo.description),
    };

    this.title.setTitle(currentSeo.title);
    this.meta.updateTag({ name: 'description', content: currentSeo.description || defaultSeo.description });
    this.meta.updateTag({ name: 'robots', content: currentSeo.robots ?? 'index, follow' });
  }

  private normalizeDescription(description: string): string {
    return description
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);
  }

  private get routeSeo(): SeoMeta {
    let route = this.activatedRoute.snapshot;
    while (route.firstChild) route = route.firstChild;
    return route.data['seo'] ?? defaultSeo;
  }
}