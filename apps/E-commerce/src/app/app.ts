import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { environment } from '../environments/environments';
import { SeoService } from './core/services/seo.service';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { ConfirmDialogComponent } from './shared/components/ui/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  imports: [
    RouterModule,
    PaginatorModule,
    ButtonModule,
    LucideAngularModule,
    NgxSpinnerComponent,
    ConfirmDialogComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private readonly seoService = inject(SeoService);
  private readonly platformId = inject(PLATFORM_ID);
  protected title = 'E-commerce';

  ngOnInit(): void {
    this.seoService.init();

    if (isPlatformBrowser(this.platformId) && environment.googleMapsKey) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsKey}&libraries=maps&loading=async`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }
}
