import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { HeadingTitleComponent } from '../../../../shared/components/ui/heading/heading-title.component';
import { GalleryColumn } from './interfaces/gallery';

@Component({
  selector: 'app-gallery-section',
  imports: [NgOptimizedImage, TranslatePipe, HeadingTitleComponent],
  templateUrl: './gallery-section.component.html',
})
export class GallerySectionComponent {
  readonly galleryColumns: GalleryColumn[] = [
    {
      rowClasses: 'grid-rows-[3fr_2fr]',
      images: [
        {
          src: 'images/gallery-section/gallery1.webp',
          altKey: 'GALLERY.IMG_ALT.GIFTS_ANNIVERSARY',
        },
        {
          src: 'images/gallery-section/gallery4.webp',
          altKey: 'GALLERY.IMG_ALT.CHOCOLATES',
        },
      ],
    },
    {
      rowClasses: 'grid-rows-[2fr_3fr]',
      images: [
        {
          src: 'images/gallery-section/gallery2.webp',
          altKey: 'GALLERY.IMG_ALT.RED_GIFTS',
        },
        {
          src: 'images/gallery-section/gallery5.webp',
          altKey: 'GALLERY.IMG_ALT.RING_BOX_FLOWERS',
        },
      ],
    },
    {
      rowClasses: 'grid-rows-[2fr_3fr]',
      images: [
        {
          src: 'images/gallery-section/gallery3.webp',
          altKey: 'GALLERY.IMG_ALT.RING_BOX_WHITE',
        },
        {
          src: 'images/gallery-section/gallery6.webp',
          altKey: 'GALLERY.IMG_ALT.ENGAGEMENT_CARD',
        },
      ],
    },
  ];
}